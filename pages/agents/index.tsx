import React from "react";
import { PanelCard } from "@/components/ui/PanelCard";
import { Button } from "@/components/ui/button";

const features = [
  {
    title: "Upload Center",
    description: "Manage your uploaded certifications, specs and documents.",
    href: "/uploads",
  },
  {
    title: "Lead Tracking",
    description: "Track clients interested in your products.",
    href: "/leads",
  },
  {
    title: "Product Center",
    description: "Maintain and publish your product offerings.",
    href: "/product",
  },
  {
    title: "User Logs",
    description: "Check your recent system actions and history.",
    href: "/user_logs",
  },
];

export default function AgentDashboard() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to Supplier Panel</h1>
      <p className="text-gray-600 mb-6">Choose a module to get started:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {features.map((f, idx) => (
          <PanelCard key={idx} title={f.title} description={f.description}>
            <Button onClick={() => (window.location.href = f.href)}>Enter</Button>
          </PanelCard>
        ))}
      </div>
    </div>
  );
}

