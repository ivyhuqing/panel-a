// 📁 文件路径：panel-a/pages/distributor/dashboard.tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function DistributorDashboard() {
  const router = useRouter();
  const [company, setCompany] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return router.push('/distributor/login');
      setEmail(user.email);
      const { data, error } = await supabase.from('distributor_profile').select('company_name').eq('user_id', user.id).single();
      if (data) setCompany(data.company_name);
    });
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/distributor/login');
  };

  return (
    <div className="p-8">
      <h2 className="text-xl font-bold mb-2">Welcome to Distributor Dashboard</h2>
      {company && <p className="mb-1">Company: {company}</p>}
      {email && <p className="mb-4">Email: {email}</p>}
      <button onClick={handleLogout} className="bg-gray-200 rounded px-4 py-1 text-sm">Logout</button>
    </div>
  );
}
