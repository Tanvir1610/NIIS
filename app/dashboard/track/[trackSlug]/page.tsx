'use client';

import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut, FileText, CheckCircle, XCircle, Users, AlertCircle } from 'lucide-react';

interface Stats { track: string; totalParticipants: number; totalPapers: number; acceptedPapers: number; rejectedPapers: number; pendingPapers: number; verifiedPayments: number; pendingPayments: number; }
interface Participant { _id: string; name: string; email: string; participantType: string; track?: string; paperTitle?: string; paperStatus?: string; remarks?: string; paymentStatus: string; createdAt: string; }
interface UserInfo { name: string; role: string; assignedTrack?: string; }

export default function TrackDashboard() {
    const router = useRouter();
    const params = useParams();
    const trackSlug = decodeURIComponent(params.trackSlug as string);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [stats, setStats] = useState<Stats | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [paperFilter, setPaperFilter] = useState('all');
    const [remarksModal, setRemarksModal] = useState<{ id: string; name: string; action: 'approved' | 'rejected' } | null>(null);
    const [remarks, setRemarks] = useState('');
    const [processing, setProcessing] = useState(false);
    const getToken = useCallback(() => localStorage.getItem('token'), []);

    useEffect(() => {
        const token = getToken();
        const user = localStorage.getItem('user');
        if (!token || !user) { router.push('/admin/login'); return; }
        const parsed = JSON.parse(user);
        if (parsed.role !== 'track_coordinator' && parsed.role !== 'convener') { router.push('/admin/login'); return; }
        setUserInfo(parsed);
        loadData(token, parsed.assignedTrack || trackSlug);
    }, [router, getToken, trackSlug]);

    async function loadData(token: string, track: string) {
        setLoading(true);
        try {
            const headers = { Authorization: `Bearer ${token}` };
            const [statsRes, partRes] = await Promise.all([
                fetch(`/api/stats/track?track=${encodeURIComponent(track)}`, { headers }),
                fetch('/api/participants?limit=100', { headers }),
            ]);
            if (statsRes.ok) { const s = await statsRes.json(); setStats(s.data); }
            if (partRes.ok) { const p = await partRes.json(); setParticipants(p.data || []); }
        } catch (err) { console.error('Failed to load data:', err); }
        setLoading(false);
    }

    const handlePaperAction = async () => {
        if (!remarksModal) return;
        const token = getToken();
        if (!token) return;
        setProcessing(true);
        try {
            const res = await fetch(`/api/participants/${remarksModal.id}/paper`, {
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: remarksModal.action, remarks }),
            });
            if (res.ok) {
                setRemarksModal(null); setRemarks('');
                const user = localStorage.getItem('user');
                const parsed = user ? JSON.parse(user) : {};
                loadData(token, parsed.assignedTrack || trackSlug);
            } else { const data = await res.json(); alert(data.error || 'Action failed'); }
        } catch (err) { console.error('Paper action failed:', err); }
        setProcessing(false);
    };

    const handleLogout = () => { localStorage.removeItem('token'); localStorage.removeItem('user'); router.push('/admin/login'); };

    const handleExport = () => {
        const token = getToken();
        if (!token) return;
        const url = `/api/participants/export?track=${encodeURIComponent(trackSlug)}`;
        fetch(url, { headers: { Authorization: `Bearer ${token}` } })
            .then(r => r.blob())
            .then(blob => {
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = `participants-${trackSlug.replace(/[^a-zA-Z0-9]/g, '_')}.csv`;
                a.click();
            })
            .catch(() => alert('Export failed'));
    };

    const presenters = participants.filter(p => p.participantType === 'presenter');
    const filteredPresenters = presenters.filter(p => paperFilter === 'all' || p.paperStatus === paperFilter);

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
                        <h1 className="text-2xl font-bold text-primary">Track Coordinator</h1>
                        <p className="text-sm text-foreground/60">Welcome, {userInfo.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button onClick={handleExport} variant="outline" className="flex items-center gap-2 bg-transparent">
                            <FileText className="w-4 h-4" /> Export CSV
                        </Button>
                        <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 bg-transparent">
                            <LogOut className="w-4 h-4" /> Logout
                        </Button>
                    </div>
                </div>
            </header>

            <div className="container mx-auto px-4 py-8">
                {stats && (
                    <>
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-8">
                            <p className="text-sm font-medium text-primary">{stats.track}</p>
                        </div>
                        <div className="grid md:grid-cols-4 gap-6 mb-8">
                            <div className="bg-white rounded-lg border border-border p-6">
                                <p className="text-foreground/60 text-sm font-medium">Participants</p>
                                <p className="text-3xl font-bold text-primary mt-2">{stats.totalParticipants}</p>
                            </div>
                            <div className="bg-white rounded-lg border border-border p-6">
                                <p className="text-foreground/60 text-sm font-medium">Total Papers</p>
                                <p className="text-3xl font-bold text-accent mt-2">{stats.totalPapers}</p>
                            </div>
                            <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                                <p className="text-green-700 text-sm font-medium">Accepted</p>
                                <p className="text-3xl font-bold text-green-600 mt-2">{stats.acceptedPapers}</p>
                            </div>
                            <div className="bg-red-50 rounded-lg border border-red-200 p-6">
                                <p className="text-red-700 text-sm font-medium">Rejected</p>
                                <p className="text-3xl font-bold text-red-600 mt-2">{stats.rejectedPapers}</p>
                            </div>
                        </div>
                    </>
                )}

                <div className="bg-white rounded-lg border border-border overflow-hidden">
                    <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                        <h2 className="text-lg font-bold">Paper Submissions</h2>
                        <div className="flex gap-2">
                            {['all', 'pending', 'approved', 'rejected'].map((s) => (
                                <Button key={s} variant={paperFilter === s ? 'default' : 'outline'} size="sm" onClick={() => setPaperFilter(s)} className="capitalize">
                                    {s} ({s === 'all' ? presenters.length : presenters.filter(p => p.paperStatus === s).length})
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/30 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Paper Title</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Remarks</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPresenters.map((p) => (
                                    <tr key={p._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-3 text-sm"><p className="font-medium">{p.name}</p><p className="text-xs text-foreground/50">{p.email}</p></td>
                                        <td className="px-6 py-3 text-sm max-w-xs">{p.paperTitle || '—'}</td>
                                        <td className="px-6 py-3 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.paperStatus === 'approved' ? 'bg-green-100 text-green-700' : p.paperStatus === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.paperStatus}</span></td>
                                        <td className="px-6 py-3 text-sm text-foreground/70 max-w-xs truncate">{p.remarks || '—'}</td>
                                        <td className="px-6 py-3 text-sm">
                                            {p.paperStatus === 'pending' ? (
                                                <div className="flex gap-1">
                                                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7" onClick={() => setRemarksModal({ id: p._id, name: p.name, action: 'approved' })}><CheckCircle className="w-3 h-3 mr-1" /> Approve</Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs h-7" onClick={() => setRemarksModal({ id: p._id, name: p.name, action: 'rejected' })}><XCircle className="w-3 h-3 mr-1" /> Reject</Button>
                                                </div>
                                            ) : <span className="text-xs text-foreground/40">Reviewed</span>}
                                        </td>
                                    </tr>
                                ))}
                                {filteredPresenters.length === 0 && <tr><td colSpan={5} className="px-6 py-12 text-center text-foreground/50">No papers found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* All Track Participants */}
                <div className="bg-white rounded-lg border border-border overflow-hidden mt-8">
                    <div className="px-6 py-4 border-b border-border flex items-center gap-2">
                        <Users className="w-5 h-5 text-primary" />
                        <h2 className="text-lg font-bold">All Track Participants</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-muted/30 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Type</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Payment</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Registered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {participants.map((p) => (
                                    <tr key={p._id} className="border-b border-border hover:bg-muted/30">
                                        <td className="px-6 py-3 text-sm font-medium">{p.name}</td>
                                        <td className="px-6 py-3 text-sm text-foreground/70">{p.email}</td>
                                        <td className="px-6 py-3 text-sm capitalize">{p.participantType}</td>
                                        <td className="px-6 py-3 text-sm"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.paymentStatus === 'verified' ? 'bg-green-100 text-green-700' : p.paymentStatus === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.paymentStatus}</span></td>
                                        <td className="px-6 py-3 text-sm text-foreground/70">{new Date(p.createdAt).toLocaleDateString('en-IN')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {remarksModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            {remarksModal.action === 'approved' ? <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" /> : <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />}
                            <h3 className="text-xl font-bold">{remarksModal.action === 'approved' ? 'Approve Paper' : 'Reject Paper'}</h3>
                            <p className="text-foreground/60 mt-2">{remarksModal.action === 'approved' ? `Approve paper by ${remarksModal.name}?` : `Reject paper by ${remarksModal.name}?`}</p>
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Remarks (optional)</label>
                            <textarea value={remarks} onChange={(e) => setRemarks(e.target.value)} rows={3} className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm" placeholder="Add remarks..." />
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => { setRemarksModal(null); setRemarks(''); }} disabled={processing}>Cancel</Button>
                            <Button className={`flex-1 ${remarksModal.action === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`} onClick={handlePaperAction} disabled={processing}>
                                {processing ? 'Processing...' : remarksModal.action === 'approved' ? 'Approve' : 'Reject'}
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
