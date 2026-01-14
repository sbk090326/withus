'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { UserPlus, Search } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

export const CTASection = () => {
    return (
        <section
            className="w-full py-40 px-6 text-white text-center relative overflow-hidden"
            style={{
                background: theme.colors.gradients.brand
            }}
        >
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-20 pointer-events-none"></div>

            <div className="relative z-10 max-w-4xl mx-auto space-y-12">
                <div className="space-y-6">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black leading-tight tracking-tight"
                    >
                        당신의 특별한 여정, <br />
                        위드어스와 함께 시작하세요.
                    </motion.h2>
                </div>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <Link href="/signup">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-6 rounded-full bg-white font-black text-xl hover:shadow-[0_20px_40px_rgba(0,0,0,0.2)] transition-all flex items-center justify-center gap-3"
                            style={{ color: palette.coral[600] }}
                        >
                            <UserPlus size={24} />
                            무료로 가입하기
                        </motion.button>
                    </Link>
                    <Link href="/find-companion">
                        <motion.button
                            whileHover={{ scale: 1.05, y: -5 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-12 py-6 rounded-full font-black text-xl text-white border-2 border-white/30 hover:bg-white/10 transition-all flex items-center justify-center gap-3"
                        >
                            <Search size={24} />
                            동행 탐색하기
                        </motion.button>
                    </Link>
                </div>
            </div>

            {/* Aesthetic circle shapes */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/10 rounded-full blur-[80px] -translate-x-1/2 translate-y-1/2" />
        </section>
    );
};
