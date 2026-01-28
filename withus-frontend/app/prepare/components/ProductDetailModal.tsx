'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, MapPin, Share2, Heart, Calendar, ShieldCheck, Map, CreditCard, ExternalLink, Plus, Clock, CheckCircle2 } from 'lucide-react';

interface ProductDetailModalProps {
    isOpen: boolean;
    onClose: () => void;
    item: any;
    category: string;
}

export const ProductDetailModal = ({ isOpen, onClose, item, category }: ProductDetailModalProps) => {
    const [isBooked, setIsBooked] = React.useState(false);

    if (!item) return null;

    const handleBooking = () => {
        setIsBooked(true);
        // In a real app, this would trigger API calls to update shared trip data
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

                    {/* Modal Content - Matching Community Style */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        className="relative w-full bg-white rounded-[40px] shadow-2xl overflow-hidden transition-all duration-500 max-w-[1500px] h-[750px] grid md:grid-cols-2"
                    >
                        {/* Left: Perfect 1:1 Square Image Slider Section */}
                        <div className="w-full h-full bg-slate-900 relative hidden md:block group overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                            />
                            {/* Gradient Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

                            {/* Image Counter Badge Style Location */}
                            <div className="absolute top-8 left-8 bg-black/40 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full border border-white/10 uppercase tracking-widest z-10">
                                {item.location}
                            </div>
                        </div>

                        {/* Right: Content Container */}
                        <div className="flex flex-col bg-white overflow-hidden relative h-full">
                            {/* Header: Fixed Info */}
                            <div className="px-10 py-6 border-b border-slate-50 flex items-center justify-between bg-white/80 backdrop-blur-md shrink-0">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center shadow-lg shadow-orange-500/20">
                                        <Star size={20} className="fill-white" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{item.rating} Rating</p>
                                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                                            <Clock size={12} />
                                            {item.reviews}+ Reviews Verified
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

                            {/* Scrollable Center: Product Details */}
                            <div className="flex-1 overflow-y-auto px-10 py-8 space-y-8 scrollbar-hide">
                                <div className="space-y-6">
                                    <div className="inline-flex items-center px-2.5 py-1 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black uppercase tracking-widest">
                                        {item.type}
                                    </div>
                                    <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">
                                        {item.name}
                                    </h2>

                                    {/* Location Card (Simplified) */}
                                    <div className="bg-slate-50/50 rounded-[2.5rem] p-8 space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center">
                                                <MapPin size={20} />
                                            </div>
                                            <h4 className="text-base font-black text-slate-900">상세 위치</h4>
                                        </div>
                                        <div className="px-6 py-4 bg-white rounded-[24px] border border-slate-100 shadow-sm">
                                            <p className="text-sm font-bold text-slate-700">{item.location}</p>
                                            <p className="text-[11px] font-bold text-slate-400 mt-0.5">{item.distance}</p>
                                        </div>
                                        <div className="flex items-center gap-2 px-2 pt-1">
                                            <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                                            <p className="text-[11px] font-bold text-teal-600">예약 시 채팅방 참여 인원과 실시간으로 공유됩니다</p>
                                        </div>
                                    </div>

                                    <p className="text-slate-600 text-[17px] leading-[1.8] whitespace-pre-wrap font-medium">
                                        {item.name}은(는) 여행자들 사이에서 가장 선호되는 {item.type} 상품입니다.
                                        위더스만의 특별한 검증 과정을 통과하였으며, 동행들과 함께하기에 최상의 조화를 자랑합니다.
                                        {"\n\n"}
                                        별도의 복잡한 절차 없이 예약 버튼을 누르는 것만으로도, 공동 체크리스트와 일정표에 정보가 즉시 업데이트되어 팀원들과 실시간으로 공유됩니다.
                                    </p>

                                    {item.tags && (
                                        <div className="flex flex-wrap gap-3 pt-4">
                                            {item.tags.map((tag: string, i: number) => (
                                                <span key={i} className="text-sm font-bold text-orange-500/60 hover:text-orange-500 cursor-pointer transition-colors">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-slate-50">
                                    {[
                                        { icon: <CreditCard size={18} />, label: '최저가 보장' },
                                        { icon: <Calendar size={18} />, label: '날짜 변경' },
                                        { icon: <ShieldCheck size={18} />, label: '안심 예약' }
                                    ].map((f, i) => (
                                        <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-3xl bg-slate-50/50">
                                            <div className="text-slate-400">{f.icon}</div>
                                            <span className="text-[11px] font-black text-slate-900 tracking-tight">{f.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Footer: Fixed Booking Bar (Lightened) */}
                            <div className="px-10 py-7 bg-white border-t border-slate-100 shrink-0">
                                <AnimatePresence mode="wait">
                                    {!isBooked ? (
                                        <motion.div
                                            key="initial"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center justify-between"
                                        >
                                            <div className="space-y-0.5">
                                                <p className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em]">Estimated Price</p>
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-black text-slate-900">{item.price}</span>
                                                    <span className="text-sm font-bold text-slate-500">원~</span>
                                                </div>
                                            </div>
                                            <div className="flex gap-3">
                                                <button className="w-14 h-14 rounded-2xl bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-100 transition-all border border-slate-100">
                                                    <Heart size={22} />
                                                </button>
                                                <button
                                                    onClick={handleBooking}
                                                    className="flex items-center gap-3 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[14px] hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10 active:scale-95"
                                                >
                                                    지금 바로 예약하기
                                                    <ExternalLink size={18} />
                                                </button>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div
                                            key="success"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center justify-between bg-teal-50 p-4 rounded-3xl border border-teal-100"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/20">
                                                    <CheckCircle2 size={24} />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-black text-slate-900">예약 및 공유 완료!</p>
                                                    <p className="text-[11px] font-bold text-teal-600">채팅방과 마이페이지에 일정이 등록되었습니다.</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <button className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-xl text-[12px] font-black hover:border-teal-500 hover:text-teal-600 transition-all">
                                                    참여 현황 보기
                                                </button>
                                                <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[12px] font-black hover:bg-slate-800 transition-all">
                                                    채팅방 가기
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
