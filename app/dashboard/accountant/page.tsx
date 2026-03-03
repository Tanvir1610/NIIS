'use client';

import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, CreditCard, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Image, Eye } from 'lucide-react';

interface Stats { totalRevenue: number; revenueToday: number; pendingAmount: number; verifiedCount: number; pendingCount: number; rejectedCount: number; totalParticipants: number; }
interface Participant { _id: string; name: string; email: string; participantType: string; transactionId?: string; expectedAmount: number; paymentStatus: string; participantId?: string; paymentScreenshotUrl?: string; imageUrl?: string; createdAt: string; }
interface UserInfo { name: string; role: string; }

export default function AccountantDashboard() {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [stats, setStats] = useState<Stats | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [filterStatus, setFilterStatus] = useState('pending');
    const [loading, setLoading] = useState(true);
    const [confirmModal, setConfirmModal] = useState<{ id: string; name: string; action: 'verified' | 'rejected' } | null>(null);
    const [processing, setProcessing] = useState(false);
    const [screenshotModal, setScreenshotModal] = useState<{ url: string; name: string } | null>(null);
    const getToken = useCallback(() => localStorage.getItem('token'), []);

    useEffect(() => {
        const token = getToken();
        const user = localStorage.getItem('user');
        if (!token || !user) { router.push('/admin/login'); return; }
        const parsed = JSON.parse(user);
        if (parsed.role !== 'accountant' && parsed.role !== 'convener') { router.push('/admin/login'); return; }
        setUserInfo(parsed);
        loadData(token);
    }, [router, getToken]);

    async function loadData(token: string) {
        setLoading(true);
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const [statsRes, partRes] = await Promise.all([
                fetch('/api/stats/accountant', { headers }),
                fetch('/api/participants?limit=100', { headers }),
            ]);
            if (statsRes.ok) { const s = await statsRes.json(); setStats(s.data); }
            if (partRes.ok) { const p = await partRes.json(); setParticipants(p.data || []); }
        } catch (err) { console.error('Failed to load data:', err); }
        setLoading(false);
    }

    const handlePaymentAction = async () => {
        if (!confirmModal) return;
        const token = getToken();
        if (!token) return;
        setProcessing(true);
        try {
            const res = await fetch(`/api/participants/${confirmModal.id}/payment`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: confirmModal.action }),
            });
            if (res.ok) { setConfirmModal(null); loadData(token); }
            else { const data = await res.json(); alert(data.error || 'Action failed'); }
        } catch (err) { console.error('Payment action failed:', err); }
        setProcessing(false);
    };

    const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); router.push('/admin/login'); };
    const filteredParticipants = participants.filter((p) => filterStatus === 'all' || p.paymentStatus === filterStatus);

    if (!userInfo || loading) return (
        <div className="min-h-screen bg-muted/30 flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-foreground/60">Loading dashboard...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-muted/30">
            <header className="bg-white border-b border-border sticky top-0 z-40">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-primary">Accountant Dashboard</h1>
                        <p className="text-sm text-foreground/60">Welcome, {userInfo.name}</p>
                    </div>
                    <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
                        <LogOut className="w-4 h-4" /> Logout
                    </Button>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {stats && (
                    <div className="grid md:grid-cols-4 gap-6 mb-8">
                        <div className="bg-white rounded-lg border border-border p-6">
                            <div className="flex items-center justify-between">
                                <div><p className="text-foreground/60 text-sm font-medium">Total Revenue</p><p className="text-3xl font-bold text-primary mt-2">₹{(stats.totalRevenue || 0).toLocaleString('en-IN')}</p></div>
                                <CreditCard className="w-12 h-12 text-primary/20" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border p-6">
                            <div className="flex items-center justify-between">
                                <div><p className="text-foreground/60 text-sm font-medium">Revenue Today</p><p className="text-3xl font-bold text-green-600 mt-2">₹{(stats.revenueToday || 0).toLocaleString('en-IN')}</p></div>
                                <TrendingUp className="w-12 h-12 text-green-200" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border p-6">
                            <div className="flex items-center justify-between">
                                <div><p className="text-foreground/60 text-sm font-medium">Pending Amount</p><p className="text-3xl font-bold text-yellow-600 mt-2">₹{(stats.pendingAmount || 0).toLocaleString('en-IN')}</p></div>
                                <Clock className="w-12 h-12 text-yellow-200" />
                            </div>
                        </div>
                        <div className="bg-white rounded-lg border border-border p-6">
                            <div className="flex items-center justify-between">
                                <div><p className="text-foreground/60 text-sm font-medium">Verified Count</p><p className="text-3xl font-bold text-green-600 mt-2">{stats.verifiedCount || 0}</p><p className="text-xs text-foreground/40 mt-1">{stats.pendingCount || 0} pending</p></div>
                                <CheckCircle className="w-12 h-12 text-green-200" />
                            </div>
                        </div>
                    </div>
                )}

                <div className="bg-white rounded-lg border border-border overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-lg font-bold">Payment Management</h2>
                        <div className="flex gap-2">
                            {['pending', 'verified', 'rejected', 'all'].map((s) => (
                                <Button key={s} variant={filterStatus === s ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus(s)} className="capitalize">
                                    {s} ({participants.filter((p) => s === 'all' || p.paymentStatus === s).length})
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/30 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Payment Proof</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Transaction ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Expected Amount</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Participant ID</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredParticipants.map((p) => (
                                    <tr key={p._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-3 text-sm"><div><p className="font-medium">{p.name}</p><p className="text-xs text-foreground/50">{p.email}</p></div></td>
                                        <td className="px-6 py-3 text-sm">
                                            {(p.paymentScreenshotUrl || p.imageUrl) ? (
                                                <button
                                                    onClick={() => setScreenshotModal({ url: (p.paymentScreenshotUrl || p.imageUrl)!, name: p.name })}
                                                    className="relative group flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-md overflow-hidden border border-border group-hover:ring-2 group-hover:ring-primary/30 transition-all">
                                                        <img src={p.paymentScreenshotUrl || p.imageUrl} alt="Payment" className="w-full h-full object-cover" />
                                                    </div>
                                                    <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-1.5 text-foreground/30 text-xs">
                                                    <Image className="w-4 h-4" />
                                                    <span>No proof</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-3 text-sm capitalize"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.participantType === 'presenter' ? 'bg-orange-100 text-orange-700' : p.participantType === 'student' ? 'bg-blue-100 text-blue-700' : p.participantType === 'faculty' ? 'bg-teal-100 text-teal-700' : 'bg-purple-100 text-purple-700'}`}>{p.participantType}</span></td>
                                        <td className="px-6 py-3 text-sm font-mono">{p.transactionId || '—'}</td>
                                        <td className="px-6 py-3 text-sm font-medium">₹{(p.expectedAmount || 0).toLocaleString('en-IN')}</td>
                                        <td className="px-6 py-3 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.paymentStatus === 'verified' ? 'bg-green-100 text-green-700' : p.paymentStatus === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.paymentStatus}</span></td>
                                        <td className="px-6 py-3 text-sm font-mono">{p.participantId || '—'}</td>
                                        <td className="px-6 py-3 text-sm">
                                            {p.paymentStatus === 'pending' ? (
                                                <div className="flex gap-1">
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7" onClick={() => setConfirmModal({ id: p._id, name: p.name, action: 'verified' })}><CheckCircle className="w-3 h-3 mr-1" /> Confirm</Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs h-7" onClick={() => setConfirmModal({ id: p._id, name: p.name, action: 'rejected' })}><XCircle className="w-3 h-3 mr-1" /> Reject</Button>
                                                </div>
                                            ) : <span className="text-xs text-foreground/40">No actions</span>}
                                        </td>
                                    </tr>
                                ))}
                                {filteredParticipants.length === 0 && <tr><td colSpan={8} className="px-6 py-12 text-center text-foreground/50">No participants found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Payment Confirmation Modal */}
            {confirmModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            {confirmModal.action === 'verified' ? <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" /> : <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />}
                            <h3 className="text-xl font-bold">{confirmModal.action === 'verified' ? 'Confirm Payment' : 'Reject Payment'}</h3>
                            <p className="text-foreground/60 mt-2">{confirmModal.action === 'verified' ? `Are you sure everything is verified and ready to send confirmation email to ${confirmModal.name}?` : `Are you sure you want to reject the payment for ${confirmModal.name}?`}</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setConfirmModal(null)} disabled={processing}>Cancel</Button>
                            <Button className={`flex-1 ${confirmModal.action === 'verified' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`} onClick={handlePaymentAction} disabled={processing}>
                                {processing ? 'Processing...' : confirmModal.action === 'verified' ? 'Confirm & Send Email' : 'Reject Payment'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Payment Screenshot Modal */}
            {screenshotModal && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setScreenshotModal(null)}>
                    <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-4 border border-white/20">
                            <p className="text-white font-semibold text-sm">Payment Proof — {screenshotModal.name}</p>
                        </div>
                        <img src={screenshotModal.url} alt={`Payment screenshot from ${screenshotModal.name}`} className="object-contain max-h-[75vh] rounded-lg shadow-2xl border border-white/10" />
                        <button onClick={() => setScreenshotModal(null)} className="mt-4 text-white/80 hover:text-white flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors">
                            <XCircle className="w-5 h-5" /> Close Preview
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
