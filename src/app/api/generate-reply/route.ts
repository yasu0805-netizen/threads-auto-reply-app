import { NextRequest } from 'next/server'
import { getOpenAIClient, normalizeOpenAIError } from '../../../api/openai'

export const runtime = 'edge'

export async function POST(req: NextRequest) {
  try {
    const { style, originalMessage } = await req.json()
    if (!style || !originalMessage) {
      return new Response('ERROR: invalid payload', { status: 400 })
    }

    const encoder = new TextEncoder()
    const stream = new ReadableStream({
      async start(controller) {
        try {
          const stylePrompts: Record<string, string> = {
            '清楚': '丁寧で礼儀正しい文体',
            'ギャル': '明るくフレンドリーでカジュアルな文体',
            '大人': '落ち着いていてフォーマルな文体',
          }
          const prompt = `以下のメッセージに対して、${stylePrompts[style]}で1つ日本語で返信案を生成してください。簡潔に。\n\nメッセージ: ${originalMessage}`

          let client
          try {
            client = getOpenAIClient()
          } catch (e: any) {
            controller.enqueue(encoder.encode(`ERROR: ${normalizeOpenAIError(e)}`))
            controller.close()
            return
          }

          const completion = await client.chat.completions.create({
            model: 'gpt-4',
            messages: [
              { role: 'system', content: 'あなたは日本語で最適な短い返信案を生成するAIアシスタントです。' },
              { role: 'user', content: prompt },
            ],
            stream: true,
            temperature: 0.7,
          })

          for await (const part of completion) {
            const delta = part.choices?.[0]?.delta?.content
            if (delta) {
              controller.enqueue(encoder.encode(delta))
            }
          }
          controller.enqueue(encoder.encode('\n[DONE]'))
          controller.close()
        } catch (e: any) {
          controller.enqueue(encoder.encode(`ERROR: ${normalizeOpenAIError(e)}`))
          controller.close()
        }
      }
    })

    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked'
      }
    })
  } catch (e: any) {
    return new Response(`ERROR: ${normalizeOpenAIError(e)}`, { status: 500 })
  }
}
