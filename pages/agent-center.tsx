// panel-a/pages/agent-center.tsx - 代理商管理页面（展示、操作、后续可对接CRM）

import Head from "next/head";
import { Button, Badge } from "@/components/ui";

const mockAgents = [
  { id: 1, company: "深圳市优联科技", contact: "王先生", level: "A", status: "活跃" },
  { id: 2, company: "上海智贸有限公司", contact: "刘女士", level: "B", status: "待审核" },
  { id: 3, company: "广州未来网络", contact: "陈经理", level: "C", status: "冻结" },
];

export default function AgentCenterPage() {
  return (
    <>
      <Head>
        <title>代理商管理中心</title>
      </Head>

      <main className="bg-white min-h-screen p-10 text-text-main">
        <h1 className="text-2xl font-bold mb-6">🤝 代理商管理中心</h1>

        {/* 操作按钮 */}
        <div className="flex justify-between items-center mb-6">
          <Button>➕ 新建代理商</Button>
          <Button variant="outline" size="sm">导入 Excel 表格</Button>
        </div>

        {/* 表格展示代理商列表 */}
        <table className="w-full border rounded-md overflow-hidden text-sm">
          <thead className="bg-[#F9FAFB] border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">公司名称</th>
              <th className="text-left px-4 py-3 font-medium">联系人</th>
              <th className="text-left px-4 py-3 font-medium">等级</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {mockAgents.map((agent) => (
              <tr key={agent.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{agent.company}</td>
                <td className="px-4 py-3">{agent.contact}</td>
                <td className="px-4 py-3">{agent.level}</td>
                <td className="px-4 py-3">
                  <Badge
                    className={
                      agent.status === "活跃"
                        ? "bg-green-500 text-white"
                        : agent.status === "冻结"
                        ? "bg-gray-400 text-white"
                        : "bg-yellow-400 text-white"
                    }
                  >
                    {agent.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 space-x-2">
                  <Button size="sm" variant="outline">查看</Button>
                  <Button size="sm">编辑</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
