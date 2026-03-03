'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, Users, UserCheck, CreditCard, TrendingUp } from 'lucide-react';

interface Participant {
  id: string;
  name: string;
  email: string;
  type: 'student' | 'professional';
  registrationType: 'standard' | 'premium' | 'student';
  paymentStatus: 'paid' | 'pending' | 'failed';
  amount: number;
  registeredDate: string;
}

const DEMO_DATA: Participant[] = [
  { id: '1', name: 'Aarav Kumar', email: 'aarav@example.com', type: 'student', registrationType: 'student', paymentStatus: 'paid', amount: 1500, registeredDate: '2024-01-15' },
  { id: '2', name: 'Priya Sharma', email: 'priya@example.com', type: 'professional', registrationType: 'premium', paymentStatus: 'paid', amount: 5000, registeredDate: '2024-01-12' },
  { id: '3', name: 'Rohan Patel', email: 'rohan@example.com', type: 'student', registrationType: 'standard', paymentStatus: 'pending', amount: 2500, registeredDate: '2024-01-18' },
  { id: '4', name: 'Anjali Singh', email: 'anjali@example.com', type: 'professional', registrationType: 'standard', paymentStatus: 'paid', amount: 2500, registeredDate: '2024-01-10' },
  { id: '5', name: 'Vikram Reddy', email: 'vikram@example.com', type: 'student', registrationType: 'student', paymentStatus: 'paid', amount: 1500, registeredDate: '2024-01-20' },
  { id: '6', name: 'Neha Gupta', email: 'neha@example.com', type: 'professional', registrationType: 'premium', paymentStatus: 'paid', amount: 5000, registeredDate: '2024-01-08' },
  { id: '7', name: 'Arjun Desai', email: 'arjun@example.com', type: 'student', registrationType: 'standard', paymentStatus: 'failed', amount: 2500, registeredDate: '2024-01-16' },
  { id: '8', name: 'Divya Nair', email: 'divya@example.com', type: 'professional', registrationType: 'standard', paymentStatus: 'paid', amount: 2500, registeredDate: '2024-01-14' },
  { id: '9', name: 'Harsh Verma', email: 'harsh@example.com', type: 'student', registrationType: 'student', paymentStatus: 'paid', amount: 1500, registeredDate: '2024-01-19' },
  { id: '10', name: 'Meera Iyer', email: 'meera@example.com', type: 'professional', registrationType: 'premium', paymentStatus: 'paid', amount: 5000, registeredDate: '2024-01-11' },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>(DEMO_DATA);
  const [filter, setFilter] = useState<'all' | 'student' | 'professional'>('all');

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth');
    if (!auth) {
      router.push('/admin/login');
    } else {
      setIsAuthorized(true);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminAuth');
    router.push('/admin/login');
  };

  const filteredParticipants = filter === 'all' ? participants : participants.filter(p => p.type === filter);

  const stats = {
    total: participants.length,
    students: participants.filter(p => p.type === 'student').length,
    professionals: participants.filter(p => p.type === 'professional').length,
    paid: participants.filter(p => p.paymentStatus === 'paid').length,
    pending: participants.filter(p => p.paymentStatus === 'pending').length,
    failed: participants.filter(p => p.paymentStatus === 'failed').length,
    totalRevenue: participants.filter(p => p.paymentStatus === 'paid').reduce((sum, p) => sum + p.amount, 0),
  };

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <header className="bg-white border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-primary">Admin Dashboard</h1>
            <p className="text-sm text-foreground/60">NIIS 2026 Registration Management</p>
          </div>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2 bg-transparent"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm font-medium">Total Registrations</p>
                <p className="text-3xl font-bold text-primary mt-2">{stats.total}</p>
              </div>
              <Users className="w-12 h-12 text-primary/20" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm font-medium">Students</p>
                <p className="text-3xl font-bold text-accent mt-2">{stats.students}</p>
              </div>
              <UserCheck className="w-12 h-12 text-accent/20" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm font-medium">Professionals</p>
                <p className="text-3xl font-bold text-secondary mt-2">{stats.professionals}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-secondary/20" />
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/60 text-sm font-medium">Total Revenue</p>
                <p className="text-3xl font-bold text-primary mt-2">₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <CreditCard className="w-12 h-12 text-primary/20" />
            </div>
          </div>
        </div>

        {/* Payment Status Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-green-50 rounded-lg border border-green-200 p-6">
            <h3 className="font-semibold text-green-900 mb-2">Paid</h3>
            <p className="text-3xl font-bold text-green-600">{stats.paid}</p>
            <p className="text-sm text-green-700 mt-2">{((stats.paid / stats.total) * 100).toFixed(1)}% of total</p>
          </div>

          <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
            <h3 className="font-semibold text-yellow-900 mb-2">Pending</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
            <p className="text-sm text-yellow-700 mt-2">{((stats.pending / stats.total) * 100).toFixed(1)}% of total</p>
          </div>

          <div className="bg-red-50 rounded-lg border border-red-200 p-6">
            <h3 className="font-semibold text-red-900 mb-2">Failed</h3>
            <p className="text-3xl font-bold text-red-600">{stats.failed}</p>
            <p className="text-sm text-red-700 mt-2">{((stats.failed / stats.total) * 100).toFixed(1)}% of total</p>
          </div>
        </div>

        {/* Participants Table */}
        <div className="bg-white rounded-lg border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between">
            <h2 className="text-lg font-bold">Participants</h2>
            <div className="flex gap-2">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('all')}
              >
                All ({participants.length})
              </Button>
              <Button
                variant={filter === 'student' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('student')}
              >
                Students ({stats.students})
              </Button>
              <Button
                variant={filter === 'professional' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter('professional')}
              >
                Professionals ({stats.professionals})
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Registration</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Payment Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-3 text-sm font-medium">{participant.name}</td>
                    <td className="px-6 py-3 text-sm text-foreground/70">{participant.email}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        participant.type === 'student' 
                          ? 'bg-blue-100 text-blue-700' 
                          : 'bg-purple-100 text-purple-700'
                      }`}>
                        {participant.type.charAt(0).toUpperCase() + participant.type.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm capitalize">{participant.registrationType}</td>
                    <td className="px-6 py-3 text-sm font-medium">₹{participant.amount.toLocaleString()}</td>
                    <td className="px-6 py-3 text-sm">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        participant.paymentStatus === 'paid'
                          ? 'bg-green-100 text-green-700'
                          : participant.paymentStatus === 'pending'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {participant.paymentStatus.charAt(0).toUpperCase() + participant.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-sm text-foreground/70">{participant.registeredDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
