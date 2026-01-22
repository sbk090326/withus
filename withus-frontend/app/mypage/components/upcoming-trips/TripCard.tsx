'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Trash2, Star, MessageCircle, Users, Share2, Sparkles } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';
import Link from 'next/link';

interface TripCardProps {
    trip: {
        id: number;
        title: string;
        location: string;
        date: string;
        status: string;
        isCompleted: boolean;
        isRecruiting: boolean;
        thumbnail: string;
        companions: number;
    };
    onDelete: (id: number) => void;
    onReview: (title: string) => void;
}

/**
 * TripCard - V4.7 Status Clarity (Teal for Recruiting, Orange for Preparing)
 */
export const TripCard = ({ trip, onDelete, onReview }: TripCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`group relative bg-white rounded-[32px] overflow-hidden border transition-all flex flex-col shadow-sm hover:shadow-xl hover:shadow-slate-200/20
            ${trip.isCompleted
                    ? 'border-slate-100 grayscale-[0.3] opacity-80'
                    : 'border-slate-100/80 hover:border-orange-100'
                }`}
        >
            {/* 상단: 이미지 영역 */}
            <div className="relative h-[160px] w-full overflow-hidden">
                <img
                    src={trip.thumbnail}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />

                <div className="absolute top-4 left-4 flex items-center gap-2">
                    {/* 상태 라벨 라운딩 및 색상 고도화 */}
                    <div className={`px-3 py-1.5 rounded-xl backdrop-blur-xl text-[9px] font-black border tracking-wider shadow-sm
                    ${trip.isCompleted
                            ? 'bg-slate-900/80 text-white border-slate-700'
                            : trip.isRecruiting
                                ? 'bg-teal-500/90 text-white border-teal-400'
                                : 'bg-white/95 text-slate-900 border-white'
                        }`}>
                        {trip.isRecruiting ? '모집 진행 중' : trip.status}
                    </div>
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(trip.id); }}
                    className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-rose-500 transition-all opacity-0 group-hover:opacity-100 border border-white/20"
                >
                    <Trash2 size={14} />
                </button>

                <div className="absolute bottom-4 left-5 flex items-center gap-1.5 text-white">
                    <MapPin size={12} className="text-orange-400" />
                    <span className="text-[10px] font-black tracking-wider uppercase">{trip.location}</span>
                </div>
            </div>

            {/* 하단: 정보 영역 */}
            <div className="p-6 space-y-5 flex-1 flex flex-col">
                <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-1.5 text-[9px] font-black tracking-widest uppercase">
                        {trip.isCompleted ? (
                            <span className="text-slate-400">여행 아카이브</span>
                        ) : trip.isRecruiting ? (
                            <span className="text-teal-600">동행 모집 활성화</span>
                        ) : (
                            <span className="text-orange-500">여정 준비 진행 중</span>
                        )}
                    </div>
                    <div className="flex items-start justify-between gap-4">
                        <h4 className={`text-lg font-black leading-tight tracking-tight flex-1 ${trip.isCompleted ? 'text-slate-400' : 'text-slate-900'}`}>
                            {trip.title}
                        </h4>
                        <button
                            onClick={() => alert('코스를 공유합니다!')}
                            className="p-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-300 hover:text-orange-500 transition-all"
                        >
                            <Share2 size={14} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={12} className="opacity-50" />
                        <span className="text-[11px] font-bold tracking-tight">{trip.date}</span>
                    </div>
                </div>

                {/* 동행 정보 (축소) 및 상태 깜빡이(인디케이터) */}
                <div className="flex items-center justify-between py-3 border-y border-slate-50">
                    <div className="flex items-center gap-2.5">
                        <div className="flex -space-x-2">
                            {['👱‍♀️', '👦'].map((emoji, i) => (
                                <div key={i} className="w-7 h-7 rounded-full bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center text-[10px]">
                                    {emoji}
                                </div>
                            ))}
                        </div>
                        <span className="text-[10px] font-bold text-slate-500 tracking-tight">{trip.companions}명 참여 중</span>
                    </div>

                    {/* 🚦 상태 깜빡이 구분 (Teal: 모집, Orange: 준비) */}
                    {!trip.isCompleted && (
                        <div className="flex items-center gap-2">
                            <span className="text-[9px] font-black text-slate-300 uppercase tracking-tighter">
                                {trip.isRecruiting ? 'Recruiting' : 'Preparing'}
                            </span>
                            <span className={`relative flex h-2.5 w-2.5`}>
                                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${trip.isRecruiting ? 'bg-teal-400' : 'bg-orange-400'}`}></span>
                                <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${trip.isRecruiting ? 'bg-teal-500' : 'bg-orange-500'}`}></span>
                            </span>
                        </div>
                    )}
                </div>

                {/* 버튼 그룹 */}
                <div className="flex flex-col gap-2 pt-1">
                    {trip.isCompleted ? (
                        <button
                            onClick={() => onReview(trip.title)}
                            className="w-full py-3 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 text-[11px] font-black uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 group/btn"
                        >
                            <Star size={14} className="text-orange-500 group-hover/btn:fill-orange-500" />
                            동행자 키워드 평가
                        </button>
                    ) : (
                        <>
                            <Link
                                href="/prepare"
                                className="w-full py-3 rounded-2xl text-white text-[11px] font-black tracking-wider shadow-lg shadow-orange-500/10 transition-all flex items-center justify-center gap-2 active:scale-95"
                                style={{ background: theme.colors.gradients.brand }}
                            >
                                <Sparkles size={14} />
                                여정 준비하러 가기
                            </Link>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 text-[10px] font-black tracking-wider hover:bg-slate-50 transition-all active:scale-95 text-center">
                                    일정 수정
                                </button>
                                <button
                                    className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-[10px] font-black tracking-wider flex items-center justify-center gap-2 active:scale-95"
                                >
                                    {trip.isRecruiting ? <MessageCircle size={14} /> : <Users size={14} />}
                                    {trip.isRecruiting ? '모집 관리' : '동행 관리'}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

/**
 * TripCardSkeleton - Loading state UI
 */
export const TripCardSkeleton = () => {
    return (
        <div className="bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm flex flex-col animate-pulse">
            <div className="h-[160px] w-full bg-slate-100" />
            <div className="p-6 space-y-5 flex-1 flex flex-col">
                <div className="space-y-3 flex-1">
                    <div className="w-20 h-3 bg-slate-50 rounded-full" />
                    <div className="space-y-2">
                        <div className="w-full h-6 bg-slate-100 rounded-lg" />
                        <div className="w-2/3 h-6 bg-slate-100 rounded-lg" />
                    </div>
                    <div className="w-32 h-3 bg-slate-50 rounded-full" />
                </div>
                <div className="flex items-center justify-between py-3 border-y border-slate-50">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-slate-100" />
                        <div className="w-7 h-7 rounded-full bg-slate-100" />
                        <div className="w-20 h-3 bg-slate-50 rounded-full" />
                    </div>
                </div>
                <div className="space-y-2 pt-1">
                    <div className="w-full h-11 bg-slate-100 rounded-2xl" />
                    <div className="flex gap-2">
                        <div className="flex-1 h-9 bg-slate-50 rounded-xl" />
                        <div className="flex-1 h-9 bg-slate-50 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};
