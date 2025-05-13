// panel-a/pages/admin/settings.tsx - 系统权限配置页（角色管理 + 平台设置）

import Head from "next/head";
import { Button, Badge } from "@/components/ui";

const roles = [
  { name: "管理员", code: "admin", permissions: ["全站访问", "用户管理", "系统配置"], status: "启用" },
  { name: "内容上传方", code: "supplier", permissions: ["内容创建", "素材上传"], status: "启用" },
  { name: "代理商", code: "agent", permissions: ["查看产品", "提交需求"], status: "禁用" }
];

export default function AdminSettingsPage() {
  return (
    <>
      <Head>
        <title>系统设置与权限管理</title>
      </Head>

      <main className="bg-white min-h-screen p-10 text-text-main">
        <h1 className="text-2xl font-bold mb-6">⚙️ 系统设置与权限管理</h1>

        {/* 操作按钮 */}
        <div className="flex justify-between items-center mb-6">
          <Button>➕ 新建角色</Button>
          <Button variant="outline" size="sm">导出配置</Button>
        </div>

        {/* 角色权限表格 */}
        <table className="w-full border rounded-md overflow-hidden text-sm">
          <thead className="bg-[#F9FAFB] border-b">
            <tr>
              <th className="text-left px-4 py-3 font-medium">角色名称</th>
              <th className="text-left px-4 py-3 font-medium">权限内容</th>
              <th className="text-left px-4 py-3 font-medium">状态</th>
              <th className="text-left px-4 py-3 font-medium">操作</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((r) => (
              <tr key={r.code} className="border-b hover:bg-gray-50">
                <td className="px-4 py-3 font-medium">{r.name}</td>
                <td className="px-4 py-3">
                  <ul className="list-disc list-inside text-muted-foreground">
                    {r.permissions.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3">
                <Badge label={r.status} color={
  r.status === "启用" ? "green" :
  r.status === "停用" ? "red" :
  "gray"
} />

                </td>
                <td className="px-4 py-3 space-x-2">
                  <Button size="sm">编辑</Button>
                  <Button size="sm" variant="outline">禁用</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
