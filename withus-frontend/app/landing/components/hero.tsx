'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { SearchWidget } from './SearchWidget';
import { LandingHeader } from './LandingHeader';
import { typography, animations } from '@/app/components/design-system/constants';

export function Hero() {
    return (
        <div className="relative w-full h-screen overflow-hidden bg-[#1A3C5A]">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/hero-bg.png"
                    alt="Balloons over Cappadocia"
                    fill
                    className="object-cover"
                    priority
                    quality={100}
                />
                {/* Overlay Gradient for readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex flex-col">
                <LandingHeader />

                <div className="flex-1 flex flex-col items-center justify-center px-4 pt-20">
                    <motion.h1
                        className="text-center text-white font-semibold leading-[1.1] mb-6 drop-shadow-lg"
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

                    <SearchWidget />
                </div>
            </div>
        </div>
    );
}
