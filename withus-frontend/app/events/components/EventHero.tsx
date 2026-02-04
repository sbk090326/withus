'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

const FEATURED_EVENTS = [
    {
        id: 1,
        title: '함께 떠나는 즐거움,',
        highlight: 'WithUs 특별 혜택',
        description: '매일 쏟아지는 새로운 혜택과 즐거운 도전을 확인하세요. 동행과 함께라면 여행의 즐거움은 두 배가 됩니다.',
        image: '/event_hero_banner.png',
    },
    {
        id: 2,
        title: '새로운 시작을 응원하는',
        highlight: '첫 동행 웰컴 포인트',
        description: 'WithUs와 함께하는 첫 번째 여행! 성공적으로 첫 커뮤니티 활동을 완료하면 즉시 사용 가능한 1만 포인트를 드립니다.',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=2000',
    },
    {
        id: 3,
        title: '낭만 가득한 겨울 시즌',
        highlight: '유럽 기차 여행 패키지',
        description: '로맨틱한 유럽의 겨울! 유레일 패스와 현지 맛집 바우처가 포함된 특별 할인 혜택으로 더 따뜻하게 떠나보세요.',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=2000',
    }
];

export const EventHero = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

    const resetTimeout = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
    };

    const nextSlide = useCallback(() => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % FEATURED_EVENTS.length);
    }, []);

    const prevSlide = useCallback(() => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + FEATURED_EVENTS.length) % FEATURED_EVENTS.length);
    }, []);

    useEffect(() => {
        resetTimeout();
        timeoutRef.current = setTimeout(nextSlide, 5000);
        return () => resetTimeout();
    }, [currentIndex, nextSlide]);

    const activeEvent = FEATURED_EVENTS[currentIndex];

    // Slide animation variants
    const variants = {
        enter: (dir: number) => ({
            x: dir > 0 ? '100%' : '-100%',
            opacity: 1,
            scale: 1.1
        }),
        center: {
            x: 0,
            opacity: 1,
            scale: 1,
            transition: {
                x: { type: "spring" as const, stiffness: 300, damping: 35 },
                scale: { duration: 1.2, ease: [0.22, 1, 0.36, 1] as any }
            }
        },
        exit: (dir: number) => ({
            x: dir < 0 ? '100%' : '-100%',
            opacity: 1,
            scale: 1.05,
            transition: {
                x: { type: "spring" as const, stiffness: 300, damping: 35 }
            }
        })
    };

    return (
        <section className="relative w-full h-[600px] md:h-[750px] lg:h-[850px] overflow-hidden bg-black">
            {/* 🎞️ Sliding Background Image Layer */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence initial={false} custom={direction} mode="popLayout">
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        className="absolute inset-0 w-full h-full"
                    >
                        <img
                            src={activeEvent.image}
                            alt={activeEvent.highlight}
                            className="w-full h-full object-cover"
                        />
                        {/* 🌑 Refined Gradient Overlays */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* ✍️ Balanced & Clean Text Content */}
            <div className="relative z-10 w-full h-full max-w-[1240px] mx-auto px-6 flex flex-col justify-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="max-w-5xl"
                    >
                        <div className="space-y-4 mb-10">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] tracking-tight">
                                {activeEvent.title} <br />
                                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">
                                    {activeEvent.highlight}
                                </span>
                            </h1>
                            <p className="text-lg md:text-xl text-white/60 font-medium leading-relaxed max-w-xl">
                                {activeEvent.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap items-center gap-6">
                            <button
                                className="h-16 px-10 rounded-full bg-white text-slate-900 font-black shadow-2xl hover:bg-orange-500 hover:text-white transition-all active:scale-95 flex items-center gap-3 text-lg"
                            >
                                <span>지금 참여하기</span>
                                <ArrowRight size={22} strokeWidth={3} />
                            </button>

                            {/* Navigation Controls */}
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                                    className="w-12 h-12 rounded-full border border-white/20 bg-white/5 shadow-lg backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                                    className="w-12 h-12 rounded-full border border-white/20 bg-white/5 shadow-lg backdrop-blur-md flex items-center justify-center text-white hover:bg-white hover:text-slate-900 transition-all"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* 📊 Refined Progress Tracker */}
            <div className="absolute bottom-12 left-6 right-6 md:left-auto md:right-12 z-20 flex items-center justify-between md:justify-end gap-6 max-w-[1240px] mx-auto">
                <div className="flex items-center gap-2">
                    {FEATURED_EVENTS.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setDirection(idx > currentIndex ? 1 : -1);
                                setCurrentIndex(idx);
                            }}
                            className={`h-1 rounded-full transition-all duration-700 ${currentIndex === idx ? 'w-12 bg-white' : 'w-4 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                </div>
                <div className="flex items-baseline gap-1 text-white/40 font-black tracking-tighter">
                    <span className="text-2xl text-white">0{currentIndex + 1}</span>
                    <span className="text-sm">/ 0{FEATURED_EVENTS.length}</span>
                </div>
            </div>
        </section>
    );
};
