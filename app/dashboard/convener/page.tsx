'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { LayoutDashboard, Users, CreditCard, FileText, Settings, Shield, LogOut, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

import type { Stats, Participant } from './types';
import OverviewTab from './components/OverviewTab';
import ParticipantsTab from './components/ParticipantsTab';
import PaymentsTab from './components/PaymentsTab';
import PapersTab from './components/PapersTab';
import ManagementTab from './components/ManagementTab';
import AuditTab from './components/AuditTab';

export default function ConvenerDashboard() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState<Stats | null>(null);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [loading, setLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<{ name: string; role: string } | null>(null);

    // Filter states for ParticipantsTab
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [page, setPage] = useState(1);
    const limit = 50;

    const getToken = useCallback(() => localStorage.getItem('token'), []);

    const loadData = useCallback(async (isRefresh = false) => {
        if (!isRefresh) setLoading(true);
        const token = getToken();
        if (!token) { router.push('/admin/login'); return; }

        try {
            const headers = { Authorization: `Bearer ${token}` };

            // Build participants URL with filters
            let pUrl = `/api/participants?page=${page}&limit=${limit}`;
            if (search) pUrl += `&search=${encodeURIComponent(search)}`;
            if (statusFilter) pUrl += `&status=${statusFilter}`;
            if (typeFilter) pUrl += `&type=${typeFilter}`;

            const [statsRes, partRes] = await Promise.all([
                fetch('/api/stats/convener', { headers }),
                fetch(pUrl, { headers }),
            ]);

            if (statsRes.ok) {
                const sData = await statsRes.json();
                setStats(sData.data);
            }

            if (partRes.ok) {
                const pData = await partRes.json();
                setParticipants(pData.data || []);
            }
        } catch (err) {
            console.error('Failed to load convener data:', err);
        }
        setLoading(false);
    }, [getToken, router, page, search, statusFilter, typeFilter]);

    useEffect(() => {
        const token = getToken();
        const user = localStorage.getItem('user');
        if (!token || !user) {
            router.push('/admin/login');
            return;
        }
        const parsed = JSON.parse(user);
        if (parsed.role !== 'convener') {
            router.push('/admin/login');
            return;
        }
        setUserInfo(parsed);
        loadData();
    }, [router, getToken, loadData]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        router.push('/admin/login');
    };

    if (loading && !stats) {
        return (
            <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-foreground/60 font-medium animate-pulse">Initializing Management Console...</p>
            </div>
        );
    }

    const tabs = [
        { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={18} /> },
        { id: 'participants', label: 'Participants', icon: <Users size={18} /> },
        { id: 'payments', label: 'Payments', icon: <CreditCard size={18} /> },
        { id: 'papers', label: 'Papers', icon: <FileText size={18} /> },
        { id: 'management', label: 'System', icon: <Settings size={18} /> },
        { id: 'audit', label: 'Audit', icon: <Shield size={18} /> },
    ];

    return (
        <div className="min-h-screen bg-muted/30">
            {/* Main Header */}
            <header className="bg-white border-b border-border sticky top-0 z-40 backdrop-blur-md bg-white/80">
                <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="bg-primary p-2 rounded-lg shadow-lg shadow-primary/20">
                            <Shield className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black text-foreground tracking-tight">Convener Dashboard</h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                <p className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Super Admin Console</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-right mr-2">
                            <p className="text-sm font-bold text-foreground">{userInfo?.name || 'Convener'}</p>
                            <p className="text-[10px] font-black text-primary uppercase">Conference Head</p>
                        </div>
                        <Button onClick={handleLogout} variant="ghost" className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 transition-all">
                            <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
                        </Button>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="container mx-auto px-4 overflow-x-auto no-scrollbar">
                    <div className="flex items-end gap-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative whitespace-nowrap ${activeTab === tab.id
                                        ? 'text-primary'
                                        : 'text-foreground/40 hover:text-foreground/70'
                                    }`}
                            >
                                {tab.icon}
                                {tab.label}
                                {activeTab === tab.id && (
                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-t-full shadow-[0_-2px_8px_rgba(var(--primary),0.5)]"></div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                {activeTab === 'overview' && stats && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <OverviewTab stats={stats} />
                    </div>
                )}

                {activeTab === 'participants' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ParticipantsTab
                            participants={participants}
                            onRefresh={() => loadData(true)}
                            page={page}
                            setPage={setPage}
                            limit={limit}
                            search={search}
                            setSearch={setSearch}
                            statusFilter={statusFilter}
                            setStatusFilter={setStatusFilter}
                            typeFilter={typeFilter}
                            setTypeFilter={setTypeFilter}
                            onApplyFilters={() => { setPage(1); loadData(true); }}
                        />
                    </div>
                )}

                {activeTab === 'payments' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <PaymentsTab />
                    </div>
                )}

                {activeTab === 'papers' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <PapersTab />
                    </div>
                )}

                {activeTab === 'management' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <ManagementTab />
                    </div>
                )}

                {activeTab === 'audit' && (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <AuditTab />
                    </div>
                )}
            </main>

            <footer className="container mx-auto px-4 py-8 border-t border-border mt-12">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-foreground/40 text-xs font-medium">
                    <p>© 2026 NIIS Conference Management System. All rights reserved.</p>
                    <div className="flex gap-6 uppercase tracking-widest">
                        <span className="hover:text-primary transition-colors cursor-help">Technical Support</span>
                        <span className="hover:text-primary transition-colors cursor-help">Security Policy</span>
                        <span className="hover:text-primary transition-colors cursor-help">Audit Trail Enabled</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
