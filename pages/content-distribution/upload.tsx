// panel-a/pages/content-distribution/upload.tsx
// 创建新内容分发任务页面：填写标题 + 类型 + 平台 + 附件上传

import Head from "next/head";
import { Button, Input } from "@/components/ui";

export default function ContentUploadPage() {
  return (
    <>
      <Head>
        <title>创建内容分发任务</title>
      </Head>
      <main className="bg-white min-h-screen p-10 text-text-main">
        <h1 className="text-2xl font-bold mb-6">➕ 创建分发任务</h1>

        <form className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-1">内容标题</label>
            <Input placeholder="请输入图文或视频标题" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">内容类型</label>
            <select className="w-full border border-muted p-2 rounded-md text-sm">
              <option>图文</option>
              <option>视频</option>
              <option>PDF文档</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">目标平台</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>微信公众号</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>LinkedIn</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>YouTube</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>TikTok</span>
              </label>
              <label className="inline-flex items-center space-x-2">
                <input type="checkbox" className="h-4 w-4" />
                <span>Facebook</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">上传文件或链接</label>
            <Input type="file" />
            <p className="text-xs text-muted-foreground mt-1">支持 PDF、MP4、PNG、JPG、链接等格式</p>
          </div>

          <Button className="mt-4">提交任务</Button>
        </form>
      </main>
    </>
  );
}
