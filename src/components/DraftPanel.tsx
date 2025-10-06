interface Draft {
  id: string
  text: string
  createdAt: number
}

interface DraftPanelProps {
  drafts: Draft[]
  streamingText: string | null
  generating: boolean
  onClear: () => void
  onRegenerate: (lastText?: string) => void
  onCopy: (text: string) => void
}

export const DraftPanel = ({ drafts, streamingText, generating, onClear, onRegenerate, onCopy }: DraftPanelProps) => {
  const hasContent = drafts.length || streamingText
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-700">下書き</h2>
        {hasContent && (
          <div className="flex gap-2">
            <button onClick={() => onRegenerate()} disabled={generating} className="text-xs px-2 py-1 border rounded hover:bg-gray-50 disabled:opacity-40">再生成</button>
            <button onClick={onClear} className="text-xs px-2 py-1 border rounded hover:bg-gray-50">クリア</button>
          </div>
        )}
      </div>
      {!hasContent && <p className="text-xs text-gray-400">まだ下書きはありません。</p>}
      {streamingText && (
        <div className="p-3 bg-white border rounded shadow-sm text-sm whitespace-pre-wrap relative">
          <span>{streamingText}</span>
          {generating && <span className="animate-pulse ml-1 text-primary-500">▋</span>}
        </div>
      )}
      {drafts.map(d => (
        <div key={d.id} className="group p-3 bg-white border rounded shadow-sm text-sm whitespace-pre-wrap relative">
          <button onClick={() => onCopy(d.text)} className="opacity-0 group-hover:opacity-100 transition absolute top-1 right-1 text-xs px-2 py-0.5 border rounded bg-white/70 hover:bg-white">コピー</button>
          {d.text}
        </div>
      ))}
    </div>
  )
}
