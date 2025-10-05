import OpenAI from 'openai'

// OpenAI APIの設定
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 環境変数からAPIキーを取得
})

export interface GenerateReplyOptions {
  style: '清楚' | 'ギャル' | '大人'
  originalMessage: string
}

export async function generateReply({ style, originalMessage }: GenerateReplyOptions): Promise<string[]> {
  const stylePrompts: Record<string, string> = {
    清楚: '丁寧で礼儀正しい文体',
    ギャル: '明るくフレンドリーでカジュアルな文体',
    大人: '落ち着いていてフォーマルな文体',
  }

  const prompt = `以下のメッセージに対して、${stylePrompts[style]}で返信を3つ生成してください:\n\n` +
    `メッセージ: ${originalMessage}\n\n` +
    `返信例:\n1. \n2. \n3.`

  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'あなたは返信を生成するアシスタントです。' },
        { role: 'user', content: prompt },
      ],
    })

    const content = response.choices[0]?.message?.content
    if (!content) {
      throw new Error('返信内容が取得できませんでした')
    }

    return content
      .split('\n')
      .filter((line: string) => line.trim().match(/^\d+\.\s/)) // 数字で始まる行を抽出
      .map((line: string) => line.replace(/^\d+\.\s/, '').trim()) // 数字を削除
  } catch (error) {
    console.error('Error generating reply:', error)
    throw new Error('返信生成中にエラーが発生しました')
  }
}