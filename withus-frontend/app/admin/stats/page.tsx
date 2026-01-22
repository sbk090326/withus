'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
    BarChart3,
    TrendingUp,
    Users,
    MousePointer2,
    Clock,
    Globe,
    ArrowUpRight,
    ArrowDownRight,
    Map as MapIcon,
    Smartphone,
    Monitor,
    Share2,
    Calendar,
    Download
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';

const visitData = [
    { day: '월', visits: 4200, users: 3100 },
    { day: '화', visits: 4800, users: 3500 },
    { day: '수', visits: 5100, users: 3800 },
    { day: '목', visits: 4600, users: 3400 },
    { day: '금', visits: 5900, users: 4200 },
    { day: '토', visits: 7200, users: 5100 },
    { day: '일', visits: 6800, users: 4800 },
];

const topPages = [
    { name: '/destinations', title: '추천 여행지', views: '42.5k', change: '+12%' },
    { name: '/community/course', title: '여행 코스 게시판', views: '38.2k', change: '+24%' },
    { name: '/find-companion', title: '동행 찾기', views: '29.1k', change: '-5%' },
    { name: '/mypage', title: '마이페이지', views: '15.4k', change: '+8%' },
];

const trafficSources = [
    { name: 'Google Search', value: 45, color: 'bg-blue-500' },
    { name: 'Direct Access', value: 25, color: 'bg-indigo-500' },
    { name: 'Instagram / SNS', value: 20, color: 'bg-pink-500' },
    { name: 'Referral', value: 10, color: 'bg-slate-300' },
];

const StatCard = ({ title, value, change, isPositive, icon: Icon, color }: any) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10 ${color.replace('bg-', 'text-')}`}>
                <Icon size={24} />
            </div>
            <div className={`flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-lg ${isPositive ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {change}%
            </div>
        </div>
        <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
            <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
        </div>
    </div>
);

export default function TrafficStatsPage() {
    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <header className="flex items-center justify-between mb-12">
                    <div>
                        <div className="flex items-center gap-3 text-slate-400 mb-2">
                            <BarChart3 size={18} />
                            <span className="text-xs font-black uppercase tracking-widest">Growth Analytics</span>
                        </div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter">트래픽 통계</h2>
                    </div>

                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 font-bold text-sm hover:border-slate-400 transition-all">
                            <Calendar size={18} />
                            지난 7일
                        </button>
                        <button className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">
                            <Download size={18} />
                            데이터 추출
                        </button>
                    </div>
                </header>

                {/* Real-time Growth Stats */}
                <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <StatCard title="Daily Active Users" value="12,450" change="8.4" isPositive={true} icon={Users} color="bg-blue-500" />
                    <StatCard title="Page Views" value="84,200" change="12.1" isPositive={true} icon={MousePointer2} color="bg-orange-500" />
                    <StatCard title="Avg. Session Time" value="4m 32s" change="2.5" isPositive={false} icon={Clock} color="bg-indigo-500" />
                    <StatCard title="Bounce Rate" value="32.4%" change="5.2" isPositive={true} icon={TrendingUp} color="bg-emerald-500" />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    {/* Weekly Visitors Chart */}
                    <div className="lg:col-span-2 bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-10">
                        <div className="flex items-center justify-between">
                            <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                                <Activity size={20} className="text-blue-500" />
                                주간 방문자 추이
                            </h3>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" /> 총 방문 수
                                </div>
                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400">
                                    <div className="w-2 h-2 rounded-full bg-slate-200" /> 순 방문자
                                </div>
                            </div>
                        </div>

                        <div className="flex items-end justify-between h-72 gap-6 px-4">
                            {visitData.map((data, i) => (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group h-full justify-end">
                                    <div className="w-full flex items-end gap-1.5 h-full relative">
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(data.visits / 8000) * 100}%` }}
                                            className="flex-1 bg-blue-500/20 group-hover:bg-blue-500 rounded-t-xl transition-all duration-500"
                                        />
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${(data.users / 8000) * 100}%` }}
                                            className="flex-1 bg-slate-100 group-hover:bg-slate-200 rounded-t-xl transition-all duration-500"
                                        />
                                    </div>
                                    <span className="text-[11px] font-black text-slate-400">{data.day}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Popular Pages */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">인기 페이지 Top 4</h3>
                        <div className="space-y-6">
                            {topPages.map((page, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-transparent hover:border-slate-200 transition-all cursor-pointer">
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{page.title}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-0.5">{page.name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900">{page.views}</p>
                                        <span className={`text-[10px] font-black ${page.change.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {page.change}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full py-4 rounded-2xl border border-slate-100 text-slate-400 font-black text-[11px] uppercase tracking-widest hover:bg-slate-50 transition-all">
                            View All Page Stats
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Device Share */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <Smartphone size={18} className="text-pink-500" /> 접속 기기 비중
                        </h3>
                        <div className="space-y-6">
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-black">
                                    <span className="flex items-center gap-2 text-slate-600"><Smartphone size={14} /> Mobile</span>
                                    <span>72%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                    <div className="h-full bg-pink-500 w-[72%]" />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-xs font-black">
                                    <span className="flex items-center gap-2 text-slate-600"><Monitor size={14} /> Desktop</span>
                                    <span>28%</span>
                                </div>
                                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-300 w-[28%]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Traffic Source Share */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <Share2 size={18} className="text-indigo-500" /> 유입 경로 현황
                        </h3>
                        <div className="space-y-4">
                            {trafficSources.map((source, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className={`w-3 h-3 rounded-full ${source.color}`} />
                                    <span className="text-xs font-bold text-slate-600 flex-1">{source.name}</span>
                                    <span className="text-xs font-black text-slate-900">{source.value}%</span>
                                </div>
                            ))}
                        </div>
                        <div className="pt-4 border-t border-slate-50">
                            <p className="text-[10px] font-bold text-slate-400 leading-relaxed italic">
                                * 지난 주 대비 Google 검색 유입이 15% 증가했습니다. SEO 최적화가 원활히 진행 중입니다.
                            </p>
                        </div>
                    </div>

                    {/* Global Distribution (Mock Summary) */}
                    <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                        <h3 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                            <Globe size={18} className="text-emerald-500" /> 대륙별 방문 비중
                        </h3>
                        <div className="relative h-32 flex items-center justify-center">
                            {/* Mock Globe Visualization as a placeholder for a real map */}
                            <div className="w-32 h-32 rounded-full border-4 border-emerald-50 flex items-center justify-center relative">
                                <MapIcon size={48} className="text-emerald-100" />
                                <div className="absolute top-4 right-4 w-4 h-4 bg-emerald-500 rounded-full animate-ping" />
                                <div className="absolute bottom-8 left-2 w-3 h-3 bg-emerald-500/40 rounded-full" />
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-[11px] font-black text-slate-400">
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-slate-900">65%</span>
                                <span>Asia</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-slate-900">22%</span>
                                <span>Europe</span>
                            </div>
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-slate-900">13%</span>
                                <span>Others</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Minimal placeholder for Activity icon if not imported correctly
const Activity = ({ className, size }: { className?: string, size?: number }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size || 24}
        height={size || 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={className}
    >
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
    </svg>
);
