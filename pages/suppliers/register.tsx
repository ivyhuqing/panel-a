// 📁 文件路径：panel-a/pages/supplier/register.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/lib/supabaseClient';

export default function SupplierRegister() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data: signupData, error: signupError } = await supabase.auth.signUp({ email, password });
    if (signupError) return setError(signupError.message);

    const userId = signupData.user?.id;
    if (userId) {
      const { error: profileError } = await supabase.from('supplier_profile').insert([
        { user_id: userId, email, company_name: companyName }
      ]);
      if (profileError) return setError(profileError.message);
    }
    setSuccess(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-gray-50">
      <form onSubmit={handleRegister} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Supplier Registration</h2>
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && (
          <p className="text-green-600 text-sm mb-4">
            Registration successful! Please wait for administrator approval before login.
          </p>
        )}
        {!success && <>
          <input type="text" placeholder="Company Name" className="w-full p-3 mb-4 border rounded-xl"
                 value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          <input type="email" placeholder="Email" className="w-full p-3 mb-4 border rounded-xl"
                 value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" className="w-full p-3 mb-6 border rounded-xl"
                 value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded-xl">
            Register
          </button>
        </>}
      </form>
    </div>
  );
}