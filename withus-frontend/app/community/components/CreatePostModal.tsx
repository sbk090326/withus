'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Camera, Hash, AlertCircle } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

interface CreatePostModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: {
        title: string;
        content: string;
        category: string;
        images?: string[];
    };
    isEdit?: boolean;
}

export const CreatePostModal = ({ isOpen, onClose, initialData, isEdit }: CreatePostModalProps) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [content, setContent] = useState(initialData?.content || '');
    const [category, setCategory] = useState(initialData?.category || 'free');
    const [images, setImages] = useState<string[]>(initialData?.images || []);

    const handleImageUpload = () => {
        // Mock image upload
        const mockImages = [
            'https://images.unsplash.com/photo-1500674425989-7eb396adb941?auto=format&fit=crop&q=80&w=400',
            'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&q=80&w=400',
        ];
        const randomImage = mockImages[Math.floor(Math.random() * mockImages.length)];
        if (images.length < 5) {
            setImages([...images, randomImage]);
        }
    };

    const removeImage = (index: number) => {
        setImages(images.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ title, content, category, images });
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
                        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
                            <h2 className="text-2xl font-black text-slate-900">
                                {isEdit ? '게시글 수정' : '새 게시글 작성'}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-10 space-y-8 scrollbar-hide">
                            {/* Category Selection */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1">게시판 선택</label>
                                <div className="flex gap-3">
                                    {[
                                        { id: 'free', label: '자유게시판' },
                                        { id: 'qna', label: '질문/답변' },
                                        { id: 'review', label: '여행후기' },
                                        { id: 'info', label: '정보공유' },
                                    ].map((cat) => (
                                        <button
                                            key={cat.id}
                                            type="button"
                                            onClick={() => setCategory(cat.id)}
                                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${category === cat.id
                                                ? 'bg-slate-900 text-white shadow-md'
                                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                                }`}
                                        >
                                            {cat.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Title */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1">제목</label>
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="제목을 입력해주세요"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/30 transition-all outline-none font-bold text-slate-800"
                                    required
                                />
                            </div>

                            {/* Content */}
                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-700 ml-1">내용</label>
                                <textarea
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    placeholder="여행자들과 나누고 싶은 이야기를 적어보세요! 사진을 첨부하면 더 많은 관심을 받을 수 있어요."
                                    className="w-full px-6 py-5 rounded-[28px] bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-800 text-sm resize-none"
                                    rows={8}
                                    required
                                />
                            </div>

                            {/* Image Preview Section */}
                            {images.length > 0 && (
                                <div className="flex flex-wrap gap-4">
                                    {images.map((img, idx) => (
                                        <div key={idx} className="relative w-24 h-24 rounded-2xl overflow-hidden group">
                                            <img src={img} alt="preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(idx)}
                                                className="absolute top-1 right-1 p-1 bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center gap-4">
                                <button
                                    type="button"
                                    onClick={handleImageUpload}
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all"
                                >
                                    <Camera size={18} />
                                    사진 추가 ({images.length}/5)
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all"
                                >
                                    <Hash size={18} />
                                    태그
                                </button>
                            </div>

                            <div className="bg-orange-50 rounded-2xl p-4 flex items-start gap-3">
                                <AlertCircle size={18} className="text-orange-500 mt-0.5" />
                                <p className="text-xs text-orange-700 leading-relaxed font-medium">
                                    부적절한 홍보나 욕설 등 커뮤니티 가이드라인을 위반하는 게시글은 사전 고지 없이 삭제될 수 있습니다.
                                </p>
                            </div>
                        </form>

                        <div className="px-10 py-8 bg-slate-50 flex items-center justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-2xl font-bold text-slate-500 hover:text-slate-700 transition-all text-sm"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="px-8 py-3 rounded-2xl text-white font-extrabold shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2 text-sm"
                                style={{ background: theme.colors.gradients.brand }}
                            >
                                <Send size={18} />
                                {isEdit ? '수정 완료' : '등록하기'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
