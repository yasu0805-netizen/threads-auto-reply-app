'use client'

import { useState, useEffect, useCallback } from 'react'
import { fetchReplies, ThreadReply } from '../api/threads'
import { ReplyList } from '../components/ReplyList'
import { DraftPanel } from '../components/DraftPanel'
import { StyleSelector } from '../components/StyleSelector'
import { ErrorBanner } from '../components/ErrorBanner'
import { useAppContext } from '../context/AppContext'

interface Draft { id: string; text: string; createdAt: number }

export default function Home() {
  const { userStyle } = useAppContext()
  const [activeTab, setActiveTab] = useState<'replies' | 'drafts'>('replies')
  const [replies, setReplies] = useState<ThreadReply[]>([])
  const [loadingReplies, setLoadingReplies] = useState(false)
  const [drafts, setDrafts] = useState<Draft[]>([])
  const [streamingText, setStreamingText] = useState<string | null>(null)
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState<string>('')
  const [selectedReply, setSelectedReply] = useState<ThreadReply | null>(null)
  const [abortCtrl, setAbortCtrl] = useState<AbortController | null>(null)

  useEffect(() => {
    setLoadingReplies(true)
    fetchReplies().then(d => setReplies(d)).finally(() => setLoadingReplies(false))
  }, [])

  const finalizeDraft = useCallback((text: string) => {
    const now = Date.now()
    setDrafts(prev => [{ id: `${now}-${Math.random().toString(36).slice(2)}`, text, createdAt: now }, ...prev])
  }, [])

  const handleGenerate = useCallback(async (reply: ThreadReply) => {
    if (generating) return
    setError('')
    setSelectedReply(reply)
    setGenerating(true)
    setStreamingText('')

    const controller = new AbortController()
    setAbortCtrl(controller)

    try {
      const res = await fetch('/api/generate-reply', {
        method: 'POST',
        body: JSON.stringify({ style: userStyle, originalMessage: reply.content }),
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal,
      })
      if (!res.body) throw new Error('ストリームが開始できません')

      const reader = res.body.getReader()
      const decoder = new TextDecoder('utf-8')
      let done = false
      let fullText = ''

      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone
        if (value) {
          const chunk = decoder.decode(value)
          fullText += chunk
          // チャンク内に ERROR が含まれる場合即終了
          if (chunk.startsWith('ERROR:')) {
            const msg = chunk.replace(/^ERROR:\s?/, '').trim()
            setError(msg || '生成エラー')
            break
          }
          if (fullText.includes('\n[DONE]')) {
            const cleaned = fullText.replace('\n[DONE]', '')
            setStreamingText(cleaned)
            finalizeDraft(cleaned.trim())
            setActiveTab('drafts')
            break
          }
          setStreamingText(fullText)
        }
      }
    } catch (e: any) {
      if (e.name === 'AbortError') {
        setError('生成をキャンセルしました')
      } else {
        setError(e.message || '生成に失敗しました')
      }
    } finally {
      setGenerating(false)
      setAbortCtrl(null)
    }
  }, [generating, userStyle, finalizeDraft])

  const handleClearDrafts = () => {
    setDrafts([])
    setStreamingText(null)
  }

  const handleRegenerate = () => {
    if (selectedReply) handleGenerate(selectedReply)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).catch(() => setError('クリップボードへコピーできませんでした'))
  }

  const handleCancel = () => {
    if (abortCtrl) {
      abortCtrl.abort()
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      <ErrorBanner message={error} onClose={() => setError('')} />

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-gray-900">Threads Auto Reply</h1>
        {generating && <button onClick={handleCancel} className="text-xs px-2 py-1 border rounded hover:bg-red-50 border-red-300 text-red-600">キャンセル</button>}
      </div>

      <section>
        <h2 className="text-sm font-medium text-gray-600 mb-2">文体プリセット</h2>
        <StyleSelector />
      </section>

      <nav className="flex gap-6 border-b text-sm">
        {(['replies','drafts'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 -mb-px border-b-2 transition ${activeTab === tab ? 'border-primary-600 text-primary-600 font-medium' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
          >
            {tab === 'replies' ? '受信リプライ' : '下書き'}
          </button>
        ))}
      </nav>

      {activeTab === 'replies' && (
        <ReplyList replies={replies} loading={loadingReplies} onGenerate={handleGenerate} />
      )}
      {activeTab === 'drafts' && (
        <DraftPanel
          drafts={drafts}
          streamingText={streamingText}
          generating={generating}
          onClear={handleClearDrafts}
          onRegenerate={handleRegenerate}
          onCopy={handleCopy}
        />
      )}

      {generating && <p className="text-xs text-primary-600">生成中...</p>}
    </div>
  )
}