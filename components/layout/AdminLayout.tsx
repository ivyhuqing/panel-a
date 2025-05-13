import React from "react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </header>
      <div className="flex">
        <aside className="w-64 bg-white p-4 shadow-md">
          <nav>
            <ul className="space-y-2">
              <li><a href="/admin/content" className="text-blue-600 hover:underline">Content</a></li>
              <li><a href="/admin/assets" className="text-blue-600 hover:underline">Assets</a></li>
              <li><a href="/admin/users" className="text-blue-600 hover:underline">Users</a></li>
            </ul>
          </nav>
        </aside>
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};
