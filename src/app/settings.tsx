'use client';

import { useAppContext } from '../context/AppContext';

const SettingsPage = () => {
  const { userStyle, setUserStyle } = useAppContext();

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">設定</h2>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">文体プリセット</label>
        <select
          value={userStyle}
          onChange={(e) => setUserStyle(e.target.value as '清楚' | 'ギャル' | '大人')}
          className="w-full p-2 border rounded-md"
        >
          <option value="清楚">清楚</option>
          <option value="ギャル">ギャル</option>
          <option value="大人">大人</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">OpenAI APIキー</label>
        <input
          type="password"
          placeholder="APIキーを入力"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700">
        保存
      </button>
    </div>
  );
};

export default SettingsPage;