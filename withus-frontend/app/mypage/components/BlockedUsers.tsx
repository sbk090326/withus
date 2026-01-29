'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, UserX, ShieldAlert, Search, UserMinus } from 'lucide-react';

interface BlockedUsersProps {
    onBack: () => void;
}

export const BlockedUsers = ({ onBack }: BlockedUsersProps) => {
    const [blockedList, setBlockedList] = useState([
        { id: 1, name: '낯선여행자', date: '2025.12.20', reason: '부적절한 메시지 전송' },
        { id: 2, name: '무법자JJ', date: '2026.01.05', reason: '노쇼(No-show) 반복' },
    ]);
    const [searchTerm, setSearchTerm] = useState('');

    const unblockUser = (id: number) => {
        if (confirm('정말로 차단을 해제하시겠습니까?')) {
            setBlockedList(prev => prev.filter(user => user.id !== id));
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10 max-w-4xl mx-auto"
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 transition-all shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">차단 및 신고 관리</h3>
                    <p className="text-xs text-slate-400 font-bold">건전한 커뮤니티를 위해 원치 않는 사용자를 관리하세요.</p>
                </div>
            </div>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center">
                                <UserX size={20} />
                            </div>
                            <h4 className="text-base font-black text-slate-900">차단한 사용자 목록</h4>
                        </div>
                        <span className="text-xs font-bold text-slate-400">총 {blockedList.length}명</span>
                    </div>

                    <div className="relative">
                        <input
                            type="text"
                            placeholder="이름으로 검색..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-12 py-4 rounded-2xl bg-slate-50 border border-slate-50 focus:bg-white focus:border-slate-200 transition-all outline-none font-bold text-sm text-slate-800"
                        />
                        <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300" />
                    </div>
                </div>

                <div className="divide-y divide-slate-50">
                    <AnimatePresence mode="popLayout">
                        {blockedList.length > 0 ? (
                            blockedList
                                .filter(u => u.name.includes(searchTerm))
                                .map((user) => (
                                    <motion.div
                                        key={user.id}
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="p-8 flex items-center justify-between group hover:bg-slate-50/50 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-xl">👤</div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{user.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] text-slate-400 font-bold">차단일: {user.date}</span>
                                                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <span className="text-[10px] text-slate-500 font-black">{user.reason}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => unblockUser(user.id)}
                                            className="px-4 py-2 rounded-xl bg-white border border-slate-100 text-[11px] font-black text-slate-400 hover:text-orange-500 hover:border-orange-100 hover:bg-orange-50 transition-all flex items-center gap-2"
                                        >
                                            <UserMinus size={14} />
                                            차단 해제
                                        </button>
                                    </motion.div>
                                ))
                        ) : (
                            <div className="py-20 text-center space-y-3">
                                <div className="text-4xl">🕊️</div>
                                <p className="text-sm font-bold text-slate-400 tracking-tight">차단한 사용자가 없습니다.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <div className="bg-rose-50/50 rounded-[40px] p-10 border border-rose-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-start gap-4 text-center md:text-left">
                    <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-500 flex items-center justify-center shrink-0 mx-auto md:mx-0">
                        <ShieldAlert size={24} />
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-base font-black text-rose-900">내가 한 신고 내역</h4>
                        <p className="text-xs text-rose-700/70 font-bold leading-relaxed">회원님이 접수하신 신고 내역과 처리 결과를 확인할 수 있습니다.<br />깨끗한 위드어스 문화를 함께 만들어주셔서 감사합니다.</p>
                    </div>
                </div>
                <button className="px-8 py-4 rounded-2xl bg-rose-500 text-white text-xs font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-200/50">
                    신고 센터 바로가기
                </button>
            </div>
        </motion.div>
    );
};
