// panel-a/pages/dev-ui-preview.tsx

import Head from "next/head";
import {
  Button,
  GridBlock,
  SectionContainer,
  FeatureCard
} from "@/components/ui";

export default function DevUiPreviewPage() {
  return (
    <>
      <Head>
        <title>UI 组件验证页</title>
      </Head>
      <main className="bg-white text-text-main min-h-screen">
        <SectionContainer title="🔍 UI 组件验证预览">
          <Button className="mb-4">测试按钮</Button>

          <GridBlock>
            <FeatureCard
              title="组件导出成功"
              description="说明你已经配置好 index.ts，路径别名也正确"
            />
            <FeatureCard
              title="路径 @/components/ui 生效"
              description="项目中可以统一引用，无需一个个写路径"
            />
            <FeatureCard
              title="样式渲染正常"
              description="说明 Tailwind + PostCSS 也正确配置并生效"
            />
          </GridBlock>
        </SectionContainer>
      </main>
    </>
  );
}
