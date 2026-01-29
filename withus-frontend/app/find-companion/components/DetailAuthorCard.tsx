'use client';
import React from 'react';
import { motion } from 'motion/react';
import { MessageCircle, Heart, Share2, UserCheck } from 'lucide-react';

interface DetailAuthorCardProps {
    author: {
        name: string;
        image: string;
        trustScore: number;
        mbti: string;
        intro: string;
    };
    matchScore: number;
    applicationStatus: 'idle' | 'pending' | 'approved';
    isLiked: boolean;
    isHost?: boolean;
    onApply: () => void;
    onToggleLike: () => void;
    onOpenChat: () => void;
    onManageRecruitment?: () => void;
}

export const DetailAuthorCard = ({
    author,
    matchScore,
    applicationStatus,
    isLiked,
    isHost,
    onApply,
    onToggleLike,
    onOpenChat,
    onManageRecruitment
}: DetailAuthorCardProps) => {
    return (
        <div className="sticky top-28 space-y-6">
            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl relative overflow-hidden group">
                {/* Decor Gradient Background */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-pink-500" />

                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-6">
                        <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-md flex items-center justify-center text-5xl">
                            {author.image}
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                            <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                        </div>
                    </div>

                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">{author.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded uppercase">
                            {author.mbti}
                        </span>
                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                            매너 온도 <span className="text-orange-500 font-bold">{author.trustScore}</span>
                        </div>
                    </div>

                    <p className="text-sm text-slate-500 mb-8 leading-relaxed italic">
                        "{author.intro}"
                    </p>

                    {/* Match Score Display */}
                    <div className="w-full bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold text-slate-600">나와의 매칭 점수</span>
                            <span className="text-lg font-black text-orange-500">{matchScore}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${matchScore}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-orange-400 to-pink-500"
                            />
                        </div>
                        <p className="text-[10px] text-slate-400 mt-2 text-left">
                            * 사용자의 여행 성향 데이터를 기반으로 산출된 수치입니다.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="w-full space-y-3">
                        {isHost ? (
                            <button
                                onClick={onManageRecruitment}
                                className="w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                style={{ background: 'linear-gradient(to right, #3b82f6, #2563eb)' }}
                            >
                                <UserCheck size={20} />
                                신청자 관리하기
                            </button>
                        ) : (
                            <>
                                {applicationStatus === 'idle' && (
                                    <button
                                        onClick={onApply}
                                        className="w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                                    >
                                        <MessageCircle size={20} />
                                        동행 신청하기
                                    </button>
                                )}

                                {applicationStatus === 'pending' && (
                                    <div className="w-full py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold flex items-center justify-center gap-2 cursor-default border border-slate-200">
                                        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                        신청 완료 (승인 대기 중)
                                    </div>
                                )}

                                {applicationStatus === 'approved' && (
                                    <button
                                        onClick={onOpenChat}
                                        className="w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                        style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}
                                    >
                                        <MessageCircle size={20} />
                                        호스트와 채팅하기
                                    </button>
                                )}
                            </>
                        )}

                        <div className="flex gap-3">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={onToggleLike}
                                className={`flex-[2] py-3 rounded-2xl border font-bold transition-all flex items-center justify-center gap-2 ${isLiked
                                    ? 'bg-pink-50 border-pink-200 text-pink-500'
                                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                            >
                                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                                {isLiked ? '찜 완료' : '찜하기'}
                            </motion.button>
                            <button className="flex-1 p-3 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all flex items-center justify-center">
                                <Share2 size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
