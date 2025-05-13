// panel-a/pages/admin/system.tsx - 平台参数设置页（基本信息 + 模式配置 + 密钥）

import Head from "next/head";
import { Button, Input } from "@/components/ui";

export default function AdminSystemPage() {
  return (
    <>
      <Head>
        <title>平台基础配置</title>
      </Head>

      <main className="bg-white min-h-screen p-10 text-text-main">
        <h1 className="text-2xl font-bold mb-6">🛠️ 平台参数设置</h1>

        <form className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-1">平台名称</label>
            <Input placeholder="请输入系统名称，如 Peakway Agent Console" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Logo 文件上传</label>
            <Input type="file" />
            <p className="text-xs text-muted-foreground mt-1">推荐尺寸：240x64，支持 PNG/SVG</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">运营模式</label>
            <select className="w-full border border-muted p-2 rounded-md text-sm">
              <option>私有部署（自定义域名 + 独立账号）</option>
              <option>多租户 SaaS 模式</option>
              <option>代理商模式（内容/账号联动）</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">OpenAI API Key</label>
            <Input type="password" placeholder="sk-..." />
            <p className="text-xs text-muted-foreground">用于内容生成、邮件草稿、关键词抽取等功能</p>
          </div>

          <Button className="mt-4">💾 保存设置</Button>
        </form>
      </main>
    </>
  );
}
