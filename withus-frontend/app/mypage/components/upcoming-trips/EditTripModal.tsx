'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Map as MapIcon, Plus, Trash2, Clock, Check, Save, Sparkles } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

interface EditTripModalProps {
    isOpen: boolean;
    onClose: () => void;
    trip: {
        id: number;
        title: string;
        location: string;
        date: string;
        highlights?: string[];
    } | null;
    onSave: (updatedTrip: any) => void;
}

export const EditTripModal = ({
    isOpen,
    onClose,
    trip,
    onSave
}: EditTripModalProps) => {
    const [editData, setEditData] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        routes: [] as string[],
    });
    const [tempRoute, setTempRoute] = useState('');
    const [activeTab, setActiveTab] = useState<'basic' | 'route' | 'date'>('basic');

    useEffect(() => {
        if (trip) {
            // Parse date string (e.g., "2026.05.02 - 2026.05.10")
            const dateParts = trip.date.split(' - ');
            setEditData({
                title: trip.title,
                location: trip.location,
                startDate: dateParts[0] || '',
                endDate: dateParts[1] || '',
                routes: trip.highlights || [],
            });
            setActiveTab('basic');
        }
    }, [trip, isOpen]);

    const handleSave = () => {
        onSave({
            ...trip,
            title: editData.title,
            location: editData.location,
            date: `${editData.startDate}${editData.endDate ? ` - ${editData.endDate}` : ''}`,
            highlights: editData.routes,
        });
        onClose();
    };

    const addRoute = () => {
        if (tempRoute.trim()) {
            setEditData({ ...editData, routes: [...editData.routes, tempRoute.trim()] });
            setTempRoute('');
        }
    };

    const removeRoute = (index: number) => {
        setEditData({
            ...editData,
            routes: editData.routes.filter((_, i) => i !== index)
        });
    };

    return (
        <AnimatePresence>
            {isOpen && trip && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[105] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="w-full max-w-2xl bg-white rounded-[40px] overflow-hidden relative min-h-[550px] max-h-[85vh] flex flex-col border border-slate-100 shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex-none px-8 pt-8 pb-4 flex items-center justify-between border-b border-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-slate-900 flex items-center justify-center text-white text-lg shadow-lg">
                                    ⚙️
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 text-sm">여정 기본 설정 수정</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                                        {trip.title}
                                    </div>
                                </div>
                            </div>
                            <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex px-10 pt-6 gap-6 border-b border-slate-50">
                            {[
                                { id: 'basic', label: '기본 정보', icon: MapPin },
                                { id: 'route', label: '주요 루트', icon: MapIcon },
                                { id: 'date', label: '일정 설정', icon: Clock },
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id as any)}
                                    className={`pb-4 flex items-center gap-2 text-xs font-black uppercase tracking-widest transition-all border-b-2 
                                        ${activeTab === tab.id ? 'text-orange-500 border-orange-500' : 'text-slate-300 border-transparent hover:text-slate-500'}`}
                                >
                                    <tab.icon size={14} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto px-10 py-8 custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    {activeTab === 'basic' && (
                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-1">여행 제목</label>
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={editData.title}
                                                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                                    className="w-full text-xl font-black text-slate-900 bg-transparent border-b-2 border-slate-100 focus:border-orange-500 outline-none pb-2 transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-1">여행지</label>
                                                <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-orange-200 transition-all">
                                                    <MapPin size={18} className="text-slate-300" />
                                                    <input
                                                        type="text"
                                                        value={editData.location}
                                                        onChange={(e) => setEditData({ ...editData, location: e.target.value })}
                                                        className="flex-1 bg-transparent border-none outline-none text-base font-bold text-slate-800"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'route' && (
                                        <div className="space-y-6">
                                            <div className="flex gap-2">
                                                <div className="flex-1 flex items-center gap-3 px-5 py-3.5 bg-slate-50 rounded-2xl border border-slate-100 focus-within:border-orange-200 transition-all">
                                                    <MapIcon size={18} className="text-slate-300" />
                                                    <input
                                                        autoFocus
                                                        type="text"
                                                        value={tempRoute}
                                                        onChange={(e) => setTempRoute(e.target.value)}
                                                        onKeyDown={(e) => e.key === 'Enter' && addRoute()}
                                                        placeholder="변경하거나 추가할 장소 입력"
                                                        className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-800"
                                                    />
                                                </div>
                                                <button
                                                    onClick={addRoute}
                                                    className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-orange-500 transition-all shadow-lg shadow-slate-900/10"
                                                >
                                                    <Plus size={20} />
                                                </button>
                                            </div>

                                            <div className="max-h-[200px] overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                                <AnimatePresence mode="popLayout">
                                                    {editData.routes.map((route, idx) => (
                                                        <motion.div
                                                            key={idx}
                                                            layout
                                                            initial={{ opacity: 0, x: -10 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0, x: 10 }}
                                                            className="flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-2xl group"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <span className="w-6 h-6 bg-slate-200 text-slate-500 text-[10px] font-black rounded-lg flex items-center justify-center">
                                                                    {idx + 1}
                                                                </span>
                                                                <span className="text-sm font-bold text-slate-700">{route}</span>
                                                            </div>
                                                            <button
                                                                onClick={() => removeRoute(idx)}
                                                                className="p-1.5 text-slate-300 hover:text-rose-500 transition-all"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>
                                            </div>
                                        </div>
                                    )}

                                    {activeTab === 'date' && (
                                        <div className="space-y-6">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-1">시작일</label>
                                                    <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <Clock size={16} className="text-slate-300" />
                                                        <input
                                                            type="text"
                                                            value={editData.startDate}
                                                            onChange={(e) => setEditData({ ...editData, startDate: e.target.value })}
                                                            className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-800"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest pl-1">종료일</label>
                                                    <div className="flex items-center gap-3 px-5 py-4 bg-slate-50 rounded-2xl border border-slate-100">
                                                        <Clock size={16} className="text-slate-300" />
                                                        <input
                                                            type="text"
                                                            value={editData.endDate}
                                                            onChange={(e) => setEditData({ ...editData, endDate: e.target.value })}
                                                            className="flex-1 bg-transparent border-none outline-none text-sm font-bold text-slate-800"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="p-5 bg-orange-50 border border-orange-100 rounded-2xl flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white shrink-0">
                                                    <Save size={16} />
                                                </div>
                                                <p className="text-[11px] font-bold text-orange-700 leading-tight">
                                                    날짜 및 기본 정보를 수정하면 동행들에게도 즉시 알림이 발송됩니다.
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Footer Area */}
                        <div className="flex-none p-8 bg-white border-t border-slate-50 flex items-center justify-between">
                            <button
                                onClick={onClose}
                                className="px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 transition-all"
                            >
                                취소
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={!editData.title || !editData.location}
                                className="px-10 py-4 rounded-2xl text-white font-black text-sm tracking-widest shadow-xl shadow-orange-500/20 active:scale-95 disabled:opacity-30 flex items-center gap-2"
                                style={{ background: theme.colors.gradients.brand }}
                            >
                                <Sparkles size={18} />
                                변경 사항 저장
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
