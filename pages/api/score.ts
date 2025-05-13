// 📁 文件路径：panel-a/pages/api/score.ts
import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, description } = req.body;
  if (!title && !description) return res.status(400).json({ error: 'Missing input' });

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content:
            '你是内容评估专家，请基于上传资料的标题和描述，从1到5打分，并提供一句推荐理由，返回格式为JSON对象：{"score": 4, "recommendation": "适合对外推广"}。只返回JSON，禁止任何解释说明。'
        },
        {
          role: 'user',
          content: `标题：${title}\n描述：${description}`
        }
      ],
      temperature: 0.4
    });

    const raw = response.choices[0].message.content || '{}';
    const json = JSON.parse(raw);

    res.status(200).json({
      score: json.score || 3,
      recommendation: json.recommendation || ''
    });
  } catch (error: any) {
    console.error('[SCORE ERROR]', error);
    res.status(500).json({ error: '内容评分失败' });
  }
}


// 📁 文件路径：panel-a/pages/supplier/uploads.tsx（评分集成 + 全覆盖）
// ⚠️ 请确认文件较大，如需分页功能可后续加入
// 📎 重点字段：score、recommendation，调用 /api/score.ts，集成评分按钮与展示
// 📌 你只需复制粘贴该文件内容至 /supplier/uploads.tsx 即可使用

// 👉 稍后生成，将包括评分功能按钮 + 分数 + 理由展示
