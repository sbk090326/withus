'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Clock, Calendar, MessageCircle, CreditCard, Building, Plane, Ticket, Users, CheckCircle2 } from 'lucide-react';

interface SharedBooking {
    id: number;
    type: 'accommodation' | 'flight' | 'activity' | 'insurance';
    name: string;
    bookedBy: string;
    date: string;
    price: string;
}

interface TripDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    trip: any;
    onTabChange: (tab: string) => void;
}

const MOCK_SHARED_BOOKINGS: Record<number, SharedBooking[]> = {
    1: [
        { id: 1, type: 'accommodation', name: '페스타나 빈티지 포르투', bookedBy: '지니', date: '2026.05.02', price: '284,000원' },
        { id: 2, type: 'activity', name: '도우로 밸리 와이너리 투어', bookedBy: '로키', date: '2026.05.04', price: '85,000원' }
    ],
    2: [
        { id: 3, type: 'flight', name: '에미레이트 항공 (인천-방콕)', bookedBy: '카이', date: '2026.03.20', price: '1,120,000원' }
    ]
};

export const TripDetailModal = ({ isOpen, onClose, trip, onTabChange }: TripDetailModalProps) => {
    if (!trip) return null;

    const handleManageClick = () => {
        onClose();
        onTabChange('planner');
    };

    const bookings = MOCK_SHARED_BOOKINGS[trip.id] || [];

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
                        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col h-[80vh]"
                    >
                        {/* Header */}
                        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between shrink-0">
                            <div className="space-y-1">
                                <h3 className="text-2xl font-black text-slate-900 tracking-tighter">{trip.title}</h3>
                                <div className="flex items-center gap-3 text-slate-400 text-xs font-bold">
                                    <MapPin size={14} />
                                    <span>{trip.location}</span>
                                    <span className="w-1 h-1 rounded-full bg-slate-200" />
                                    <Calendar size={14} />
                                    <span>{trip.time || trip.date}</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full text-slate-400">
                                <X size={24} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-10 py-8 space-y-10 scrollbar-hide">
                            {/* Shared Planning Section */}
                            <section className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-teal-500" />
                                        팀 실시간 공유 현황
                                    </h4>
                                    <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-full">Active Syncing</span>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    {bookings.length > 0 ? (
                                        bookings.map((booking) => (
                                            <div key={booking.id} className="flex items-center gap-5 p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-all group">
                                                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-orange-500 transition-colors">
                                                    {booking.type === 'accommodation' && <Building size={22} />}
                                                    {booking.type === 'flight' && <Plane size={22} />}
                                                    {booking.type === 'activity' && <Ticket size={22} />}
                                                    {booking.type === 'insurance' && <CreditCard size={22} />}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <p className="text-sm font-black text-slate-900">{booking.name}</p>
                                                        <span className="text-[10px] font-black text-orange-500">{booking.price}</span>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-[11px] font-bold text-slate-400">
                                                        <span className="flex items-center gap-1">
                                                            <Users size={12} />
                                                            {booking.bookedBy}님이 예약함
                                                        </span>
                                                        <span className="w-0.5 h-0.5 rounded-full bg-slate-200" />
                                                        <span>{booking.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="py-12 text-center bg-slate-50/50 rounded-[32px] border-2 border-dashed border-slate-100">
                                            <p className="text-slate-400 text-sm font-bold">아직 공유된 예약 내역이 없습니다.</p>
                                            <p className="text-slate-300 text-[11px] mt-1 font-medium">여행 준비 탭에서 예약하면 자동으로 팀원들과 공유됩니다.</p>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Team Partners */}
                            <section className="space-y-4">
                                <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">함께하는 크루</h4>
                                <div className="flex -space-x-3">
                                    {trip.partners?.map((p: string, i: number) => (
                                        <div key={i} className="w-12 h-12 rounded-full bg-white border-2 border-white shadow-md flex items-center justify-center text-xl overflow-hidden relative group">
                                            {p === '지니' ? '👩‍🦰' : p === '로키' ? '🧔' : p === '카이' ? '🧑‍💻' : '👤'}
                                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                <p className="text-[8px] text-white font-black">{p}</p>
                                            </div>
                                        </div>
                                    ))}
                                    <button className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center border-2 border-white shadow-sm hover:bg-slate-200 transition-all">
                                        <Plus size={20} />
                                    </button>
                                </div>
                            </section>
                        </div>

                        {/* Footer */}
                        <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 shrink-0 flex items-center justify-between">
                            <button className="flex items-center gap-2 text-xs font-black text-slate-500 hover:text-slate-900">
                                <MessageCircle size={18} />
                                팀 채팅방으로 가기
                            </button>
                            <button
                                onClick={handleManageClick}
                                className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-[12px] font-black hover:bg-slate-800 transition-all shadow-lg active:scale-95"
                            >
                                여행 관리하기
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

const Plus = ({ size }: { size: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
);
