interface ErrorBannerProps { message: string; onClose: () => void }

export const ErrorBanner = ({ message, onClose }: ErrorBannerProps) => {
  if (!message) return null
  return (
    <div className="mb-4 bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded relative text-sm">
      <button onClick={onClose} className="absolute right-2 top-1 text-xs text-red-500 hover:text-red-700">×</button>
      {message}
    </div>
  )
}
