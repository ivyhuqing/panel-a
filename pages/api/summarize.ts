// 📁 API 路径：/api/summarize.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();
  const { title, description } = req.body;
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: '请根据上传资料的标题和描述，提炼出一句 20 字以内的内容摘要，简明扼要。'
        },
        {
          role: 'user',
          content: `标题：${title}\n描述：${description}`
        }
      ],
      temperature: 0.2
    });
    const summary = response.choices[0].message.content?.trim();
    res.status(200).json({ summary });
  } catch (error: any) {
    console.error('[SUMMARY ERROR]', error);
    res.status(500).json({ error: 'AI 摘要生成失败' });
  }
}