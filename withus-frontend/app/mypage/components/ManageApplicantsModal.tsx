'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, X as CloseX, MessageCircle, Star, ShieldCheck } from 'lucide-react';
import { palette } from '@/app/components/design-system/constants';

interface Applicant {
    id: number;
    name: string;
    image: string;
    trustScore: number;
    mbti: string;
    message: string;
    status: 'pending' | 'approved' | 'rejected';
    appliedAt: string;
}

interface ManageApplicantsModalProps {
    isOpen: boolean;
    onClose: () => void;
    postTitle: string;
    onChatOpen?: (recipient: { name: string; image: string }) => void;
}

const MOCK_APPLICANTS: Applicant[] = [
    {
        id: 1,
        name: '미나',
        image: '👩‍🦰',
        trustScore: 4.9,
        mbti: 'ENFJ',
        message: '안녕하세요! 캠핑카 투어 너무 가보고 싶었어요. 저는 운전도 가능하고 요리하는 것도 좋아합니다! 같이 즐거운 추억 만들고 싶어요.',
        status: 'pending',
        appliedAt: '2시간 전'
    },
    {
        id: 2,
        name: '소라',
        image: '👩',
        trustScore: 4.7,
        mbti: 'ISFP',
        message: '사진 찍는 걸 좋아해서 예쁜 풍경 많이 담아드리고 싶어요! 성격이 원만해서 누구와도 잘 어울리는 편입니다.',
        status: 'pending',
        appliedAt: '5시간 전'
    },
    {
        id: 3,
        name: '지훈',
        image: '👦',
        trustScore: 4.5,
        mbti: 'ESTP',
        message: '액티비티한 여행을 선호해서 캠핑카 투어가 딱일 것 같네요. 시간 약속 철저하고 매너 있게 참여하겠습니다.',
        status: 'pending',
        appliedAt: '12시간 전'
    }
];

export const ManageApplicantsModal = ({ isOpen, onClose, postTitle, onChatOpen }: ManageApplicantsModalProps) => {
    const [applicants, setApplicants] = useState<Applicant[]>(MOCK_APPLICANTS);

    const handleAction = (id: number, action: 'approved' | 'rejected') => {
        setApplicants(prev => prev.map(app =>
            app.id === id ? { ...app, status: action } : app
        ));
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="p-8 border-b border-slate-50 shrink-0">
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="space-y-1">
                                <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] block">동행 신청 관리</span>
                                <h2 className="text-2xl font-black text-slate-900 tracking-tighter truncate pr-8">
                                    {postTitle}
                                </h2>
                                <p className="text-xs text-slate-400 font-bold">
                                    현재 {applicants.filter(a => a.status === 'pending').length}명의 신청자가 대기 중입니다.
                                </p>
                            </div>
                        </div>

                        {/* Applicants List */}
                        <div className="flex-1 overflow-y-auto p-8 space-y-6">
                            {applicants.map((applicant) => (
                                <motion.div
                                    key={applicant.id}
                                    layout
                                    className={`p-6 rounded-[32px] border transition-all ${applicant.status === 'approved'
                                        ? 'bg-teal-50/30 border-teal-100'
                                        : applicant.status === 'rejected'
                                            ? 'bg-rose-50/30 border-rose-100 opacity-60'
                                            : 'bg-white border-slate-100 hover:border-orange-200 shadow-sm'
                                        }`}
                                >
                                    <div className="flex items-start gap-5">
                                        <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner shrink-0">
                                            {applicant.image}
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-1">
                                                    <div className="flex items-center gap-2">
                                                        <h4 className="text-base font-black text-slate-900">{applicant.name}</h4>
                                                        <span className="px-2 py-0.5 rounded-md bg-slate-100 text-[10px] font-black text-slate-500 uppercase">
                                                            {applicant.mbti}
                                                        </span>
                                                        {applicant.trustScore >= 4.8 && (
                                                            <div className="flex items-center gap-0.5 text-teal-600 bg-teal-50 px-2 py-0.5 rounded-md">
                                                                <ShieldCheck size={10} />
                                                                <span className="text-[9px] font-black uppercase">Verified</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-3 text-[11px] font-bold text-slate-400">
                                                        <div className="flex items-center gap-1">
                                                            <Star size={12} className="text-orange-400 fill-orange-400" />
                                                            <span>신뢰도 {applicant.trustScore}</span>
                                                        </div>
                                                        <span>•</span>
                                                        <span>{applicant.appliedAt} 신청</span>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    {applicant.status === 'pending' ? (
                                                        <>
                                                            <button
                                                                onClick={() => handleAction(applicant.id, 'rejected')}
                                                                className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all shadow-sm"
                                                                title="거절"
                                                            >
                                                                <CloseX size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleAction(applicant.id, 'approved')}
                                                                className="px-5 h-10 rounded-xl bg-slate-900 text-white text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-lg active:scale-95 flex items-center gap-2"
                                                            >
                                                                <Check size={16} />
                                                                승인하기
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${applicant.status === 'approved'
                                                            ? 'bg-teal-100/50 border-teal-200 text-teal-700'
                                                            : 'bg-rose-100/50 border-rose-200 text-rose-700'
                                                            }`}>
                                                            {applicant.status === 'approved' ? '승인됨' : '거절됨'}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="bg-slate-50/50 rounded-2xl p-4 border border-slate-100/50">
                                                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                                                    {applicant.message}
                                                </p>
                                            </div>

                                            {applicant.status === 'approved' && (
                                                <button
                                                    onClick={() => onChatOpen?.({ name: applicant.name, image: applicant.image })}
                                                    className="flex items-center gap-2 text-teal-600 text-xs font-black hover:underline underline-offset-4"
                                                >
                                                    <MessageCircle size={14} />
                                                    {applicant.name}님과 채팅 시작하기
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="p-8 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center shrink-0">
                            <div className="text-[10px] font-bold text-slate-400 max-w-[300px]">
                                * 승인 시 신청자에게 알림이 전송되며 전용 채팅방이 개설됩니다. 거절 시에는 별도의 알림이 가지 않습니다.
                            </div>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-2xl bg-white border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-widest hover:border-slate-300 transition-all"
                            >
                                닫기
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
