// panel-a/pages/content-distribution.tsx
// 正式版内容分发模块页面结构（上传 + 分发状态 + 任务表）

import Head from "next/head";
import { Button, Badge } from "@/components/ui";
import Link from "next/link";

export default function ContentDistributionPage() {
  const mockTasks = [
    { id: 1, title: "新品短视频介绍", platform: "TikTok", status: "已分发" },
    { id: 2, title: "代理政策图文海报", platform: "微信公众号", status: "待分发" },
    { id: 3, title: "产品测评视频", platform: "YouTube", status: "失败" },
  ];

  return (
    <>
      <Head>
        <title>内容分发中心</title>
      </Head>

      <main className="p-8 bg-white min-h-screen">
        <h1 className="text-2xl font-bold mb-6">📤 内容分发任务中心</h1>

        {/* 操作区：上传 + 历史查看 */}
        <div className="flex items-center justify-between mb-6">
          <Button asChild>
            <Link href="/content-distribution/upload">➕ 创建新任务</Link>
          </Button>
          <Button variant="outline" size="sm">查看历史记录</Button>
        </div>

        {/* 分发任务表格 */}
        <table className="w-full border rounded-md overflow-hidden text-sm">
          <thead className="bg-[#F9FAFB] border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">内容标题</th>
              <th className="text-left px-4 py-3 font-medium">目标平台</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockTasks.map((task) => (
              <tr key={task.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{task.title}</td>
                <td className="px-4 py-3">{task.platform}</td>
                <td className="px-4 py-3">
                  <Badge
                    className={
                      task.status === "已分发"
                        ? "bg-green-500 text-white"
                        : task.status === "失败"
                        ? "bg-red-500 text-white"
                        : "bg-yellow-400 text-white"
                    }
                  >
                    {task.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <Button size="sm" variant="outline">详情</Button>
                  <Button size="sm">重试</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
