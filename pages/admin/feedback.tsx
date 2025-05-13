/* /pages/admin/feedback.tsx */
import { AdminLayout } from "@/components/layout/AdminLayout";
import { FeedbackPanel } from "@/components/feedback/FeedbackPanel";

export default function FeedbackPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Feedback & Support</h1>
        <FeedbackPanel />
      </div>
    </AdminLayout>
  );
}