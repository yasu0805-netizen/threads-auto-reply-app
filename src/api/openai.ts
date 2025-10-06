import OpenAI from 'openai'

// Lazy initialize OpenAI client so that build (without env) does not crash
let _client: OpenAI | null = null
export function getOpenAIClient(): OpenAI {
  if (_client) return _client
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    // ここでは throw せず、後段で明示エラー化できるようにする
    throw new Error('OPENAI_API_KEY が設定されていません')
  }
  _client = new OpenAI({ apiKey })
  return _client
}

export interface GenerateReplyOptions {
  style: '清楚' | 'ギャル' | '大人'
  originalMessage: string
}

const stylePrompts: Record<string, string> = {
  清楚: '丁寧で礼儀正しい文体',
  ギャル: '明るくフレンドリーでカジュアルな文体',
  大人: '落ち着いていてフォーマルな文体',
}

export async function generateReply({ style, originalMessage }: GenerateReplyOptions): Promise<string[]> {
  const prompt = `以下のメッセージに対して、${stylePrompts[style]}で返信を3つ日本語で生成してください:\n\n` +
    `メッセージ: ${originalMessage}\n\n` +
    `返信例:\n1. \n2. \n3.`
  try {
  const response = await getOpenAIClient().chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'あなたは返信を生成するアシスタントです。' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.7,
    })
    const content = response.choices[0]?.message?.content
    if (!content) throw new Error('返信内容が取得できませんでした')
    return content
      .split('\n')
      .filter(line => line.trim().match(/^\d+\.\s/))
      .map(line => line.replace(/^\d+\.\s/, '').trim())
  } catch (error: any) {
    console.error('Error generating reply:', error)
    throw new Error(normalizeOpenAIError(error))
  }
}

export function normalizeOpenAIError(e: any): string {
  if (!e) return '不明なエラー'
  if (typeof e === 'string') return e
  if (e.error?.message) return e.error.message
  if (e.message) return e.message
  return 'OpenAI APIエラー'
}