'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Trash2, Star, MessageCircle, Users, Share2, Sparkles } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';
import Link from 'next/link';
import { RecruitmentManagementModal } from './RecruitmentManagementModal';
import { TeamChatDrawer } from './TeamChatDrawer';

interface TripCardProps {
    trip: {
        id: number;
        title: string;
        location: string;
        date: string;
        status: string;
        isCompleted: boolean;
        isRecruiting: boolean;
        role?: 'host' | 'guest';
        progress: number;
        highlights?: string[];
        thumbnail: string;
        companions: number;
    };
    onDelete: (id: number) => void;
    onReview: (title: string) => void;
    onEdit: () => void;
}

/**
 * TripCard - V5.6 Contextual UX with Edit support
 */
export const TripCard = ({ trip, onDelete, onReview, onEdit }: TripCardProps) => {
    const [isRecruitModalOpen, setIsRecruitModalOpen] = React.useState(false);
    const [isChatDrawerOpen, setIsChatDrawerOpen] = React.useState(false);

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className={`group relative bg-white rounded-[36px] overflow-hidden border transition-all flex flex-col shadow-sm hover:shadow-2xl hover:shadow-slate-200/40
            ${trip.isCompleted
                        ? 'border-slate-100 grayscale-[0.3] opacity-80'
                        : 'border-slate-100/80 hover:border-orange-100'
                    }`}
            >
                {/* 상단: 이미지 영역 (Optimum height for impact and clarity) */}
                <div className="relative h-[160px] w-full overflow-hidden">
                    <img
                        src={trip.thumbnail}
                        alt={trip.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                    <div className="absolute top-5 left-6 flex flex-wrap gap-2">
                        <div className={`px-3 py-1.5 rounded-xl backdrop-blur-xl text-[10px] font-black border tracking-wider shadow-sm uppercase
                    ${trip.role === 'host' ? 'bg-orange-500 text-white border-orange-400' : 'bg-slate-900/80 text-white border-slate-700'}`}>
                            {trip.role === 'host' ? (trip.isRecruiting || trip.companions > 0 ? 'Host' : 'Private') : 'Member'}
                        </div>
                    </div>

                    <div className="absolute bottom-5 left-6 right-6">
                        <h4 className={`text-lg font-black leading-tight tracking-tight text-white line-clamp-1`}>
                            {trip.title}
                        </h4>
                    </div>
                </div>

                {/* 하단: 정보 영역 (Optimized padding & space) */}
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="flex items-center justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center gap-1.5">
                            <MapPin size={12} className="text-orange-400" />
                            <span>{trip.location}</span>
                        </div>
                        {!trip.isCompleted && (
                            <span className="text-orange-500">Ready {trip.progress}%</span>
                        )}
                    </div>

                    <div className="h-[50px] flex flex-col justify-center">
                        {!trip.isCompleted ? (
                            <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100/50">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${trip.progress}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="h-full bg-orange-500 rounded-full"
                                />
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                {[
                                    { label: 'Days', val: '9일' },
                                    { label: 'Spots', val: '12곳' },
                                    { label: 'Review', val: 'Wait' }
                                ].map((stat, i) => (
                                    <div key={i} className="flex-1 py-1 px-2 bg-slate-50 rounded-lg border border-slate-100 text-center">
                                        <div className="text-[7px] text-slate-400 font-bold uppercase">{stat.label}</div>
                                        <div className="text-[10px] text-slate-900 font-black tracking-tight">{stat.val}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* 📍 Highlights (More compact) */}
                    <div className="h-[28px] overflow-hidden">
                        {trip.highlights && trip.highlights.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 opacity-80">
                                {trip.highlights.slice(0, 3).map((spot) => (
                                    <div key={spot} className={`px-2 py-0.5 rounded-lg border ${trip.isCompleted ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-100'}`}>
                                        <span className={`text-[9px] font-black ${trip.isCompleted ? 'text-slate-400' : 'text-slate-500'}`}>{spot}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-1.5">
                                {['👱‍♀️', '👦', '🧔'].slice(0, trip.companions > 0 ? (trip.companions > 2 ? 3 : trip.companions) : 1).map((emoji, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center text-[10px]">
                                        {emoji}
                                    </div>
                                ))}
                            </div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">
                                {trip.companions > 0 ? `${trip.companions} Members` : 'Solo'}
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                            <span className={`relative flex h-1.5 w-1.5`}>
                                <span className={`relative inline-flex rounded-full h-1.5 w-1.5 ${trip.isCompleted ? 'bg-slate-400' : (trip.isRecruiting || trip.companions > 0 ? 'bg-teal-500' : 'bg-orange-500')}`}></span>
                            </span>
                            <span className={`text-[10px] font-black uppercase tracking-tighter ${trip.isCompleted ? 'text-slate-400' : (trip.isRecruiting || trip.companions > 0 ? 'text-teal-600' : 'text-orange-500')}`}>
                                {trip.isCompleted ? 'Completed' : (trip.isRecruiting || trip.companions > 0 ? `Active` : 'Planning')}
                            </span>
                        </div>
                    </div>

                    {/* 버튼 그룹 (Contextual UX based on participation) */}
                    <div className="flex flex-col gap-2.5 pt-2">
                        {trip.isCompleted ? (
                            <button
                                onClick={() => onReview(trip.title)}
                                className="w-full py-4 rounded-2xl bg-orange-500 text-white text-[12px] font-black uppercase tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                            >
                                <Star size={18} className="fill-white" />
                                동행자 리뷰하기
                            </button>
                        ) : (
                            <>
                                {trip.companions === 0 ? (
                                    <Link
                                        href={`/prepare?id=${trip.id}`}
                                        className="w-full py-4 rounded-2xl text-white text-[12px] font-black tracking-widest uppercase shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
                                        style={{ background: theme.colors.gradients.brand }}
                                    >
                                        <Sparkles size={18} />
                                        나만의 여정 기획하기
                                    </Link>
                                ) : (
                                    <Link
                                        href={`/prepare?id=${trip.id}`}
                                        className="w-full py-4 rounded-2xl text-white text-[12px] font-black tracking-widest uppercase shadow-xl shadow-orange-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 text-center"
                                        style={{ background: theme.colors.gradients.brand }}
                                    >
                                        <Users size={18} />
                                        우리 팀 여정 기획하기
                                    </Link>
                                )}

                                <div className="flex gap-2.5">
                                    {trip.companions === 0 && !trip.isRecruiting ? (
                                        <button
                                            onClick={() => alert('동행 모집 페이지로 이동합니다.')}
                                            className="flex-[1.5] py-3 px-4 rounded-xl bg-teal-500 text-white text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 shadow-md shadow-teal-500/10"
                                        >
                                            <MessageCircle size={14} />
                                            동행 모집하기
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => {
                                                if (trip.role === 'host' && trip.companions > 0) {
                                                    setIsRecruitModalOpen(true);
                                                } else {
                                                    setIsChatDrawerOpen(true);
                                                }
                                            }}
                                            className="flex-[1.5] py-3 px-4 rounded-xl bg-slate-100 text-slate-900 text-[10px] font-black uppercase tracking-widest active:scale-95 hover:bg-slate-200 transition-colors"
                                        >
                                            {trip.role === 'host' ? (trip.companions > 0 ? '모집 관리' : '모집 진행 중') : '팀 채팅방'}
                                        </button>
                                    )}
                                    <button
                                        onClick={onEdit}
                                        className="flex-1 py-3 px-4 rounded-xl bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-widest active:scale-95"
                                    >
                                        기본 설정
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>

            <RecruitmentManagementModal
                isOpen={isRecruitModalOpen}
                onClose={() => setIsRecruitModalOpen(false)}
                tripTitle={trip.title}
            />

            <TeamChatDrawer
                isOpen={isChatDrawerOpen}
                onClose={() => setIsChatDrawerOpen(false)}
                tripTitle={trip.title}
            />
        </>
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
