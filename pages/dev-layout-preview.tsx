// panel-a/pages/dev-layout-preview.tsx
// 用于测试布局排版、留白、色块、边框、字体规范等视觉风格

import Head from "next/head";
import { SectionContainer } from "@/components/ui";
import { Button } from "@/components/ui";

export default function DevLayoutPreview() {
  return (
    <>
      <Head>
        <title>布局与留白预览</title>
      </Head>
      <main className="bg-[#F9FAFB] text-text-main min-h-screen">
        <SectionContainer title="📐 栅格留白测试">
          <div className="border rounded-lg p-6 bg-white shadow-sm max-w-4xl mx-auto">
            <p className="text-base leading-relaxed tracking-wide">
              本段文字用于测试字体节奏、行距（leading）、字间距（tracking）与内容块宽度。主内容区建议 max-w-3xl 或 max-w-4xl，卡片块可 shadow-md，标题文字建议 text-2xl 或以上。
            </p>
          </div>
        </SectionContainer>

        <SectionContainer title="🎨 颜色方案测试">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="rounded-lg p-4 bg-[#0A2540] text-white">主色蓝 #0A2540</div>
            <div className="rounded-lg p-4 bg-[#1B365D] text-white">主色浅 #1B365D</div>
            <div className="rounded-lg p-4 bg-[#2FB67C] text-white">CTA绿色 #2FB67C</div>
            <div className="rounded-lg p-4 bg-[#E6F4F1] text-text-main">辅助浅蓝 #E6F4F1</div>
            <div className="rounded-lg p-4 bg-[#F9FAFB] border text-text-subtle">背景留白 #F9FAFB</div>
            <div className="rounded-lg p-4 border text-text-subtle">中性灰 #8A8F98</div>
          </div>
        </SectionContainer>

        <SectionContainer title="📏 按钮 & 间距规范">
          <div className="space-x-4">
            <Button>标准按钮</Button>
            <Button variant="outline">描边按钮</Button>
            <Button className="px-8 py-4 text-lg">加大按钮</Button>
          </div>
        </SectionContainer>
      </main>
    </>
  );
}
