export function FeatureCard({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-muted p-6 shadow-sm hover:shadow-md transition bg-white">
      <h3 className="text-xl font-semibold mb-2 text-text-main">{title}</h3>
      <p className="text-sm text-text-subtle">{description}</p>
    </div>
  );
}
