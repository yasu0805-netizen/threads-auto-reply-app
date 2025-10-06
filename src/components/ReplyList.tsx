import { ThreadReply } from '../api/threads'
import { ReplyCard } from './ReplyCard'

interface ReplyListProps {
  replies: ThreadReply[]
  loading: boolean
  onGenerate: (reply: ThreadReply) => void
}

export const ReplyList = ({ replies, loading, onGenerate }: ReplyListProps) => {
  if (loading) {
    return <div className="p-4 text-center text-sm text-gray-500">読み込み中...</div>
  }
  if (!replies.length) {
    return <div className="p-8 text-center text-sm text-gray-500">リプライがありません</div>
  }
  return (
    <div className="space-y-4 divide-y divide-gray-100">
      {replies.map(r => (
        <div key={r.id} className="pt-4 first:pt-0">
          <ReplyCard reply={r} onGenerate={onGenerate} />
        </div>
      ))}
    </div>
  )
}
