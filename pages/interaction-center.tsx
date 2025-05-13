// panel-a/pages/interaction-center.tsx - 客户互动记录页面（留言、反馈、评论）

import Head from "next/head";
import { Badge, Button } from "@/components/ui";

const mockFeedback = [
  {
    id: 1,
    customer: "李先生",
    company: "宁波慧联科技",
    type: "留言",
    content: "是否支持东南亚发货？",
    time: "2025-05-10 09:32",
    status: "未读"
  },
  {
    id: 2,
    customer: "Sophia",
    company: "GlobalTech Ltd",
    type: "点赞",
    content: "👍 对 AI 相机很感兴趣",
    time: "2025-05-10 10:12",
    status: "已读"
  },
  {
    id: 3,
    customer: "陈工",
    company: "南通物联",
    type: "反馈",
    content: "网页加载速度偏慢，建议优化 CDN",
    time: "2025-05-09 18:45",
    status: "未处理"
  }
];

export default function InteractionCenterPage() {
  return (
    <>
      <Head>
        <title>客户互动记录</title>
      </Head>
      <main className="bg-white min-h-screen p-10 text-text-main">
        <h1 className="text-2xl font-bold mb-6">💬 客户互动记录</h1>

        <table className="w-full border rounded-md overflow-hidden text-sm">
          <thead className="bg-[#F9FAFB] border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">客户</th>
              <th className="text-left px-4 py-3 font-medium">公司</th>
              <th className="text-left px-4 py-3 font-medium">类型</th>
              <th className="text-left px-4 py-3 font-medium">内容</th>
              <th className="text-left px-4 py-3 font-medium">时间</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockFeedback.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.customer}</td>
                <td className="px-4 py-3">{item.company}</td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3 text-muted-foreground">{item.content}</td>
                <td className="px-4 py-3">{item.time}</td>
                <td className="px-4 py-3">
                  <Badge
                    className={
                      item.status === "未读"
                        ? "bg-yellow-400 text-white"
                        : item.status === "未处理"
                        ? "bg-gray-400 text-white"
                        : "bg-green-500 text-white"
                    }
                  >
                    {item.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <Button size="sm" variant="outline">查看</Button>
                  <Button size="sm">标记已处理</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
