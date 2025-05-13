import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Content", href: "/admin/content" },
  { label: "Tasks", href: "/admin/tasks" },
  { label: "Feedback", href: "/admin/feedback" },
  { label: "Settings", href: "/admin/settings" },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow h-full flex flex-col">
      <div className="flex items-center justify-center h-16 border-b">
        <Image src="/logo.svg" alt="Logo" width={32} height={32} className="mr-2" />
        <span className="font-bold text-lg">Peakway Panel</span>
      </div>
      <nav className="flex-1 p-4">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-3 py-2 rounded text-gray-700 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
