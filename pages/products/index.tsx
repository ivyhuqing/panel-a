import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { useRouter } from "next/router";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

interface Item {
  id: string;
  name: string;
  description: string;
  status: string;
  created_at: string;
}

export default function ProductsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
      if (!error && data) setItems(data);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products Center</h1>
        <Button onClick={() => router.push("/products/new")}>新增</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => router.push(`/products/{item.id}`)}
          >
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p className="text-sm text-gray-500">{item.description}</p>
            <div className="mt-2 flex justify-between text-xs text-gray-500">
              <Badge variant="outline">{item.status}</Badge>
              <span>{new Date(item.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
