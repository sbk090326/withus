'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Thermometer, ShieldCheck, User, Sparkles } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

interface MyPageHeroProps {
    user: {
        name: string;
        mannerTemp: number;
        isVerified: boolean;
        badges: string[];
        completedTrips: number;
    };
}

/**
 * MyPageHero - Upgraded for MyPage Identity
 */
export const MyPageHero = ({ user }: MyPageHeroProps) => {

    return (
        <section className="relative w-full pt-20 pb-12 px-6 overflow-hidden">
            {/* Standard Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
                <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-orange-200/10 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute bottom-[0%] left-[-10%] w-[400px] h-[400px] bg-pink-100/10 rounded-full blur-[90px] mix-blend-multiply" />
            </div>

            <div className="max-w-[1240px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Premium Circle Avatar */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-full bg-white shadow-xl flex items-center justify-center border-4 border-white relative overflow-visible">
                            <div className="w-full h-full rounded-full bg-slate-50 flex items-center justify-center overflow-hidden border border-slate-100">
                                <User size={50} className="text-slate-300 stroke-[1.5]" />
                            </div>
                            {user.isVerified && (
                                <div
                                    className="absolute -bottom-1 -right-1 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border-2 border-white shadow-lg"
                                    style={{ background: theme.colors.gradients.brand }}
                                >
                                    <ShieldCheck size={12} className="text-white fill-white/20" />
                                    <span className="text-[9px] font-black text-white uppercase tracking-tight">인증됨</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Content Section */}
                    <div className="flex-1 text-center md:text-left space-y-5">
                        <div className="space-y-4">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-slate-100 shadow-sm mx-auto md:mx-0">
                                <Sparkles size={14} className="text-orange-500" />
                                <span className="text-[11px] font-bold text-slate-500">마이 트래블 허브</span>
                            </div>

                            <h1 className="text-4xl md:text-4xl font-black text-slate-900 leading-[1.2] tracking-tight">
                                {user.name}님의 <br className="hidden md:block" />
                                <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>
                                    특별한 여정 아카이브
                                </span>
                            </h1>

                            <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
                                <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                                    {user.completedTrips}번의 완료된 여행
                                </p>
                                <div className="w-1 h-1 rounded-full bg-slate-300" />
                                <p className="text-[15px] text-slate-900 font-bold leading-relaxed">
                                    당신이 개척한 모든 길을 여기서 확인하세요.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-4 items-center">
                            {/* Manner Temperature */}
                            <div className="bg-white/80 backdrop-blur-2xl border border-white p-3.5 px-5 rounded-[20px] shadow-sm flex items-center gap-4 group hover:shadow-orange-200/20 transition-all duration-500">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 mb-1 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Thermometer size={11} className="text-orange-500" />
                                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none">매너 온도</span>
                                    </div>
                                    <span className="text-xl font-black text-slate-900 leading-none tracking-tight">{user.mannerTemp}°C</span>
                                </div>
                                <div className="w-20 h-[5px] bg-slate-100 rounded-full overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${user.mannerTemp}%` }}
                                        className="h-full rounded-full relative z-10"
                                        style={{ background: theme.colors.gradients.brand }}
                                    />
                                </div>
                            </div>

                            <div className="h-8 w-px bg-slate-200/60 hidden md:block" />

                            <div className="flex items-center gap-2.5">
                                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest opacity-60">여행 등급</span>
                                <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10">
                                    프로 여행러
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};
