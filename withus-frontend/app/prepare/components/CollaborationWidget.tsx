'use client';

import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, Share2, Plus, ArrowUpRight, Lightbulb, CheckSquare, Square, Trash2, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { theme } from '@/app/components/design-system/constants';

interface CollaborationWidgetProps {
    checklists: Record<number, any[]>;
    setChecklists: React.Dispatch<React.SetStateAction<Record<number, any[]>>>;
    selectedTripId: number;
    progress: number;
    completedCount: number;
    totalCount: number;
}

const MOCK_VOTES = [
    {
        id: 1,
        title: '페스타나 빈티지 포르투',
        price: '284,000원',
        proposer: '민수',
        votes: { up: 3, down: 0 },
        comments: 2,
    }
];

export const CollaborationWidget = ({ checklists, setChecklists, selectedTripId, progress, completedCount, totalCount }: CollaborationWidgetProps) => {
    const [newItem, setNewItem] = useState('');
    const items = checklists[selectedTripId] || [];

    const toggleItem = (id: number) => {
        setChecklists(prev => ({
            ...prev,
            [selectedTripId]: prev[selectedTripId].map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        }));
    };

    const deleteItem = (id: number) => {
        setChecklists(prev => ({
            ...prev,
            [selectedTripId]: prev[selectedTripId].filter(item => item.id !== id)
        }));
    };

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.trim()) return;
        const item = {
            id: Date.now(),
            text: newItem,
            completed: false,
            assignedTo: '나'
        };
        setChecklists(prev => ({
            ...prev,
            [selectedTripId]: [...(prev[selectedTripId] || []), item]
        }));
        setNewItem('');
    };

    return (
        <div className="space-y-8 sticky top-32">
            {/* 📋 공동 체크리스트 (내 여행에서 이동됨) */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-8 transition-all hover:shadow-xl hover:shadow-slate-200/20">
                <div className="flex items-center justify-between">
                    <div className="space-y-1.5">
                        <span className="text-[10px] font-bold text-teal-600 uppercase tracking-[0.3em] block">공동 체크리스트</span>
                        <h3 className="text-2xl font-black text-slate-900 tracking-tight">함께 준비해요 🎒</h3>
                    </div>
                    {/* 🚀 이동된 준비현황 (컴팩트 버전) */}
                    <div className="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-2xl border border-slate-100 shadow-inner">
                        <div className="flex flex-col items-end">
                            <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">준비 현황</span>
                            <span className="text-[14px] font-black text-teal-600 leading-none">{progress}%</span>
                        </div>
                        <div className="w-9 h-9 rounded-full border-[2.5px] border-white flex items-center justify-center relative bg-white shadow-sm">
                            <svg className="w-full h-full -rotate-90 scale-110">
                                <circle cx="18" cy="18" r="14" fill="transparent" stroke="#f1f5f9" strokeWidth="3" />
                                <motion.circle
                                    cx="18" cy="18" r="14"
                                    fill="transparent"
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeDasharray={88}
                                    initial={{ strokeDashoffset: 88 }}
                                    animate={{ strokeDashoffset: 88 * (1 - progress / 100) }}
                                    className="text-teal-500"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* 입력창 (컴팩트 버전) */}
                <form onSubmit={addItem} className="relative group">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="항목 추가..."
                        className="w-full pl-5 pr-14 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/20 transition-all outline-none font-bold text-[13px] text-slate-900 shadow-inner"
                    />
                    <button
                        type="submit"
                        className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg active:scale-95"
                    >
                        <Plus size={18} />
                    </button>
                </form>

                {/* 리스트 (컴팩트 스트림) */}
                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1 scrollbar-hide">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`flex items-center gap-3 p-3.5 rounded-2xl border transition-all group ${item.completed
                                    ? 'bg-slate-50/50 border-transparent opacity-60'
                                    : 'bg-white border-slate-50 hover:border-orange-50 shadow-sm'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleItem(item.id)}
                                    className={`shrink-0 transition-colors ${item.completed ? 'text-teal-500' : 'text-slate-200 hover:text-orange-500'}`}
                                >
                                    {item.completed ? <CheckSquare size={18} fill="currentColor" className="text-white bg-teal-500 rounded-md" /> : <Square size={18} />}
                                </button>

                                <span className={`flex-1 font-bold text-[13px] tracking-tight truncate ${item.completed ? 'line-through text-slate-300' : 'text-slate-700'}`}>
                                    {item.text}
                                </span>

                                <button
                                    onClick={() => deleteItem(item.id)}
                                    className="p-2 text-slate-200 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    {items.length === 0 && (
                        <div className="py-10 text-center space-y-3 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-[11px] font-bold text-slate-400">등록된 체크리스트가 없어요!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* 의사결정 보드 (간소화) */}
            <div className="bg-white rounded-[32px] p-8 border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold text-orange-500 uppercase tracking-[0.3em] block">의사결정</span>
                        <h4 className="text-[17px] font-black text-slate-900 tracking-tight">추천 후보지 🗳️</h4>
                    </div>
                </div>

                <div className="space-y-3">
                    {MOCK_VOTES.map((vote) => (
                        <div key={vote.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-3">
                            <h5 className="text-[14px] font-bold text-slate-800 leading-snug truncate">{vote.title}</h5>
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black text-slate-400 uppercase">{vote.price}</span>
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-teal-500 transition-colors">
                                        <ThumbsUp size={12} />
                                        <span className="text-[10px] font-black">{vote.votes.up}</span>
                                    </button>
                                    <button className="flex items-center gap-1.5 text-slate-400 hover:text-rose-500 transition-colors">
                                        <ThumbsDown size={12} />
                                        <span className="text-[10px] font-black">{vote.votes.down}</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 프로 팁 */}
            <div className="rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-orange-500/20 group" style={{ background: theme.colors.gradients.brand }}>
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-white">
                            <Lightbulb size={20} fill="white" />
                        </div>
                        <h4 className="text-[15px] font-black tracking-tight">프로 여행러의 팁 ✨</h4>
                    </div>
                    <p className="text-[13px] font-bold text-white/90 leading-relaxed">
                        "3명이 찬성한 숙소는 고민 없이 예약하는 것이 좋습니다! <br />
                        인기 숙소는 마감이 빠르거든요."
                    </p>
                </div>
            </div>
        </div>
    );
};
