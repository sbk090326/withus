'use client';

import React, { useState } from 'react';
import {
    ShieldAlert,
    AlertTriangle,
    CheckCircle2,
    XCircle,
    Clock,
    ExternalLink,
    MoreVertical,
    UserX,
    MessageSquare,
    Eye,
    Ban,
    Trash2
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { StatCard } from '../components/StatCard';
import { FilterTabs } from '../components/FilterTabs';
import { DataTable } from '../components/DataTable';

const initialReports = [
    {
        id: 1,
        type: 'Post',
        targetId: '#1204',
        targetTitle: '파리 동행 구해요 (급함!!)',
        reporter: 'traveler_99',
        reason: '부적절한 언어 및 욕설',
        severity: 'High',
        status: 'Pending',
        date: '10분 전'
    },
    {
        id: 2,
        type: 'User',
        targetId: 'scammer_user',
        targetTitle: '불법 환전 유도 유저',
        reporter: 'safety_first',
        reason: '사기 의심 및 금전 요구',
        severity: 'Urgent',
        status: 'Pending',
        date: '25분 전'
    },
    {
        id: 3,
        type: 'Comment',
        targetId: '#comment_88',
        targetTitle: '광고성 댓글 (불법 도박 사이트)',
        reporter: 'clean_withus',
        reason: '스팸 및 광고',
        severity: 'Medium',
        status: 'Resolved',
        date: '2시간 전'
    },
    {
        id: 4,
        type: 'Post',
        targetId: '#1198',
        targetTitle: '홍대 맛집 추천 리스트',
        reporter: 'user_123',
        reason: '허위 정보 게시',
        severity: 'Low',
        status: 'Dismissed',
        date: '5시간 전'
    }
];

export default function ReportManagementPage() {
    const [activeFilter, setActiveFilter] = useState('Pending');
    const [reports, setReports] = useState(initialReports);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredReports = reports.filter(r => {
        const matchesStatus = activeFilter === 'All' || r.status === activeFilter;
        const matchesSearch =
            r.targetTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.reporter.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.reason.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    const resolveReport = (id: number) => {
        if (confirm('이 신고를 해결 완료 처리하시겠습니까?')) {
            setReports(reports.map(r =>
                r.id === id ? { ...r, status: 'Resolved' } : r
            ));
        }
    };

    const dismissReport = (id: number) => {
        if (confirm('이 신고를 기각하시겠습니까?')) {
            setReports(reports.map(r =>
                r.id === id ? { ...r, status: 'Dismissed' } : r
            ));
        }
    };

    const deleteReport = (id: number) => {
        if (confirm('이 신고 내역을 삭제하시겠습니까?')) {
            setReports(reports.filter(r => r.id !== id));
        }
    };

    // Calculate statistics
    const pendingCount = reports.filter(r => r.status === 'Pending').length;
    const urgentCount = reports.filter(r => r.severity === 'Urgent' && r.status === 'Pending').length;
    const resolvedToday = reports.filter(r => r.status === 'Resolved' && r.date.includes('분') || r.date.includes('시간')).length;
    const totalActive = reports.filter(r => r.status === 'Pending').length;

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={ShieldAlert}
                    category="Platform Safety"
                    title="신고 센터"
                />

                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <StatCard title="Pending" value={pendingCount.toString()} icon={Clock} color="#f97316" />
                    <StatCard title="Urgent" value={urgentCount.toString()} icon={AlertTriangle} color="#ef4444" />
                    <StatCard title="Resolved today" value={resolvedToday.toString()} icon={CheckCircle2} color="#10b981" />
                    <StatCard title="Total active" value={totalActive.toString()} icon={ShieldAlert} color="#6366f1" />
                </section>

                <FilterTabs
                    tabs={['Pending', 'Resolved', 'Dismissed', 'All']}
                    activeTab={activeFilter}
                    onTabChange={setActiveFilter}
                    searchPlaceholder="신고된 대상, 신고자, 사유 검색..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <DataTable headers={['신고 대상', '신고 사유', '심각도', '상태', '접수 일시', '조치']}>
                    {filteredReports.map((report) => (
                        <tr key={report.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400">
                                        {report.type === 'Post' ? <Eye size={18} /> :
                                            report.type === 'Comment' ? <MessageSquare size={18} /> : <UserX size={18} />}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 line-clamp-1">{report.targetTitle}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{report.type} {report.targetId}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div>
                                    <p className="text-sm font-bold text-slate-700">{report.reason}</p>
                                    <p className="text-[10px] font-bold text-slate-400 mt-0.5">신고자: {report.reporter}</p>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${report.severity === 'Urgent' ? 'bg-red-500 text-white shadow-sm' :
                                        report.severity === 'High' ? 'bg-red-50 text-red-600' :
                                            report.severity === 'Medium' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {report.severity}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <div className="flex items-center justify-center gap-1.5 text-[10px] font-black uppercase text-slate-400">
                                    {report.status === 'Resolved' ? <CheckCircle2 size={14} className="text-emerald-500" /> :
                                        report.status === 'Dismissed' ? <XCircle size={14} /> : <Clock size={14} className="text-orange-500" />}
                                    {report.status}
                                </div>
                            </td>
                            <td className="px-8 py-6 text-sm font-bold text-slate-400">{report.date}</td>
                            <td className="px-8 py-6">
                                <div className="flex items-center justify-center gap-2">
                                    {report.status === 'Pending' && (
                                        <>
                                            <button
                                                onClick={() => resolveReport(report.id)}
                                                className="p-2.5 rounded-xl text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                                                title="해결 완료"
                                            >
                                                <CheckCircle2 size={18} />
                                            </button>
                                            <button
                                                onClick={() => dismissReport(report.id)}
                                                className="p-2.5 rounded-xl text-slate-400 hover:text-orange-500 hover:bg-orange-50 transition-all"
                                                title="기각"
                                            >
                                                <Ban size={18} />
                                            </button>
                                        </>
                                    )}
                                    <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all" title="상세보기">
                                        <ExternalLink size={18} />
                                    </button>
                                    <button
                                        onClick={() => deleteReport(report.id)}
                                        className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                        title="삭제"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                    <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </DataTable>

                {filteredReports.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <ShieldAlert size={32} className="text-slate-300" />
                        </div>
                        <p className="text-lg font-black text-slate-400">검색 결과가 없습니다</p>
                        <p className="text-sm font-bold text-slate-300 mt-2">다른 검색어나 필터를 시도해보세요</p>
                    </div>
                )}
            </main>
        </div>
    );
}
