// panel-a/pages/dev-table-preview.tsx
// 表格 + 分页 + 状态标签列表展示页（适用于互动记录、任务中心、素材管理等）

import Head from "next/head";
import { Badge, Button } from "@/components/ui";

const mockData = [
  { id: 1, name: "视频介绍A", type: "视频", status: "已发布" },
  { id: 2, name: "产品图册B", type: "图文", status: "待审核" },
  { id: 3, name: "代理手册C", type: "PDF", status: "草稿" },
  { id: 4, name: "宣传短片D", type: "视频", status: "已发布" },
];

export default function DevTablePreview() {
  return (
    <>
      <Head>
        <title>表格展示预览</title>
      </Head>
      <main className="bg-white min-h-screen p-10 text-text-main">
        <h1 className="text-2xl font-bold mb-6">📊 素材列表（Table + 状态 + 操作按钮）</h1>

        <table className="w-full border rounded-md overflow-hidden text-sm">
          <thead className="bg-[#F9FAFB] border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">素材名称</th>
              <th className="text-left px-4 py-3 font-medium">类型</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{item.name}</td>
                <td className="px-4 py-3">{item.type}</td>
                <td className="px-4 py-3">
                  <Badge className={
                    item.status === "已发布" ? "bg-green-500 text-white" :
                    item.status === "待审核" ? "bg-yellow-400 text-white" :
                    "bg-gray-300 text-gray-800"
                  }>
                    {item.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <Button size="sm">查看</Button>
                  <Button size="sm" variant="outline">编辑</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* 分页模拟 */}
        <div className="flex justify-end mt-6 space-x-2">
          <Button variant="outline" size="sm">上一页</Button>
          <Button size="sm">下一页</Button>
        </div>
      </main>
    </>
  );
}
