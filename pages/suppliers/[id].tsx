import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function SuppliersDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [suppliers, setData] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const { data } = await supabase.from("suppliers").select("*").eq("id", id).single();
      if (data) setData(data);
    };
    fetchData();
  }, [id]);

  if (!suppliers) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Suppliers 详情</h1>
      <div className="space-y-2 bg-white p-4 border rounded shadow">
        <h2 className="text-xl font-semibold">{suppliers.name}</h2>
        <p>{suppliers.description}</p>
        <Badge variant="outline">{suppliers.status}</Badge>
        <Button onClick={() => router.push(`/suppliers/edit/{suppliers.id}`)}>编辑</Button>
      </div>
    </div>
  );
}