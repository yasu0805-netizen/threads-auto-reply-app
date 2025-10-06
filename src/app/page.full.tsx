// Original full page backup
'use client'

import { useState, useEffect } from 'react'
import { ChatBubbleLeftRightIcon, Cog6ToothIcon, PlusIcon } from '@heroicons/react/24/outline'
import { fetchReplies, ThreadReply } from '../api/threads'

const mockReplies = [
  { id: 1, username: '@user123', content: 'おはよう！今日もよろしく✨', timestamp: '5分前', avatar: '👩' },
  { id: 2, username: '@follower456', content: '占い当たってました！すごい👏', timestamp: '15分前', avatar: '🧑' },
  { id: 3, username: '@newbie789', content: 'はじめまして！フォローしました💕', timestamp: '1時間前', avatar: '👱‍♀️' },
]

export default function HomeFull() {
  const [activeTab, setActiveTab] = useState('replies')
  const [replies, setReplies] = useState<ThreadReply[]>(mockReplies)

  useEffect(() => { fetchReplies().then((data) => setReplies(data)) }, [])

  return <div>Full page backup (UI omitted for brevity)</div>
}
