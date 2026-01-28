'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Check, Ban, MessageSquare, Star, ShieldCheck } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';
import { ChatDrawer } from '@/app/find-companion/components/ChatDrawer';

interface Applicant {
    id: number;
    name: string;
    image: string;
    bio: string;
    mannerTemp: number;
    tags: string[];
    isVerified: boolean;
}

interface RecruitmentManagementModalProps {
    isOpen: boolean;
    onClose: () => void;
    tripTitle: string;
}

const MOCK_APPLICANTS: Applicant[] = [
    {
        id: 1,
        name: '김지현',
        image: '👩‍🦰',
        bio: '사진 찍는 거 좋아하고 맛집 탐방하는 거 좋아해요! 이번 포르투갈 여행 너무 기대됩니다.',
        mannerTemp: 38.2,
        tags: ['계획적', '사진광', '리액션왕'],
        isVerified: true,
    },
    {
        id: 2,
        name: '이승우',
        image: '👱‍♂️',
        bio: '서핑은 처음이지만 열심히 배워보겠습니다! 잘 부탁드려요.',
        mannerTemp: 36.5,
        tags: ['활동적', '긍정맨', '초보서퍼'],
        isVerified: false,
    }
];

export const RecruitmentManagementModal = ({ isOpen, onClose, tripTitle }: RecruitmentManagementModalProps) => {
    const [selectedChatApplicant, setSelectedChatApplicant] = React.useState<Applicant | null>(null);
    const [applicants, setApplicants] = React.useState<Applicant[]>(MOCK_APPLICANTS);

    const handleAccept = (name: string, id: number) => {
        alert(`${name}님의 신청을 수락했습니다! 팀 채팅방에 초대됩니다.`);
        setApplicants(prev => prev.filter(a => a.id !== id));
    };

    const handleReject = (name: string, id: number) => {
        if (confirm(`${name}님의 신청을 거절하시겠습니까?`)) {
            setApplicants(prev => prev.filter(a => a.id !== id));
        }
    };

    const handleAcceptAll = () => {
        if (applicants.length === 0) return;
        alert(`대기 중인 ${applicants.length}명의 신청을 모두 수락했습니다!`);
        setApplicants([]);
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[1100]"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl bg-white rounded-[40px] shadow-2xl z-[1101] overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className="px-2 py-0.5 rounded-md bg-teal-50 text-[10px] font-black text-teal-600 uppercase tracking-widest">Recruiting</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight">모집 관리</h3>
                                    <p className="text-xs text-slate-400 font-bold">{tripTitle}</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-black text-slate-900 flex items-center gap-2">
                                        신청한 멤버 <span className="text-orange-500">{applicants.length}</span>
                                    </h4>

                                    <div className="space-y-4">
                                        <AnimatePresence mode="popLayout">
                                            {applicants.map((applicant) => (
                                                <motion.div
                                                    key={applicant.id}
                                                    layout
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, scale: 0.95, x: 20 }}
                                                    className="p-6 rounded-[32px] bg-slate-50 border border-slate-100 hover:bg-white hover:border-orange-100 transition-all group"
                                                >
                                                    <div className="flex items-start justify-between mb-4">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-3xl shadow-sm group-hover:scale-105 transition-transform">
                                                                {applicant.image}
                                                            </div>
                                                            <div className="space-y-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-lg font-black text-slate-900">{applicant.name}</span>
                                                                    {applicant.isVerified && <ShieldCheck size={16} className="text-blue-500" />}
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Star size={12} className="text-orange-400 fill-orange-400" />
                                                                    <span className="text-xs font-black text-slate-600">매너온도 {applicant.mannerTemp}℃</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="flex gap-2">
                                                            <button
                                                                onClick={() => handleAccept(applicant.name, applicant.id)}
                                                                className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-teal-50 hover:text-teal-600 hover:border-teal-100 transition-all shadow-sm active:scale-90"
                                                            >
                                                                <Check size={20} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(applicant.name, applicant.id)}
                                                                className="w-10 h-10 rounded-xl bg-white border border-slate-100 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 transition-all shadow-sm active:scale-90"
                                                            >
                                                                <Ban size={20} />
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <p className="text-[13px] font-bold text-slate-600 leading-relaxed mb-4">
                                                        "{applicant.bio}"
                                                    </p>

                                                    <div className="flex flex-wrap gap-2">
                                                        {applicant.tags.map(tag => (
                                                            <span key={tag} className="px-3 py-1 rounded-lg bg-white border border-slate-100 text-[10px] font-bold text-slate-400">
                                                                #{tag}
                                                            </span>
                                                        ))}
                                                        <button
                                                            onClick={() => setSelectedChatApplicant(applicant)}
                                                            className="ml-auto flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest hover:bg-orange-500 transition-all active:scale-95"
                                                        >
                                                            <MessageSquare size={12} />
                                                            1:1 대화
                                                        </button>
                                                    </div>
                                                </motion.div>
                                            ))}
                                            {applicants.length === 0 && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    className="py-20 text-center space-y-4"
                                                >
                                                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-4xl">
                                                        ✨
                                                    </div>
                                                    <div className="space-y-1">
                                                        <p className="text-base font-black text-slate-900">검토할 신청자가 없습니다.</p>
                                                        <p className="text-xs text-slate-400 font-bold">새로운 인연을 기다려보세요!</p>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-8 border-t border-slate-100 bg-slate-50">
                                <div className="flex items-center justify-between bg-white p-5 rounded-2xl border border-slate-200">
                                    <div className="space-y-0.5">
                                        <p className="text-[10px] font-bold text-slate-400 uppercase">Status</p>
                                        <p className="text-sm font-black text-slate-900">현재 {applicants.length}명 대기 중</p>
                                    </div>
                                    <button
                                        onClick={handleAcceptAll}
                                        disabled={applicants.length === 0}
                                        className={`px-6 py-2.5 rounded-xl text-white text-[12px] font-black uppercase tracking-widest transition-all ${applicants.length > 0 ? 'bg-slate-900 hover:bg-orange-500 active:scale-95 shadow-lg shadow-slate-900/10' : 'bg-slate-200 cursor-not-allowed'}`}
                                    >
                                        전체 수락하기
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {selectedChatApplicant && (
                <ChatDrawer
                    isOpen={!!selectedChatApplicant}
                    onClose={() => setSelectedChatApplicant(null)}
                    recipient={{
                        name: selectedChatApplicant.name,
                        image: selectedChatApplicant.image
                    }}
                />
            )}
        </>
    );
};
