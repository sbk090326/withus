'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
    Users,
    MapPin,
    MessageSquare,
    ShieldCheck,
    ArrowUpRight,
    TrendingUp,
    AlertCircle,
    UserPlus,
    Clock
} from 'lucide-react';
import { AdminSidebar } from './components/AdminSidebar';
import { palette, theme } from '@/app/components/design-system/constants';

const StatCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
        whileHover={{ y: -5 }}
        className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6"
    >
        <div className="flex items-center justify-between">
            <div className={`p-3 rounded-2xl ${color} bg-opacity-10`}>
                <Icon className={color.replace('bg-', 'text-')} size={24} />
            </div>
            <span className="flex items-center gap-1 text-[11px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded-lg">
                <TrendingUp size={12} />
                +{change}%
            </span>
        </div>
        <div>
            <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">{title}</p>
            <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{value}</h3>
        </div>
    </motion.div>
);

export default function AdminDashboard() {
    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                {/* Header */}
                <header className="flex items-center justify-between mb-16">
                    <div>
                        <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">어드민 대시보드</h2>
                        <p className="text-slate-500 font-bold">WithUs 플랫폼의 실시간 운영 현황을 확인하세요.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="px-6 py-3 rounded-2xl bg-white border border-slate-100 flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span className="text-sm font-black text-slate-900 tracking-tight">System Online</span>
                        </div>
                        <button className="px-8 py-3 rounded-2xl bg-orange-500 text-white font-black text-sm shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all">
                            운영 리포트 다운로드
                        </button>
                    </div>
                </header>

                {/* Stats Grid */}
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    <StatCard title="오늘 신규 가입" value="1,248" change="12" icon={UserPlus} color="bg-orange-500" />
                    <StatCard title="진행 중인 동행" value="456" change="8" icon={Users} color="bg-blue-500" />
                    <StatCard title="신규 게시글" value="3,210" change="24" icon={MessageSquare} color="bg-pink-500" />
                    <StatCard title="본인인증 대기" value="12" change="5" icon={ShieldCheck} color="bg-indigo-500" />
                </section>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Left: Pending Actions */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="flex items-center justify-between">
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">처리가 필요한 항목</h3>
                            <button className="text-sm font-black text-orange-500 flex items-center gap-1 hover:underline">
                                전체 보기 <ArrowUpRight size={14} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            {[
                                { type: 'identity', title: '허준호 님의 본인 인증 신청', time: '5분 전', status: 'pending' },
                                { type: 'report', title: '게시글 #1204 신고 접수 (부적절한 언어)', time: '12분 전', status: 'urgent' },
                                { type: 'promotion', title: '김민수 님의 "도쿄 힐링 코스" 승격 검토', time: '1시간 전', status: 'review' },
                            ].map((item, i) => (
                                <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 flex items-center justify-between hover:border-orange-200 transition-all cursor-pointer">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.status === 'urgent' ? 'bg-red-50 text-red-500' :
                                            item.status === 'review' ? 'bg-emerald-50 text-emerald-500' : 'bg-slate-50 text-slate-500'
                                            }`}>
                                            {item.type === 'identity' ? <ShieldCheck size={20} /> :
                                                item.type === 'report' ? <AlertCircle size={20} /> : <MapPin size={20} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">{item.title}</p>
                                            <p className="text-[11px] font-bold text-slate-400 mt-1 flex items-center gap-2">
                                                <Clock size={12} /> {item.time}
                                            </p>
                                        </div>
                                    </div>
                                    <button className="px-5 py-2 rounded-xl bg-slate-900 text-white text-[11px] font-black hover:bg-orange-500 transition-all">
                                        처리하기
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: Quick Notice Tools */}
                    <div className="space-y-8">
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">전체 공지 바로가기</h3>
                        <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl space-y-8 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                            <div className="space-y-4 relative z-10">
                                <p className="text-orange-400 text-[10px] font-black uppercase tracking-widest">Global Notice</p>
                                <h4 className="text-xl font-black text-white leading-tight">모든 유저에게 즉시 <br />공지사항을 발송합니다.</h4>
                                <p className="text-slate-400 text-xs font-bold leading-relaxed">작성된 공지는 커뮤니티 공지사항 탭과 <br />Web Push로 즉시 전달됩니다.</p>
                            </div>

                            <button className="w-full py-4 rounded-2xl bg-white text-slate-900 font-black text-sm flex items-center justify-center gap-2 hover:bg-orange-500 hover:text-white transition-all shadow-xl">
                                공지사항 작성하기
                                <ArrowUpRight size={18} />
                            </button>
                        </div>

                        {/* Tip for Admin */}
                        <div className="p-8 rounded-[2rem] bg-orange-50 border border-orange-100 flex gap-4">
                            <AlertCircle size={20} className="text-orange-500 shrink-0" />
                            <p className="text-xs font-bold text-orange-800 leading-relaxed">
                                <span className="block font-black mb-1">오늘의 운영 팁</span>
                                평균 본인인증 처리 속도가 평소보다 15% 늦어지고 있습니다. 대기열을 확인해주세요.
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
