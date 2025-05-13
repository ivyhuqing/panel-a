import type { NextApiRequest, NextApiResponse } from "next";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { title, description } = req.body;

  if (!title && !description) {
    return res.status(400).json({ error: "Missing title or description" });
  }

  try {
    const prompt = `请从以下内容中提取5个相关的标签，用英文输出，最多3个词以内，并以 JSON 数组返回（不带多余文字）。

标题: ${title}
描述: ${description}
`;

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5,
    });

    const raw = completion.data.choices[0].message?.content || "[]";
    const tags = JSON.parse(raw);

    res.status(200).json({ tags });
  } catch (error: any) {
    console.error("AI tag generation error:", error.message);
    res.status(500).json({ error: "Failed to generate tags" });
  }
}
