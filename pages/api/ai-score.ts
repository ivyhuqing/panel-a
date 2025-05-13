// pages/api/ai-score.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { title, description } = req.body;
  if (!title || !description) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // 模拟评分逻辑：更长内容评分更高
  const base = title.length > 30 || description.length > 50 ? 3.5 : 2.5;
  const variability = Math.random() * 1.5;
  const score = Math.min(5, Math.max(1, parseFloat((base + variability).toFixed(1))));

  return res.status(200).json({ score });
}

