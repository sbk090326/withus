'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Flame, ArrowUpRight, MapPin, Calendar, User, Clock } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

interface RecruitmentProps {
    id: number;
    destination: string;
    title: string;
    dates: string;
    author: string;
    spots: { current: number; total: number };
    tags: string[];
    isUrgent?: boolean;
}

const RecruitmentCard = ({ data, index }: { data: RecruitmentProps; index: number }) => (
    <motion.div
        className="flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-2xl bg-white border border-slate-200 hover:border-[#FF7E5F]/40 hover:shadow-lg transition-all duration-300 cursor-pointer group"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
    >
        {/* Urgent Badge */}
        {data.isUrgent && (
            <div className="absolute top-4 right-4 md:hidden">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF4B4B] bg-[#FF4B4B]/10 px-2 py-1 rounded-full">
                    <Clock size={10} /> 급구
                </span>
            </div>
        )}

        {/* User / Image Placeholder */}
        <div className="flex-shrink-0">
            <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-xl border-2 border-white shadow-sm overflow-hidden">
                {/* Random avatar style for demo */}
                <span role="img" aria-label="avatar">
                    {['👩🏻', '👨🏼', '👩🏾', '🧔'][index % 4]}
                </span>
            </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-[#FF7E5F] uppercase tracking-wide flex items-center gap-1">
                    <MapPin size={12} /> {data.destination}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                    <Calendar size={12} /> {data.dates}
                </span>
            </div>

            <h4 className="font-bold text-slate-900 text-lg leading-snug truncate group-hover:text-[#FF7E5F] transition-colors mb-2">
                {data.title}
            </h4>

            <div className="flex items-center gap-2 flex-wrap">
                {data.tags.map((tag, i) => (
                    <span key={i} className="text-[11px] px-2 py-0.5 rounded-full bg-slate-50 text-slate-500 border border-slate-100">
                        #{tag}
                    </span>
                ))}
            </div>
        </div>

        {/* Meta / Action */}
        <div className="flex flex-row md:flex-col items-center md:items-end gap-3 w-full md:w-auto mt-2 md:mt-0 justify-between md:justify-center pl-0 md:pl-4 md:border-l md:border-slate-100">

            {data.isUrgent ? (
                <span className="hidden md:flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#FF4B4B] bg-[#FF4B4B]/10 px-2 py-1 rounded-full mb-1">
                    <Flame size={10} fill="currentColor" /> 마감임박
                </span>
            ) : (
                <span className="hidden md:block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1">
                    모집중
                </span>
            )}

            <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                    {[...Array(data.spots.current)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-200 border border-white" />
                    ))}
                    {[...Array(data.spots.total - data.spots.current)].map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-slate-50 border border-slate-200 border-dashed" />
                    ))}
                </div>
                <span className="text-sm font-bold text-slate-900">
                    {data.spots.current}/{data.spots.total}
                </span>
            </div>
        </div>
    </motion.div>
);

export function TrendingSection() {
    const activeRecruitments: RecruitmentProps[] = [
        { id: 1, destination: "오사카, 일본", title: "유니버셜 스튜디오 재팬(USJ) 익스프레스 포함 같이 가실 분!", dates: "11월 10일 - 12일", author: "유나", spots: { current: 3, total: 4 }, tags: ["테마파크", "인생샷"], isUrgent: true },
        { id: 2, destination: "파리, 프랑스", title: "루브르 박물관 도슨트 투어 1/N 하실 분 구해요", dates: "12월 05일", author: "민수", spots: { current: 1, total: 2 }, tags: ["예술", "도보여행"], isUrgent: false },
        { id: 3, destination: "세부, 필리핀", title: "오픈워터 자격증 같이 따실 분? 초보 환영", dates: "1월 20일 - 25일", author: "사라", spots: { current: 2, total: 6 }, tags: ["액티비티", "물놀이"], isUrgent: false },
        { id: 4, destination: "뉴욕, 미국", title: "뉴욕 크리스마스 마켓 투어 & 저녁 식사", dates: "12월 24일 - 26일", author: "마이크", spots: { current: 1, total: 3 }, tags: ["도시여행", "맛집"], isUrgent: true },
    ];

    return (
        <section className={`w-full ${spacing.section.py} bg-[#FFF9F7] relative z-20`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>
                <div className="flex flex-col lg:flex-row gap-16 items-start">
                    {/* Left: Heading & Context */}
                    <div className="lg:w-1/3 sticky top-32">
                        <div className="flex items-center gap-2 mb-4 text-[#FF7E5F]">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7E5F] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF7E5F]"></span>
                            </span>
                            <span className="font-bold uppercase tracking-wider">실시간 모집</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-6 text-slate-900 leading-tight">
                            지금 떠나는 동행, <br />
                            <span className="text-[#38BDF8]">바로 합류하세요.</span>
                        </h2>
                        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                            수많은 여행자들이 지금 이 순간에도 동행을 찾고 있습니다. 놓치기 아까운 기회를 잡으세요!
                        </p>
                        <button className="flex items-center gap-2 text-slate-900 font-semibold hover:text-[#FF7E5F] transition-colors group">
                            전체 모집글 보기
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    {/* Right: Recruitment List */}
                    <div className="lg:w-2/3 w-full">
                        <div className="flex flex-col gap-4">
                            {activeRecruitments.map((item, i) => (
                                <RecruitmentCard key={item.id} data={item} index={i} />
                            ))}
                        </div>

                        {/* More Button Mobile Only */}
                        <div className="mt-6 text-center lg:hidden">
                            <button className="text-sm font-semibold text-slate-400">더 보기</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
