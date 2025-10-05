import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 環境変数からAPIキーを取得
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { style, message } = req.body;

  if (!style || !message) {
    return res.status(400).json({ error: 'Missing required fields: style or message' });
  }

  const stylePrompts: Record<string, string> = {
    清楚: '丁寧で礼儀正しい文体',
    ギャル: '明るくフレンドリーでカジュアルな文体',
    大人: '落ち着いていてフォーマルな文体',
  };

  const prompt = `以下のメッセージに対して、${stylePrompts[style]}で返信を3つ生成してください:\n\n` +
    `メッセージ: ${message}\n\n` +
    `返信例:\n1. \n2. \n3.`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 200,
      n: 1,
      stop: ['4.'],
    });

    const text = response.choices[0].message?.content || '';
    const replies = text
      .split('\n')
      .filter((line: string) => line.trim().match(/^\d+\.\s/)) // 数字で始まる行を抽出
      .map((line: string) => line.replace(/^\d+\.\s/, '').trim()); // 数字を削除

    res.status(200).json({ replies });
  } catch (error) {
    console.error('Error generating reply:', error);
    res.status(500).json({ error: 'Failed to generate replies' });
  }
}