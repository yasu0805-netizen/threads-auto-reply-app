import { useAppContext } from '../context/AppContext'

const styles: Array<{ value: '清楚' | 'ギャル' | '大人'; label: string }> = [
  { value: '清楚', label: '清楚 (丁寧)' },
  { value: 'ギャル', label: 'ギャル (カジュアル)' },
  { value: '大人', label: '大人 (落ち着き)' },
]

export const StyleSelector = () => {
  const { userStyle, setUserStyle } = useAppContext()
  return (
    <div className="flex gap-2 flex-wrap">
      {styles.map(s => (
        <button
          key={s.value}
            onClick={() => setUserStyle(s.value)}
            className={`text-xs px-3 py-1 rounded border transition ${userStyle === s.value ? 'bg-primary-600 text-white border-primary-600' : 'bg-white hover:bg-primary-50 border-gray-300 text-gray-600'}`}
        >
          {s.label}
        </button>
      ))}
    </div>
  )
}
