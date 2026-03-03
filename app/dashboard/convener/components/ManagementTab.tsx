'use client';
import { useState, useEffect } from 'react';
import { UserPlus, CheckCircle, Edit, Trash2, Shield, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { AdminUser } from '../types';

export default function ManagementTab() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [loading, setLoading] = useState(true);
    const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'track_coordinator', assignedTrack: '' });
    const [creating, setCreating] = useState(false);
    const [success, setSuccess] = useState('');
    const [editModal, setEditModal] = useState<AdminUser | null>(null);
    const [editData, setEditData] = useState<any>({});
    const [saving, setSaving] = useState(false);
    const [deleteModal, setDeleteModal] = useState<AdminUser | null>(null);
    const [deleting, setDeleting] = useState(false);
    const getToken = () => localStorage.getItem('token') || '';

    const tracks = [
        { value: 'Track 1: Artificial Intelligence & Machine Learning', label: 'Track 1: AI & ML' },
        { value: 'Track 2: Internet of Things & Embedded Systems', label: 'Track 2: IoT & Embedded' },
        { value: 'Track 3: Cyber Security & Blockchain', label: 'Track 3: Cyber Security' },
        { value: 'Track 4: Data Science & Cloud Computing', label: 'Track 4: Data Science' },
    ];

    useEffect(() => { loadUsers(); }, []);

    async function loadUsers() {
        setLoading(true);
        try {
            const res = await fetch('/api/users', { headers: { Authorization: `Bearer ${getToken()}` } });
            if (res.ok) { const d = await res.json(); setUsers(d.data || []); }
        } catch (err) { console.error(err); }
        setLoading(false);
    }

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        setCreating(true); setSuccess('');
        try {
            const res = await fetch('/api/auth/register-user', {
                method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
                body: JSON.stringify(newUser),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setSuccess(`Successfully created user: ${newUser.name}`);
            setNewUser({ name: '', email: '', password: '', role: 'track_coordinator', assignedTrack: '' });
            loadUsers();
        } catch (err: any) { alert(err.message); }
        setCreating(false);
    };

    const openEdit = (u: AdminUser) => {
        setEditData({ name: u.name, email: u.email, role: u.role, assignedTrack: u.assignedTrack || '', password: '' });
        setEditModal(u);
    };

    const handleSaveEdit = async () => {
        if (!editModal) return;
        setSaving(true);
        try {
            const payload: any = { name: editData.name, email: editData.email, role: editData.role, assignedTrack: editData.assignedTrack };
            if (editData.password) payload.password = editData.password;
            const res = await fetch(`/api/users/${editModal._id}`, {
                method: 'PUT', headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            if (res.ok) { setEditModal(null); loadUsers(); }
            else { const d = await res.json(); alert(d.error || 'Failed'); }
        } catch { alert('Network error'); }
        setSaving(false);
    };

    const handleDelete = async () => {
        if (!deleteModal) return;
        setDeleting(true);
        try {
            const res = await fetch(`/api/users/${deleteModal._id}`, {
                method: 'DELETE', headers: { Authorization: `Bearer ${getToken()}` },
            });
            if (res.ok) { setDeleteModal(null); loadUsers(); }
            else { const d = await res.json(); alert(d.error || 'Failed'); }
        } catch { alert('Network error'); }
        setDeleting(false);
    };

    const roleColors: Record<string, string> = { convener: 'bg-purple-100 text-purple-700', accountant: 'bg-blue-100 text-blue-700', track_coordinator: 'bg-teal-100 text-teal-700' };

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Create User Form */}
                <div className="bg-white p-8 rounded-xl shadow-sm border border-border">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-3"><div className="p-2 bg-primary/10 rounded-lg"><UserPlus className="w-6 h-6 text-primary" /></div>Create New Admin User</h3>
                    <form onSubmit={handleCreate} className="space-y-4">
                        <div><label className="block text-sm font-medium mb-1.5 text-foreground/70">Full Name</label><input required type="text" className="w-full px-4 py-2.5 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} placeholder="John Doe" /></div>
                        <div><label className="block text-sm font-medium mb-1.5 text-foreground/70">Email</label><input required type="email" className="w-full px-4 py-2.5 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 text-sm" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} placeholder="john@niis.com" /></div>
                        <div><label className="block text-sm font-medium mb-1.5 text-foreground/70">Password</label><input required type="password" className="w-full px-4 py-2.5 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} placeholder="••••••••" /></div>
                        <div><label className="block text-sm font-medium mb-1.5 text-foreground/70">Role</label><select className="w-full px-4 py-2.5 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 bg-white" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}><option value="track_coordinator">Track Coordinator</option><option value="accountant">Accountant</option><option value="convener">Convener</option></select></div>
                        {newUser.role === 'track_coordinator' && (
                            <div><label className="block text-sm font-medium mb-1.5 text-foreground/70">Assign Track</label><select className="w-full px-4 py-2.5 border border-border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 bg-white" value={newUser.assignedTrack} onChange={e => setNewUser({ ...newUser, assignedTrack: e.target.value })}><option value="">Select Track</option>{tracks.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
                        )}
                        {success && <div className="p-3 bg-green-50 text-green-700 text-sm rounded-lg flex items-center gap-2 border border-green-100"><CheckCircle className="w-4 h-4" /> {success}</div>}
                        <Button type="submit" disabled={creating} className="w-full py-6 mt-2 text-lg font-semibold shadow-lg shadow-primary/20">{creating ? 'Creating...' : 'Create Admin User'}</Button>
                    </form>
                </div>

                {/* Admin Info Panel */}
                <div className="bg-gradient-to-br from-primary via-primary to-accent p-8 rounded-xl text-white shadow-xl flex flex-col justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="w-6 h-6" /> Admin Controls</h3>
                        <p className="opacity-90 leading-relaxed">Manage system users. Create, edit, or remove track coordinators, accountants, and other conveners. All changes are logged in the audit trail.</p>
                    </div>
                    <div className="mt-8 space-y-3">
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"><p className="text-sm opacity-90"><strong>{users.filter(u => u.role === 'track_coordinator').length}</strong> Track Coordinators</p></div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"><p className="text-sm opacity-90"><strong>{users.filter(u => u.role === 'accountant').length}</strong> Accountants</p></div>
                        <div className="bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20"><p className="text-sm opacity-90"><strong>{users.filter(u => u.role === 'convener').length}</strong> Conveners</p></div>
                    </div>
                </div>
            </div>

            {/* Users List */}
            <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden">
                <div className="px-6 py-4 border-b border-border"><h2 className="text-lg font-bold">Existing Admin Users ({users.length})</h2></div>
                {loading ? <div className="p-8 text-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto" /></div> : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead className="bg-muted/30 border-b border-border"><tr>
                                <th className="px-6 py-3 text-left font-semibold">Name</th>
                                <th className="px-6 py-3 text-left font-semibold">Email</th>
                                <th className="px-6 py-3 text-left font-semibold">Role</th>
                                <th className="px-6 py-3 text-left font-semibold">Assigned Track</th>
                                <th className="px-6 py-3 text-left font-semibold">Created</th>
                                <th className="px-6 py-3 text-left font-semibold">Actions</th>
                            </tr></thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id} className="border-b border-border hover:bg-muted/30 transition-colors">
                                        <td className="px-6 py-3 font-medium">{u.name}</td>
                                        <td className="px-6 py-3 text-foreground/70">{u.email}</td>
                                        <td className="px-6 py-3"><span className={`px-3 py-1 rounded-full text-xs font-semibold ${roleColors[u.role] || 'bg-gray-100 text-gray-700'}`}>{u.role.replace('_', ' ')}</span></td>
                                        <td className="px-6 py-3 text-sm text-foreground/60">{u.assignedTrack ? u.assignedTrack.split(':')[0] : '—'}</td>
                                        <td className="px-6 py-3 text-sm text-foreground/50">{new Date(u.createdAt).toLocaleDateString('en-IN')}</td>
                                        <td className="px-6 py-3">
                                            <div className="flex gap-1">
                                                <Button size="sm" variant="outline" className="text-xs h-7 gap-1" onClick={() => openEdit(u)}><Edit className="w-3 h-3" /> Edit</Button>
                                                <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50 text-xs h-7 gap-1" onClick={() => setDeleteModal(u)}><Trash2 className="w-3 h-3" /> Delete</Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {users.length === 0 && <tr><td colSpan={6} className="px-6 py-12 text-center text-foreground/50">No users found</td></tr>}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Edit User Modal */}
            {editModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-bold mb-4">Edit User: {editModal.name}</h3>
                        <div className="space-y-3">
                            <div><label className="block text-sm font-medium mb-1">Name</label><input className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.name} onChange={e => setEditData({ ...editData, name: e.target.value })} /></div>
                            <div><label className="block text-sm font-medium mb-1">Email</label><input className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.email} onChange={e => setEditData({ ...editData, email: e.target.value })} /></div>
                            <div><label className="block text-sm font-medium mb-1">Role</label><select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white" value={editData.role} onChange={e => setEditData({ ...editData, role: e.target.value })}><option value="track_coordinator">Track Coordinator</option><option value="accountant">Accountant</option><option value="convener">Convener</option></select></div>
                            {editData.role === 'track_coordinator' && (
                                <div><label className="block text-sm font-medium mb-1">Assign Track</label><select className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white" value={editData.assignedTrack} onChange={e => setEditData({ ...editData, assignedTrack: e.target.value })}><option value="">Select Track</option>{tracks.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}</select></div>
                            )}
                            <div><label className="block text-sm font-medium mb-1">New Password (leave blank to keep)</label><input type="password" className="w-full px-3 py-2 border border-border rounded-lg text-sm" value={editData.password} onChange={e => setEditData({ ...editData, password: e.target.value })} placeholder="Leave blank to keep current" /></div>
                        </div>
                        <div className="flex gap-3 mt-6">
                            <Button variant="outline" className="flex-1" onClick={() => setEditModal(null)} disabled={saving}>Cancel</Button>
                            <Button className="flex-1" onClick={handleSaveEdit} disabled={saving}>{saving ? 'Saving...' : 'Save Changes'}</Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full mx-4">
                        <div className="text-center mb-6">
                            <Trash2 className="w-16 h-16 text-red-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold">Delete User</h3>
                            <p className="text-foreground/60 mt-2">Are you sure you want to permanently delete <strong>{deleteModal.name}</strong> ({deleteModal.email})?</p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setDeleteModal(null)} disabled={deleting}>Cancel</Button>
                            <Button className="flex-1 bg-red-600 hover:bg-red-700 text-white" onClick={handleDelete} disabled={deleting}>{deleting ? 'Deleting...' : 'Delete Permanently'}</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
