// panel-a/pages/admin/index.tsx - 系统管理员首页（设置导航入口）

import Head from "next/head";
import Link from "next/link";
import { FeatureCard, GridBlock, SectionContainer } from "@/components/ui";

export default function AdminHomePage() {
  return (
    <>
      <Head>
        <title>后台管理员中心</title>
      </Head>

      <main className="bg-white min-h-screen text-text-main">
        <SectionContainer title="🔐 系统后台管理中心">
          <p className="text-muted-foreground mb-8 max-w-2xl">
            本页面用于管理平台权限结构、角色控制、日志审计与系统配置等模块。
          </p>

          <GridBlock>
            <Link href="/admin/settings">
              <FeatureCard title="权限配置" description="管理角色定义、字段权限、模块访问范围" />
            </Link>
            <Link href="/admin/logs">
              <FeatureCard title="操作日志" description="记录后台用户所有敏感操作，支持回溯与导出" />
            </Link>
            <Link href="/admin/system">
              <FeatureCard title="平台设置" description="设置平台名称、Logo、运营模式、API密钥等" />
            </Link>
          </GridBlock>
        </SectionContainer>
      </main>
    </>
  );
}
