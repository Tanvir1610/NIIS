'use client';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, FileText, Download, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Participant } from '../types';

export default function PapersTab() {
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [trackFilter, setTrackFilter] = useState('');
    const [paperFilter, setPaperFilter] = useState('all');
    const [remarksModal, setRemarksModal] = useState<{ id: string; name: string; action: 'approved' | 'rejected' } | null>(null);
    const [remarks, setRemarks] = useState('');
    const [processing, setProcessing] = useState(false);
    const getToken = () => localStorage.getItem('token') || '';

    const tracks = [
        'Track 1: Artificial Intelligence & Machine Learning',
        'Track 2: Internet of Things & Embedded Systems',
        'Track 3: Cyber Security & Blockchain',
        'Track 4: Data Science & Cloud Computing',
    ];

    useEffect(() => { loadData(); }, []);

    async function loadData() {
        setLoading(true);
        try {
            const res = await fetch('/api/participants?limit=100', { headers: { Authorization: `Bearer ${getToken()}` } });
            if (res.ok) { const d = await res.json(); setParticipants(d.data || []); }
        } catch (err) { console.error(err); }
        setLoading(false);
    }

    const handleAction = async () => {
        if (!remarksModal) return;
        setProcessing(true);
        try {
            const res = await fetch(`/api/participants/${remarksModal.id}/paper`, {
                method: 'PATCH', headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: remarksModal.action, remarks }),
            });
            if (res.ok) { setRemarksModal(null); setRemarks(''); loadData(); }
            else { const d = await res.json(); alert(d.error || 'Failed'); }
        } catch { alert('Network error'); }
        setProcessing(false);
    };

    const handleExport = () => {
        const url = trackFilter ? `/api/participants/export?track=${encodeURIComponent(trackFilter)}` : '/api/participants/export';
        // Pass token via header by fetching as blob
        fetch(url, { headers: { Authorization: `Bearer ${getToken()}` } })
            .then(r => r.blob())
            .then(blob => { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'participants.csv'; a.click(); })
            .catch(() => alert('Export failed'));
    };

    const presenters = participants.filter(p => p.participantType === 'presenter' && (!trackFilter || p.track === trackFilter));
    const filtered = presenters.filter(p => paperFilter === 'all' || p.paperStatus === paperFilter);
    const trackStats = {
        total: presenters.length,
        accepted: presenters.filter(p => p.paperStatus === 'approved').length,
        rejected: presenters.filter(p => p.paperStatus === 'rejected').length,
        pending: presenters.filter(p => p.paperStatus === 'pending').length,
    };

    if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" /></div>;

    return (
        <div className="space-y-6">
            {/* Track Stats */}
            <div className="grid md:grid-cols-4 gap-6">
                <div className="bg-white rounded-xl border border-border p-6"><p className="text-foreground/60 text-sm font-medium">Total Papers</p><p className="text-3xl font-bold text-primary mt-2">{trackStats.total}</p></div>
                <div className="bg-green-50 rounded-xl border border-green-200 p-6"><p className="text-green-700 text-sm font-medium">Accepted</p><p className="text-3xl font-bold text-green-600 mt-2">{trackStats.accepted}</p></div>
                <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-6"><p className="text-yellow-700 text-sm font-medium">Pending</p><p className="text-3xl font-bold text-yellow-600 mt-2">{trackStats.pending}</p></div>
                <div className="bg-red-50 rounded-xl border border-red-200 p-6"><p className="text-red-700 text-sm font-medium">Rejected</p><p className="text-3xl font-bold text-red-600 mt-2">{trackStats.rejected}</p></div>
            </div>

            {/* Paper Table */}
            <div className="bg-white rounded-xl border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border flex flex-wrap items-center justify-between gap-4">
                    <h2 className="text-lg font-bold flex items-center gap-2"><FileText className="w-5 h-5 text-accent" /> Paper Submissions (Track Coordinator View)</h2>
                    <div className="flex gap-2 flex-wrap">
                        <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-2 shadow-sm">
                            <Filter className="w-4 h-4 text-foreground/40" />
                            <select className="text-sm border-none bg-transparent py-2 outline-none cursor-pointer" value={trackFilter} onChange={e => setTrackFilter(e.target.value)}>
                                <option value="">All Tracks</option>
                                {tracks.map(t => <option key={t} value={t}>{t.split(':')[0]}</option>)}
                            </select>
                        </div>
                        {['all', 'pending', 'approved', 'rejected'].map(s => (
                            <Button key={s} variant={paperFilter === s ? 'default' : 'outline'} size="sm" onClick={() => setPaperFilter(s)} className="capitalize">{s} ({s === 'all' ? presenters.length : presenters.filter(p => p.paperStatus === s).length})</Button>
                        ))}
                        <Button size="sm" variant="outline" onClick={handleExport} className="gap-1"><Download className="w-3.5 h-3.5" /> Export CSV</Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/30 border-b border-border"><tr>
                            <th className="px-6 py-3 text-left font-semibold">Name</th>
                            <th className="px-6 py-3 text-left font-semibold">Paper Title</th>
                            <th className="px-6 py-3 text-left font-semibold">Track</th>
                            <th className="px-6 py-3 text-left font-semibold">Status</th>
                            <th className="px-6 py-3 text-left font-semibold">Remarks</th>
                            <th className="px-6 py-3 text-left font-semibold">Actions</th>
                        </tr></thead>
                        <tbody>
                            {filtered.map(p => (
                                <tr key={p._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-3"><p className="font-medium">{p.name}</p><p className="text-xs text-foreground/50">{p.email}</p></td>
                                    <td className="px-6 py-3 max-w-xs">{p.paperTitle || '—'}</td>
                                    <td className="px-6 py-3 text-xs"><span className="bg-primary/10 text-primary px-2 py-1 rounded">{p.track?.split(':')[0]}</span></td>
                                    <td className="px-6 py-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${p.paperStatus === 'approved' ? 'bg-green-100 text-green-700' : p.paperStatus === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.paperStatus}</span></td>
                                    <td className="px-6 py-3 text-foreground/70 max-w-xs truncate">{p.remarks || '—'}</td>
                                    <td className="px-6 py-3">
                                        {p.paperStatus === 'pending' ? (
                                            <div className="flex gap-1">
                                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7" onClick={() => setRemarksModal({ id: p._id, name: p.name, action: 'approved' })}><CheckCircle className="w-3 h-3 mr-1" /> Approve</Button>
                                                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs h-7" onClick={() => setRemarksModal({ id: p._id, name: p.name, action: 'rejected' })}><XCircle className="w-3 h-3 mr-1" /> Reject</Button>
                                            </div>
                                        ) : <span className="text-xs text-foreground/40">Reviewed</span>}
                                    </td>
                                </tr>
                            ))}
                            {filtered.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-foreground/50">No papers found</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Remarks Modal */}
            {remarksModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            {remarksModal.action === 'approved' ? <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" /> : <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />}
                            <h3 className="text-xl font-bold">{remarksModal.action === 'approved' ? 'Approve Paper' : 'Reject Paper'}</h3>
                            <p className="text-foreground/60 mt-2">{remarksModal.action === 'approved' ? `Approve paper by ${remarksModal.name}?` : `Reject paper by ${remarksModal.name}?`}</p>
                        </div>
                        <div className="mb-4"><label className="block text-sm font-medium mb-2">Remarks (optional)</label><textarea value={remarks} onChange={e => setRemarks(e.target.value)} rows={3} className="w-full px-3 py-2 border border-border rounded-lg text-sm" placeholder="Add remarks..." /></div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => { setRemarksModal(null); setRemarks(''); }} disabled={processing}>Cancel</Button>
                            <Button className={`flex-1 ${remarksModal.action === 'approved' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`} onClick={handleAction} disabled={processing}>{processing ? 'Processing...' : remarksModal.action === 'approved' ? 'Approve' : 'Reject'}</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
