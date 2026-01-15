'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { SearchWidget } from './SearchWidget';
import { typography, animations, theme } from '@/app/components/design-system/constants';
import { Users, Heart, MapPin } from 'lucide-react';
import { CountUp } from '@/app/components/ui/CountUp';

export function HeroParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const VIDEOS = [
        "/videos/253436_small.mp4",
        "/videos/6399-191636228_small.mp4",
        "/videos/7260-199191197_small.mp4"
    ];

    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    const handleVideoEnded = () => {
        setCurrentVideoIndex((prev) => (prev + 1) % VIDEOS.length);
    };

    const yLeft = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const yCenter = useTransform(scrollYProgress, [0, 1], [0, 40]);
    const yRight = useTransform(scrollYProgress, [0, 1], [0, -120]);

    // Subtle blur effect for depth
    const blurValue = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(8px)"]);
    const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.3]);

    return (
        <div ref={containerRef} className="relative w-full min-h-[140vh] overflow-hidden bg-slate-50">
            {/* Background Image Layer - Adds depth and vibe */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero.jpg"
                    alt="Travel destination background"
                    fill
                    className="object-cover object-top opacity-80 blur-[1px]"
                    priority
                    quality={100}
                />
                {/* Gradient Overlay to blend with content - ensures text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/40 to-white/90"></div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 right-10 w-72 h-72 bg-orange-200/20 rounded-full blur-3xl mix-blend-multiply"></div>
                <div className="absolute bottom-40 left-10 w-96 h-96 bg-orange-100/20 rounded-full blur-3xl mix-blend-multiply"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-100/10 rounded-full blur-3xl"></div>
            </div>

            {/* Content Layer */}
            <div className="relative z-10">
                <div className="pt-40 pb-40 px-4 md:px-12 max-w-[1800px] mx-auto">
                    {/* Text and Search Top Section */}
                    <div className="flex flex-col items-center justify-center mt-12 mb-20 z-20 relative">

                        {/* Badge */}
                        <motion.h1
                            className="text-center font-bold leading-[1.1] mb-6 text-slate-900 drop-shadow-sm"
                            style={{ fontSize: 'clamp(40px, 5.5vw, 72px)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animations.duration.normal, delay: 0.2, ease: animations.easing.smooth }}
                        >
                            혼자가 아닌 함께, <br />
                            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">지금 함께 떠나볼까요?</span>
                        </motion.h1>

                        <motion.p
                            className="text-center text-slate-600 text-lg font-medium mb-12 max-w-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animations.duration.normal, delay: 0.3, ease: animations.easing.smooth }}
                        >
                            함께라서 더 즐거운 국내 여행의 시작을 지금 WithUs와 함께하세요.
                        </motion.p>

                        <SearchWidget theme="light" />
                    </div>

                    {/* Image Grid with Parallax */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-3 h-auto md:h-[700px] w-full">

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
                        <div className="md:col-span-6 h-[500px] md:h-full flex items-center justify-center relative">
                            <motion.div
                                style={{ y: yCenter }}
                                className="relative w-full h-[95%] rounded-3xl overflow-hidden shadow-2xl border-4 border-white group"
                            >
                                {/* Background Video - Rotating Playlist */}
                                <AnimatePresence mode="popLayout">
                                    <motion.video
                                        key={VIDEOS[currentVideoIndex]}
                                        src={VIDEOS[currentVideoIndex]}
                                        className="absolute inset-0 w-full h-full object-cover scale-110"
                                        autoPlay
                                        muted
                                        playsInline
                                        onEnded={handleVideoEnded}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 1.5 }}
                                    />
                                </AnimatePresence>
                            </motion.div>

                            {/* Floating Stats Card Removed */}

                        </div>

                        {/* Right Column - Stacked Images */}
                        <div className="md:col-span-3 h-[400px] md:h-full flex flex-col gap-3 pt-0 md:pt-16">
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
