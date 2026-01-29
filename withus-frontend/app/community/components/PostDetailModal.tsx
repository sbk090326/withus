'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Heart, Eye, Clock, User, Share2, MoreVertical, Trash2, Edit3, Send, MapPin, ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { theme, palette } from '@/app/components/design-system/constants';

interface PostDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: any;
    isAuthor: boolean;
    onEdit: (post: any) => void;
    onDelete: (postId: number) => void;
}

export const PostDetailModal = ({ isOpen, onClose, post, isAuthor, onEdit, onDelete }: PostDetailModalProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!post) return null;

    const allImages = post.images || (post.thumbnail ? [post.thumbnail] : []);
    const hasImages = allImages.length > 0;

    const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);

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
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className={`relative w-full bg-white rounded-[40px] shadow-2xl overflow-hidden transition-all duration-500 ${hasImages ? 'max-w-[1500px] h-[750px] grid md:grid-cols-2' : 'max-w-3xl h-[85vh] md:h-[750px] flex flex-col'
                            }`}
                    >
                        {/* Left: Perfect 1:1 Square Image Slider Section */}
                        {hasImages && (
                            <div className="w-full h-full bg-slate-900 relative hidden md:block group overflow-hidden">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentImageIndex}
                                        src={allImages[currentImageIndex]}
                                        initial={{ opacity: 0, scale: 1.1 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                {/* Gradient Overlays */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

                                {/* Navigation Arrows */}
                                {allImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/40 transition-all z-10"
                                        >
                                            <ChevronLeft size={24} />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/20 bg-black/20 backdrop-blur-md text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-black/40 transition-all z-10"
                                        >
                                            <ChevronRight size={24} />
                                        </button>
                                    </>
                                )}

                                {/* Pagination Dots */}
                                <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
                                    {allImages.map((unused: any, i: number) => (
                                        <button
                                            key={i}
                                            onClick={() => setCurrentImageIndex(i)}
                                            className={`w-1.5 h-1.5 rounded-full transition-all ${i === currentImageIndex ? 'bg-white w-6' : 'bg-white/40'}`}
                                        />
                                    ))}
                                </div>

                                {/* Image Counter */}
                                <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest z-10">
                                    {currentImageIndex + 1} / {allImages.length}
                                </div>
                            </div>
                        )}

                        {/* Right: Content & Comments Container */}
                        <div className="flex flex-col bg-white overflow-hidden relative h-full">
                            {/* Header: Fixed Author Info */}
                            <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center border border-orange-100 overflow-hidden text-xl">
                                        {post.authorImage || '👤'}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">{post.author}</p>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                            <Clock size={12} />
                                            {post.date}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            {/* Scrollable Center: Post Body + Comments */}
                            <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 scrollbar-hide">
                                {/* Post Content */}
                                <div className="space-y-6">
                                    <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${post.category === 'course' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-600'
                                        }`}>
                                        {post.categoryLabel}
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                        {post.title}
                                    </h2>

                                    {/* 코스 상세 (Clean Minimal Route) */}
                                    {post.category === 'course' && post.routes && (
                                        <div className="bg-slate-50/50 rounded-[2.5rem] p-8 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
                                                        <MapPin size={20} />
                                                    </div>
                                                    <h4 className="text-base font-black text-slate-900">추천 여행 경로</h4>
                                                </div>
                                                <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-slate-900 text-white text-[11px] font-black hover:bg-orange-500 hover:shadow-xl hover:shadow-orange-500/20 transition-all active:scale-95 shadow-lg">
                                                    <Save size={14} />
                                                    일정 저장하기
                                                </button>
                                            </div>

                                            <div className="flex flex-wrap gap-2">
                                                {post.routes.map((route: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-2">
                                                        <div className="px-5 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3 group hover:border-orange-200 transition-all">
                                                            <span className="text-[10px] font-black text-orange-500">{i + 1}</span>
                                                            <span className="text-sm font-bold text-slate-700">{route}</span>
                                                        </div>
                                                        {i < post.routes.length - 1 && (
                                                            <ChevronRight size={14} className="text-slate-300" />
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-slate-600 text-[17px] leading-[1.8] whitespace-pre-wrap font-medium">
                                        {post.excerpt}
                                        {"\n\n"}
                                        여행은 항상 설레는 것 같아요. 특히 이번 여행은 제가 정말 가보고 싶었던 곳들을 위주로 다녀와서 그런지 더 기억에 남네요. 사진 정리하다 보니까 다시 그 시간으로 돌아가고 싶어집니다.
                                    </p>

                                    {post.tags && (
                                        <div className="flex flex-wrap gap-3 pt-4">
                                            {post.tags.map((tag: string, i: number) => (
                                                <span key={i} className="text-sm font-bold text-orange-500/60 hover:text-orange-500 cursor-pointer transition-colors">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Interaction Bar */}
                                <div className="flex items-center gap-6 py-4 border-y border-slate-50">
                                    <button className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-pink-500 transition-colors group">
                                        <Heart size={18} className="text-pink-500" fill={post.likes > 100 ? "currentColor" : "none"} />
                                        <span>{post.likes}</span>
                                    </button>
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                        <MessageSquare size={18} className="text-slate-400" />
                                        <span>{post.comments}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm font-bold text-slate-600">
                                        <Eye size={18} className="text-slate-400" />
                                        <span>{post.views}</span>
                                    </div>
                                </div>

                                {/* Comments Section */}
                                <div className="space-y-6">
                                    <h4 className="text-sm font-black text-slate-900">댓글 {post.comments}</h4>
                                    <div className="space-y-6 pb-4">
                                        {[
                                            { name: '도토리여행자', comment: '와 필터 어떤 거 쓰세요? 색감이 너무 예쁘네요!', time: '방금 전', image: '🐿️' },
                                            { name: '길동이', comment: '진짜 여기는 밤에 가야 진리인 것 같아요.', time: '12분 전', image: '🧔' },
                                            { name: '여권분실자', comment: '정보 감사합니다! 조만간 따라가봐야겠네요 ㅎㅎ', time: '1시간 전', image: '🗺️' },
                                            { name: '미식가(나)', comment: '저 여기 근처 식당도 가봤는데 괜찮더라구요!', time: '2시간 전', image: '🍲' },
                                        ].map((c, i) => (
                                            <div key={i} className="flex gap-4 group">
                                                <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100 overflow-hidden text-sm">
                                                    {c.image}
                                                </div>
                                                <div className="flex-1 space-y-1">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-xs font-bold text-slate-900">{c.name}</span>
                                                        <span className="text-[10px] text-slate-400 font-medium">{c.time}</span>
                                                    </div>
                                                    <p className="text-[13px] text-slate-600 font-medium leading-relaxed">{c.comment}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Footer: Fixed Comment Input */}
                            <div className="px-10 py-6 bg-slate-50/50 border-t border-slate-100 shrink-0">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="따뜻한 댓글을 남겨주세요..."
                                        className="w-full px-6 py-4 rounded-2xl bg-white border border-slate-200 outline-none focus:border-orange-500/30 transition-all font-medium text-sm pr-14 shadow-sm"
                                    />
                                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 transition-colors">
                                        <Send size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
