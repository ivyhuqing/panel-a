// panel-a/pages/dev-form-preview.tsx
// 表单输入组件样式测试页：输入框、复选框、下拉、文本域

import Head from "next/head";
import { Input, Button } from "@/components/ui";

export default function DevFormPreview() {
  return (
    <>
      <Head>
        <title>表单样式预览</title>
      </Head>
      <main className="bg-white text-text-main min-h-screen p-10 space-y-12">
        <section>
          <h2 className="text-2xl font-bold mb-4">📥 基础输入 Input</h2>
          <div className="space-y-4 max-w-md">
            <Input placeholder="请输入您的姓名" />
            <Input type="email" placeholder="请输入邮箱地址" />
            <Input type="password" placeholder="请输入密码" />
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">📝 文本域 Textarea</h2>
          <textarea
            rows={5}
            placeholder="请输入详细描述..."
            className="w-full max-w-md p-3 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary text-sm"
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">🔘 复选框 Checkbox</h2>
          <label className="inline-flex items-center space-x-2">
            <input type="checkbox" className="w-4 h-4 text-primary border-muted rounded" />
            <span className="text-sm">我已阅读并同意服务条款</span>
          </label>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">⬇️ 下拉菜单 Select</h2>
          <select className="w-full max-w-xs p-2 border border-muted rounded-md text-sm">
            <option>请选择一个选项</option>
            <option>企业客户</option>
            <option>代理商</option>
            <option>系统集成商</option>
          </select>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">🚀 提交按钮</h2>
          <Button className="px-6 py-3">提交表单</Button>
        </section>
      </main>
    </>
  );
}
