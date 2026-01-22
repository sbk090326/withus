'use client';

import React, { useState, useEffect } from 'react';
import { ChevronDown, MapPin, Calendar, Users, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';
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
    // Local state for editability
    const [location, setLocation] = useState(selectedTrip.location);
    const [date, setDate] = useState(selectedTrip.date);
    const [guests, setGuests] = useState(selectedTrip.guests.toString());

    // Sync with selectedTrip prop
    useEffect(() => {
        setLocation(selectedTrip.location);
        setDate(selectedTrip.date);
        setGuests(selectedTrip.guests.toString());
    }, [selectedTrip]);

    return (
        <section className="relative w-full pt-6 pb-10 overflow-hidden">
            {/* Standard Hero Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none">
                <div className="absolute top-[-5%] right-[-10%] w-[500px] h-[500px] bg-orange-200/15 rounded-full blur-[100px] mix-blend-multiply" />
                <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-pink-100/15 rounded-full blur-[90px] mix-blend-multiply" />
            </div>

            <div className="max-w-[1240px] mx-auto relative z-10 px-4">

                {/* 1. 상단 배지 (유저 요청에 따라 상단으로 이동) */}
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
                        <span className="tracking-tight">변경 사항은 실시간으로 저장되어 동행들과 공유됩니다</span>
                    </div>
                </motion.div>

                {/* 2. 공간 최적화된 여행 정보 보드 */}
                <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="relative max-w-6xl mx-auto"
                >
                    <div className="bg-white/90 backdrop-blur-3xl rounded-[40px] border border-slate-100 shadow-2xl shadow-slate-200/20 p-5 md:p-7">
                        {/* 4개 항목을 짤림 없이 보여주기 위해 간격(gap)과 패딩을 더 정화하게 보정 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                            {/* 여행 선택 */}
                            <div className="min-w-0 h-full">
                                <button className="w-full h-full flex flex-col items-start gap-3 p-5 rounded-[2.5rem] bg-slate-50/50 hover:bg-white border border-transparent hover:border-orange-100 transition-all group text-left">
                                    <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 shrink-0 shadow-sm">
                                        <ShoppingBag size={20} />
                                    </div>
                                    <div className="flex flex-col min-w-0 w-full">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-orange-500">선택된 여행</span>
                                        <div className="flex items-center justify-between gap-1 w-full">
                                            <span className="text-[14px] font-black text-slate-900 truncate">{selectedTrip.title}</span>
                                            <ChevronDown size={14} className="text-slate-300 group-hover:text-slate-900 shrink-0" />
                                        </div>
                                    </div>
                                </button>
                            </div>

                            {/* 여행지 */}
                            <div className="min-w-0 h-full">
                                <div className="w-full h-full flex flex-col items-start gap-3 p-5 rounded-[2.5rem] bg-slate-50/50 hover:bg-white border border-transparent hover:border-teal-100 transition-all group">
                                    <div className="w-10 h-10 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600 shrink-0 shadow-sm">
                                        <MapPin size={20} />
                                    </div>
                                    <div className="flex flex-col min-w-0 w-full">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-teal-600">여행지</span>
                                        <input
                                            type="text"
                                            value={location}
                                            onChange={(e) => setLocation(e.target.value)}
                                            className="bg-transparent border-none outline-none text-[14px] font-black text-slate-900 w-full p-0 placeholder:text-slate-200 focus:ring-0 truncate"
                                            placeholder="어디로 떠나시나요?"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 여행 일정 */}
                            <div className="min-w-0 h-full">
                                <div className="w-full h-full flex flex-col items-start gap-3 p-5 rounded-[2.5rem] bg-slate-50/50 hover:bg-white border border-transparent hover:border-pink-100 transition-all group">
                                    <div className="w-10 h-10 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-600 shrink-0 shadow-sm">
                                        <Calendar size={20} />
                                    </div>
                                    <div className="flex flex-col min-w-0 w-full">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-pink-600">여행 일정</span>
                                        <input
                                            type="text"
                                            value={date}
                                            onChange={(e) => setDate(e.target.value)}
                                            className="bg-transparent border-none outline-none text-[14px] font-black text-slate-900 w-full p-0 focus:ring-0 truncate"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* 참여 인원 */}
                            <div className="min-w-0 h-full">
                                <div className="w-full h-full flex flex-col items-start gap-3 p-5 rounded-[2.5rem] bg-slate-50/50 hover:bg-white border border-transparent hover:border-indigo-100 transition-all group">
                                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 shrink-0 shadow-sm">
                                        <Users size={20} />
                                    </div>
                                    <div className="flex flex-col min-w-0 w-full">
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-indigo-600">참여 인원</span>
                                        <div className="flex items-center gap-1">
                                            <input
                                                type="number"
                                                value={guests}
                                                onChange={(e) => setGuests(e.target.value)}
                                                className="bg-transparent border-none outline-none text-[14px] font-black text-slate-900 w-full p-0 focus:ring-0"
                                            />
                                            <span className="text-[14px] font-black text-slate-900">명</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
