'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Settings, Thermometer, ShieldCheck, User } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

interface MyTripsHeroProps {
    user: {
        name: string;
        mannerTemp: number;
        isVerified: boolean;
        badges: string[];
        completedTrips: number;
    };
}

/**
 * MyTripsHero - Clean & Premium Metadata Header
 * Re-simplified to remove excess icons and focused on core identity.
 */
export const MyTripsHero = ({ user }: MyTripsHeroProps) => {

    return (
        <section className="relative w-full pt-32 pb-16 px-6 overflow-hidden">
            {/* Standard Background Decor - Unified with other pages */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
                <div className="absolute top-[-5%] right-[-10%] w-[600px] h-[600px] bg-orange-200/20 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[0%] left-[-10%] w-[500px] h-[500px] bg-pink-100/15 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="flex flex-col md:flex-row items-center gap-12">
                    {/* Premium Circle Avatar - Global Standard */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative"
                    >
                        <div className="w-40 h-40 md:w-44 md:h-44 rounded-full bg-slate-50 shadow-2xl flex items-center justify-center border-[6px] border-white relative overflow-visible">
                            <div className="w-full h-full rounded-full bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
                                <User size={80} className="text-slate-300 stroke-[1.5]" />
                            </div>
                            {user.isVerified && (
                                <div
                                    className="absolute -bottom-1 -right-1 px-4 py-2 rounded-2xl flex items-center gap-2 border-4 border-white shadow-xl"
                                    style={{ background: theme.colors.gradients.brand }}
                                >
                                    <ShieldCheck size={14} className="text-white fill-white/20" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Verified</span>
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Content Section - Landing Page Inspired Typography */}
                    <div className="flex-1 text-center md:text-left space-y-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-4"
                        >
                            <span className="inline-flex items-center gap-3 text-orange-500 font-black text-[11px] uppercase tracking-[0.3em]">
                                <span className="w-10 h-[2px] bg-gradient-to-r from-orange-400 to-transparent" />
                                Personal Travel Room
                            </span>
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-[1.05] tracking-tighter">
                                {user.name}님의 <br className="hidden md:block" />
                                <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">여행 기록실</span>
                            </h1>
                            <p className="text-base md:text-xl text-slate-500 font-medium max-w-lg leading-relaxed">
                                {user.completedTrips}번의 여정, <span className="text-slate-900 font-bold">당신만의 소중한 발자취</span>를 한눈에 확인하세요.
                            </p>
                        </motion.div>

                        <div className="flex flex-wrap justify-center md:justify-start gap-5 items-center pt-2">
                            {/* Manner Temperature - Premium Refinement */}
                            <div className="bg-white/80 backdrop-blur-2xl border border-white p-4 px-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center gap-5 group hover:shadow-orange-200/20 transition-all duration-500">
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1.5 mb-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                                        <Thermometer size={12} className="text-orange-500" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">매너 온도</span>
                                    </div>
                                    <span className="text-2xl font-black text-slate-900 leading-none tracking-tight">{user.mannerTemp}°C</span>
                                </div>
                                <div className="w-24 h-[6px] bg-slate-100 rounded-full overflow-hidden relative">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${user.mannerTemp}%` }}
                                        className="h-full rounded-full relative z-10"
                                        style={{ background: theme.colors.gradients.brand }}
                                    />
                                    <div className="absolute inset-0 bg-slate-200/50" />
                                </div>
                            </div>

                            <div className="h-10 w-px bg-slate-200/60 hidden md:block" />

                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest opacity-60">User Rank</span>
                                <div className="px-4 py-2 rounded-2xl bg-slate-900 text-white text-[11px] font-black uppercase tracking-widest shadow-lg shadow-slate-900/10">
                                    Pro Traveler
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Meta Action */}
                    <div className="md:self-start pt-6">
                        <button className="w-14 h-14 rounded-[1.5rem] bg-white border border-slate-100/80 text-slate-300 hover:text-slate-900 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-300 flex items-center justify-center group">
                            <Settings size={22} className="group-hover:rotate-45 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
