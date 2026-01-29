'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Calendar, Users, ShoppingBag, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { theme } from '@/app/components/design-system/constants';

interface Trip {
    id: number;
    title: string;
    location: string;
    date: string;
    guests: number;
}

interface PrepareHeaderProps {
    trips: Trip[];
    selectedTrip: Trip;
    onSelectTrip: (trip: Trip) => void;
}

export const PrepareHeader = ({ trips, selectedTrip, onSelectTrip }: PrepareHeaderProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <section className="relative w-full pt-6 pb-10">
            {/* Standard Hero Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-orange-200/15 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-pink-100/15 rounded-full blur-[90px] mix-blend-multiply" />
            </div>

            <div className="max-w-[1240px] mx-auto relative z-[60] px-4">

                {/* 1. 상단 배지 */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center mb-6"
                >
                    <div className="flex items-center gap-2.5 text-[10px] font-black text-slate-500 bg-white/60 backdrop-blur-md px-5 py-2 rounded-full border border-white/80 shadow-sm">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                        </div>
                        <span className="tracking-tight">다른 여정으로 이동하려면 여정 이름을 클릭하세요</span>
                    </div>
                </motion.div>

                {/* 2. 공간 최적화된 여행 정보 보드 */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative max-w-5xl mx-auto"
                >
                    <div className="bg-white/95 backdrop-blur-3xl rounded-[40px] border border-slate-100 shadow-xl shadow-slate-200/20 p-6 md:p-8 space-y-6">
                        {/* Row 1: Primary Context (Trip Switcher) */}
                        <div className="relative">
                            <button
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className={`w-full flex items-center justify-between p-6 md:p-8 rounded-[32px] transition-all group border-2
                                    ${isDropdownOpen ? 'bg-white border-orange-500 shadow-lg shadow-orange-500/5' : 'bg-slate-50 border-transparent hover:bg-white hover:border-slate-100'}`}
                            >
                                <div className="flex items-center gap-6 min-w-0">
                                    <div className={`w-14 h-14 rounded-3xl flex items-center justify-center transition-all duration-500 shadow-md
                                        ${isDropdownOpen ? 'bg-orange-500 text-white' : 'bg-white text-orange-500 border border-orange-50'}`}>
                                        <ShoppingBag size={28} />
                                    </div>
                                    <div className="flex flex-col items-start min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest group-hover:text-orange-500">현재 준비 중인 여정</span>
                                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[8px] font-black uppercase tracking-tighter">여정 전환하기</span>
                                        </div>
                                        <h2 className="text-xl md:text-2xl font-black text-slate-900 truncate">
                                            {selectedTrip.title}
                                        </h2>
                                    </div>
                                </div>
                                <div className={`p-4 rounded-2xl transition-all duration-300 ${isDropdownOpen ? 'bg-orange-50 text-orange-500' : 'bg-white text-slate-300 group-hover:text-slate-900'}`}>
                                    <ChevronDown size={24} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                                </div>
                            </button>

                            {/* Dropdown Menu (Positioned for Hero layout) */}
                            <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                        animate={{ opacity: 1, y: 12, scale: 1 }}
                                        exit={{ opacity: 0, y: 20, scale: 0.98 }}
                                        className="absolute top-full left-0 right-0 z-[100] bg-white rounded-[40px] border border-slate-100 shadow-3xl shadow-slate-200/60 p-4 overflow-hidden"
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[400px] overflow-y-auto custom-scrollbar p-2">
                                            {trips.map((trip) => (
                                                <button
                                                    key={trip.id}
                                                    onClick={() => {
                                                        onSelectTrip(trip);
                                                        setIsDropdownOpen(false);
                                                    }}
                                                    className={`group w-full flex items-center gap-5 p-5 rounded-[28px] transition-all text-left
                                                        ${selectedTrip.id === trip.id ? 'bg-orange-50 border border-orange-100' : 'bg-white border border-transparent hover:bg-slate-50 hover:border-slate-100'}`}
                                                >
                                                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all
                                                        ${selectedTrip.id === trip.id ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-400 group-hover:scale-110 group-hover:bg-white group-hover:text-orange-500'}`}>
                                                        <MapPin size={20} />
                                                    </div>
                                                    <div className="flex flex-col min-w-0 flex-1">
                                                        <div className={`text-sm font-black truncate mb-0.5 ${selectedTrip.id === trip.id ? 'text-orange-600' : 'text-slate-900'}`}>
                                                            {trip.title}
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{trip.location}</span>
                                                            <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{trip.date.split(' - ')[0]}</span>
                                                        </div>
                                                    </div>
                                                    {selectedTrip.id === trip.id && (
                                                        <div className="p-2 bg-orange-500 rounded-full">
                                                            <Check size={12} className="text-white" />
                                                        </div>
                                                    )}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Row 2: Metadata (Details) */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* 여행지 */}
                            <div className="bg-slate-50/50 rounded-[28px] p-5 flex items-center gap-4 group transition-all">
                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-teal-600 shadow-sm">
                                    <MapPin size={20} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 group-hover:text-teal-600 transition-colors">여행지</span>
                                    <span className="text-sm font-black text-slate-900 truncate">{selectedTrip.location}</span>
                                </div>
                            </div>

                            {/* 여행 일정 */}
                            <div className="bg-slate-50/50 rounded-[28px] p-5 flex items-center gap-4 group transition-all">
                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-pink-600 shadow-sm">
                                    <Calendar size={20} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 group-hover:text-pink-600 transition-colors">여행 일정</span>
                                    <span className="text-sm font-black text-slate-900 truncate">{selectedTrip.date}</span>
                                </div>
                            </div>

                            {/* 참여 인원 */}
                            <div className="bg-slate-50/50 rounded-[28px] p-5 flex items-center gap-4 group transition-all">
                                <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-indigo-500 shadow-sm">
                                    <Users size={20} />
                                </div>
                                <div className="flex flex-col min-w-0">
                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 group-hover:text-indigo-500 transition-colors">인원</span>
                                    <span className="text-sm font-black text-slate-900 truncate">{selectedTrip.guests}명 참여 중</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
