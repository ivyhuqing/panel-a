// 📁 文件路径：panel-a/pages/admin/users.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import AdminLayout from '@/components/layouts/AdminLayout';

export default function AdminUserList() {
  const [agents, setAgents] = useState<any[]>([]);
  const [distributors, setDistributors] = useState<any[]>([]);

  const fetchData = async () => {
    const { data: agentData } = await supabase.from('agent_profile').select('*');
    const { data: distributorData } = await supabase.from('distributor_profile').select('*');
    if (agentData) setAgents(agentData);
    if (distributorData) setDistributors(distributorData);
  };

  const toggleField = async (table: string, id: string, field: string, value: boolean) => {
    await supabase.from(table).update({ [field]: !value }).eq('id', id);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Admin: User Overview</h1>

      <h2 className="text-xl font-semibold mt-4 mb-2">📦 Agents</h2>
      <table className="w-full mb-6 border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Approved</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((a, idx) => (
            <tr key={idx} className="border">
              <td className="p-2 border">{a.company_name}</td>
              <td className="p-2 border">{a.email}</td>
              <td className="p-2 border">{a.is_approved ? 'Yes' : 'No'}</td>
              <td className="p-2 border">{a.is_active ? 'Yes' : 'No'}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => toggleField('agent_profile', a.id, 'is_approved', a.is_approved)}
                        className="px-2 py-1 bg-blue-100 rounded">Toggle Approve</button>
                <button onClick={() => toggleField('agent_profile', a.id, 'is_active', a.is_active)}
                        className="px-2 py-1 bg-red-100 rounded">Toggle Active</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 className="text-xl font-semibold mt-4 mb-2">🛒 Distributors</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2 border">Company</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Approved</th>
            <th className="p-2 border">Active</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {distributors.map((d, idx) => (
            <tr key={idx} className="border">
              <td className="p-2 border">{d.company_name}</td>
              <td className="p-2 border">{d.email}</td>
              <td className="p-2 border">{d.is_approved ? 'Yes' : 'No'}</td>
              <td className="p-2 border">{d.is_active ? 'Yes' : 'No'}</td>
              <td className="p-2 border space-x-2">
                <button onClick={() => toggleField('distributor_profile', d.id, 'is_approved', d.is_approved)}
                        className="px-2 py-1 bg-blue-100 rounded">Toggle Approve</button>
                <button onClick={() => toggleField('distributor_profile', d.id, 'is_active', d.is_active)}
                        className="px-2 py-1 bg-red-100 rounded">Toggle Active</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </AdminLayout>
  );
}

