// 📁 文件路径：panel-a/pages/admin/dashboard.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminLayout from '@/components/layouts/AdminLayout';

export default function AdminDashboard() {
  const [agentCount, setAgentCount] = useState<number>(0);
  const [distributorCount, setDistributorCount] = useState<number>(0);

  useEffect(() => {
    const fetchCounts = async () => {
      const { count: aCount } = await supabase.from('agent_profile').select('*', { count: 'exact', head: true });
      const { count: dCount } = await supabase.from('distributor_profile').select('*', { count: 'exact', head: true });
      if (typeof aCount === 'number') setAgentCount(aCount);
      if (typeof dCount === 'number') setDistributorCount(dCount);
    };
    fetchCounts();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Agent Count</h2>
          <p className="text-3xl text-blue-600">{agentCount}</p>
        </div>
        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg font-semibold mb-2">Distributor Count</h2>
          <p className="text-3xl text-green-600">{distributorCount}</p>
        </div>
      </div>
    </AdminLayout>
  );
}