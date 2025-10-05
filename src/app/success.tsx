'use client';

import { useRouter } from 'next/navigation';
import { CheckCircleIcon } from '@heroicons/react/24/outline';

const SuccessPage = () => {
  const router = useRouter();

  const handleBackToHome = () => {
    router.push('/');
  };

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold mb-2">送信が完了しました！</h2>
      <p className="text-gray-700 mb-4">返信が正常に送信されました。</p>
      <button
        onClick={handleBackToHome}
        className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        ホームに戻る
      </button>
    </div>
  );
};

export default SuccessPage;