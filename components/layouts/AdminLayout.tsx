// /components/layouts/AdminLayout.tsx
import { AdminLayout } from "@/components/layout/AdminLayout";
import Link from 'next/link';
import { ReactNode } from 'react';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <h2 className="text-lg font-bold mb-4">后台管理</h2>
        <nav className="flex flex-col space-y-2">
          <Link href="/admin/assets" className="text-sm hover:underline">
            内容管理
          </Link>
          <Link href="/admin/sort-assets" className="text-sm hover:underline">
            拖拽排序
          </Link>
          <Link href="/admin/recommend-debug" className="text-sm hover:underline">
          推荐分调试
          </Link>

        </nav>
      </aside>
      <main className="flex-1 p-6 bg-white">
        {children}
      </main>
    </div>
  );
}
