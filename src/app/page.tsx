'use client'

import { useState, useEffect } from 'react'
import { ChatBubbleLeftRightIcon, Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline'
import { fetchReplies, ThreadReply } from '../api/threads'

// モックデータ
const mockReplies = [
  {
    id: 1,
    username: '@user123',
    content: 'おはよう！今日もよろしく✨',
    timestamp: '5分前',
    avatar: '👩',
  },
  {
    id: 2,
    username: '@follower456',
    content: '占い当たってました！すごい👏',
    timestamp: '15分前',
    avatar: '🧑',
  },
  {
    id: 3,
    username: '@newbie789',
    content: 'はじめまして！フォローしました💕',
    timestamp: '1時間前',
    avatar: '👱‍♀️',
  },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('replies')
  const [replies, setReplies] = useState<ThreadReply[]>(mockReplies)

  useEffect(() => {
    fetchReplies().then((data) => setReplies(data))
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Threads Auto Reply</h1>
          <button className="p-2 text-gray-500 hover:text-gray-700">
            <Cog6ToothIcon className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Tab Navigation */}
      <nav className="bg-white border-b">
        <div className="max-w-md mx-auto px-4">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('replies')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'replies'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              受信リプライ
            </button>
            <button
              onClick={() => setActiveTab('drafts')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'drafts'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              下書き
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="max-w-md mx-auto">
        {activeTab === 'replies' && (
          <div className="divide-y divide-gray-200">
            <div className="space-y-4">
              {replies.map((reply) => (
                <div key={reply.id} className="bg-white p-4 rounded-lg shadow-md">
                  <div className="flex items-start space-x-3">
                    <div className="text-2xl">{reply.avatar}</div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{reply.username}</p>
                      <p className="text-sm text-gray-700 mt-1">{reply.content}</p>
                    </div>
                  </div>
                  <button className="mt-3 flex items-center px-3 py-1.5 border border-primary-600 text-primary-600 text-sm font-medium rounded-md hover:bg-primary-50">
                    <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
                    返信下書きを作成
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'drafts' && (
          <div className="p-8 text-center">
            <ChatBubbleLeftRightIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">下書きがありません</h3>
            <p className="mt-1 text-sm text-gray-500">
              リプライに対して返信下書きを作成してみましょう。
            </p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6">
        <button className="bg-primary-600 text-white rounded-full p-3 shadow-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>
    </div>
  )
}