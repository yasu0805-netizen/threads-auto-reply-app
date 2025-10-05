import React, { useState } from 'react';
import { ChatBubbleLeftRightIcon, CheckIcon, PencilIcon } from '@heroicons/react/24/outline';

interface DraftOption {
  id: number;
  content: string;
  style: string;
}

const draftOptions: DraftOption[] = [
  { id: 1, content: 'おはようございます！今日もよろしくお願いします。', style: '清楚系' },
  { id: 2, content: 'おはよ〜！今日も頑張ろうね！', style: 'ギャル系' },
  { id: 3, content: 'おはようございます。素敵な一日をお過ごしください。', style: '大人系' },
];

const ReplyFlow: React.FC = () => {
  const [selectedDraft, setSelectedDraft] = useState<DraftOption | null>(null);
  const [customMessage, setCustomMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleSelectDraft = (draft: DraftOption) => {
    setSelectedDraft(draft);
    setCustomMessage(draft.content);
    setIsEditing(false);
  };

  const handleSendReply = () => {
    alert(`返信を送信しました: ${customMessage}`);
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-4">返信フロー</h1>

      {/* Draft Options */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">AI生成の返信候補</h2>
        <div className="space-y-2">
          {draftOptions.map((draft) => (
            <div
              key={draft.id}
              className={`p-3 border rounded-lg cursor-pointer ${
                selectedDraft?.id === draft.id ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
              }`}
              onClick={() => handleSelectDraft(draft)}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">{draft.style}</span>
                {selectedDraft?.id === draft.id && <CheckIcon className="w-5 h-5 text-blue-500" />}
              </div>
              <p className="text-sm text-gray-600 mt-1">{draft.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Message Editor */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">返信内容</h2>
        {isEditing ? (
          <textarea
            value={customMessage}
            onChange={(e) => setCustomMessage(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
          />
        ) : (
          <div className="p-3 border rounded-lg bg-white">
            <p className="text-sm text-gray-700">{customMessage || '返信内容を選択または入力してください。'}</p>
          </div>
        )}
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="mt-2 text-sm text-blue-500 hover:underline flex items-center"
        >
          <PencilIcon className="w-4 h-4 mr-1" /> {isEditing ? '編集を完了' : '編集する'}
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleSendReply}
          disabled={!customMessage.trim()}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          送信
        </button>
        <button
          onClick={() => setCustomMessage('')}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg"
        >
          キャンセル
        </button>
      </div>
    </div>
  );
};

export default ReplyFlow;