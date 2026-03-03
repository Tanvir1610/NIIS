'use client';
import { Users, FileText, CheckCircle, Clock, TrendingUp, CreditCard, AlertCircle } from 'lucide-react';
import type { Stats } from '../types';

export default function OverviewTab({ stats }: { stats: Stats }) {
    return (
        <div className="space-y-8">
            {/* Top 8 Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Revenue" value={`₹${(stats.totalRevenue || 0).toLocaleString('en-IN')}`} sub={`${stats.verifiedPayments || 0} verified payments`} icon={<CreditCard className="w-6 h-6" />} color="green" />
                <StatCard title="Total Participants" value={stats.totalParticipants || 0} sub={`${stats.todayRegistrations || 0} today`} icon={<Users className="w-6 h-6" />} color="blue" />
                <StatCard title="Pending Payments" value={stats.pendingPayments || 0} sub="Action required" icon={<Clock className="w-6 h-6" />} color="orange" />
                <StatCard title="Total Papers" value={stats.totalPapers || 0} sub={`Across ${Object.keys(stats.byTrack || {}).length} tracks`} icon={<FileText className="w-6 h-6" />} color="purple" />
                <StatCard title="Total Presenters" value={stats.totalPresenters || 0} sub="Paper authors" icon={<TrendingUp className="w-6 h-6" />} color="indigo" />
                <StatCard title="Total Students" value={stats.totalStudents || 0} sub="Student registrations" icon={<Users className="w-6 h-6" />} color="teal" />
                <StatCard title="Verified Payments" value={stats.verifiedPayments || 0} sub={`${stats.rejectedPayments || 0} rejected`} icon={<CheckCircle className="w-6 h-6" />} color="emerald" />
                <StatCard title="Today Registrations" value={stats.todayRegistrations || 0} sub="New today" icon={<AlertCircle className="w-6 h-6" />} color="cyan" />
            </div>

            {/* Revenue Breakdown */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Revenue by Track */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><FileText className="w-5 h-5 text-accent" /> Revenue by Track</h3>
                    {stats.revenueByTrack && stats.revenueByTrack.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-border text-foreground/60">
                                <th className="text-left py-2 font-medium">Track</th>
                                <th className="text-right py-2 font-medium">Revenue</th>
                                <th className="text-right py-2 font-medium">Count</th>
                            </tr></thead>
                            <tbody>
                                {stats.revenueByTrack.map((r, i) => (
                                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                                        <td className="py-2.5 pr-2 max-w-[200px] truncate" title={r.track}>{r.track?.split(':')[0] || 'N/A'}</td>
                                        <td className="py-2.5 text-right font-mono font-semibold text-green-700">₹{(r.revenue || 0).toLocaleString('en-IN')}</td>
                                        <td className="py-2.5 text-right text-foreground/60">{r.count}</td>
                                    </tr>
                                ))}
                                <tr className="font-bold bg-muted/10">
                                    <td className="py-2.5">Total</td>
                                    <td className="py-2.5 text-right font-mono text-green-700">₹{stats.revenueByTrack.reduce((a, b) => a + (b.revenue || 0), 0).toLocaleString('en-IN')}</td>
                                    <td className="py-2.5 text-right">{stats.revenueByTrack.reduce((a, b) => a + (b.count || 0), 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : <p className="text-foreground/40 text-sm">No revenue data yet</p>}
                </div>

                {/* Revenue by Type */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Revenue by Participant Type</h3>
                    {stats.revenueByType && stats.revenueByType.length > 0 ? (
                        <table className="w-full text-sm">
                            <thead><tr className="border-b border-border text-foreground/60">
                                <th className="text-left py-2 font-medium">Type</th>
                                <th className="text-right py-2 font-medium">Revenue</th>
                                <th className="text-right py-2 font-medium">Count</th>
                            </tr></thead>
                            <tbody>
                                {stats.revenueByType.map((r, i) => (
                                    <tr key={i} className="border-b border-border/50 hover:bg-muted/30">
                                        <td className="py-2.5 capitalize font-medium">{r._id}</td>
                                        <td className="py-2.5 text-right font-mono font-semibold text-green-700">₹{(r.total || 0).toLocaleString('en-IN')}</td>
                                        <td className="py-2.5 text-right text-foreground/60">{r.count}</td>
                                    </tr>
                                ))}
                                <tr className="font-bold bg-muted/10">
                                    <td className="py-2.5">Total</td>
                                    <td className="py-2.5 text-right font-mono text-green-700">₹{stats.revenueByType.reduce((a, b) => a + (b.total || 0), 0).toLocaleString('en-IN')}</td>
                                    <td className="py-2.5 text-right">{stats.revenueByType.reduce((a, b) => a + (b.count || 0), 0)}</td>
                                </tr>
                            </tbody>
                        </table>
                    ) : <p className="text-foreground/40 text-sm">No revenue data yet</p>}
                </div>
            </div>

            {/* Registration Distribution */}
            <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                    <h3 className="font-bold text-lg mb-4">Registration by Type</h3>
                    <div className="space-y-3">
                        {Object.entries(stats.byType || {}).map(([type, count]) => (
                            <div key={type}>
                                <div className="flex justify-between mb-1"><span className="capitalize text-sm font-medium">{type}</span><span className="text-sm font-bold">{count}</span></div>
                                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-primary transition-all duration-1000" style={{ width: `${(count / (stats.totalParticipants || 1)) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm border border-border">
                    <h3 className="font-bold text-lg mb-4">Submissions by Track</h3>
                    <div className="space-y-3">
                        {Object.entries(stats.byTrack || {}).map(([track, count]) => (
                            <div key={track}>
                                <div className="flex justify-between mb-1"><span className="text-sm font-medium truncate w-2/3" title={track}>{track.split(':')[0]}</span><span className="text-sm font-bold">{count}</span></div>
                                <div className="w-full h-3 bg-muted rounded-full overflow-hidden">
                                    <div className="h-full bg-accent transition-all duration-1000" style={{ width: `${(count / (stats.totalParticipants || 1)) * 100}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, sub, icon, color }: { title: string; value: any; sub: string; icon: React.ReactNode; color: string }) {
    const colors: Record<string, string> = {
        green: 'bg-green-50 text-green-600', blue: 'bg-blue-50 text-blue-600', orange: 'bg-orange-50 text-orange-600',
        purple: 'bg-purple-50 text-purple-600', indigo: 'bg-indigo-50 text-indigo-600', teal: 'bg-teal-50 text-teal-600',
        emerald: 'bg-emerald-50 text-emerald-600', cyan: 'bg-cyan-50 text-cyan-600',
    };
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-border transition-transform hover:-translate-y-1 duration-300">
            <div className="flex justify-between items-start mb-3">
                <div><p className="text-sm font-medium text-foreground/60 uppercase tracking-wide">{title}</p><h3 className="text-3xl font-extrabold text-foreground mt-1">{value}</h3></div>
                <div className={`p-3 rounded-xl ${colors[color] || 'bg-gray-50 text-gray-600'}`}>{icon}</div>
            </div>
            <div className={`text-xs font-medium ${colors[color]?.split(' ')[1] || 'text-gray-600'} ${colors[color]?.split(' ')[0] || 'bg-gray-50'} inline-block px-2 py-1 rounded`}>{sub}</div>
        </div>
    );
}
