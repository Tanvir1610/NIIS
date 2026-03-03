'use client';
import { useState, useEffect } from 'react';
import { FileText, Search, Clock, Shield } from 'lucide-react';
import type { AuditLog } from '../types';

export default function AuditTab() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(50);
    const getToken = () => localStorage.getItem('token') || '';

    useEffect(() => { loadLogs(); }, []);

    async function loadLogs() {
        setLoading(true);
        try {
            const res = await fetch(`/api/audit?limit=${limit}`, {
                headers: { Authorization: `Bearer ${getToken()}` }
            });
            if (res.ok) {
                const data = await res.json();
                setLogs(data.data || []);
            }
        } catch (err) {
            console.error('Failed to load audit logs:', err);
        }
        setLoading(false);
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-border overflow-hidden animate-in fade-in">
            <div className="p-6 border-b border-border bg-muted/5 flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" /> System Audit Logs
                </h3>
                <div className="flex items-center gap-2">
                    <select
                        className="text-sm border border-border rounded-md px-2 py-1 bg-white"
                        value={limit}
                        onChange={(e) => {
                            setLimit(Number(e.target.value));
                            loadLogs();
                        }}
                    >
                        <option value="50">Last 50</option>
                        <option value="100">Last 100</option>
                        <option value="200">Last 200</option>
                    </select>
                    <button
                        onClick={loadLogs}
                        className="text-xs bg-primary/10 text-primary px-3 py-1.5 rounded-md hover:bg-primary/20 transition-colors"
                    >
                        Refresh
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto max-h-[calc(100vh-20rem)]">
                {loading ? (
                    <div className="p-12 text-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                        <p className="text-foreground/60">Loading logs...</p>
                    </div>
                ) : (
                    <table className="w-full text-sm text-left">
                        <thead className="bg-muted/10 text-foreground/60 font-semibold sticky top-0 z-10 backdrop-blur-md">
                            <tr>
                                <th className="p-4 border-b border-border">Performed By</th>
                                <th className="p-4 border-b border-border">Role</th>
                                <th className="p-4 border-b border-border">Action</th>
                                <th className="p-4 border-b border-border">Details</th>
                                <th className="p-4 border-b border-border">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {logs.map((log) => (
                                <tr key={log._id} className="hover:bg-muted/30 transition-colors">
                                    <td className="p-4">
                                        <div className="font-medium text-foreground">{log.performedBy.name}</div>
                                        <div className="text-xs text-foreground/50">{log.performedBy.email}</div>
                                    </td>
                                    <td className="p-4 capitalize text-xs">
                                        <span className={`px-2 py-0.5 rounded-full border ${log.role === 'convener' ? 'bg-purple-50 text-purple-700 border-purple-100' :
                                                log.role === 'accountant' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                                                    'bg-teal-50 text-teal-700 border-teal-100'
                                            }`}>
                                            {log.role.replace('_', ' ')}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className="font-semibold text-primary">{log.action}</span>
                                    </td>
                                    <td className="p-4 max-w-md">
                                        <p className="text-foreground/70 break-words line-clamp-2" title={typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}>
                                            {typeof log.details === 'string' ? log.details : JSON.stringify(log.details)}
                                        </p>
                                    </td>
                                    <td className="p-4 text-xs text-foreground/50 font-mono whitespace-nowrap">
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-3 h-3" />
                                            {new Date(log.timestamp).toLocaleString('en-IN')}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="p-12 text-center text-foreground/40 bg-muted/5">
                                        <Shield className="w-12 h-12 mx-auto mb-3 opacity-20" />
                                        <p>No activity logs found.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
