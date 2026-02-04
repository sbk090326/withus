'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Map as MapIcon, Plus, Trash2, Clock, Check, ArrowRight, Sparkles } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

interface CreateTripModalProps {
    isOpen: boolean;
    onClose: () => void;
    step: number;
    setStep: (step: number | ((s: number) => number)) => void;
    newTrip: {
        title: string;
        location: string;
        startDate: string;
        endDate: string;
        routes: string[];
    };
    setNewTrip: (trip: any) => void;
    tempRoute: string;
    setTempRoute: (route: string) => void;
    addRoute: () => void;
    removeRoute: (index: number) => void;
    onSubmit: () => void;
}

export const CreateTripModal = ({
    isOpen,
    onClose,
    step,
    setStep,
    newTrip,
    setNewTrip,
    tempRoute,
    setTempRoute,
    addRoute,
    removeRoute,
    onSubmit
}: CreateTripModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[105] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-2xl bg-white rounded-[40px] overflow-hidden relative min-h-[600px] max-h-[80vh] flex flex-col border border-slate-100 shadow-2xl"
                    >
                        {/* Progress Line */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                            <motion.div
                                className="h-full bg-gradient-to-r from-orange-500 to-orange-300"
                                initial={{ width: 0 }}
                                animate={{ width: `${(step / 3) * 100}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>

                        {/* Chat Header */}
                        <div className="flex-none px-8 pt-8 pb-4 flex items-center justify-between border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-400 flex items-center justify-center text-white text-lg shadow-lg shadow-orange-500/20">
                                    ✨
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 text-sm">WithUs 여행 가이드</div>
                                    <div className="text-xs text-slate-400 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                        여정 설계 중
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Main Chat Area */}
                        <div className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="space-y-8"
                                >
                                    {/* Bot Message Bubble */}
                                    <div className="flex flex-col gap-2">
                                        <div className="bg-slate-100/80 text-slate-700 px-6 py-4 rounded-2xl rounded-tl-none text-sm font-bold max-w-[80%] leading-relaxed shadow-sm">
                                            {step === 1 && "반가워요! 새로운 여행을 준비하시는군요? 😊 먼저 이번 여정의 제목과 가고 싶은 도시를 알려주세요."}
                                            {step === 2 && "와, 멋진 곳이네요! 🗼 혹시 여정 중에 꼭 들르고 싶은 장소가 있나요? 루트에 추가해 주시면 제가 더 완벽하게 기억할게요."}
                                            {step === 3 && "마지막으로 여행 일정을 정해볼까요? 📅 언제가 가장 설레는 날이 될지 알려주세요!"}
                                        </div>
                                    </div>

                                    {/* Interaction Area */}
                                    <div className="pl-4 border-l-2 border-orange-100 pt-2 pb-2">
                                        {step === 1 && (
                                            <div className="space-y-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-1">여행 제목</label>
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        value={newTrip.title}
                                                        onChange={(e) => setNewTrip({ ...newTrip, title: e.target.value })}
                                                        placeholder="예: 포르투갈 서핑 정복기 🌊"
                                                        className="w-full text-xl font-black text-slate-900 bg-transparent border-b-2 border-slate-100 focus:border-orange-500 outline-none pb-2 transition-all placeholder:text-slate-200"
                                                    />
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-1">여행지</label>
                                                    <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-orange-200 transition-all">
                                                        <MapPin size={18} className="text-slate-300" />
                                                        <input
                                                            type="text"
                                                            value={newTrip.location}
                                                            onChange={(e) => setNewTrip({ ...newTrip, location: e.target.value })}
                                                            placeholder="어디로 떠나시나요?"
                                                            className="flex-1 bg-transparent border-none outline-none text-base font-bold text-slate-800 placeholder:text-slate-300"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {step === 2 && (
                                            <div className="space-y-6">
                                                <div className="space-y-4">
                                                    <div className="flex gap-2">
                                                        <div className="flex-1 flex items-center gap-3 px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-orange-200 transition-all">
                                                            <MapIcon size={18} className="text-slate-300" />
                                                            <input
                                                                autoFocus
                                                                type="text"
                                                                value={tempRoute}
                                                                onChange={(e) => setTempRoute(e.target.value)}
                                                                onKeyDown={(e) => e.key === 'Enter' && addRoute()}
                                                                placeholder="장소 이름 입력 (예: 에펠탑)"
                                                                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-800 placeholder:text-slate-300"
                                                            />
                                                        </div>
                                                        <button
                                                            onClick={addRoute}
                                                            className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
                                                        >
                                                            <Plus size={20} />
                                                        </button>
                                                    </div>

                                                    <div className="max-h-[220px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                                        <AnimatePresence>
                                                            {newTrip.routes.map((route, idx) => (
                                                                <motion.div
                                                                    key={idx}
                                                                    initial={{ opacity: 0, x: -10 }}
                                                                    animate={{ opacity: 1, x: 0 }}
                                                                    exit={{ opacity: 0, x: 10 }}
                                                                    className="flex items-center justify-between p-4 bg-orange-50/30 border border-orange-100 rounded-2xl group"
                                                                >
                                                                    <div className="flex items-center gap-3">
                                                                        <span className="w-6 h-6 bg-orange-500 text-white text-[10px] font-black rounded-lg flex items-center justify-center shadow-sm shadow-orange-500/20">
                                                                            {idx + 1}
                                                                        </span>
                                                                        <span className="text-sm font-bold text-slate-700">{route}</span>
                                                                    </div>
                                                                    <button
                                                                        onClick={() => removeRoute(idx)}
                                                                        className="p-1.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                                                                    >
                                                                        <Trash2 size={14} />
                                                                    </button>
                                                                </motion.div>
                                                            ))}
                                                        </AnimatePresence>
                                                        {newTrip.routes.length === 0 && (
                                                            <div className="text-center py-10 rounded-3xl border-2 border-dashed border-slate-100">
                                                                <p className="text-[11px] font-bold text-slate-300 max-w-[200px] mx-auto leading-relaxed">아직 추가된 장소가 없어요.<br />자유롭게 입력해 주세요!</p>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {step === 3 && (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-1">시작일</label>
                                                        <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-orange-200 transition-all">
                                                            <Clock size={16} className="text-slate-300" />
                                                            <input
                                                                autoFocus
                                                                type="text"
                                                                value={newTrip.startDate}
                                                                onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })}
                                                                placeholder="YYYY.MM.DD"
                                                                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-800"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-1">종료일</label>
                                                        <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-orange-200 transition-all">
                                                            <Clock size={16} className="text-slate-300" />
                                                            <input
                                                                type="text"
                                                                value={newTrip.endDate}
                                                                onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })}
                                                                placeholder="YYYY.MM.DD"
                                                                className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-800"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="p-5 bg-teal-50 border border-teal-100 rounded-2xl flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white shrink-0">
                                                        <Check size={16} />
                                                    </div>
                                                    <p className="text-[11px] font-bold text-teal-700 leading-tight">거의 다 됐어요! 모든 정보를 확인하셨다면 아래 '여행 시작하기' 버튼을 눌러주세요.</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer Action Area */}
                        <div className="flex-none p-8 bg-white border-t border-slate-50 flex items-center gap-3">
                            {step > 1 && (
                                <button
                                    onClick={() => setStep(s => Math.max(1, s - 1))}
                                    className="px-6 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
                                >
                                    이전 단계
                                </button>
                            )}
                            <div className="ml-auto flex items-center gap-3">
                                {step < 3 ? (
                                    <button
                                        onClick={() => setStep(s => Math.min(3, s + 1))}
                                        disabled={step === 1 && (!newTrip.title || !newTrip.location)}
                                        className="px-10 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm tracking-widest hover:bg-orange-500 transition-all disabled:opacity-30 shadow-xl shadow-slate-900/10 active:scale-95 flex items-center gap-2"
                                    >
                                        다음 문답
                                        <ArrowRight size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={onSubmit}
                                        disabled={!newTrip.startDate}
                                        className="px-10 py-4 rounded-2xl text-white font-black text-sm tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-30 inline-flex items-center gap-2"
                                        style={{ background: theme.colors.gradients.brand }}
                                    >
                                        <Sparkles size={18} />
                                        여행 설계 시작하기
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
