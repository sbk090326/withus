'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Heart, Eye, Clock, User, Share2, MoreVertical, Trash2, Edit3, Send, MapPin, ChevronRight, Save } from 'lucide-react';
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
    if (!post) return null;

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
                        className="relative w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[800px]"
                    >
                        {/* Left: Aspect-Balanced Image Section */}
                        {post.thumbnail && (
                            <div className="w-full md:w-[500px] lg:w-[540px] bg-slate-100 relative group overflow-hidden shrink-0 hidden md:block border-r border-slate-50">
                                <img
                                    src={post.thumbnail}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-60 pointer-events-none" />

                                {/* Image Pagination Overlays */}
                                <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-2">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className={`w-1.5 h-1.5 rounded-full shadow-sm transition-all ${i === 1 ? 'bg-white w-4' : 'bg-white/40'}`} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Right: Content & Comments Container */}
                        <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
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
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tight leading-snug">
                                        {post.title}
                                    </h2>

                                    {/* 코스 상세 (Route Visualization) */}
                                    {post.category === 'course' && post.routes && (
                                        <div className="bg-slate-50/50 border border-slate-100 rounded-[2rem] p-8 space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <MapPin size={18} className="text-orange-500" />
                                                    <span className="text-sm font-black text-slate-900">추천 여행 경로</span>
                                                </div>
                                                <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 text-white text-[11px] font-black shadow-lg shadow-orange-500/20 hover:scale-105 transition-all">
                                                    <Save size={14} />
                                                    내 일정으로 가져오기
                                                </button>
                                            </div>

                                            <div className="flex flex-col gap-4 relative">
                                                <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-orange-100" />
                                                {post.routes.map((route: string, i: number) => (
                                                    <div key={i} className="flex items-center gap-4 relative z-10">
                                                        <div className="w-8 h-8 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center text-[10px] font-black text-orange-500">
                                                            {i + 1}
                                                        </div>
                                                        <div className="flex-1 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
                                                            <span className="text-sm font-bold text-slate-700">{route}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <p className="text-slate-600 text-base leading-relaxed whitespace-pre-wrap font-medium">
                                        {post.excerpt}
                                        {"\n\n"}
                                        여행은 항상 설레는 것 같아요. 특히 이번 여행은 제가 정말 가보고 싶었던 곳들을 위주로 다녀와서 그런지 더 기억에 남네요. 사진 정리하다 보니까 다시 그 시간으로 돌아가고 싶어집니다.
                                        {"\n\n"}
                                        더 많은 팁이 궁금하시면 언제든 물어봐주세요!
                                    </p>
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
