import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function EditUploadPage() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      const { data: asset } = await supabase
        .from("supplier_assets")
        .select("*")
        .eq("id", id)
        .single();

      const { data: tagData } = await supabase
        .from("supplier_asset_tags")
        .select("tag")
        .eq("asset_id", id);

      if (asset) {
        setTitle(asset.title);
        setCategory(asset.category);
        setDescription(asset.description);
      }
      if (tagData) {
        setTags(tagData.map(t => t.tag));
      }

      setLoading(false);
    };

    fetchData();
  }, [id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    await supabase
      .from("supplier_assets")
      .update({ title, category, description })
      .eq("id", id);

    await supabase.from("supplier_asset_tags").delete().eq("asset_id", id);

    if (tags.length > 0) {
      const tagRows = tags.map(tag => ({ asset_id: id, tag }));
      await supabase.from("supplier_asset_tags").insert(tagRows);
    }

    router.push("/uploads");
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
    }
    setNewTag("");
  };

  const handleRemoveTag = (index: number) => {
    setTags(prev => prev.filter((_, i) => i !== index));
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-xl mx-auto bg-white shadow p-6 rounded-xl space-y-4">
        <h2 className="text-xl font-bold">Edit Upload</h2>
        <form onSubmit={handleSave} className="space-y-4">
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

          {/* 标签编辑区 */}
          <div>
            <label className="text-sm font-medium">Tags</label>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                className="flex-1 border rounded px-2 py-1 text-sm"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Add tag..."
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
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}
