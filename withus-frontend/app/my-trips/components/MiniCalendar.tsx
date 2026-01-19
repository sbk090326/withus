'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    isSameMonth,
    isSameDay,
    addDays,
    eachDayOfInterval,
    isToday
} from 'date-fns';
import { ko } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface MiniCalendarProps {
    progress: number;
    remainingCount: number;
    pendingItems: string[];
}

export const MiniCalendar = ({ progress, remainingCount, pendingItems }: MiniCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Mock trip data with details
    const tripDetails = [
        { date: new Date(2026, 0, 5), title: '제주도 워케이션 💻', desc: '노트북 챙기기 잊지 마세요!' },
        { date: new Date(2026, 0, 12), title: '강릉 당일치기 🏖️', desc: '폴앤메리 버거 꼭 먹기!' },
        { date: new Date(2026, 0, 17), title: '전주 먹방 투어 🥘', desc: '육회 비빔밥 대기 확인' },
        { date: new Date(2026, 0, 28), title: '일본 온천 여행 ♨️', desc: '여권 유효기간 확인 완료' },
        { date: new Date(2026, 4, 2), title: '포르투갈 서핑 시작 🏄‍♂️', desc: '리스본행 비행기 11:45분' },
        { date: new Date(2026, 4, 10), title: '포르투갈 서핑 종료 🏠', desc: '귀국 항공편 확인하기' },
    ];

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    // Find if selected date has a trip
    const selectedTripInfo = tripDetails.find(t => isSameDay(t.date, selectedDate));
    const isTodaySelected = isSameDay(selectedDate, new Date());

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Travel Planner</span>
                <h4 className="text-xl font-black text-slate-900">
                    {format(currentMonth, 'yyyy년 M월', { locale: ko })}
                </h4>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={prevMonth}
                    className="p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-orange-500 active:scale-90"
                >
                    <ChevronLeft size={18} />
                </button>
                <button
                    onClick={nextMonth}
                    className="p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-400 hover:text-orange-500 active:scale-90"
                >
                    <ChevronRight size={18} />
                </button>
            </div>
        </div>
    );

    const renderDays = () => {
        const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        return (
            <div className="grid grid-cols-7 mb-4">
                {days.map((day, i) => (
                    <div key={i} className="text-center">
                        <span className={`text-[10px] font-black uppercase tracking-widest ${i === 0 ? 'text-rose-400' : i === 6 ? 'text-blue-400' : 'text-slate-300'}`}>
                            {day}
                        </span>
                    </div>
                ))}
            </div>
        );
    };

    const renderCells = () => {
        const monthStart = startOfMonth(currentMonth);
        const monthEnd = endOfMonth(monthStart);
        const startDate = startOfWeek(monthStart);
        const endDate = endOfWeek(monthEnd);

        const calendarDays = eachDayOfInterval({
            start: startDate,
            end: endDate,
        });

        return (
            <div className="grid grid-cols-7 gap-y-2">
                {calendarDays.map((day) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isDayToday = isToday(day);
                    const hasTrip = tripDetails.some(t => isSameDay(t.date, day));

                    return (
                        <div key={day.toString()} className="relative flex items-center justify-center">
                            <button
                                onClick={() => setSelectedDate(day)}
                                className={`w-10 h-10 rounded-2xl text-sm font-bold transition-all relative z-10 
                                    ${!isCurrentMonth ? 'text-slate-200' : 'text-slate-600'}
                                    ${isDayToday && !isSelected ? 'text-orange-500 ring-2 ring-orange-100 ring-offset-2' : ''}
                                    ${isSelected
                                        ? 'bg-slate-900 text-white shadow-xl scale-110'
                                        : 'hover:bg-white hover:shadow-sm'
                                    }`}
                            >
                                {format(day, 'd')}
                            </button>
                            {hasTrip && isCurrentMonth && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-white shadow-sm z-20"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="relative bg-white/60 backdrop-blur-sm rounded-[32px] p-8 border border-white shadow-sm">
            {/* Diary Decorative Sticker */}
            <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute -top-3 left-10 px-5 py-2 bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg rotate-[-2deg] z-20"
            >
                두근두근 여행 준비
            </motion.div>

            {renderHeader()}
            {renderDays()}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentMonth.toString()}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderCells()}
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-7 border-t border-slate-100 space-y-7">
                {/* 1. Assistant's Briefing Header */}
                <div className="space-y-1">
                    <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                        {selectedTripInfo ? 'Trip Briefing' : 'Personal Assistant'}
                    </p>
                    <h5 className="text-sm font-black text-slate-800 tracking-tight">
                        {selectedTripInfo
                            ? `${format(selectedDate, 'M월 d일')}의 일정을 확인하세요!`
                            : '민수님의 여행 비서가 알려드려요! 👋'}
                    </h5>
                </div>

                {/* 2. Upcoming Trip */}
                <div className="flex items-start gap-4 p-5 bg-orange-50/50 rounded-3xl border border-orange-100/50 group cursor-pointer hover:bg-orange-50 transition-all">
                    <div className="w-10 h-10 rounded-2xl bg-white border border-orange-100 flex items-center justify-center text-lg shadow-sm shrink-0">
                        🌊
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                            <p className="text-[9px] font-black text-orange-400 uppercase tracking-widest leading-none">Next Destination</p>
                            <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-[8px] font-black uppercase shadow-sm">D-12</span>
                        </div>
                        <p className="text-sm font-black text-slate-800 truncate mb-1">포르투갈 서핑 정복기</p>
                        <p className="text-[10px] font-bold text-slate-400">5월 2일 출발 예정이에요.</p>
                    </div>
                </div>

                {/* 3. Assistant's Friendly Chat Bubble */}
                <div className="space-y-4">
                    <div className="flex items-end gap-3 px-1">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-xs shadow-md shrink-0">
                            ✨
                        </div>
                        <div className="bg-white border border-slate-100 px-5 py-4 rounded-3xl rounded-bl-none shadow-sm relative flex-1">
                            <div className="absolute -left-1.5 bottom-0 w-3 h-3 bg-white border-l border-b border-slate-100 rotate-45"></div>
                            <p className="text-[11px] font-bold text-slate-600 leading-relaxed relative z-10 font-medium">
                                {selectedTripInfo ? (
                                    <>
                                        오늘은 <span className="text-slate-900 font-black">"{selectedTripInfo.title}"</span> 일정이 있어요! <br />
                                        <span className="text-orange-500 font-bold">💡 {selectedTripInfo.desc}</span>
                                    </>
                                ) : isTodaySelected ? (
                                    <>
                                        {remainingCount === 0 ? (
                                            '민수님, 모든 준비가 완벽하게 끝났어요! 🎊 편안한 마음으로 여행을 기다려요.'
                                        ) : (
                                            <>
                                                포르투갈 여행을 위해 아직 <span className="text-orange-500 font-black">"{pendingItems[0]}"</span>를 안 하셨네요! 🏄‍♂️ <br />
                                                남은 {remainingCount}가지 항목도 저랑 같이 챙겨볼까요?
                                            </>
                                        )}
                                    </>
                                ) : (
                                    `민수님, ${format(selectedDate, 'M월 d일')}에는 예정된 여행 일정이 없네요. 날짜를 클릭해 일정을 확인해보세요!`
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar (Visible on Today or Trip days) */}
                    {(isTodaySelected || selectedTripInfo) && (
                        <div className="px-5 space-y-2">
                            <div className="flex items-center justify-between text-[10px] font-black">
                                <span className="text-slate-400 uppercase tracking-widest">Guide Progress</span>
                                <span className="text-teal-600 font-black">{progress}% 완료</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.3)]"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
