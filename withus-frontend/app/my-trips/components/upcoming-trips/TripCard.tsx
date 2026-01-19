'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Trash2, Star, MessageCircle, Users, Share2 } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

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

export const TripCard = ({ trip, onDelete, onReview }: TripCardProps) => {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`group relative bg-white rounded-[2.5rem] overflow-hidden border transition-all flex flex-col shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.08)]
            ${trip.isCompleted
                    ? 'border-slate-100 grayscale-[0.5] opacity-90'
                    : 'border-slate-100/80 hover:border-orange-100'
                }`}
        >
            {/* 상단: 이미지 영역 */}
            <div className="relative h-[180px] w-full overflow-hidden">
                <img
                    src={trip.thumbnail}
                    alt={trip.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

                <div className="absolute top-5 left-5 flex items-center gap-2">
                    <div className={`px-3 py-1.5 rounded-xl backdrop-blur-xl text-[9px] font-black border tracking-wider
                    ${trip.isCompleted
                            ? 'bg-slate-900/80 text-white border-slate-700'
                            : 'bg-white/95 text-slate-900 border-white'
                        }`}>
                        {trip.status}
                    </div>
                    {!trip.isCompleted && (
                        <div className={`px-3 py-1.5 rounded-xl text-white text-[9px] font-black border tracking-wider animate-pulse
                        ${trip.isRecruiting ? 'bg-teal-500 border-teal-400' : 'bg-orange-500 border-orange-400'}`}>
                            {trip.isRecruiting ? '모집 중' : '진행 중'}
                        </div>
                    )}
                </div>

                <button
                    onClick={(e) => { e.stopPropagation(); onDelete(trip.id); }}
                    className="absolute top-5 right-5 p-2 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-rose-500 transition-all opacity-0 group-hover:opacity-100 border border-white/20"
                >
                    <Trash2 size={16} />
                </button>

                <div className="absolute bottom-5 left-6 flex items-center gap-1.5 text-white">
                    <MapPin size={14} className="text-orange-400" />
                    <span className="text-[11px] font-black tracking-wider">{trip.location}</span>
                </div>
            </div>

            {/* 하단: 정보 영역 */}
            <div className="p-7 space-y-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 tracking-widest">
                        {trip.isCompleted ? '지난 추억 저장소' : (trip.isRecruiting ? '동행 모집 활성화' : '라이브 여행 플래너')}
                    </div>
                    <div className="flex items-start justify-between gap-4">
                        <h4 className={`text-xl font-black leading-tight tracking-tighter flex-1 ${trip.isCompleted ? 'text-slate-400' : 'text-slate-900'}`}>
                            {trip.title}
                        </h4>
                        <button
                            onClick={() => alert('해당 코스를 커뮤니티 [여행 코스] 탭에 공유합니다!')}
                            className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-all active:scale-95 shadow-sm shrink-0 mt-0.5"
                            title="코스 공유하기"
                        >
                            <Share2 size={16} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400">
                        <Calendar size={14} className="opacity-50" />
                        <span className="text-xs font-bold tracking-tight">{trip.date}</span>
                    </div>
                </div>

                {/* 동행 정보 */}
                <div className="flex items-center justify-between py-4 border-y border-slate-50">
                    <div className="flex items-center gap-3">
                        <div className="flex -space-x-2.5">
                            {['👱‍♀️', '👦'].map((emoji, i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center text-xs overflow-hidden">
                                    {emoji}
                                </div>
                            ))}
                        </div>
                        <span className="text-[11px] font-black text-slate-900 tracking-tight">{trip.companions}명의 동행인이 참여 중</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    {trip.isCompleted ? (
                        <button
                            onClick={() => onReview(trip.title)}
                            className="w-full py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-slate-900 text-[11px] font-black uppercase tracking-wider hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95 group/btn"
                        >
                            <Star size={14} className="text-orange-500 group-hover/btn:fill-orange-500" />
                            동행자 키워드 평가
                        </button>
                    ) : (
                        <>
                            <button className="flex-1 py-3.5 rounded-2xl bg-white border border-slate-200 text-slate-900 text-[11px] font-black tracking-wider hover:bg-slate-50 transition-all active:scale-95 text-center">
                                일정 수정
                            </button>
                            <button
                                className={`flex-1 py-3.5 rounded-2xl text-white text-[11px] font-black tracking-wider shadow-lg transition-all flex items-center justify-center gap-2 active:scale-95
                                ${trip.isRecruiting ? 'bg-slate-900 shadow-slate-900/10' : 'bg-orange-500 shadow-orange-500/10'}`}
                                style={!trip.isRecruiting ? { background: theme.colors.gradients.brand } : {}}
                            >
                                {trip.isRecruiting ? <MessageCircle size={14} /> : <Users size={14} />}
                                {trip.isRecruiting ? '모집 관리' : '동행 찾기'}
                            </button>
                        </>
                    )}
                </div>
            </div>
        </motion.div>
    );
};
