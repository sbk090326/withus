'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'motion/react';
import { SearchWidget } from './SearchWidget';
import { typography, animations } from '@/app/components/design-system/constants';
import { Play } from 'lucide-react';

export function HeroParallax() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll();
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yLeft = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const yCenter = useTransform(scrollYProgress, [0, 1], [0, 50]);
    const yRight = useTransform(scrollYProgress, [0, 1], [0, -150]);

    // Blur effect based on scroll position (0 to 10px blur over 500px scroll)
    const blurValue = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(12px)"]);
    // Optional: Darken background slightly as we scroll to make text/cards content pop more
    const overlayOpacity = useTransform(scrollY, [0, 500], [0.3, 0.6]);

    return (
        <div ref={containerRef} className="relative w-full min-h-[150vh] overflow-hidden">
            {/* Fixed Background Layer with Blur Effect */}
            <motion.div
                className="fixed inset-0 z-0 h-screen"
                style={{
                    filter: blurValue,
                    scale: 1.05 // Slight scale to prevent edge bleeding on blur
                }}
            >
                <Image
                    src="/hero-bg.png"
                    alt="Balloons over Cappadocia"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
            </motion.div>

            {/* Dynamic Overlay for readability */}
            <motion.div
                className="fixed inset-0 z-0 bg-black pointer-events-none"
                style={{ opacity: overlayOpacity }}
            />

            {/* Content Layer */}
            <div className="relative z-10">

                <div className="pt-32 pb-40 px-4 md:px-12 max-w-[1800px] mx-auto">
                    {/* Text and Search Top Section */}
                    <div className="flex flex-col items-center justify-center mb-32 z-20 relative">
                        <motion.h1
                            className="text-center font-semibold leading-[1.1] mb-6 text-white drop-shadow-xl"
                            style={{ fontSize: 'clamp(48px, 6vw, 84px)' }}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animations.duration.normal, delay: 0.2, ease: animations.easing.smooth }}
                        >
                            Find your next <br />
                            unforgettable trip
                        </motion.h1>

                        <motion.p
                            className="text-center text-white/90 text-xl font-medium mb-16 max-w-2xl drop-shadow-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: animations.duration.normal, delay: 0.3, ease: animations.easing.smooth }}
                        >
                            Discover hidden gems, chill spots, and wild adventures, all in one place.
                        </motion.p>

                        <SearchWidget /> {/* Reverted to default (dark theme) */}
                    </div>

                    {/* Parallax Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px] md:h-[1000px] w-full">

                        {/* Left Column - 3 Columns Wide */}
                        <div className="md:col-span-3 h-full flex items-end">
                            <motion.div
                                style={{ y: yLeft }}
                                className="relative w-full h-[70%] rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                            >
                                <Image
                                    src="/hero-grid-1.png"
                                    alt="Luxury View"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                        {/* Center Column - 5 Columns Wide - Video */}
                        <div className="md:col-span-6 h-full flex items-center justify-center">
                            <motion.div
                                style={{ y: yCenter }}
                                className="relative w-full h-[90%] rounded-[32px] overflow-hidden shadow-2xl border border-white/10 group cursor-pointer"
                            >
                                <Image
                                    src="/hero-video-thumb.png"
                                    alt="Travel Cinematic"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />

                                {/* Video Overlay */}
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                                    <div className="w-24 h-24 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 group-hover:scale-110 transition-transform">
                                        <Play fill="white" className="text-white ml-2" size={40} />
                                    </div>
                                </div>

                                <div className="absolute bottom-10 left-10 text-white p-4 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
                                    <p className="text-sm font-medium uppercase tracking-wider mb-1">Featured Experience</p>
                                    <h3 className="text-3xl font-bold">Discover Europe</h3>
                                </div>
                            </motion.div>
                        </div>

                        {/* Right Column - 3 Columns Wide - Stacked Images */}
                        <div className="md:col-span-3 h-full flex flex-col gap-6 pt-20">
                            <motion.div
                                style={{ y: yRight }}
                                className="relative w-full h-[45%] rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                            >
                                <Image
                                    src="/hero-grid-2.png"
                                    alt="Interior"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                            <motion.div
                                style={{ y: yRight }}
                                className="relative w-full h-[40%] rounded-[32px] overflow-hidden shadow-2xl border border-white/10"
                            >
                                <Image
                                    src="/hero-grid-3.png"
                                    alt="Private Jet"
                                    fill
                                    className="object-cover"
                                />
                            </motion.div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}
