'use client';

import React, { useState, useEffect } from 'react';
import {
    Link2,
    Plus,
    CheckCircle2,
    AlertCircle,
    XCircle,
    Activity,
    RefreshCw,
    Settings,
    ShieldCheck,
    ExternalLink,
    Clock,
    Zap,
    Key,
    Trash2,
    Play,
    Pause
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { StatCard } from '../components/StatCard';
import { DataTable } from '../components/DataTable';

const initialAffiliates = [
    {
        id: 1,
        name: "Agoda",
        logo: "🏨",
        status: "Connected",
        latency: 142,
        successRate: 99.9,
        lastSync: "3분 전",
        endpoints: 12,
        authStatus: "Verified",
        apiKey: "agoda_live_***********4f2a"
    },
    {
        id: 2,
        name: "Skyscanner",
        logo: "✈️",
        status: "Connected",
        latency: 256,
        successRate: 98.5,
        lastSync: "10분 전",
        endpoints: 8,
        authStatus: "Verified",
        apiKey: "sky_prod_***********8b1c"
    },
    {
        id: 3,
        name: "Klook",
        logo: "🎟️",
        status: "Issues",
        latency: 1200,
        successRate: 85.2,
        lastSync: "1시간 전",
        endpoints: 15,
        authStatus: "Re-auth Required",
        apiKey: "klook_api_***********9d3e"
    },
    {
        id: 4,
        name: "Trip.com",
        logo: "🚄",
        status: "Down",
        latency: 0,
        successRate: 0,
        lastSync: "24시간 전",
        endpoints: 6,
        authStatus: "Expired",
        apiKey: "trip_key_***********2a5f"
    }
];

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'Connected':
            return (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest">
                    <CheckCircle2 size={12} />
                    Connected
                </div>
            );
        case 'Issues':
            return (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest">
                    <AlertCircle size={12} />
                    Minor Issues
                </div>
            );
        case 'Down':
            return (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-red-600 text-[10px] font-black uppercase tracking-widest">
                    <XCircle size={12} />
                    Disconnected
                </div>
            );
        default:
            return null;
    }
};

export default function AffiliateManagementPage() {
    const [affiliates, setAffiliates] = useState(initialAffiliates);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);
    const [logs, setLogs] = useState([
        { time: '14:20:05', msg: 'Klook API Timeout (504)', type: 'error' as const },
        { time: '14:15:32', msg: 'Agoda Success Sync (200)', type: 'info' as const },
        { time: '14:02:11', msg: 'Skyscanner Rate Limit (429)', type: 'warn' as const }
    ]);

    const refreshAll = () => {
        setIsRefreshing(true);

        // Simulate API refresh
        setTimeout(() => {
            setAffiliates(affiliates.map(a => ({
                ...a,
                lastSync: '방금 전',
                latency: a.status === 'Down' ? a.latency : Math.floor(Math.random() * 300) + 100
            })));

            const newLog = {
                time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
                msg: 'System-wide refresh completed (200)',
                type: 'info' as const
            };
            setLogs([newLog, ...logs.slice(0, 9)]);

            setIsRefreshing(false);
        }, 2000);
    };

    const testConnection = (id: number) => {
        const partner = affiliates.find(a => a.id === id);
        if (!partner) return;

        const newLog = {
            time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
            msg: `${partner.name} connection test initiated`,
            type: 'info' as const
        };
        setLogs([newLog, ...logs.slice(0, 9)]);

        // Simulate connection test
        setTimeout(() => {
            const testResult = {
                time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
                msg: `${partner.name} test ${partner.status === 'Down' ? 'failed (503)' : 'successful (200)'}`,
                type: partner.status === 'Down' ? 'error' as const : 'info' as const
            };
            setLogs([testResult, ...logs.slice(0, 9)]);
        }, 1500);
    };

    const deletePartner = (id: number) => {
        const partner = affiliates.find(a => a.id === id);
        if (confirm(`정말 ${partner?.name} 제휴사를 삭제하시겠습니까?`)) {
            setAffiliates(affiliates.filter(a => a.id !== id));

            const newLog = {
                time: new Date().toLocaleTimeString('ko-KR', { hour12: false }),
                msg: `${partner?.name} partner removed from system`,
                type: 'warn' as const
            };
            setLogs([newLog, ...logs.slice(0, 9)]);
        }
    };

    // Calculate statistics
    const avgLatency = Math.round(
        affiliates.filter(a => a.latency > 0).reduce((sum, a) => sum + a.latency, 0) /
        affiliates.filter(a => a.latency > 0).length
    );

    const avgSuccessRate = (
        affiliates.reduce((sum, a) => sum + a.successRate, 0) / affiliates.length
    ).toFixed(1);

    const errorRate = (100 - parseFloat(avgSuccessRate)).toFixed(2);

    const expiringCredentials = affiliates.filter(a =>
        a.authStatus === 'Re-auth Required' || a.authStatus === 'Expired'
    ).length;

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={Link2}
                    category="System Architecture"
                    title="제휴사 API 연동 관리"
                    action={
                        <div className="flex gap-4">
                            <button
                                onClick={refreshAll}
                                disabled={isRefreshing}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-400 transition-all disabled:opacity-50"
                            >
                                <RefreshCw size={18} className={isRefreshing ? 'animate-spin' : ''} />
                                {isRefreshing ? '새로고침 중...' : '전체 상태 새로고침'}
                            </button>
                            <button
                                onClick={() => setShowAddModal(true)}
                                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                            >
                                <Plus size={20} />
                                신규 제휴사 추가
                            </button>
                        </div>
                    }
                />

                <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <StatCard
                        title="Average System Latency"
                        value={`${avgLatency} ms`}
                        subtitle={avgLatency < 300 ? "Healthy" : "Needs optimization"}
                        icon={Activity}
                        color="#10b981"
                    />
                    <StatCard
                        title="API Error Rate (24h)"
                        value={`${errorRate} %`}
                        subtitle={parseFloat(errorRate) < 1 ? "Excellent" : "Optimization Needed"}
                        icon={Zap}
                        color="#f97316"
                    />
                    <StatCard
                        title="Upcoming Credential Expiry"
                        value={`${expiringCredentials} Partners`}
                        subtitle={expiringCredentials === 0 ? "All secured" : "Action required"}
                        icon={ShieldCheck}
                        color="#6366f1"
                    />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xl font-black text-slate-900">제휴 파트너 리스트</h3>
                                    <span className="px-3 py-1 rounded-full bg-slate-50 text-slate-400 text-[10px] font-black uppercase">total {affiliates.length} partners</span>
                                </div>
                            </div>
                            <DataTable headers={['Partner', 'Connection Status', 'Latency', 'Success Rate', 'Last Sync', 'Actions']}>
                                {affiliates.map((partner) => (
                                    <tr key={partner.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-xl">
                                                    {partner.logo}
                                                </div>
                                                <div>
                                                    <p className="font-black text-slate-900">{partner.name}</p>
                                                    <p className="text-[10px] font-bold text-slate-400">{partner.endpoints} Endpoints active</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <StatusBadge status={partner.status} />
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className={`text-sm font-bold ${partner.latency === 0 ? 'text-slate-300' :
                                                    partner.latency < 300 ? 'text-emerald-600' :
                                                        partner.latency < 600 ? 'text-orange-600' : 'text-red-600'
                                                }`}>
                                                {partner.latency === 0 ? 'N/A' : `${partner.latency}ms`}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <div className="flex flex-col items-center gap-1">
                                                <span className="text-sm font-black text-slate-900">{partner.successRate}%</span>
                                                <div className="w-16 h-1 bg-slate-100 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full ${partner.successRate > 95 ? 'bg-emerald-500' : partner.successRate > 85 ? 'bg-orange-500' : 'bg-red-500'}`}
                                                        style={{ width: `${partner.successRate}%` }}
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock size={14} />
                                                <span className="text-xs font-bold">{partner.lastSync}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => testConnection(partner.id)}
                                                    className="p-2.5 rounded-xl text-slate-400 hover:text-blue-500 hover:bg-blue-50 transition-all"
                                                    title="Test Connection"
                                                >
                                                    <Activity size={18} />
                                                </button>
                                                <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all" title="Settings">
                                                    <Settings size={18} />
                                                </button>
                                                <button
                                                    onClick={() => deletePartner(partner.id)}
                                                    className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                                    title="Remove"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </DataTable>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 shadow-xl">
                            <div className="flex items-center gap-3">
                                <Key size={20} className="text-orange-500" />
                                <h3 className="text-lg font-black tracking-tight">API Key Security</h3>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed font-bold">
                                보안을 위해 3개월 주기로 API Key 갱신을 권장합니다. 현재 <span className="text-orange-500">{expiringCredentials}개</span>의 파트너사가 갱신 대상입니다.
                            </p>
                            <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-sm flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all">
                                전체 키 일괄 점검
                                <ExternalLink size={18} />
                            </button>
                        </div>

                        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <AlertCircle size={16} className="text-orange-500" />
                                Recent Network Logs
                            </h3>
                            <div className="space-y-4 max-h-80 overflow-y-auto">
                                {logs.map((log, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <span className="text-[10px] font-bold text-slate-300 whitespace-nowrap">{log.time}</span>
                                        <p className={`text-[11px] font-bold leading-tight ${log.type === 'error' ? 'text-red-500' :
                                                log.type === 'warn' ? 'text-orange-500' : 'text-slate-500'
                                            }`}>
                                            {log.msg}
                                        </p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full py-3 rounded-xl bg-slate-50 text-slate-400 text-[10px] font-black uppercase hover:bg-slate-100 transition-all">
                                view full network logs
                            </button>
                        </div>
                    </div>
                </div>

                {/* Add Partner Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-8">
                        <div className="bg-white rounded-[3rem] max-w-2xl w-full shadow-2xl">
                            <div className="p-10 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">신규 제휴사 추가</h3>
                                        <p className="text-sm font-bold text-slate-400">새로운 API 파트너를 연동하세요</p>
                                    </div>
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="p-3 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                    >
                                        <XCircle size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-10 space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">제휴사 이름</label>
                                    <input
                                        type="text"
                                        placeholder="예: Booking.com"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">API Base URL</label>
                                    <input
                                        type="url"
                                        placeholder="https://api.partner.com/v1"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">API Key</label>
                                    <input
                                        type="password"
                                        placeholder="••••••••••••••••"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Endpoints</label>
                                        <input
                                            type="number"
                                            placeholder="10"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">Emoji Icon</label>
                                        <input
                                            type="text"
                                            placeholder="🏨"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="p-10 border-t border-slate-100 flex gap-4">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black text-sm hover:bg-slate-200 transition-all"
                                >
                                    취소
                                </button>
                                <button className="flex-1 px-6 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm hover:scale-105 transition-all shadow-xl">
                                    제휴사 추가
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
