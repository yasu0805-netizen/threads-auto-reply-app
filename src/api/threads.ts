// モックデータを使用したThreads API連携の基本構造

export interface ThreadReply {
  id: number
  username: string
  content: string
  timestamp: string
  avatar: string
}

// モックデータ
const mockReplies: ThreadReply[] = [
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

// リプライ取得関数
export async function fetchReplies(): Promise<ThreadReply[]> {
  // 実際のAPI呼び出しの代わりにモックデータを返す
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockReplies), 500) // 0.5秒の遅延をシミュレート
  })
}