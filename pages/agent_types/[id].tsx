import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function AgentTypesDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const { data } = await supabase.from("agent_types").select("*").eq("id", id).single();
      if (data) setItem(data);
    };
    fetchData();
  }, [id]);

  if (!item) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Agent Types 详情</h1>
      <div className="space-y-2 bg-white p-4 border rounded shadow">
        <h2 className="text-xl font-semibold">{item.name}</h2>
        <p>{item.description}</p>
        <Badge variant="outline">{item.status}</Badge>
        <Button onClick={() => router.push(`/agent_types/edit/{item.id}`)}>编辑</Button>
      </div>
    </div>
  );
}