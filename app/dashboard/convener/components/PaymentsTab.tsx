'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, CreditCard, TrendingUp, Eye, Image as ImageIcon, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Participant, AccountantStats } from '../types';

export default function PaymentsTab() {
    const [stats, setStats] = useState<AccountantStats | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [filterStatus, setFilterStatus] = useState('pending');
    const [loading, setLoading] = useState(true);
    const [confirmModal, setConfirmModal] = useState<{ id: string; name: string; action: 'verified' | 'rejected' } | null>(null);
    const [screenshotModal, setScreenshotModal] = useState<{ url: string; name: string } | null>(null);
    const [processing, setProcessing] = useState(false);
    const getToken = () => localStorage.getItem('token') || '';

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        setLoading(true);
        const headers = { Authorization: `Bearer ${getToken()}` };
        try {
            const [sRes, pRes] = await Promise.all([
                fetch('/api/stats/accountant', { headers }),
                fetch('/api/participants?limit=100', { headers }),
            ]);
            if (sRes.ok) { const s = await sRes.json(); setStats(s.data); }
            if (pRes.ok) { const p = await pRes.json(); setParticipants(p.data || []); }
        } catch (err) { console.error(err); }
        setLoading(false);
    }

    const handleAction = async () => {
        if (!confirmModal) return;
        setProcessing(true);
        try {
            const res = await fetch(`/api/participants/${confirmModal.id}/payment`, {
                method: 'PATCH', headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: confirmModal.action }),
            });
            if (res.ok) { setConfirmModal(null); loadData(); }
            else { const d = await res.json(); alert(d.error || 'Failed'); }
        } catch { alert('Network error'); }
        setProcessing(false);
    };

    const filtered = participants.filter(p => filterStatus === 'all' || p.paymentStatus === filterStatus);

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

    return (
        <div className="space-y-6">
            {/* Financial Stats */}
            {stats && (
                <div className="grid md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-xl border border-border p-6"><div className="flex items-center justify-between"><div><p className="text-foreground/60 text-sm font-medium">Total Revenue</p><p className="text-3xl font-bold text-primary mt-2">₹{(stats.totalRevenue || 0).toLocaleString('en-IN')}</p></div><CreditCard className="w-12 h-12 text-primary/20" /></div></div>
                    <div className="bg-white rounded-xl border border-border p-6"><div className="flex items-center justify-between"><div><p className="text-foreground/60 text-sm font-medium">Revenue Today</p><p className="text-3xl font-bold text-green-600 mt-2">₹{(stats.revenueToday || 0).toLocaleString('en-IN')}</p></div><TrendingUp className="w-12 h-12 text-green-200" /></div></div>
                    <div className="bg-white rounded-xl border border-border p-6"><div className="flex items-center justify-between"><div><p className="text-foreground/60 text-sm font-medium">Pending Amount</p><p className="text-3xl font-bold text-yellow-600 mt-2">₹{(stats.pendingAmount || 0).toLocaleString('en-IN')}</p></div><Clock className="w-12 h-12 text-yellow-200" /></div></div>
                    <div className="bg-white rounded-xl border border-border p-6"><div className="flex items-center justify-between"><div><p className="text-foreground/60 text-sm font-medium">Verified Count</p><p className="text-3xl font-bold text-green-600 mt-2">{stats.verifiedCount || 0}</p><p className="text-xs text-foreground/40 mt-1">{stats.pendingCount || 0} pending · {stats.rejectedCount || 0} rejected</p></div><CheckCircle className="w-12 h-12 text-green-200" /></div></div>
                </div>
            )}

            {/* Payment Table */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-lg font-bold">Payment Management (Accountant View)</h2>
                    <div className="flex gap-2">
                        {['pending', 'verified', 'rejected', 'all'].map(s => (
                            <Button key={s} variant={filterStatus === s ? 'default' : 'outline'} size="sm" onClick={() => setFilterStatus(s)} className="capitalize">
                                {s} ({participants.filter(p => s === 'all' || p.paymentStatus === s).length})
                            </Button>
                        ))}
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/30 border-b border-border"><tr>
                            <th className="px-6 py-3 text-left font-semibold">Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Payment Proof</th>
                            <th className="px-6 py-3 text-left font-semibold">Type</th>
                            <th className="px-6 py-3 text-left font-semibold">Transaction ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Expected Amount</th>
                            <th className="px-6 py-3 text-left font-semibold">Status</th>
                            <th className="px-6 py-3 text-left font-semibold">Participant ID</th>
                            <th className="px-6 py-3 text-left font-semibold">Actions</th>
                        </tr></thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-3"><p className="font-medium">{p.name}</p><p className="text-xs text-foreground/50">{p.email}</p></td>
                                    <td className="px-6 py-3">
                                        {(p.paymentScreenshotUrl || p.imageUrl) ? (
                                            <button onClick={() => setScreenshotModal({ url: (p.paymentScreenshotUrl || p.imageUrl)!, name: p.name })} className="relative group flex items-center gap-2 text-primary hover:text-primary/80">
                                                <div className="w-10 h-10 rounded-md overflow-hidden border border-border group-hover:ring-2 group-hover:ring-primary/30 transition-all"><img src={p.paymentScreenshotUrl || p.imageUrl} alt="Proof" className="w-full h-full object-cover" /></div>
                                                <Eye className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ) : <div className="flex items-center gap-1.5 text-foreground/30 text-xs"><ImageIcon className="w-4 h-4" />No proof</div>}
                                    </td>
                                    <td className="px-6 py-3 capitalize"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.participantType === 'presenter' ? 'bg-orange-100 text-orange-700' : p.participantType === 'student' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>{p.participantType}</span></td>
                                    <td className="px-6 py-3 font-mono">{p.transactionId || '—'}</td>
                                    <td className="px-6 py-3 font-medium">₹{(p.expectedAmount || 0).toLocaleString('en-IN')}</td>
                                    <td className="px-6 py-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.paymentStatus === 'verified' ? 'bg-green-100 text-green-700' : p.paymentStatus === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.paymentStatus}</span></td>
                                    <td className="px-6 py-3 font-mono">{p.participantId || '—'}</td>
                                    <td className="px-6 py-3">
                                        {p.paymentStatus === 'pending' ? (
                                            <div className="flex gap-1">
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7" onClick={() => setConfirmModal({ id: p._id, name: p.name, action: 'verified' })}><CheckCircle className="w-3 h-3 mr-1" /> Confirm</Button>
                                                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs h-7" onClick={() => setConfirmModal({ id: p._id, name: p.name, action: 'rejected' })}><XCircle className="w-3 h-3 mr-1" /> Reject</Button>
                                            </div>
                                        ) : <span className="text-xs text-foreground/40">Processed</span>}
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan={8} className="px-6 py-12 text-center text-foreground/50">No participants found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Confirm Modal */}
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
                            <Button className={`flex-1 ${confirmModal.action === 'verified' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`} onClick={handleAction} disabled={processing}>{processing ? 'Processing...' : confirmModal.action === 'verified' ? 'Confirm & Send Email' : 'Reject Payment'}</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Screenshot Modal */}
            {screenshotModal && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setScreenshotModal(null)}>
                    <div className="relative max-w-4xl w-full flex flex-col items-center" onClick={e => e.stopPropagation()}>
                        <div className="bg-white/10 backdrop-blur-md px-6 py-3 rounded-full mb-4 border border-white/20"><p className="text-white font-semibold text-sm">Payment Proof — {screenshotModal.name}</p></div>
                        <img src={screenshotModal.url} alt="Payment proof" className="object-contain max-h-[75vh] rounded-lg shadow-2xl border border-white/10" />
                        <button onClick={() => setScreenshotModal(null)} className="mt-4 text-white/80 hover:text-white flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"><XCircle className="w-5 h-5" /> Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
