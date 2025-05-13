/* /pages/admin/content.tsx */
import { AdminLayout } from "@/components/layout/AdminLayout";
import { ContentForm } from "@/components/content/ContentForm";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { PanelCard } from "@/components/ui/PanelCard";

export default function ContentPage() {
  return (
    <AdminLayout>
      <div className="p-6">
        <SectionTitle>Content Management</SectionTitle>
        <PanelCard>
          <ContentForm />
        </PanelCard>
      </div>
    </AdminLayout>
  );
}