'use client';

import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { apiFetch } from '@/lib/api';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning('Tafadhali jaza taarifa zote.');
      return;
    }

    setLoading(true);

    try {
      const data = await apiFetch('/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (data.error) {
        toast.error(data.message || 'Taarifa za kuingia si sahihi.');
        return;
      }

      const { token, user } = data;

      if (!token || !user?.id) {
        toast.error('Login haikufanikiwa. Hakikisha taarifa zako.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('user_id', user.id.toString());

      const role = user.role?.toLowerCase()?.trim();
      const redirectMap: Record<string, string> = {
        admin: '/admin',
        katibu: '/katibu',
        'mtunza hazina': '/treasurer',
        mchungaji: '/mchungaji',
        kiongozi: '/group-leader',
        mshirika: '/member',
      };

      const redirect = redirectMap[role || ''];
      if (redirect) {
        await router.push(redirect);
      } else {
        toast.warning(`Hujapangiwa jukumu "${user.role}".`);
      }
    } catch (err) {
      toast.error('Tatizo la mfumo. Jaribu tena.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Ingia | FPCT Mahali Pamoja</title>
      </Head>

      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        {/* Card with same gradient as Home */}
        <div className="w-full max-w-md bg-gradient-to-br from-[#130728] via-[#211a45] to-[#253266] rounded-3xl shadow-2xl border border-white/10 p-8 text-white">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-[#f0ce32] rounded-full p-3">
              <span className="text-black font-bold text-xl">FPCT KURASINI</span>
            </div>

            <h2 className="mt-4 text-2xl font-bold text-center">
              Mfumo wa FPCT Kurasini
            </h2>
            <p className="text-sm text-gray-300 text-center mt-2">
              Karibu katika mfumo wa taarifa za washirika, wageni, fedha, matukio na uongozi wa kanisa.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email ya mtumiaji"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#2d314b] text-white rounded-lg focus:outline-none placeholder-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Neno la siri"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#2d314b] text-white rounded-lg focus:outline-none placeholder-gray-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#f0ce32] rounded-lg font-semibold text-black shadow-lg hover:scale-105 hover:shadow-xl transition-all"
            >
              {loading ? 'Inapakia...' : 'INGIA KWENYE MFUMO'}
            </button>
          </form>

          {/* Back to Home + Register */}
          <div className="mt-6 flex flex-col items-center gap-3">
            <p className="text-sm text-gray-300">
              Huna akaunti?{' '}
              <a href="/register" className="text-[#f0ce32] underline font-medium">
                Jisajili hapa
              </a>
            </p>
            <Link
              href="/"
              className="text-sm font-medium text-[#f0ce32] hover:underline"
            >
              ← Rudi Nyumbani
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}