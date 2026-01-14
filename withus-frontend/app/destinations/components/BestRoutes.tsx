'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Award, MapPin, Calendar, Download, Check, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

const bestRoutes = [
    {
        id: 1,
        title: "파리 로맨틱 여행 완벽 가이드",
        author: "지니",
        authorImage: "👩‍🦰",
        location: "프랑스, 파리",
        duration: "5박 6일",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=1000",
        likes: 1240,
        saves: 567,
        verified: true,
        rating: 4.9,
        route: ["에펠탑", "루브르 박물관", "몽마르트", "베르사유 궁전"],
        description: "파리의 낭만을 모두 담은 완벽한 일정"
    },
    {
        id: 2,
        title: "제주 동쪽 해안 드라이브 코스",
        author: "소라",
        authorImage: "👱‍♀️",
        location: "대한민국, 제주",
        duration: "3박 4일",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1000",
        likes: 980,
        saves: 432,
        verified: true,
        rating: 4.8,
        route: ["성산 일출봉", "우도", "함덕 해수욕장", "카멜리아 힐"],
        description: "제주 동쪽의 숨은 명소를 찾아 떠나는 힐링 드라이브"
    },
    {
        id: 3,
        title: "런던 뮤지엄 투어 & 애프터눈 티",
        author: "미나",
        authorImage: "👧",
        location: "영국, 런던",
        duration: "4박 5일",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1000",
        likes: 856,
        saves: 389,
        verified: true,
        rating: 4.7,
        route: ["대영 박물관", "테이트 모던", "빅토리아 앨버트", "자연사 박물관"],
        description: "런던의 세계적인 박물관을 모두 둘러보는 문화 투어"
    },
    {
        id: 4,
        title: "방콕 야시장 맛집 탐방 루트",
        author: "카이",
        authorImage: "🧑‍💻",
        location: "태국, 방콕",
        duration: "3박 4일",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=1000",
        likes: 742,
        saves: 356,
        verified: false,
        rating: 4.6,
        route: ["카오산 로드", "짜뚜짝 시장", "아시아티크", "탈랏 롯 파이"],
        description: "방콕의 진짜 맛을 찾아 떠나는 야시장 투어"
    },
    {
        id: 5,
        title: "도쿄 시부야 & 하라주쿠 쇼핑",
        author: "유키",
        authorImage: "🧑‍🎤",
        location: "일본, 도쿄",
        duration: "4박 5일",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1000",
        likes: 892,
        saves: 445,
        verified: true,
        rating: 4.8,
        route: ["시부야", "하라주쿠", "아키하바라", "신주쿠"],
        description: "도쿄의 트렌디한 쇼핑 명소를 모두 둘러보는 코스"
    }
];

export const BestRoutes = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev === 0 ? bestRoutes.length - 1 : prev - 1));
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev === bestRoutes.length - 1 ? 0 : prev + 1));
    };

    const getCardPosition = (index: number) => {
        const diff = index - currentIndex;
        const total = bestRoutes.length;

        let normalizedDiff = diff;
        if (diff > total / 2) normalizedDiff = diff - total;
        if (diff < -total / 2) normalizedDiff = diff + total;

        return normalizedDiff;
    };

    return (
        <section className="w-full py-32 px-6 bg-gradient-to-b from-white to-slate-50 overflow-hidden">
            <div className="max-w-[1600px] mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Award className="text-orange-500" size={28} />
                        <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Community Verified</span>
                    </div>
                    <h2 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
                        커뮤니티가 검증한 <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                            베스트 루트
                        </span>
                    </h2>
                    <p className="text-lg text-slate-600 font-medium">
                        실제 여행자들이 다녀온 최고의 일정을 클릭 한 번으로 내 플래너에 ✨
                    </p>
                </motion.div>

                {/* 3D Carousel */}
                <div className="relative h-[600px] flex items-center justify-center" style={{ perspective: '2000px' }}>
                    {bestRoutes.map((route, index) => {
                        const position = getCardPosition(index);
                        const isActive = position === 0;
                        const isVisible = Math.abs(position) <= 2;

                        if (!isVisible) return null;

                        return (
                            <motion.div
                                key={route.id}
                                className="absolute cursor-pointer"
                                style={{
                                    zIndex: isActive ? 20 : 10 - Math.abs(position),
                                }}
                                animate={{
                                    x: position * 380,
                                    scale: isActive ? 1 : 0.75,
                                    rotateY: position * -25,
                                    opacity: isActive ? 1 : 0.4,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.25, 0.1, 0.25, 1],
                                }}
                                onClick={() => !isActive && setCurrentIndex(index)}
                            >
                                <div
                                    className={`w-[450px] bg-white rounded-[32px] overflow-hidden shadow-2xl border transition-all duration-500 ${isActive ? 'border-orange-200' : 'border-slate-100'
                                        }`}
                                >
                                    {/* Image Section */}
                                    <div className="relative h-64 overflow-hidden">
                                        {route.verified && isActive && (
                                            <motion.div
                                                className="absolute -inset-1 bg-gradient-to-r from-teal-400 to-cyan-400 opacity-30 blur-xl"
                                                animate={{ opacity: [0.2, 0.4, 0.2] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            />
                                        )}

                                        <div className="relative w-full h-full">
                                            <img
                                                src={route.image}
                                                alt={route.title}
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                            {route.verified && (
                                                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-teal-500 text-white text-xs font-black flex items-center gap-1.5 shadow-lg">
                                                    <Check size={14} strokeWidth={3} />
                                                    검증됨
                                                </div>
                                            )}

                                            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold">
                                                    ❤️ {route.likes}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold">
                                                    📌 {route.saves}
                                                </div>
                                                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-bold">
                                                    <Star size={14} fill="gold" className="text-yellow-400" />
                                                    {route.rating}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content Section - Unfolds AFTER card arrives at center */}
                                    <motion.div
                                        className="space-y-5"
                                        animate={{
                                            opacity: isActive ? 1 : 0,
                                            height: isActive ? 'auto' : 0,
                                            paddingTop: isActive ? 32 : 0,
                                            paddingBottom: isActive ? 32 : 0,
                                            paddingLeft: 32,
                                            paddingRight: 32,
                                        }}
                                        transition={{
                                            duration: 0.5,
                                            delay: isActive ? 0.3 : 0,  // Delay expansion until card settles
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        {/* Author */}
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-100 to-pink-100 flex items-center justify-center text-xl shadow-sm">
                                                {route.authorImage}
                                            </div>
                                            <div>
                                                <p className="font-bold text-slate-900">{route.author}</p>
                                                <p className="text-xs text-slate-500">여행 크리에이터</p>
                                            </div>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl font-black text-slate-900 leading-tight">
                                            {route.title}
                                        </h3>

                                        {/* Meta */}
                                        <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <MapPin size={16} className="text-orange-500" />
                                                {route.location}
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Calendar size={16} className="text-orange-500" />
                                                {route.duration}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-slate-600 leading-relaxed">
                                            {route.description}
                                        </p>

                                        {/* Route Tags */}
                                        <div className="flex flex-wrap gap-2">
                                            {route.route.map((point, i) => (
                                                <span
                                                    key={i}
                                                    className="px-3 py-1.5 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg border border-orange-100"
                                                >
                                                    {point}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Actions */}
                                        <div className="flex gap-3 pt-2">
                                            <motion.button
                                                className="flex-1 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg"
                                                whileHover={{ scale: 1.02, backgroundColor: "#f97316" }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Download size={16} />
                                                내 플래너에 추가
                                            </motion.button>
                                            <motion.button
                                                className="px-5 py-3 rounded-2xl border-2 border-slate-200 text-slate-600 font-bold text-sm"
                                                whileHover={{
                                                    scale: 1.02,
                                                    borderColor: "#f97316",
                                                    color: "#f97316"
                                                }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                상세
                                            </motion.button>
                                        </div>
                                    </motion.div>

                                    {/* Inactive State - Collapses immediately */}
                                    <motion.div
                                        className="text-center"
                                        animate={{
                                            opacity: isActive ? 0 : 1,
                                            height: isActive ? 0 : 'auto',
                                            paddingTop: isActive ? 0 : 24,
                                            paddingBottom: isActive ? 0 : 24,
                                        }}
                                        transition={{
                                            duration: 0.3,
                                            delay: 0,  // No delay for collapsing
                                            ease: [0.25, 0.1, 0.25, 1],
                                        }}
                                        style={{ overflow: 'hidden' }}
                                    >
                                        <h3 className="text-lg font-bold text-slate-700 line-clamp-1">
                                            {route.title}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">{route.location}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        );
                    })}

                    {/* Navigation Buttons */}
                    <motion.button
                        onClick={handlePrev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all border border-slate-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronLeft size={28} strokeWidth={2.5} />
                    </motion.button>

                    <motion.button
                        onClick={handleNext}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white shadow-2xl flex items-center justify-center text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-all border border-slate-100"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <ChevronRight size={28} strokeWidth={2.5} />
                    </motion.button>
                </div>

                {/* Indicators */}
                <div className="flex items-center justify-center gap-3 mt-12">
                    {bestRoutes.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`h-2 rounded-full transition-all ${index === currentIndex
                                    ? 'w-12 bg-orange-500'
                                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                                }`}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
