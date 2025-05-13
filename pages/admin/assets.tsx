// /admin/assets.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminLayout from '@/components/layouts/AdminLayout';

export default function AdminAssetsPage() {
  const [assets, setAssets] = useState<any[]>([]);
  const [tagsMap, setTagsMap] = useState<{ [key: string]: string[] }>({});
  const [categoryFilter, setCategoryFilter] = useState('');
  const [tagFilter, setTagFilter] = useState('');

  const fetchAssets = async () => {
    const query = supabase.from('supplier_assets').select('*').order('priority', { ascending: false });
    if (categoryFilter) query.eq('category', categoryFilter);
    const { data } = await query;
    if (data) {
      setAssets(data);
      const ids = data.map(a => a.id);
      const { data: tagsData } = await supabase.from('supplier_asset_tags').select('asset_id, tag').in('asset_id', ids);
      const map: { [key: string]: string[] } = {};
      tagsData?.forEach(t => {
        if (!map[t.asset_id]) map[t.asset_id] = [];
        map[t.asset_id].push(t.tag);
      });
      setTagsMap(map);
    }
  };

  useEffect(() => { fetchAssets(); }, [categoryFilter]);

  const updateField = async (id: string, field: string, value: any) => {
    await supabase.from('supplier_assets').update({ [field]: value }).eq('id', id);
    fetchAssets();
  };

  const getPreview = (filePath: string) => {
    const ext = filePath.split('.').pop()?.toLowerCase();
    const url = `https://satrrkhhycseksxxxjpu.supabase.co/storage/v1/object/public/supplier-files/${filePath}`;
    if (!ext) return '—';
    if (['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext)) {
      return <img src={url} alt="preview" className="w-20 h-14 object-cover rounded" />;
    } else if (['mp4', 'webm'].includes(ext)) {
      return (
        <video className="w-20 h-14 object-cover rounded" muted>
          <source src={url} type={`video/${ext}`} />
        </video>
      );
    } else {
      return <span className="text-xs text-gray-500">{ext.toUpperCase()}</span>;
    }
  };

  const handleAIScore = async (item: any) => {
    const res = await fetch('/api/ai-score', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: item.title, description: item.description })
    });
    const result = await res.json();
    if (result.score) {
      await updateField(item.id, 'score', result.score);
    }
  };

  const filteredAssets = assets.filter(asset => {
    if (!tagFilter) return true;
    const tags = tagsMap[asset.id] || [];
    return tags.some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()));
  });

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">Supplier Uploaded Content</h1>

      <div className="flex gap-4 mb-4">
        <select className="border p-2 rounded" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Manual">Product Manual</option>
          <option value="Video">Demo Video</option>
          <option value="Certificate">Certification</option>
          <option value="Other">Other</option>
        </select>

        <input
          type="text"
          placeholder="Filter by tag..."
          className="border p-2 rounded w-64"
          value={tagFilter}
          onChange={(e) => setTagFilter(e.target.value)}
        />
      </div>

      <table className="w-full border text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">封面</th>
            <th className="p-2 border">公司</th>
            <th className="p-2 border">分类</th>
            <th className="p-2 border">标题</th>
            <th className="p-2 border">推荐</th>
            <th className="p-2 border">优质</th>
            <th className="p-2 border">优先级</th>
            <th className="p-2 border">顺序</th>
            <th className="p-2 border">评分</th>
            <th className="p-2 border">备注</th>
          </tr>
        </thead>
        <tbody>
          {filteredAssets.map((a, idx) => (
            <tr key={idx} className="border align-top">
              <td className="p-2 border">{getPreview(a.file_path)}</td>
              <td className="p-2 border">{a.company_name}</td>
              <td className="p-2 border">{a.category}</td>
              <td className="p-2 border">{a.title}</td>
              <td className="p-2 border">
                <button onClick={() => updateField(a.id, 'is_featured', !a.is_featured)} className="text-xs px-2 py-1 bg-yellow-100 rounded">
                  {a.is_featured ? '推荐中' : '未推荐'}
                </button>
              </td>
              <td className="p-2 border">
                <button onClick={() => updateField(a.id, 'is_high_quality', !a.is_high_quality)} className="text-xs px-2 py-1 bg-green-100 rounded">
                  {a.is_high_quality ? '优质' : '—'}
                </button>
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  defaultValue={a.priority}
                  onBlur={(e) => updateField(a.id, 'priority', parseInt(e.target.value))}
                  className="w-16 border px-2 rounded"
                />
              </td>
              <td className="p-2 border">
                <input
                  type="number"
                  defaultValue={a.display_order || 0}
                  onBlur={(e) => updateField(a.id, 'display_order', parseInt(e.target.value))}
                  className="w-16 border px-2 rounded"
                />
              </td>
              <td className="p-2 border space-y-1">
                <input
                  type="number"
                  step="0.1"
                  defaultValue={a.score ?? 3.0}
                  onBlur={(e) => updateField(a.id, 'score', parseFloat(e.target.value))}
                  className="w-16 border px-2 text-sm"
                />
                <button
                  onClick={() => handleAIScore(a)}
                  className="block text-xs mt-1 text-blue-600 underline"
                >AI评分</button>
              </td>
              <td className="p-2 border">
                <textarea
                  defaultValue={a.admin_note || ''}
                  onBlur={(e) => updateField(a.id, 'admin_note', e.target.value)}
                  className="w-full border p-1 text-xs rounded"
                  rows={2}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}
