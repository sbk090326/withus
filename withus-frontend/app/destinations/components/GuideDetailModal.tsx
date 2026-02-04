'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, MapPin, Navigation, Calendar, Clock, Star, Download, ChevronRight, Info, Quote } from 'lucide-react';
import { theme, palette } from '@/app/components/design-system/constants';

interface GuideDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    guide: any;
}

export const GuideDetailModal = ({ isOpen, onClose, guide }: GuideDetailModalProps) => {
    if (!guide) return null;

    // Mock itinerary data for the guide
    const itinerary = [
        {
            day: 1,
            title: "파리의 낭만, 첫걸음",
            activities: [
                { time: "09:00", spot: "트로카데로 광장", desc: "에펠탑을 가장 아름답게 볼 수 있는 명당에서 인생샷으로 시작!", tip: "오전 9시 전후가 가장 사람이 적고 빛이 예뻐요." },
                { time: "11:30", spot: "루브르 박물관 도슨트", desc: "전문 가이드와 함께하는 효율적인 3시간 필수 작품 투어", tip: "뮤지엄패스를 미리 준비하면 입장이 빨라요." },
                { time: "15:00", spot: "튈르리 정원 산책", desc: "초록색 의자에 앉아 파리지앵처럼 여유로운 오후 즐기기" },
                { time: "19:00", spot: "센느강 디너 크루즈", desc: "반짝이는 파리의 야경과 함께하는 로맨틱한 저녁 식사" }
            ]
        },
        {
            day: 2,
            title: "예술과 역사 사이",
            activities: [
                { time: "10:00", spot: "오르세 미술관", desc: "인상주의 거장들의 작품을 만나는 기차역 테마 미술관" },
                { time: "14:00", spot: "몽마르트르 언덕", desc: "사랑해 벽, 사크레쿼르 대성당을 아우르는 파리 예술가들의 성지" },
                { time: "17:00", spot: "카페 드 플로르", desc: "헤밍웨이가 사랑했던 역사적인 카페에서의 애프터눈 티" }
            ]
        }
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[3000] flex items-end justify-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />

                    <motion.div
                        initial={{ opacity: 0, y: "100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="relative w-full h-[95vh] bg-white rounded-t-[3.5rem] overflow-hidden flex flex-col shadow-2xl"
                    >
                        {/* Content Scrollable */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide">
                            {/* Hero Image Section */}
                            <div className="relative h-[500px] w-full">
                                {/* Back Button: Inside scrollable area, on top of hero */}
                                <div className="absolute top-12 left-12 z-30">
                                    <button
                                        onClick={onClose}
                                        className="flex items-center gap-2.5 text-slate-900 hover:text-orange-500 transition-all group px-4 py-2"
                                    >
                                        <ArrowLeft size={22} strokeWidth={2.5} className="transition-transform group-hover:-translate-x-1.5" />
                                        <span className="text-base font-bold tracking-tight">목록으로 돌아가기</span>
                                    </button>
                                </div>

                                <img
                                    src={guide.image}
                                    alt={guide.title}
                                    className="w-full h-full object-cover"
                                />
                                {/* Scrolled Overlay for readability */}
                                <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-transparent h-32" />
                                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                                <div className="absolute bottom-12 left-0 right-0">
                                    <div className="max-w-[1400px] mx-auto px-6 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <span className="px-4 py-1.5 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest">
                                                {guide.category}
                                            </span>
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-slate-900 text-[10px] font-black shadow-sm">
                                                <Star size={12} fill="#f97316" className="text-orange-500" />
                                                {guide.rating} (Review {guide.reviews})
                                            </div>
                                        </div>

                                        <div className="flex items-end justify-between gap-8">
                                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter leading-tight flex-1">
                                                {guide.title}
                                            </h2>
                                            <button className="flex items-center gap-2 px-8 py-4 rounded-[1.5rem] bg-orange-500 text-white font-black text-sm shadow-2xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all mb-1 shrink-0">
                                                <Download size={18} />
                                                내 일정으로 가져오기
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-600 font-bold">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={18} className="text-orange-500" />
                                                {guide.location}
                                            </div>
                                            <div className="w-1 h-1 rounded-full bg-slate-300" />
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={18} className="text-orange-500" />
                                                3박 4일 완벽 코스
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="py-16">
                                <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-3 gap-16">
                                    {/* Left: Itinerary Timeline */}
                                    <div className="lg:col-span-2 space-y-12">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Navigation size={24} className="text-orange-500" />
                                                <h3 className="text-2xl font-black text-slate-900 tracking-tight">상세 타임라인</h3>
                                            </div>
                                            <p className="text-slate-500 font-medium">WithUs 에디터가 수만 개의 리뷰를 분석해 완성한 최적의 동선입니다.</p>
                                        </div>

                                        <div className="space-y-12">
                                            {itinerary.map((day, dIdx) => (
                                                <div key={dIdx} className="space-y-8">
                                                    <div className="flex items-center gap-4">
                                                        <div className="px-4 py-1.5 rounded-xl bg-slate-900 text-white text-xs font-black uppercase">
                                                            Day {day.day}
                                                        </div>
                                                        <div className="h-px flex-1 bg-slate-100" />
                                                        <span className="text-lg font-black text-slate-900">{day.title}</span>
                                                    </div>

                                                    <div className="space-y-6 relative pl-6 border-l-2 border-slate-50">
                                                        {day.activities.map((act, aIdx) => (
                                                            <div key={aIdx} className="relative space-y-3 group">
                                                                {/* Bullet Point */}
                                                                <div className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2 border-orange-500 ring-4 ring-white shadow-sm transition-transform group-hover:scale-150" />

                                                                <div className="flex items-center gap-3">
                                                                    <span className="text-xs font-black text-orange-500/60 font-mono tracking-tighter">
                                                                        {act.time}
                                                                    </span>
                                                                    <h4 className="text-lg font-black text-slate-900">{act.spot}</h4>
                                                                </div>
                                                                <p className="text-slate-600 text-sm font-medium leading-relaxed pl-12">
                                                                    {act.desc}
                                                                </p>
                                                                {act.tip && (
                                                                    <div className="ml-12 p-4 rounded-2xl bg-orange-50 border border-orange-100/50 flex gap-3">
                                                                        <Info size={16} className="text-orange-500 shrink-0 mt-0.5" />
                                                                        <p className="text-orange-700 text-[13px] font-bold leading-snug">
                                                                            <span className="block text-[10px] uppercase font-black mb-1 opacity-60">Editor's Tip</span>
                                                                            {act.tip}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Editor's Note & Sidebar */}
                                    <div className="space-y-8">
                                        <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 space-y-6">
                                            <div className="flex items-center gap-3">
                                                <Quote size={24} className="text-orange-500 fill-orange-500/10" />
                                                <h4 className="text-lg font-black text-slate-900">에디터의 한마디</h4>
                                            </div>
                                            <p className="text-slate-600 text-sm font-bold leading-relaxed italic">
                                                "파리는 걷는 것조차 예술이 되는 도시입니다. 이 가이드는 너무 빡빡한 일정보다는 파리의 공기를 온전히 느낄 수 있는 휴식과 발견의 균형에 집중했습니다. 당신만의 파리를 이곳에서 찾아보세요."
                                            </p>
                                            <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl grayscale pointer-events-none">
                                                    ✍️
                                                </div>
                                                <div>
                                                    <p className="text-sm font-black text-slate-900">WithUs Editor Genie</p>
                                                    <p className="text-[10px] text-slate-400 font-bold">Travel Curation Team</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="p-8 rounded-[2rem] bg-orange-500 text-white space-y-6 shadow-xl shadow-orange-500/20">
                                            <h4 className="text-lg font-black leading-tight">이 가이드가 <br />마음에 드시나요?</h4>
                                            <p className="text-orange-100 text-xs font-bold leading-relaxed">
                                                버튼을 누르면 모든 장소와 동선이 내 여행 플래너로 즉시 추가됩니다.
                                            </p>
                                            <button className="w-full py-4 rounded-xl bg-white text-orange-500 text-sm font-black hover:bg-slate-900 hover:text-white transition-all">
                                                가이드 그대로 담기
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
