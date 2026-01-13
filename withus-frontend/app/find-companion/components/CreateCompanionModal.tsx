'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, Tag, Image as ImageIcon, Send, Sparkles } from 'lucide-react';
import { palette } from '@/app/components/design-system/constants';

interface CreateCompanionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateCompanionModal = ({ isOpen, onClose }: CreateCompanionModalProps) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        tags: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle post creation logic here
        console.log('Post Created:', formData);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg">
                                    <Sparkles size={20} fill="white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">새 동행 찾기</h2>
                                    <p className="text-xs text-slate-400">당신의 멋진 여행 계획을 공유해보세요!</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-400 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                            <form onSubmit={handleSubmit} className="space-y-8">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">여행 제목</label>
                                    <input
                                        type="text"
                                        placeholder="어떤 여행을 계획 중이신가요?"
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none font-medium text-slate-900"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                {/* Location & Date Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">목적지</label>
                                        <div className="relative">
                                            <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="어디로 가시나요?"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900"
                                                required
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">날짜 설정</label>
                                        <div className="relative">
                                            <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="2026.04.12 - 2026.04.15"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900"
                                                required
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-3">여행 설명</label>
                                    <textarea
                                        placeholder="여행 일정, 원하는 동행 스타일 등을 자세히 적어주세요."
                                        rows={5}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900 resize-none"
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                {/* Image & Tags Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">태그 (쉼표로 구분)</label>
                                        <div className="relative">
                                            <Tag size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="#맛집탐방, #뚜벅이"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900"
                                                value={formData.tags}
                                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-3">사진 첨부</label>
                                        <button
                                            type="button"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all flex items-center justify-center gap-2 font-medium"
                                        >
                                            <ImageIcon size={20} />
                                            사진 추가하기 (+5장)
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer - Sticky Bottom */}
                        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                            <p className="text-xs text-slate-400">
                                허위 정보나 부적절한 게시글은 제재될 수 있습니다.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="px-8 py-3 rounded-xl font-bold text-white shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                                    style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                                >
                                    <Send size={18} />
                                    모집 시작하기
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
