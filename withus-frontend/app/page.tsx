'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { theme } from '@/app/components/design-system/constants';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        // 루트 경로를 랜딩 페이지로 리다이렉트
        const timer = setTimeout(() => {
            router.push('/landing');
        }, 800); // 0.8초 정도 브랜딩 노출 후 이동

        return () => clearTimeout(timer);
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#FDFCFB]">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="text-center space-y-8"
            >
                {/* Brand Logo with Animation */}
                <div className="relative">
                    <motion.h1
                        className="text-6xl font-black tracking-tighter"
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span
                            className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                            style={{ backgroundImage: theme.colors.gradients.brand }}
                        >
                            WITHUS
                        </span>
                    </motion.h1>

                    {/* Subtle Glow beneath the logo */}
                    <div className="absolute -inset-4 bg-orange-500/5 blur-2xl -z-10 rounded-full" />
                </div>

                {/* Progress Bar Loader */}
                <div className="w-24 h-[2px] bg-slate-100 mx-auto rounded-full overflow-hidden relative">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 to-pink-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{
                            duration: 0.8,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-[10px] font-black tracking-[0.4em] text-slate-300 uppercase"
                >
                    Personalizing your journey
                </motion.p>
            </motion.div>
        </div>
    );
}
