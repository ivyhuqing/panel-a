import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "../../../components/ui/button";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function EditSuppliersPage() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      const { data } = await supabase.from("suppliers").select("*").eq("id", id).single();
      if (data) {
        setName(data.name);
        setDescription(data.description);
        setStatus(data.status);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdate = async (e: any) => {
    e.preventDefault();
    const { error } = await supabase.from("suppliers").update({ name, description, status }).eq("id", id);
    if (!error) router.push(`/suppliers/{id}`);
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">✏️ 编辑 Suppliers</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input className="w-full border p-2" value={name} onChange={(e) => setName(e.target.value)} required />
        <textarea className="w-full border p-2" value={description} onChange={(e) => setDescription(e.target.value)} />
        <select className="w-full border p-2" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">启用</option>
          <option value="inactive">停用</option>
        </select>
        <Button type="submit">保存</Button>
      </form>
    </div>
  );
}