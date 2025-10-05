'use client'

import { useState } from 'react'
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline'

interface ReplyDraftProps {
  originalMessage: {
    username: string
    content: string
    avatar: string
  }
  onBack: () => void
}

const draftOptions = [
  {
    id: 1,
    style: '清楚系',
    content: 'おはようございます☀️ こちらこそ今日もよろしくお願いします！素敵な一日になりますように✨',
  },
  {
    id: 2,
    style: 'ギャル系',
    content: 'おはよ〜💕 今日もよろしくぅ〜😘 一緒に頑張ろ〜💪✨',
  },
  {
    id: 3,
    style: '大人系',
    content: 'おはようございます。今日も一日よろしくお願いいたします。お互いに良い一日にしましょうね。',
  },
]

export default function ReplyDraft({ originalMessage, onBack }: ReplyDraftProps) {
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null)
  const [customMessage, setCustomMessage] = useState('')
  const [isEditing, setIsEditing] = useState(false)

  const handleSelectDraft = (draftId: number) => {
    const draft = draftOptions.find(d => d.id === draftId)
    if (draft) {
      setSelectedDraft(draftId)
      setCustomMessage(draft.content)
      setIsEditing(false)
    }
  }

  const handleSend = () => {
    // Here would be the actual sending logic
    alert('返信を送信しました！')
    onBack()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center">
          <button onClick={onBack} className="mr-3 p-1 text-gray-500 hover:text-gray-700">
            <ArrowLeftIcon className="w-6 h-6" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">返信下書き</h1>
        </div>
      </header>

      <div className="max-w-md mx-auto">
        {/* Original Message */}
        <div className="bg-white p-4 border-b">
          <div className="flex items-start space-x-3">
            <div className="text-2xl">{originalMessage.avatar}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">{originalMessage.username}</p>
              <p className="text-sm text-gray-700 mt-1">{originalMessage.content}</p>
            </div>
          </div>
        </div>

        {/* Draft Options */}
        <div className="bg-white p-4 space-y-4">
          <h3 className="font-medium text-gray-900">AI生成返信候補</h3>
          
          {draftOptions.map((draft) => (
            <div
              key={draft.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedDraft === draft.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => handleSelectDraft(draft.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-primary-600">{draft.style}</span>
                {selectedDraft === draft.id && (
                  <CheckIcon className="w-4 h-4 text-primary-600" />
                )}
              </div>
              <p className="text-sm text-gray-700">{draft.content}</p>
            </div>
          ))}
        </div>

        {/* Custom Message Editor */}
        <div className="bg-white p-4 border-t">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-900">返信内容</h3>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              {isEditing ? '完了' : '編集'}
            </button>
          </div>
          
          {isEditing ? (
            <textarea
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={4}
              placeholder="返信内容を入力してください..."
            />
          ) : (
            <div className="p-3 bg-gray-50 rounded-lg min-h-[100px]">
              <p className="text-sm text-gray-700">
                {customMessage || '返信候補を選択してください'}
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="bg-white p-4 border-t space-y-3">
          <button
            onClick={handleSend}
            disabled={!customMessage.trim()}
            className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            返信を送信
          </button>
          
          <button
            onClick={onBack}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-200"
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  )
}