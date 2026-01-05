'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { SearchWidget } from './SearchWidget';
import { typography, animations } from '@/app/components/design-system/constants';
import { Users, Heart, MapPin } from 'lucide-react';
import { CountUp } from '@/app/components/ui/CountUp';

export function HeroParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const yCenter = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const yRight = useTransform(scrollYProgress, [0, 1], [0, -120]);

    // Subtle blur effect for depth
    const blurValue = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(8px)"]);
    const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.3]);

    return (
        <div ref={containerRef} className="relative w-full min-h-[140vh] overflow-hidden bg-gradient-to-b from-orange-50 via-white to-sky-50">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200/30 rounded-full blur-3xl"></div>
                <div className="absolute bottom-40 left-10 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/20 rounded-full blur-3xl"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
                <div className="pt-32 pb-40 px-4 md:px-12 max-w-[1800px] mx-auto">
                    {/* Text and Search Top Section */}
                    <div className="flex flex-col items-center justify-center mb-20 z-20 relative">

                        {/* Badge */}
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-orange-200 shadow-sm mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Users size={16} className="text-orange-500" />
                            <span className="text-sm font-semibold text-slate-700">10,000+ 명의 여행자와 함께하세요</span>
                        </motion.div>

                        <motion.h1
                            className="text-center font-bold leading-[1.1] mb-6 text-slate-900"
                            style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animations.duration.normal, delay: 0.2, ease: animations.easing.smooth }}
                        >
                            친구와 함께 떠나는 여행, <br />
                            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">함께 만드는 특별한 추억</span>
                        </motion.h1>

                        <motion.p
                            className="text-center text-slate-600 text-xl font-medium mb-12 max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animations.duration.normal, delay: 0.3, ease: animations.easing.smooth }}
                        >
                            마음 맞는 여행 친구를 찾아 떠나보세요. 안전하고 즐거운 여행이 기다리고 있습니다! 🌍✨
                        </motion.p>

                        <SearchWidget theme="light" />
                    </div>

                    {/* Image Grid with Parallax */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[700px] w-full">

                        {/* Left Column - Travelers Walking */}
                        <div className="md:col-span-3 h-[400px] md:h-full flex items-end">
                            <motion.div
                                style={{ y: yLeft }}
                                className="relative w-full h-[85%] rounded-3xl overflow-hidden shadow-xl border-4 border-white group"
                            >
                                <Image
                                    src="/hero-grid-travelers.png"
                                    alt="Group of diverse young travelers walking together on a sunny street in Barcelona, Spain, carrying backpacks and smiling"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 text-white">
                                    <div className="flex items-center gap-2 mb-2">
                                        <MapPin size={16} />
                                        <span className="text-sm font-medium">Barcelona, Spain</span>
                                    </div>
                                    <p className="text-xs text-white/80">함께 여행 중</p>
                                </div>
                            </motion.div>
                        </div>

                        {/* Center Column - Main Featured Video */}
                        <div className="md:col-span-6 h-[500px] md:h-full flex items-center justify-center">
                            <motion.div
                                style={{ y: yCenter }}
                                className="relative w-full h-[95%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group"
                            >
                                {/* Background Video - YouTube Embed */}
                                <iframe
                                    className="absolute inset-0 w-full h-full pointer-events-none"
                                    src="https://www.youtube.com/embed/EngW7tLk6R8?autoplay=1&mute=1&loop=1&playlist=EngW7tLk6R8&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1"
                                    title="Travel Video"
                                    allow="autoplay; encrypted-media"
                                    style={{
                                        border: 'none',
                                        transform: 'scale(1.5)',
                                        transformOrigin: 'center'
                                    }}
                                />

                                {/* Fallback Image (shown if video fails) */}
                                <Image
                                    src="/hero-background-warm.png"
                                    alt="Happy diverse travelers taking a selfie together at a scenic travel destination"
                                    fill
                                    className="object-cover -z-10"
                                />

                                {/* Overlay with Stats */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

                                <div className="absolute bottom-10 left-10 right-10">
                                    <div className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg">
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center">
                                                <Heart size={24} className="text-white" fill="white" />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold text-slate-900">나만의 동행 찾기</h3>
                                                <p className="text-sm text-slate-600">안전하고 검증된 여행 친구</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-4 text-center pt-3 border-t border-slate-200">
                                            <div className="flex-1">
                                                <div className="text-2xl font-bold text-orange-500">
                                                    <CountUp end={10} suffix="K+" />
                                                </div>
                                                <div className="text-xs text-slate-600">누적 여행자</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-2xl font-bold text-sky-500">
                                                    <CountUp end={150} suffix="+" />
                                                </div>
                                                <div className="text-xs text-slate-600">여행 국가</div>
                                            </div>
                                            <div className="flex-1">
                                                <div className="text-2xl font-bold text-pink-500">
                                                    <CountUp end={98} suffix="%" />
                                                </div>
                                                <div className="text-xs text-slate-600">여행 만족도</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - Stacked Images */}
                        <div className="md:col-span-3 h-[400px] md:h-full flex flex-col gap-6 pt-0 md:pt-16">
                            <motion.div
                                style={{ y: yRight }}
                                className="relative w-full h-[48%] rounded-3xl overflow-hidden shadow-xl border-4 border-white group"
                            >
                                <Image
                                    src="/hero-grid-cafe.png"
                                    alt="Young travelers sitting together in a cozy cafe, sharing food and drinks, having a friendly conversation"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </motion.div>
                            <motion.div
                                style={{ y: yRight }}
                                className="relative w-full h-[48%] rounded-3xl overflow-hidden shadow-xl border-4 border-white group"
                            >
                                <Image
                                    src="/hero-grid-adventure.png"
                                    alt="Travelers hiking together on a mountain trail, high-fiving and celebrating at a scenic viewpoint with blue sky"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
