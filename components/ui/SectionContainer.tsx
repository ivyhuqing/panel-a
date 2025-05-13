export function SectionContainer({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="px-6 py-16 space-y-6">
      {title && <h2 className="text-3xl font-bold text-text-main mb-4">{title}</h2>}
      <div>{children}</div>
    </section>
  );
}
