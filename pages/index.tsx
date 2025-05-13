// panel-a/pages/index.tsx - 后台 A 首页入口（代理/供应商）

import Head from "next/head";
import Link from "next/link";
import { Button } from "../components/ui/button";
import { FeatureCard } from "../components/ui/FeatureCard";
import { GridBlock } from "../components/ui/GridBlock";
import { SectionContainer } from "../components/ui/SectionContainer";

export default function PanelAHome() {
  return (
    <>
      <Head>
        <title>后台 A - 内容管理与合作门户</title>
      </Head>
      <main className="bg-white text-text-main">

        {/* 顶部 Logo 与欢迎语 */}
        <section className="py-12 px-6 border-b border-muted">
          <h1 className="text-3xl font-bold mb-2">🎛️ 欢迎来到后台 A 门户</h1>
          <p className="text-text-subtle max-w-3xl">
            本平台面向内容上传方、代理商、分销伙伴，支持内容创建、社媒分发、代理资料管理与素材同步等多项功能。
          </p>
        </section>

        {/* 功能入口区块 */}
        <SectionContainer title="🧭 功能导航">
          <GridBlock>
            <Link href="/content-distribution">
              <FeatureCard title="内容分发中心" description="统一管理视频/图文内容并分发至各渠道平台" />
            </Link>
            <Link href="/agent-center">
              <FeatureCard title="代理商管理" description="分销商信息录入、审核、权限分配与资料下发" />
            </Link>
            <Link href="/resource-upload">
              <FeatureCard title="素材上传区" description="上传产品文档、海报图、视频链接等共享内容" />
            </Link>
            <Link href="/interaction-center">
              <FeatureCard title="客户互动记录" description="查看客户在平台上的留言与内容反馈" />
            </Link>
          </GridBlock>
        </SectionContainer>

        {/* CTA 区块 */}
        <section className="text-center py-20 bg-[#F9FAFB] border-t border-muted">
          <h2 className="text-2xl font-semibold mb-4">需要帮助或建议？</h2>
          <Button asChild>
            <Link href="/support">联系平台运营团队</Link>
          </Button>
        </section>

      </main>
    </>
  );
}