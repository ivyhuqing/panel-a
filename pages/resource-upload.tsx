// panel-a/pages/resource-upload.tsx - 素材上传页面（文档、图像、视频链接）

import Head from "next/head";
import { Button, Input } from "@/components/ui";

export default function ResourceUploadPage() {
  return (
    <>
      <Head>
        <title>素材上传区</title>
      </Head>

      <main className="bg-white min-h-screen p-10 text-text-main">
        <h1 className="text-2xl font-bold mb-6">📁 素材上传</h1>

        <form className="space-y-6 max-w-2xl">
          <div>
            <label className="block text-sm font-medium mb-1">素材名称</label>
            <Input placeholder="请输入文件标题或标识" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">素材分类</label>
            <select className="w-full border border-muted p-2 rounded-md text-sm">
              <option>产品文档</option>
              <option>图文海报</option>
              <option>视频内容</option>
              <option>认证资料</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">上传文件（本地）</label>
            <Input type="file" />
            <p className="text-xs text-muted-foreground mt-1">支持 PDF, PNG, JPG, MP4 等</p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">视频外链（可选）</label>
            <Input type="url" placeholder="https://example.com/video.mp4 或 YouTube 链接" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">备注说明（可选）</label>
            <textarea
              rows={4}
              className="w-full p-2 border border-muted rounded-md text-sm"
              placeholder="填写适用产品型号、展示建议、用途等..."
            />
          </div>

          <Button className="mt-4">📤 提交上传</Button>
        </form>
      </main>
    </>
  );
}
