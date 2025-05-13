import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabaseClient";

export default function UploadNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleRecommendTags = async () => {
    const res = await fetch("/api/recommend-tags", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });
    const data = await res.json();
    if (Array.isArray(data.tags)) {
      // 不去重，可追加已有标签
      setTags((prev) => [...prev, ...data.tags]);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
    }
    setNewTag("");
  };

  const handleRemoveTag = (index: number) => {
    setTags((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file to upload");
    setUploading(true);

    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return alert("Not logged in");

    const filePath = `${user.id}/${Date.now()}_${file.name}`;
    const { error: storageError } = await supabase.storage
      .from("supplier-files")
      .upload(filePath, file);

    if (storageError) {
      alert("Upload failed");
      setUploading(false);
      return;
    }

    const { data: insertData, error } = await supabase
      .from("supplier_assets")
      .insert([
        {
          supplier_id: user.id,
          title,
          category,
          description,
          file_path: filePath,
        },
      ])
      .select();

    if (error || !insertData || insertData.length === 0) {
      alert("Failed to save metadata");
      setUploading(false);
      return;
    }

    const assetId = insertData[0].id;
    if (tags.length > 0) {
      const tagRows = tags.map((tag) => ({ asset_id: assetId, tag }));
      await supabase.from("supplier_asset_tags").insert(tagRows);
    }

    setUploading(false);
    router.push("/uploads");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-bold">Upload New Content</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              className="w-full border rounded p-2"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">File</label>
            <input type="file" onChange={handleFileChange} required />
          </div>

          {/* 标签推荐与管理区域 */}
          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Tags</label>
              <button
                type="button"
                onClick={handleRecommendTags}
                className="text-xs text-blue-600 underline"
              >
                🔍 Recommend (AI)
              </button>
            </div>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                className="flex-1 border rounded px-2 py-1 text-sm"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add custom tag..."
              />
              <button
                type="button"
                onClick={handleAddTag}
                className="text-xs bg-gray-200 px-3 py-1 rounded"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-gray-100 text-sm px-2 py-1 rounded-full flex items-center"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(idx)}
                    className="ml-1 text-xs text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </span>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
