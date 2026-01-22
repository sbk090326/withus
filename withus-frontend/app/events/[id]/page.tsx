'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { ChevronLeft, Calendar, Users, Share2, Heart, Gift, Info, CheckCircle2, ArrowRight, Sparkles, ChevronRight } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

const MOCK_EVENTS = [
    {
        id: 1,
        title: '신규 가입하고 첫 동행 지원금 받으세요! 💰',
        description: '지금 WithUs에 가입하고 첫 동행을 성공적으로 완료하면 10,000 포인트를 증정합니다.',
        fullContent: '안녕하세요 위더스입니다! 신규 회원님들의 성공적인 첫 여행을 응원하기 위해 특별한 이벤트를 준비했습니다. 가입 후 첫 동행을 구인하거나 참여하여 여행을 완주하신 모든 분들께 쇼핑, 예약 등에 즉시 사용 가능한 포인트를 드립니다.',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=1200',
        date: '2026.01.01 - 2026.03.31',
        category: 'SUPPORT',
        participants: '1,245',
        rewards: ['10,000 포인트 즉시 지급', '웰컴 쿠폰팩 3종', '첫 동행 배지'],
        steps: [
            '위더스 회원가입 완료',
            '원하는 여행지에서 동행 구인 또는 신청',
            '실제 여행 완료 후 후기 작성',
            '포인트 자동 지급 확인'
        ]
    },
    {
        id: 2,
        title: '겨울 유럽 여행 메이트 특별 혜택 ❄️',
        description: '유럽 지역 동행 매칭 시 유레일 패스 20% 할인권과 현지 맛집 바우처를 드립니다.',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=1200',
        date: '2025.12.01 - 2026.02.28',
        category: 'TRAVEL',
        participants: '856'
    }
];

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const eventId = Number(params.id);

    // Find event from mock data (default to first if not found for demo)
    const event = MOCK_EVENTS.find(e => e.id === eventId) || MOCK_EVENTS[0];

    return (
        <main className="min-h-screen pb-32" style={{ backgroundColor: palette.cream.base }}>
            {/* 1. Sticky Mini Header */}
            <div className="fixed top-8 left-0 right-0 z-[100] px-6 transition-all duration-300 pointer-events-none">
                <div className="max-w-[1240px] mx-auto py-4 flex items-center justify-between pointer-events-auto">
                    <button
                        onClick={() => router.back()}
                        className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900 shadow-sm transition-all shadow-slate-200/20"
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <div className="flex gap-3">
                        <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-white transition-all shadow-sm">
                            <Share2 size={20} />
                        </button>
                        <button className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:text-pink-500 transition-all shadow-sm">
                            <Heart size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 2. Hero Background (Large Image) */}
            <div className="relative w-full h-[500px] overflow-hidden">
                <motion.img
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 10, ease: "linear" }}
                    src={event.image}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 px-6 pb-16">
                    <div className="max-w-[1240px] mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <span className="px-4 py-1.5 rounded-full bg-orange-500 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/30">
                                {event.category}
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight max-w-4xl">
                                {event.title}
                            </h1>
                            <div className="flex flex-wrap items-center gap-6 text-white/80">
                                <div className="flex items-center gap-2">
                                    <Calendar size={18} className="text-orange-400" />
                                    <span className="text-sm font-bold">{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={18} className="text-orange-400" />
                                    <span className="text-sm font-bold">{event.participants}명 참여 중</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* 3. Main Content Content Container */}
            <div className="max-w-[1240px] mx-auto px-6 -mt-10 relative z-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left: Detail Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Summary Card */}
                        <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl shadow-slate-300/10">
                            <h3 className="text-2xl font-black text-slate-900 mb-6 flex items-center gap-3">
                                <Sparkles className="text-orange-500" />
                                이벤트 소개
                            </h3>
                            <p className="text-lg text-slate-600 leading-relaxed font-medium">
                                {event.fullContent || event.description}
                            </p>
                        </div>

                        {/* Steps Section */}
                        <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                            <h3 className="text-2xl font-black text-slate-900 mb-8">참여 방법</h3>
                            <div className="space-y-6">
                                {(event.steps || ['신청하기 클릭', '본인 인증 완료', '이벤트 참여 확정']).map((step, idx) => (
                                    <div key={idx} className="flex items-start gap-5 group">
                                        <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 font-black text-lg group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all shrink-0">
                                            {idx + 1}
                                        </div>
                                        <div className="pt-2 flex-1 border-b border-slate-50 pb-4 group-last:border-0">
                                            <p className="text-lg font-bold text-slate-700">{step}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notice Section */}
                        <div className="p-8 rounded-[32px] bg-slate-100/50 border border-slate-200/50">
                            <div className="flex items-center gap-3 mb-4 text-slate-500">
                                <Info size={18} />
                                <h4 className="text-sm font-black uppercase tracking-widest">유의사항</h4>
                            </div>
                            <ul className="space-y-2">
                                <li className="text-sm text-slate-500 font-medium leading-relaxed">• 본 이벤트는 계정당 1회만 참여 가능합니다.</li>
                                <li className="text-sm text-slate-500 font-medium leading-relaxed">• 부정한 방법으로 참여 시 당첨이 취소될 수 있습니다.</li>
                                <li className="text-sm text-slate-500 font-medium leading-relaxed">• 지급된 포인트의 유효기간은 지급일로부터 1년입니다.</li>
                            </ul>
                        </div>
                    </div>

                    {/* Right: Floating Participation Menu */}
                    <div className="relative">
                        <div className="sticky top-40 space-y-6">
                            {/* Rewards Card */}
                            <div className="bg-slate-900 rounded-[40px] p-10 text-white overflow-hidden relative shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[60px] -mr-16 -mt-16" />

                                <h4 className="text-sm font-black text-orange-400 uppercase tracking-widest mb-8">EVENT REWARDS</h4>
                                <div className="space-y-5">
                                    {(event.rewards || ['이벤트 포인트', '한정판 엠블럼']).map((reward, idx) => (
                                        <div key={idx} className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-orange-400 shrink-0">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <span className="text-lg font-bold">{reward}</span>
                                        </div>
                                    ))}
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full h-16 rounded-[24px] bg-white text-slate-900 font-black text-lg mt-12 hover:bg-orange-500 hover:text-white transition-all shadow-xl flex items-center justify-center gap-3"
                                >
                                    <span>지금 즉시 신청하기</span>
                                    <ArrowRight size={20} strokeWidth={3} />
                                </motion.button>

                                <p className="text-center text-white/40 text-[11px] font-bold mt-6 tracking-tight">
                                    현재 85명이 실시간으로 보고 있습니다 👁️
                                </p>
                            </div>

                            {/* Help Box */}
                            <div className="bg-white rounded-[32px] p-6 border border-slate-100 flex items-center justify-between group cursor-pointer hover:border-orange-200 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500 transition-all">
                                        <Gift size={24} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">도움이 필요하신가요?</p>
                                        <p className="text-xs text-slate-400 font-medium">1:1 고객센터 문의하기</p>
                                    </div>
                                </div>
                                <ChevronRight size={20} className="text-slate-300 group-hover:text-slate-900 transition-all" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
