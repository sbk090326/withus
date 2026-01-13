'use client';

import React from 'react';
import { motion } from 'motion/react';
import { palette, theme } from '@/app/components/design-system/constants';

export const HeroSection = () => {
    return (
        <section className="relative w-full max-w-[1400px] mx-auto px-6 md:px-12 mb-20 md:mb-32">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-16"
            >
                <div className="flex-1 space-y-8 mt-12 md:mt-24">
                    <span
                        className="inline-block px-4 py-1.5 rounded-full font-bold text-sm"
                        style={{ backgroundColor: palette.coral[50], color: palette.coral[500] }}
                    >
                        About WithUs
                    </span>
                    <h1
                        className="text-4xl md:text-6xl font-extrabold leading-tight"
                        style={{ color: palette.slate[900] }}
                    >
                        여행, <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, #f97316, #ec4899)` }}>
                            혼자가 아닌 함께의 가치
                        </span>
                    </h1>
                    <p
                        className="text-lg leading-relaxed max-w-xl"
                        style={{ color: palette.slate[600] }}
                    >
                        위드어스는 단순한 동행 구하기 서비스가 아닙니다. <br />
                        우리는 낯선 여행지에서의 불안함을 설렘으로, <br />
                        혼자만의 고독을 함께하는 즐거움으로 바꿉니다.
                    </p>
                </div>
            </motion.div>
        </section>
    );
};
