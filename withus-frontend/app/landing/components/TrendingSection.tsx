'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Flame, MapPin, Calendar, User, Users, ArrowRight, Heart, Share2 } from 'lucide-react';
import { colors, spacing, theme } from '@/app/components/design-system/constants';
import Image from 'next/image';

interface RecruitmentProps {
    id: number;
    destination: string;
    title: string;
    dates: string;
    author: string;
    spots: { current: number; total: number };
    tags: string[];
    isUrgent?: boolean;
    image: string;
    itinerary: { day: number; title: string; description: string }[];
    authorAvatar: string;
}

const CompactListItem = ({
    data,
    index,
    isSelected,
    onClick
}: {
    data: RecruitmentProps;
    index: number;
    isSelected: boolean;
    onClick: () => void;
}) => (
    <motion.div
        onClick={onClick}
        className={`relative p-4 rounded-xl cursor-pointer transition-all duration-300 ${isSelected
            ? 'bg-gradient-to-r from-orange-50 to-pink-50 border-2 border-orange-300 shadow-md'
            : 'bg-white border border-slate-200 hover:border-orange-200 hover:shadow-sm'
            }`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
    >
        <div className="flex items-center gap-3">
            {/* Small Thumbnail */}
            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                    src={data.image}
                    alt={data.destination}
                    fill
                    className="object-cover"
                />
                {data.isUrgent && (
                    <div className="absolute top-1 right-1">
                        <Flame size={12} className="text-red-500" fill="currentColor" />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                        <MapPin size={10} /> {data.destination}
                    </span>
                    {data.isUrgent && (
                        <span className="text-[9px] font-bold text-red-500 bg-red-50 px-1.5 py-0.5 rounded">
                            마감임박
                        </span>
                    )}
                </div>
                <h4 className={`font-bold text-sm leading-tight line-clamp-1 mb-1 ${isSelected ? 'text-orange-600' : 'text-slate-900'
                    }`}>
                    {data.title}
                </h4>
                <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <Calendar size={10} />
                    <span>{data.dates}</span>
                </div>
            </div>

            {/* Arrow indicator */}
            <ArrowRight
                size={16}
                className={`flex-shrink-0 transition-all ${isSelected ? 'text-orange-500 translate-x-1' : 'text-slate-300'
                    }`}
            />
        </div>
    </motion.div>
);

const DetailPanel = ({ data }: { data: RecruitmentProps }) => (
    <motion.div
        key={data.id}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.4 }}
        className="h-full flex flex-col"
    >
        {/* Card Container - Full Height */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden flex flex-col h-full">
            {/* Header Image - Larger */}
            <div className="relative h-56 flex-shrink-0">
                <Image
                    src={data.image}
                    alt={data.destination}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* Top Right: Urgent Badge */}
                {data.isUrgent && (
                    <div className="absolute top-3 right-3">
                        <div className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider animate-pulse shadow-lg border border-rose-400/30">
                            🔥 마감임박
                        </div>
                    </div>
                )}

                {/* Bottom: Author */}
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full border border-white/50 shadow-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-lg overflow-hidden">
                        {data.authorAvatar}
                    </div>
                    <span className="text-sm font-bold text-white drop-shadow-md">{data.author}</span>
                </div>
            </div>

            {/* Content - Flexible */}
            <div className="flex-1 p-5 flex flex-col">
                {/* Tags & Spots */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex gap-1.5">
                        {data.tags.slice(0, 2).map((tag, i) => (
                            <span key={i} className="text-[9px] font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-100">
                                #{tag}
                            </span>
                        ))}
                    </div>
                    <div className="flex items-center gap-1 text-teal-600 font-black text-[10px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-600 animate-pulse" />
                        {data.spots.current}/{data.spots.total} 명
                    </div>
                </div>

                {/* Title */}
                <h3 className="font-bold text-xl text-slate-900 line-clamp-2 leading-tight mb-2">
                    {data.title}
                </h3>

                {/* Location - Moved below title */}
                <div className="flex items-center gap-2 text-slate-600 mb-3">
                    <MapPin size={14} className="text-orange-500" />
                    <span className="text-sm font-bold text-slate-700">{data.destination}</span>
                </div>

                {/* Date */}
                <div className="flex items-center gap-2 text-slate-600 mb-4">
                    <Calendar size={14} className="text-slate-400" />
                    <span className="text-xs font-bold">{data.dates}</span>
                </div>

                {/* Route - Improved Layout */}
                <div className="mb-4">
                    <h4 className="text-xs font-bold text-slate-700 mb-2 flex items-center gap-1">
                        <span className="w-1 h-1 rounded-full bg-orange-500"></span>
                        여행 일정
                    </h4>
                    <div className="space-y-2">
                        {data.itinerary.map((item, i) => (
                            <div key={i} className="flex items-start gap-2.5 p-2.5 rounded-lg bg-gradient-to-r from-orange-50/80 to-pink-50/80 border border-orange-100/50 hover:border-orange-200 transition-colors">
                                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white text-[9px] font-black shadow-sm">
                                    {item.day}
                                </div>
                                <span className="text-[11px] font-bold text-slate-700 leading-tight pt-0.5">{item.title}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Spacer to push buttons to bottom */}
                <div className="flex-1" />

                {/* Action Buttons - Fixed at Bottom */}
                <div className="flex gap-2 mt-auto pt-4 border-t border-slate-100">
                    <button className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-bold text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                        동행 신청하기
                        <ArrowRight size={16} />
                    </button>
                    <button className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-pink-500 transition-all flex items-center justify-center">
                        <Heart size={18} />
                    </button>
                    <button className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-orange-500 transition-all flex items-center justify-center">
                        <Share2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    </motion.div>
);

export function TrendingSection() {
    const activeRecruitments: RecruitmentProps[] = [
        {
            id: 1,
            destination: "제주도",
            title: "에코랜드 + 우도 투어 같이 가실 분!",
            dates: "11월 10일 - 12일",
            author: "유나",
            authorAvatar: "👩🏻",
            spots: { current: 3, total: 4 },
            tags: ["테마파크", "인생샷", "힐링"],
            isUrgent: true,
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800",
            itinerary: [
                { day: 1, title: "에코랜드 테마파크", description: "귀여운 기차 타고 제주 자연 속 힐링 투어" },
                { day: 2, title: "우도 자전거 투어", description: "땅콩 아이스크림 먹으며 해안도로 라이딩" },
                { day: 3, title: "성산일출봉 & 섭지코지", description: "일출 보고 인생샷 남기기" }
            ]
        },
        {
            id: 2,
            destination: "방콕",
            title: "수상시장 & 왓아룬 사원 투어 같이 하실 분!",
            dates: "12월 15일 - 18일",
            author: "민수",
            authorAvatar: "🧔🏻",
            spots: { current: 2, total: 4 },
            tags: ["문화체험", "맛집", "야시장"],
            isUrgent: false,
            image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800",
            itinerary: [
                { day: 1, title: "담넌사두억 수상시장", description: "보트 타고 현지 음식 먹방 투어" },
                { day: 2, title: "왓아룬 사원 & 왓포", description: "방콕 3대 사원 문화 탐방" },
                { day: 3, title: "카오산로드 야시장", description: "밤새 먹고 쇼핑하는 야시장 투어" }
            ]
        },
        {
            id: 3,
            destination: "강릉",
            title: "정동진 해돋이 보고 커피거리 투어",
            dates: "1월 20일 - 22일",
            author: "사라",
            authorAvatar: "👩🏼",
            spots: { current: 2, total: 6 },
            tags: ["힐링", "카페투어", "바다"],
            isUrgent: false,
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800",
            itinerary: [
                { day: 1, title: "정동진 해돋이", description: "새벽 일출 보며 소원 빌기" },
                { day: 2, title: "강릉 커피거리", description: "감성 카페 투어 & 인생샷" },
                { day: 3, title: "안목해변 카페", description: "바다 보며 커피 한잔의 여유" }
            ]
        },
        {
            id: 4,
            destination: "오사카",
            title: "도톤보리 야시장 & 유니버셜 스튜디오 투어",
            dates: "12월 24일 - 26일",
            author: "재훈",
            authorAvatar: "👨🏻",
            spots: { current: 1, total: 3 },
            tags: ["테마파크", "먹방", "쇼핑"],
            isUrgent: true,
            image: "https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&q=80&w=800",
            itinerary: [
                { day: 1, title: "유니버셜 스튜디오", description: "해리포터 마법 세계 체험" },
                { day: 2, title: "도톤보리 먹방 투어", description: "타코야키, 오코노미야키 맛집 탐방" },
                { day: 3, title: "신사이바시 쇼핑", description: "쇼핑 & 마지막 야시장 투어" }
            ]
        },
        {
            id: 5,
            destination: "발리",
            title: "우붓 라이스테라스 & 해변 서핑 체험",
            dates: "2월 5일 - 9일",
            author: "지훈",
            authorAvatar: "👨🏽",
            spots: { current: 4, total: 6 },
            tags: ["액티비티", "자연", "휴양"],
            isUrgent: false,
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800",
            itinerary: [
                { day: 1, title: "우붓 라이스테라스", description: "초록빛 계단식 논밭에서 인생샷" },
                { day: 2, title: "쿠타 비치 서핑", description: "초보자도 가능한 서핑 레슨" },
                { day: 3, title: "울루와투 사원 선셋", description: "절벽 위 사원에서 석양 감상" }
            ]
        },
    ];

    // 첫 번째 항목을 기본으로 선택
    const [selectedId, setSelectedId] = useState<number>(activeRecruitments[0].id);
    const selectedRecruitment = activeRecruitments.find(r => r.id === selectedId) || activeRecruitments[0];

    return (
        <section className={`w-full ${spacing.section.py} bg-[#FDFCFB] relative z-20`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>
                {/* Header */}
                <div className="mb-12 text-center">
                    <div className="flex items-center justify-center gap-2 mb-4 text-[#FF7E5F]">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7E5F] opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-[#FF7E5F]"></span>
                        </span>
                        <span className="font-bold uppercase tracking-wider text-sm">실시간 모집</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] text-slate-900 mb-6 tracking-tighter">
                        지금 떠나는 동행, <br />
                        <span style={{ color: theme.colors.secondary.DEFAULT }}>바로 합류하세요.</span>
                    </h2>
                    <p className="text-lg text-slate-600  leading-relaxed max-w-2xl mx-auto">
                        수많은 여행자들이 지금 이 순간에도 동행을 찾고 있습니다. 놓치기 아까운 기회를 잡으세요!
                    </p>
                </div>

                {/* Left-Right Split Layout */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left: Recruitment List */}
                    <div className="lg:w-1/2 space-y-3">
                        {activeRecruitments.map((item, i) => (
                            <CompactListItem
                                key={item.id}
                                data={item}
                                index={i}
                                isSelected={selectedId === item.id}
                                onClick={() => setSelectedId(item.id)}
                            />
                        ))}

                        {/* View All Button */}
                        <button className="w-full mt-4 py-3 text-slate-600 hover:text-orange-500 transition-colors font-medium flex items-center justify-center gap-2 group">
                            전체 모집글 보기
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Right: Detail Panel */}
                    <div className="lg:w-1/2">
                        <DetailPanel data={selectedRecruitment} />
                    </div>
                </div>
            </div>
        </section>
    );
}
