// panel-a/pages/admin/logs.tsx - 操作日志审计页（记录系统敏感行为）

import Head from "next/head";
import { Badge, Button } from "@/components/ui";

const mockLogs = [
  {
    id: 1,
    user: "admin@system.io",
    action: "修改代理商权限",
    target: "agent-center",
    time: "2025-05-10 11:32",
    level: "高风险"
  },
  {
    id: 2,
    user: "supplier01@panel.com",
    action: "上传视频素材",
    target: "resource-upload",
    time: "2025-05-10 10:05",
    level: "普通"
  },
  {
    id: 3,
    user: "agent02@brand.io",
    action: "留言：请求开通产品页面权限",
    target: "interaction-center",
    time: "2025-05-09 20:13",
    level: "提醒"
  }
];

export default function AdminLogsPage() {
  return (
    <>
      <Head>
        <title>操作审计日志</title>
      </Head>

      <main className="bg-white min-h-screen p-10 text-text-main">
        <h1 className="text-2xl font-bold mb-6">📜 操作日志记录</h1>

        <div className="flex justify-end mb-4">
          <Button variant="outline" size="sm">导出 CSV</Button>
        </div>

        <table className="w-full border rounded-md overflow-hidden text-sm">
          <thead className="bg-[#F9FAFB] border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">操作用户</th>
              <th className="text-left px-4 py-3 font-medium">行为内容</th>
              <th className="text-left px-4 py-3 font-medium">模块</th>
              <th className="text-left px-4 py-3 font-medium">时间</th>
              <th className="text-left px-4 py-3 font-medium">级别</th>
            </tr>
          </thead>
          <tbody>
            {mockLogs.map((log) => (
              <tr key={log.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3">{log.user}</td>
                <td className="px-4 py-3">{log.action}</td>
                <td className="px-4 py-3">{log.target}</td>
                <td className="px-4 py-3">{log.time}</td>
                <td className="px-4 py-3">
                  <Badge
                    className={
                      log.level === "高风险"
                        ? "bg-red-500 text-white"
                        : log.level === "提醒"
                        ? "bg-yellow-400 text-white"
                        : "bg-gray-400 text-white"
                    }
                  >
                    {log.level}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
