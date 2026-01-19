'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    Calendar,
    BarChart3,
    PieChart,
    Download,
    Hotel,
    Plane,
    Train,
    Ticket,
    ArrowRight,
    Users,
    Filter,
    CheckCircle2,
    Clock,
    XCircle
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { StatCard } from '../components/StatCard';

const revenueData = [
    { month: '8월', value: 850 },
    { month: '9월', value: 920 },
    { month: '10월', value: 880 },
    { month: '11월', value: 1100 },
    { month: '12월', value: 1450 },
    { month: '1월', value: 1680 },
];

const categoryRevenue = [
    { name: '숙소 예약', value: 42, color: 'bg-indigo-500', icon: Hotel },
    { name: '투어/액티비티', value: 28, color: 'bg-orange-500', icon: Ticket },
    { name: '항공권 연동', value: 18, color: 'bg-blue-500', icon: Plane },
    { name: '기차/교통', value: 12, color: 'bg-pink-500', icon: Train },
];

const initialCommissions = [
    { id: 1024, user: "john_doe", product: "에펠탑 투어 패키지", price: 120000, commission: 14400, time: "10분 전", status: "Confirmed" },
    { id: 1023, user: "kim_travel", product: "도쿄 시티 호텔", price: 450000, commission: 36000, time: "45분 전", status: "Pending" },
    { id: 1022, user: "lee_world", product: "삿포로 항공권", price: 380000, commission: 11400, time: "2시간 전", status: "Confirmed" },
    { id: 1021, user: "park_trip", product: "유로스타 티켓", price: 98000, commission: 4900, time: "5시간 전", status: "Canceled" },
];

export default function RevenueAnalyticsPage() {
    const [period, setPeriod] = useState('Monthly');
    const [commissions, setCommissions] = useState(initialCommissions);
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredCommissions = commissions.filter(c =>
        statusFilter === 'All' || c.status === statusFilter
    );

    // Calculate statistics
    const totalRevenue = commissions
        .filter(c => c.status === 'Confirmed')
        .reduce((sum, c) => sum + c.commission, 0);

    const avgCommission = commissions.length > 0
        ? Math.round(commissions.reduce((sum, c) => sum + c.commission, 0) / commissions.length)
        : 0;

    const totalOrders = commissions.filter(c => c.status !== 'Canceled').length;
    const confirmedOrders = commissions.filter(c => c.status === 'Confirmed').length;
    const conversionRate = totalOrders > 0
        ? ((confirmedOrders / totalOrders) * 100).toFixed(2)
        : '0.00';

    const activeAffiliates = 8; // This would come from affiliates data

    const handleExportPDF = () => {
        alert('PDF 리포트가 생성되었습니다!\n(실제 환경에서는 PDF 다운로드가 시작됩니다)');
    };

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={DollarSign}
                    category="Financial Portfolio"
                    title="수익 총괄 현황"
                    action={
                        <div className="flex gap-4">
                            <div className="bg-white border border-slate-200 rounded-2xl p-1 flex">
                                {['Daily', 'Weekly', 'Monthly'].map((p) => (
                                    <button
                                        key={p}
                                        onClick={() => setPeriod(p)}
                                        className={`px-6 py-2 rounded-xl text-xs font-black transition-all ${period === p ? 'bg-slate-900 text-white shadow-md' : 'text-slate-500 hover:bg-slate-50'}`}
                                    >
                                        {p}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={handleExportPDF}
                                className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-orange-500 text-white font-black text-sm shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
                            >
                                <Download size={18} />
                                PDF 리포트
                            </button>
                        </div>
                    }
                />

                <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <StatCard
                        title="Total Revenue(1월)"
                        value={`₩${(totalRevenue / 1000000).toFixed(1)}M`}
                        change="15.4"
                        isPositive={true}
                        icon={DollarSign}
                        color="#10b981"
                    />
                    <StatCard
                        title="Average Commission"
                        value={`₩${(avgCommission / 1000).toFixed(1)}k`}
                        change="2.1"
                        isPositive={true}
                        icon={TrendingUp}
                        color="#3b82f6"
                    />
                    <StatCard
                        title="Booking Conversion"
                        value={`${conversionRate}%`}
                        change="0.8"
                        isPositive={false}
                        icon={BarChart3}
                        color="#f97316"
                    />
                    <StatCard
                        title="Active Affiliates"
                        value={`${activeAffiliates}/12`}
                        change="1"
                        isPositive={true}
                        icon={Users}
                        color="#6366f1"
                    />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    {/* Revenue Growth Chart */}
                    <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <BarChart3 size={20} className="text-blue-500" />
                                수익 성장 추이
                            </h3>
                            <span className="text-xs font-bold text-slate-400 italic">Values in KRW (Millions)</span>
                        </div>

                        <div className="flex items-end justify-between h-64 gap-4 px-4 pt-10">
                            {revenueData.map((data, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                    <div className="w-full relative">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(data.value / 1800) * 100}%` }}
                                            className={`w-full rounded-t-2xl transition-all duration-500 relative ${i === revenueData.length - 1 ? 'bg-orange-500 shadow-lg shadow-orange-500/20' : 'bg-slate-100 group-hover:bg-slate-200'}`}
                                        >
                                            <div className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-black px-2 py-1 rounded-lg whitespace-nowrap">
                                                {data.value}M
                                            </div>
                                        </motion.div>
                                    </div>
                                    <span className="text-[11px] font-black text-slate-400">{data.month}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Category Revenue Share */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center gap-3 mb-10">
                            <div className="p-2.5 rounded-xl bg-orange-500 text-white">
                                <PieChart size={20} />
                            </div>
                            <h3 className="text-xl font-black text-slate-900 tracking-tight">서비스별 기여도</h3>
                        </div>

                        <div className="space-y-6 flex-1 flex flex-col justify-center">
                            {categoryRevenue.map((cat, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex items-center justify-between text-xs font-black">
                                        <div className="flex items-center gap-3 text-slate-600">
                                            <cat.icon size={14} className={cat.color.replace('bg-', 'text-')} />
                                            {cat.name}
                                        </div>
                                        <span className="text-slate-900">{cat.value}%</span>
                                    </div>
                                    <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${cat.value}%` }}
                                            className={`h-full ${cat.color} rounded-full`}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 p-6 rounded-2xl bg-slate-50 border border-slate-100">
                            <div className="flex items-center gap-3 mb-2">
                                <TrendingUp size={16} className="text-orange-500" />
                                <p className="text-xs font-black text-slate-900 tracking-tight">Insight of January</p>
                            </div>
                            <p className="text-[11px] font-bold text-slate-500 leading-relaxed">
                                숙소 예약 전환율이 투어 패키지보다 2.4배 높습니다. 관련 에디토리얼 가이드를 확장하는 것이 유리합니다.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Commission Log */}
                <section className="bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl font-black text-slate-900">최근 수익 발생 내역</h3>
                            <div className="flex gap-2">
                                {['All', 'Confirmed', 'Pending', 'Canceled'].map(status => (
                                    <button
                                        key={status}
                                        onClick={() => setStatusFilter(status)}
                                        className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${statusFilter === status
                                                ? 'bg-slate-900 text-white'
                                                : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                            }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <button className="text-sm font-black text-orange-500 flex items-center gap-1 hover:underline">
                            전체 분석 데이터 보기 <ArrowRight size={14} />
                        </button>
                    </div>
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/30 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                <th className="px-8 py-5">Order ID</th>
                                <th className="px-8 py-5">Member</th>
                                <th className="px-8 py-5">Product Details</th>
                                <th className="px-8 py-5 text-right">Order Amount</th>
                                <th className="px-8 py-5 text-right text-emerald-600">Commission</th>
                                <th className="px-8 py-5 text-center">Status</th>
                                <th className="px-8 py-5">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredCommissions.map((log) => (
                                <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6 text-sm font-bold text-slate-400">#{log.id}</td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">👤</div>
                                            <span className="text-sm font-black text-slate-700">{log.user}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="text-sm font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{log.product}</span>
                                    </td>
                                    <td className="px-8 py-6 text-right text-sm font-bold text-slate-500">₩{log.price.toLocaleString()}</td>
                                    <td className="px-8 py-6 text-right text-sm font-black text-emerald-600">₩{log.commission.toLocaleString()}</td>
                                    <td className="px-8 py-6 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${log.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-600' :
                                                log.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-400'
                                            }`}>
                                            {log.status === 'Confirmed' && <CheckCircle2 size={10} className="inline mr-1" />}
                                            {log.status === 'Pending' && <Clock size={10} className="inline mr-1" />}
                                            {log.status === 'Canceled' && <XCircle size={10} className="inline mr-1" />}
                                            {log.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-[11px] font-bold text-slate-400">{log.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
}
