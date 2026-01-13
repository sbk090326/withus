'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Sparkles, AlertCircle } from 'lucide-react';

interface ApplyCompanionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (message: string) => void;
    companionTitle: string;
}

export const ApplyCompanionModal = ({ isOpen, onClose, onApply, companionTitle }: ApplyCompanionModalProps) => {
    const [message, setMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onApply(message);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full max-w-lg bg-white rounded-[40px] shadow-2xl overflow-hidden p-10"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="flex flex-col items-center text-center mb-10">
                            <div className="w-20 h-20 rounded-3xl bg-orange-50 flex items-center justify-center text-orange-500 mb-6 shadow-sm">
                                <Sparkles size={40} fill="currentColor" className="opacity-80" />
                            </div>
                            <h2 className="text-2xl font-black text-slate-900 mb-3">동행 신청하기</h2>
                            <p className="text-slate-500 text-sm leading-relaxed px-4">
                                <span className="text-orange-600 font-bold">"{companionTitle}"</span><br />
                                호스트에게 나를 소개하는 메시지를 남겨주세요.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1 flex items-center gap-2">
                                    자기소개 및 신청 메시지
                                    <span className="text-[10px] text-pink-500 bg-pink-50 px-2 py-0.5 rounded-full uppercase">Essential</span>
                                </label>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="간단한 자기소개와 함께 왜 이 여행에 참여하고 싶은지 적어주세요! (예: 저는 비흡연자고 사진 찍는 걸 좋아해요!)"
                                    className="w-full px-6 py-5 rounded-[28px] bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-800 text-sm resize-none"
                                    rows={4}
                                    required
                                />
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 flex items-start gap-3">
                                <AlertCircle size={18} className="text-slate-400 mt-0.5" />
                                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                                    동행 신청 후 호스트가 **승인**하면 채팅창이 열리고 상세 연락처를 확인할 수 있습니다.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="w-full py-5 rounded-[24px] text-white font-extrabold shadow-xl shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-lg"
                                style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                            >
                                <Send size={20} />
                                신청 메시지 보내기
                            </button>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
