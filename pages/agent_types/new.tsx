import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { Button } from "../../components/ui/button";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function NewAgentTypesPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.from("agent_types").insert([{ name, description, status }]);
    if (!error) router.push("/agent_types");
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">➕ 新建 Agent Types</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full border p-2" value={name} onChange={(e) => setName(e.target.value)} placeholder="名称" required />
        <textarea className="w-full border p-2" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="描述" />
        <select className="w-full border p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">启用</option>
          <option value="inactive">停用</option>
        </select>
        <Button type="submit">提交</Button>
      </form>
    </div>
  );
}