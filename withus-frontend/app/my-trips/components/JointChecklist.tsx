'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckSquare, Square, Plus, Trash2, MapPin } from 'lucide-react';

const mockTrips = [
    { id: 1, title: '포르투 서핑 클래스 🏄‍♂️', location: '포르투' },
    { id: 2, title: '방콕 루프탑 바 번개 🍸', location: '방콕' },
];

interface JointChecklistProps {
    checklists: Record<number, any[]>;
    setChecklists: React.Dispatch<React.SetStateAction<Record<number, any[]>>>;
}

export const JointChecklist = ({ checklists, setChecklists }: JointChecklistProps) => {
    const [selectedTripId, setSelectedTripId] = useState(mockTrips[0].id);
    const [newItem, setNewItem] = useState('');

    const items = checklists[selectedTripId] || [];
    const selectedTrip = mockTrips.find(t => t.id === selectedTripId);

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
        <div className="space-y-8">
            <div className="flex flex-col gap-1 mb-8">
                <h3 className="text-2xl font-black text-slate-800 tracking-tighter">공동 체크리스트</h3>
                <p className="text-xs text-slate-400 font-bold">참여 중인 여행별로 준비물을 함께 챙겨보세요.</p>
            </div>

            {/* 여행 선택 칩셋 */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {mockTrips.map((trip) => (
                    <button
                        key={trip.id}
                        onClick={() => setSelectedTripId(trip.id)}
                        className={`flex items-center gap-2 px-5 py-3 rounded-2xl whitespace-nowrap transition-all border ${selectedTripId === trip.id
                            ? 'bg-slate-900 border-slate-900 shadow-lg shadow-slate-900/10'
                            : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                            }`}
                    >
                        <span className={`text-[11px] font-black ${selectedTripId === trip.id ? 'text-white' : 'text-slate-900'}`}>{trip.title}</span>
                        {selectedTripId === trip.id && <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />}
                    </button>
                ))}
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-10">
                {/* 현재 여행 정보 요약 */}
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-3xl border border-slate-100">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-xl">
                            {selectedTrip?.title.split(' ').pop()}
                        </div>
                        <div>
                            <h4 className="font-black text-slate-900 text-sm tracking-tight">{selectedTrip?.title}</h4>
                            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-bold">
                                <MapPin size={12} className="text-orange-400" /> {selectedTrip?.location}
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">진행률</p>
                        <p className="text-lg font-black text-slate-900">
                            {Math.round((items.filter(i => i.completed).length / (items.length || 1)) * 100)}%
                        </p>
                    </div>
                </div>

                {/* 입력창 */}
                <form onSubmit={addItem} className="relative group">
                    <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                        <Plus className="text-slate-300 group-focus-within:text-orange-400 transition-colors" size={20} />
                    </div>
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="동행과 함께 준비할 항목을 입력하세요..."
                        className="w-full pl-14 pr-20 py-4.5 rounded-2xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-orange-500/20 transition-all outline-none font-bold text-sm text-slate-900 shadow-inner"
                    />
                    <button
                        type="submit"
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-black text-[11px] tracking-wider uppercase hover:bg-orange-500 transition-all shadow-lg active:scale-95"
                    >
                        추가
                    </button>
                </form>

                {/* 리스트 */}
                <div className="space-y-3">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                key={item.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`flex items-center gap-4 p-5 rounded-2xl border transition-all group ${item.completed
                                    ? 'bg-slate-50/50 border-transparent opacity-60'
                                    : 'bg-white border-slate-50 hover:border-orange-100 hover:shadow-sm'
                                    }`}
                            >
                                <button
                                    onClick={() => toggleItem(item.id)}
                                    className={`shrink-0 transition-colors ${item.completed ? 'text-teal-500' : 'text-slate-200 hover:text-orange-500'}`}
                                >
                                    {item.completed ? <CheckSquare size={22} fill="currentColor" className="text-white bg-teal-500 rounded-md" /> : <Square size={22} />}
                                </button>

                                <span className={`flex-1 font-bold text-sm ${item.completed ? 'line-through text-slate-300' : 'text-slate-700'}`}>
                                    {item.text}
                                </span>

                                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className={`px-2.5 py-1 rounded-lg text-[9px] font-black tracking-widest ${item.completed ? 'bg-slate-100 text-slate-400' : 'bg-teal-50 text-teal-600'}`}>
                                        {item.assignedTo === '나' ? 'ME' : item.assignedTo}
                                    </div>
                                    <button
                                        onClick={() => deleteItem(item.id)}
                                        className="p-2 text-slate-200 hover:text-rose-500 transition-colors"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {items.length === 0 && (
                    <div className="py-20 text-center space-y-4 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-100">
                        <div className="text-5xl">📋</div>
                        <p className="text-xs font-bold text-slate-300">이 여행의 첫 번째 준비물을 등록해보세요!</p>
                    </div>
                )}
            </div>
        </div>
    );
};
