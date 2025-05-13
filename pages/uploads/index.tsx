// /pages/uploads/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";
import { calculateRecommendationScore } from "@/lib/recommend";

export default function UploadListPage() {
  const router = useRouter();
  const [uploads, setUploads] = useState<any[]>([]);
  const [tagsMap, setTagsMap] = useState<{ [key: string]: string[] }>({});
  const [userId, setUserId] = useState("");
  const [copiedId, setCopiedId] = useState("");

  const [filterCategory, setFilterCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchUploads = async (uid: string) => {
    const { data } = await supabase.from("supplier_assets")
      .select("*")
      .eq("supplier_id", uid);
    if (data) {
      const enriched = data.map(item => ({
        ...item,
        _recommend: calculateRecommendationScore(item),
      })).sort((a, b) => b._recommend - a._recommend);

      setUploads(enriched);

      const ids = data.map(item => item.id);
      const { data: tagsData } = await supabase
        .from("supplier_asset_tags")
        .select("asset_id, tag")
        .in("asset_id", ids);
      const tagMap: { [key: string]: string[] } = {};
      tagsData?.forEach(t => {
        if (!tagMap[t.asset_id]) tagMap[t.asset_id] = [];
        tagMap[t.asset_id].push(t.tag);
      });
      setTagsMap(tagMap);
    }
  };

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return router.push("/supplier/login");
      setUserId(user.id);
      fetchUploads(user.id);
    });
  }, []);

  const getPreview = (filePath: string) => {
    const ext = filePath.split(".").pop()?.toLowerCase();
    const url = `https://satrrkhhycseksxxxjpu.supabase.co/storage/v1/object/public/supplier-files/${filePath}`;
    if (!ext) return "—";
    if (["jpg", "jpeg", "png", "webp", "gif"].includes(ext)) {
      return <img src={url} alt="preview" className="w-full h-36 object-cover rounded-t" />;
    } else if (["mp4", "webm"].includes(ext)) {
      return <video className="w-full h-36 object-cover rounded-t" muted>
        <source src={url} type={`video/${ext}`} />
      </video>;
    } else {
      return <div className="text-xs text-gray-500 px-2 py-4">{ext.toUpperCase()}</div>;
    }
  };

  const filtered = uploads.filter(item => {
    const tags = tagsMap[item.id] || [];
    const matchSearch =
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchCategory =
      filterCategory === "all" || item.category === filterCategory;
    return matchSearch && matchCategory;
  });

  const uniqueCategories = Array.from(new Set(uploads.map(u => u.category).filter(Boolean)));

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white shadow p-6 rounded-2xl">
        <h2 className="text-xl font-bold mb-4">My Uploaded Content</h2>

        {/* 筛选器区域 */}
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="border px-3 py-1 rounded text-sm"
          >
            <option value="all">All Categories</option>
            {uniqueCategories.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search title/description/tag..."
            className="border px-3 py-1 rounded text-sm w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* 卡片区域 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((item, idx) => (
            <div key={idx} className="border rounded-lg shadow hover:shadow-md transition">
              {getPreview(item.file_path)}
              <div className="p-3">
                <h3 className="font-medium text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 mb-2">{item.category}</p>
                <p className="text-xs line-clamp-2 mb-2">{item.description}</p>
                <a
                  href={`https://satrrkhhycseksxxxjpu.supabase.co/storage/v1/object/public/supplier-files/${item.file_path}`}
                  target="_blank"
                  className="text-xs text-blue-600 underline mr-4"
                >Preview</a>
                <button
                  onClick={() => router.push(`/uploads/edit/${item.id}`)}
                  className="text-xs text-green-700"
                >Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
