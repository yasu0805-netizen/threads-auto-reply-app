import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline'
import { ThreadReply } from '../api/threads'

interface ReplyCardProps {
  reply: ThreadReply
  onGenerate: (reply: ThreadReply) => void
}

export const ReplyCard = ({ reply, onGenerate }: ReplyCardProps) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-start space-x-3">
        <div className="text-2xl">{reply.avatar}</div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{reply.username}</p>
          <p className="text-sm text-gray-700 mt-1 whitespace-pre-line">{reply.content}</p>
          <p className="text-xs text-gray-400 mt-1">{reply.timestamp}</p>
        </div>
      </div>
      <button
        onClick={() => onGenerate(reply)}
        className="mt-3 flex items-center px-3 py-1.5 border border-primary-600 text-primary-600 text-sm font-medium rounded-md hover:bg-primary-50"
      >
        <ChatBubbleLeftRightIcon className="w-4 h-4 mr-1" />
        返信下書きを作成
      </button>
    </div>
  )
}
