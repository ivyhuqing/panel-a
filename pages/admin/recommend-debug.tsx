// /admin/recommend-debug.tsx
import { useEffect, useState } from 'react';
import AdminLayout from '@/components/layouts/AdminLayout';
import { supabase } from '@/lib/supabaseClient';
import { calculateRecommendationScore } from '@/lib/recommend';

export default function RecommendDebugPage() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    async function fetchAssets() {
      const { data } = await supabase.from('supplier_assets').select('*');
      if (data) {
        const enriched = data.map(asset => ({
          ...asset,
          _recommend: calculateRecommendationScore(asset),
        })).sort((a, b) => b._recommend - a._recommend);
        setItems(enriched);
      }
    }
    fetchAssets();
  }, []);

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">推荐分值调试视图</h1>
        <table className="w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">标题</th>
              <th className="p-2 border">评分</th>
              <th className="p-2 border">推荐权重</th>
              <th className="p-2 border">是否推荐</th>
              <th className="p-2 border">浏览量</th>
              <th className="p-2 border">上传时间</th>
              <th className="p-2 border">推荐分</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, idx) => (
              <tr key={idx} className="border">
                <td className="p-2 border font-medium">{item.title}</td>
                <td className="p-2 border">{item.score ?? '-'}</td>
                <td className="p-2 border">{item.priority_score ?? 0}</td>
                <td className="p-2 border">{item.is_featured ? '✅' : '—'}</td>
                <td className="p-2 border">{item.views ?? 0}</td>
                <td className="p-2 border">{new Date(item.created_at).toLocaleDateString()}</td>
                <td className="p-2 border text-blue-600 font-semibold">{item._recommend}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
