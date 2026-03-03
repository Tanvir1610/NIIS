'use client';
import { useState } from 'react';
import { Search, Filter, CheckCircle, XCircle, Clock, ChevronLeft, ChevronRight, Edit, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Participant } from '../types';

interface Props {
    participants: Participant[];
    onRefresh: () => void;
    page: number; setPage: (p: number | ((v: number) => number)) => void;
    limit: number;
    search: string; setSearch: (s: string) => void;
    statusFilter: string; setStatusFilter: (s: string) => void;
    typeFilter: string; setTypeFilter: (s: string) => void;
    onApplyFilters: () => void;
}

export default function ParticipantsTab({ participants, onRefresh, page, setPage, limit, search, setSearch, statusFilter, setStatusFilter, typeFilter, setTypeFilter, onApplyFilters }: Props) {
    const [editModal, setEditModal] = useState<Participant | null>(null);
    const [editData, setEditData] = useState<any>({});
    const [paymentModal, setPaymentModal] = useState<{ id: string; name: string; action: 'verified' | 'rejected' } | null>(null);
    const [imageModal, setImageModal] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [saving, setSaving] = useState(false);
    const getToken = () => localStorage.getItem('token') || '';

    const handlePaymentOverride = async () => {
        if (!paymentModal) return;
        setProcessing(true);
        try {
            const res = await fetch(`/api/participants/${paymentModal.id}/payment`, {
                method: 'PATCH', headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: paymentModal.action }),
            });
            if (res.ok) { setPaymentModal(null); onRefresh(); }
            else { const d = await res.json(); alert(d.error || 'Failed'); }
        } catch { alert('Network error'); }
        setProcessing(false);
    };

    const openEdit = (p: Participant) => {
        setEditData({ name: p.name, email: p.email, phone: p.phone || '', university: p.university || '', participantType: p.participantType, track: p.track || '', paperTitle: p.paperTitle || '', transactionId: p.transactionId || '' });
        setEditModal(p);
    };

    const handleSaveEdit = async () => {
        if (!editModal) return;
        setSaving(true);
        try {
            const res = await fetch(`/api/participants/${editModal._id}`, {
                method: 'PUT', headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(editData),
            });
            if (res.ok) { setEditModal(null); onRefresh(); }
            else { const d = await res.json(); alert(d.error || 'Failed'); }
        } catch { alert('Network error'); }
        setSaving(false);
    };

    const handleExportCSV = () => {
        const token = getToken();
        window.open(`/api/participants/export?token=${token}`, '_blank');
    };

    return (
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
            {/* Filters */}
            <div className="p-4 border-b border-border bg-muted/5 flex flex-col lg:flex-row gap-4 justify-between items-center sticky top-0 z-10">
                <div className="relative w-full lg:w-96">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
                    <input type="text" placeholder="Search by name, email, or ID..." className="w-full pl-10 pr-4 py-2 text-sm border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 bg-white" value={search} onChange={(e) => setSearch(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && onApplyFilters()} />
                </div>
                <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-end">
                    <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-2 shadow-sm">
                        <Filter className="w-4 h-4 text-foreground/40" />
                        <select className="text-sm border-none bg-transparent py-2 outline-none cursor-pointer" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">All Status</option><option value="pending">Pending</option><option value="verified">Verified</option><option value="rejected">Rejected</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 bg-white border border-border rounded-lg px-2 shadow-sm">
                        <Filter className="w-4 h-4 text-foreground/40" />
                        <select className="text-sm border-none bg-transparent py-2 outline-none cursor-pointer" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
                            <option value="">All Types</option><option value="presenter">Presenter</option><option value="attendee">Attendee</option><option value="student">Student</option><option value="faculty">Faculty</option>
                        </select>
                    </div>
                    <Button size="sm" onClick={onApplyFilters} className="px-6">Apply</Button>
                    <Button size="sm" variant="outline" onClick={handleExportCSV} className="gap-1"><Download className="w-3.5 h-3.5" /> CSV</Button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm text-left border-collapse">
                    <thead className="bg-muted/10 text-foreground/60 font-semibold sticky top-0 z-10 backdrop-blur-md">
                        <tr>
                            <th className="p-4 border-b border-border w-16">Proof</th>
                            <th className="p-4 border-b border-border">Name / Email</th>
                            <th className="p-4 border-b border-border">Type</th>
                            <th className="p-4 border-b border-border">Amount</th>
                            <th className="p-4 border-b border-border">Txn ID</th>
                            <th className="p-4 border-b border-border">Status</th>
                            <th className="p-4 border-b border-border">Paper</th>
                            <th className="p-4 border-b border-border">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {participants.map((p) => (
                            <tr key={p._id} className="group hover:bg-muted/50 transition-colors">
                                <td className="p-4 text-center">
                                    {(p.paymentScreenshotUrl || p.imageUrl) ? (
                                        <button onClick={() => setImageModal((p.paymentScreenshotUrl || p.imageUrl)!)} className="w-10 h-10 rounded-md overflow-hidden border border-border hover:ring-2 hover:ring-primary transition-all">
                                            <img src={p.paymentScreenshotUrl || p.imageUrl} alt="Proof" className="w-full h-full object-cover" />
                                        </button>
                                    ) : <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-foreground/40 text-xs">N/A</div>}
                                </td>
                                <td className="p-4"><div className="font-semibold">{p.name}</div><div className="text-xs text-foreground/50">{p.email}</div>{p.participantId && <div className="text-xs font-mono text-primary mt-0.5">{p.participantId}</div>}</td>
                                <td className="p-4"><span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${p.participantType === 'presenter' ? 'bg-purple-50 border-purple-100 text-purple-700' : p.participantType === 'student' ? 'bg-blue-50 border-blue-100 text-blue-700' : 'bg-gray-50 border-gray-100 text-gray-700'}`}>{p.participantType}</span></td>
                                <td className="p-4 font-mono font-medium">₹{p.expectedAmount}</td>
                                <td className="p-4 font-mono text-xs text-foreground/70">{p.transactionId || '-'}</td>
                                <td className="p-4"><span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold ${p.paymentStatus === 'verified' ? 'bg-green-100 text-green-700' : p.paymentStatus === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`}>{p.paymentStatus === 'verified' && <CheckCircle className="w-3 h-3" />}{p.paymentStatus === 'pending' && <Clock className="w-3 h-3" />}{p.paymentStatus.toUpperCase()}</span></td>
                                <td className="p-4 max-w-[150px]">{p.track ? <><div className="font-medium truncate text-sm" title={p.paperTitle}>{p.paperTitle || 'No Title'}</div><div className="text-xs text-foreground/50 truncate">{p.track.split(':')[0]}</div></> : <span className="text-foreground/30 text-xs italic">N/A</span>}</td>
                                <td className="p-4">
                                    <div className="flex gap-1 flex-wrap">
                                        <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => openEdit(p)}><Edit className="w-3 h-3" /> Edit</Button>
                                        {p.paymentStatus === 'pending' && <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7" onClick={() => setPaymentModal({ id: p._id, name: p.name, action: 'verified' })}><CheckCircle className="w-3 h-3 mr-1" /> Verify</Button>}
                                        {p.paymentStatus !== 'rejected' && p.paymentStatus !== 'verified' && <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs h-7" onClick={() => setPaymentModal({ id: p._id, name: p.name, action: 'rejected' })}><XCircle className="w-3 h-3 mr-1" /> Reject</Button>}
                                        {p.paymentStatus === 'verified' && <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs h-7" onClick={() => setPaymentModal({ id: p._id, name: p.name, action: 'rejected' })}>Override: Reject</Button>}
                                        {p.paymentStatus === 'rejected' && <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white text-xs h-7" onClick={() => setPaymentModal({ id: p._id, name: p.name, action: 'verified' })}>Override: Verify</Button>}
                                    </div>
                                </td>
                            </tr>
                        ))}
                        {participants.length === 0 && <tr><td colSpan={8} className="p-12 text-center text-foreground/40"><Search className="w-12 h-12 mx-auto mb-3 opacity-20" /><p>No participants found.</p></td></tr>}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="p-4 border-t border-border flex items-center justify-between bg-muted/5">
                <div className="text-xs text-foreground/50">Page {page} · {participants.length} results</div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setPage((p: number) => Math.max(1, p - 1))} disabled={page === 1}><ChevronLeft className="w-4 h-4 mr-1" /> Prev</Button>
                    <Button variant="outline" size="sm" onClick={() => setPage((p: number) => p + 1)} disabled={participants.length < limit}>Next <ChevronRight className="w-4 h-4 ml-1" /></Button>
                </div>
            </div>

            {/* Payment Override Modal */}
            {paymentModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            {paymentModal.action === 'verified' ? <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" /> : <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />}
                            <h3 className="text-xl font-bold">{paymentModal.action === 'verified' ? 'Confirm Payment' : 'Reject Payment'}</h3>
                            <p className="text-foreground/60 mt-2">{paymentModal.action === 'verified' ? `Are you sure everything is verified and ready to send confirmation email to ${paymentModal.name}?` : `Are you sure you want to reject the payment for ${paymentModal.name}?`}</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setPaymentModal(null)} disabled={processing}>Cancel</Button>
                            <Button className={`flex-1 ${paymentModal.action === 'verified' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'} text-white`} onClick={handlePaymentOverride} disabled={processing}>{processing ? 'Processing...' : paymentModal.action === 'verified' ? 'Confirm & Send Email' : 'Reject Payment'}</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Edit Modal */}
            {editModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-lg w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <h3 className="text-xl font-bold mb-4">Edit Participant: {editModal.name}</h3>
                        <div className="space-y-3">
                            <div><label className="block text-sm font-medium mb-1">Name</label><input className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} /></div>
                            <div><label className="block text-sm font-medium mb-1">Email</label><input className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} /></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-sm font-medium mb-1">Phone</label><input className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.phone} onChange={e => setEditData({ ...editData, phone: e.target.value })} /></div>
                                <div><label className="block text-sm font-medium mb-1">University</label><input className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.university} onChange={e => setEditData({ ...editData, university: e.target.value })} /></div>
                            </div>
                            <div><label className="block text-sm font-medium mb-1">Participant Type</label><select className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.participantType} onChange={e => setEditData({ ...editData, participantType: e.target.value })}><option value="presenter">Presenter</option><option value="attendee">Attendee</option><option value="student">Student</option><option value="faculty">Faculty</option></select></div>
                            {editData.participantType === 'presenter' && <>
                                <div><label className="block text-sm font-medium mb-1">Track</label><select className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.track} onChange={e => setEditData({ ...editData, track: e.target.value })}><option value="">Select Track</option><option value="Track 1: Artificial Intelligence & Machine Learning">Track 1: AI & ML</option><option value="Track 2: Internet of Things & Embedded Systems">Track 2: IoT</option><option value="Track 3: Cyber Security & Blockchain">Track 3: Cyber Security</option><option value="Track 4: Data Science & Cloud Computing">Track 4: Data Science</option></select></div>
                                <div><label className="block text-sm font-medium mb-1">Paper Title</label><input className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.paperTitle} onChange={e => setEditData({ ...editData, paperTitle: e.target.value })} /></div>
                            </>}
                            <div><label className="block text-sm font-medium mb-1">Transaction ID</label><input className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.transactionId} onChange={e => setEditData({ ...editData, transactionId: e.target.value })} /></div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" className="flex-1" onClick={() => setEditModal(null)} disabled={saving}>Cancel</Button>
                            <Button className="flex-1" onClick={handleSaveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Image Modal */}
            {imageModal && (
                <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setImageModal(null)}>
                    <div className="relative max-w-4xl w-full flex flex-col items-center">
                        <img src={imageModal} alt="Payment Proof" className="object-contain max-h-[85vh] rounded-lg shadow-2xl border border-white/10" />
                        <button className="mt-4 text-white/80 hover:text-white flex items-center gap-2 text-sm bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-colors"><XCircle className="w-5 h-5" /> Close</button>
                    </div>
                </div>
            )}
        </div>
    );
}
