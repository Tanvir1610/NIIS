'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Shield, Lock, Mail, ArrowRight } from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Store token and user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      // Redirect based on role
      router.push(data.redirectPath);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
              <Shield className="w-8 h-8" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
            <p className="text-foreground/60 mt-2">Secure access for conference administrators</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-border p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="admin@niis.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-foreground/80">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    required
                    className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              {error && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-1">
                  <Lock className="w-4 h-4" /> {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full py-6 text-lg font-semibold group"
              >
                {loading ? (
                  'Authenticating...'
                ) : (
                  <>
                    Sign In <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-border text-center">
              <p className="text-xs text-foreground/40">
                Authorized personnel only. All activities are logged.
              </p>

              {/* Demo Credentials Hint */}
              {/* <div className="mt-4 p-3 bg-blue-50 text-blue-800 text-xs rounded text-left space-y-1 font-mono">
                <p><strong>Demo Roles:</strong></p>
                <p>Convener: convener@niis.com / convener</p>
                <p>Accountant: accountant@niis.com / accountant</p>
                <p>Track: track@niis.com / track</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
