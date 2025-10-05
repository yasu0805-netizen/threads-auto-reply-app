'use client';

import { useState, useRef } from 'react';
import { ArrowLeftIcon, CheckIcon } from '@heroicons/react/24/outline';
import { generateReply } from '../api/openai';

console.log('DraftPage is rendering');

const DraftPage = () => {
  const [drafts, setDrafts] = useState<string[]>([]);
  const [selectedDraft, setSelectedDraft] = useState<number | null>(null);
  const [customDraft, setCustomDraft] = useState('');
  const renderCount = useRef(0);

  renderCount.current += 1;
  console.log(`Render count: ${renderCount.current}`);

  const handleGenerateDrafts = async () => {
    try {
      const generated = await generateReply({
        style: '清楚',
        originalMessage: 'おはようございます！今日もよろしくお願いします。',
      });
      setDrafts(generated);
    } catch (error) {
      console.error('Error generating drafts:', error);
    }
  };

  const handleSelectDraft = (index: number) => {
    setSelectedDraft(index);
    setCustomDraft(drafts[index]);
  };

  const handleSend = () => {
    alert(`返信を送信しました: ${customDraft}`);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <button className="flex items-center text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeftIcon className="w-5 h-5 mr-2" /> 戻る
      </button>
      <h2 className="text-xl font-bold mb-4">返信下書き</h2>

      <button
        onClick={handleGenerateDrafts}
        className="mb-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        下書きを生成
      </button>

      <div className="space-y-4">
        {drafts.map((draft, index) => (
          <div
            key={index}
            className={`p-3 border rounded-lg cursor-pointer ${
              selectedDraft === index ? 'border-primary-600 bg-primary-50' : 'border-gray-300'
            }`}
            onClick={() => handleSelectDraft(index)}
          >
            <p className="text-sm text-gray-700">{draft}</p>
            {selectedDraft === index && <CheckIcon className="w-5 h-5 text-primary-600" />}
          </div>
        ))}
      </div>

      {selectedDraft !== null && (
        <div className="mt-4">
          <textarea
            value={customDraft}
            onChange={(e) => setCustomDraft(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
          <button
            onClick={handleSend}
            className="mt-2 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            送信
          </button>
        </div>
      )}
    </div>
  );
};

export default DraftPage;