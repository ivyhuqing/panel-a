/* /pages/admin/tasks.tsx */
/* /pages/admin/tasks.tsx */
import { AdminLayout } from "@/components/layout/AdminLayout";
import { TaskBoard } from "@/components/tasks/TaskBoard";

export default function TasksPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Task Center</h1>
        <TaskBoard />
      </div>
    </AdminLayout>
  );
}