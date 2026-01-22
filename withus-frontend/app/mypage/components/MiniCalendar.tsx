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
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

interface MiniCalendarProps {
    progress: number;
    remainingCount: number;
    pendingItems: string[];
}

/**
 * MiniCalendar - Fully Localized & V4.5 Slim Style
 */
export const MiniCalendar = ({ progress, remainingCount, pendingItems }: MiniCalendarProps) => {
    const [currentMonth, setCurrentMonth] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());

    const tripDetails = [
        { date: new Date(2026, 0, 5), title: '제주도 워케이션 💻', desc: '노트북 챙기기 잊지 마세요!' },
        { date: new Date(2026, 0, 12), title: '강릉 당일치기 🏖️', desc: '폴앤메리 버거 꼭 먹기!' },
        { date: new Date(2026, 4, 2), title: '포르투갈 서핑 시작 🏄‍♂️', desc: '리스본행 비행기 11:45분' },
        { date: new Date(2026, 4, 10), title: '포르투갈 서핑 종료 🏠', desc: '귀국 항공편 확인하기' },
    ];

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const selectedTripInfo = tripDetails.find(t => isSameDay(t.date, selectedDate));
    const isTodaySelected = isSameDay(selectedDate, new Date());

    const renderHeader = () => (
        <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
                <span className="text-[9px] font-black text-orange-500 uppercase tracking-[0.2em]">나의 일정 플래너</span>
                <h4 className="text-lg font-black text-slate-800 tracking-tight">
                    {format(currentMonth, 'yyyy년 M월', { locale: ko })}
                </h4>
            </div>
            <div className="flex gap-1.5">
                <button
                    onClick={prevMonth}
                    className="p-1.5 rounded-xl hover:bg-slate-50 transition-all text-slate-300 hover:text-slate-900"
                >
                    <ChevronLeft size={16} />
                </button>
                <button
                    onClick={nextMonth}
                    className="p-1.5 rounded-xl hover:bg-slate-50 transition-all text-slate-300 hover:text-slate-900"
                >
                    <ChevronRight size={16} />
                </button>
            </div>
        </div>
    );

    const renderDays = () => {
        const days = ['일', '월', '화', '수', '목', '금', '토'];
        return (
            <div className="grid grid-cols-7 mb-3">
                {days.map((day, i) => (
                    <div key={i} className="text-center">
                        <span className={`text-[9px] font-black tracking-widest ${i === 0 ? 'text-rose-400' : i === 6 ? 'text-blue-400' : 'text-slate-300'}`}>
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
            <div className="grid grid-cols-7 gap-y-1.5">
                {calendarDays.map((day) => {
                    const isSelected = isSameDay(day, selectedDate);
                    const isCurrentMonth = isSameMonth(day, monthStart);
                    const isDayToday = isToday(day);
                    const hasTrip = tripDetails.some(t => isSameDay(t.date, day));

                    return (
                        <div key={day.toString()} className="relative flex items-center justify-center">
                            <button
                                onClick={() => setSelectedDate(day)}
                                className={`w-9 h-9 rounded-xl text-[13px] font-bold transition-all relative z-10 
                                    ${!isCurrentMonth ? 'text-slate-200' : 'text-slate-600'}
                                    ${isDayToday && !isSelected ? 'text-orange-500 ring-2 ring-orange-100' : ''}
                                    ${isSelected
                                        ? 'bg-slate-900 text-white shadow-lg'
                                        : 'hover:bg-slate-50'
                                    }`}
                            >
                                {format(day, 'd')}
                            </button>
                            {hasTrip && isCurrentMonth && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-orange-500 border-2 border-white shadow-sm z-20"
                                />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="relative bg-white/60 backdrop-blur-md rounded-[32px] p-7 border border-white shadow-sm">
            <motion.div
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="absolute -top-2.5 left-8 px-4 py-1.5 bg-orange-500 text-white text-[9px] font-black uppercase tracking-tight rounded-full shadow-md z-20"
            >
                실시간 여행 매니저
            </motion.div>

            {renderHeader()}
            {renderDays()}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentMonth.toString()}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                >
                    {renderCells()}
                </motion.div>
            </AnimatePresence>

            <div className="mt-8 pt-6 border-t border-slate-100 space-y-6">
                <div className="space-y-1">
                    <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mb-1">여정 브리핑</p>
                    <h5 className="text-[13px] font-black text-slate-800 tracking-tight leading-none">
                        {selectedTripInfo
                            ? `${format(selectedDate, 'M월 d일')}의 일정을 확인하세요!`
                            : '민수님, 오늘의 여행 소식입니다 👋'}
                    </h5>
                </div>

                <div className="flex items-start gap-4 p-4 bg-orange-50/50 rounded-[24px] border border-orange-100/50 group cursor-pointer hover:bg-orange-50 transition-all">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-orange-100 flex items-center justify-center text-sm shadow-sm shrink-0">
                        🌊
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-0.5">
                            <p className="text-[8px] font-black text-orange-400 uppercase tracking-widest">다음 목적지</p>
                            <span className="px-2 py-0.5 rounded-full bg-orange-500 text-white text-[8px] font-black whitespace-nowrap">D-12</span>
                        </div>
                        <p className="text-[13px] font-black text-slate-800 truncate mb-0.5 whitespace-nowrap">포르투갈 서핑 정복기</p>
                        <p className="text-[10px] font-bold text-slate-400 whitespace-nowrap">5월 2일 출발 예정</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex items-end gap-2.5 px-px">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center text-white text-[10px] shadow-sm shrink-0">
                            ✨
                        </div>
                        <div className="bg-white border border-slate-100 px-4 py-3.5 rounded-[24px] rounded-bl-none shadow-sm relative flex-1">
                            <p className="text-[11px] font-bold text-slate-600 leading-relaxed relative z-10 font-medium tracking-tight">
                                {selectedTripInfo ? (
                                    <>
                                        이날은 <span className="text-slate-900 font-black">"{selectedTripInfo.title}"</span> 일정이 있습니다. <br />
                                        <span className="text-orange-500 font-bold">💡 {selectedTripInfo.desc}</span>
                                    </>
                                ) : isTodaySelected ? (
                                    <>
                                        {remainingCount === 0 ? (
                                            '모든 준비가 완벽하게 끝났습니다! 🎊 즐거운 여행 되세요.'
                                        ) : (
                                            <>
                                                포르투갈 여행을 위해 아직 <span className="text-orange-500 font-black">"{pendingItems[0]}"</span>를 안 하셨네요! <br />
                                                <a href="/prepare" className="text-slate-900 underline decoration-teal-200 decoration-2 underline-offset-2 hover:text-teal-600 transition-colors">
                                                    준비 페이지에서 동행과 함께 챙겨보세요!
                                                </a>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    `민수님, ${format(selectedDate, 'M월 d일')}에는 예정된 일정이 없습니다.`
                                )}
                            </p>
                        </div>
                    </div>

                    {(isTodaySelected || selectedTripInfo) && (
                        <div className="px-1 space-y-1.5">
                            <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-tight">
                                <span className="text-slate-400">전체 준비율</span>
                                <span className="text-teal-600">{progress}% 완료</span>
                            </div>
                            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-teal-500 rounded-full"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
