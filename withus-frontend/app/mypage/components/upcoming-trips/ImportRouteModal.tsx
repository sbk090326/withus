'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Plus } from 'lucide-react';

interface ImportRouteModalProps {
    isOpen: boolean;
    onClose: () => void;
    courses: Array<{
        id: number;
        title: string;
        location: string;
        routes: string[];
        thumbnail: string;
    }>;
    onImport: (course: any) => void;
}

export const ImportRouteModal = ({ isOpen, onClose, courses, onImport }: ImportRouteModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-[110] flex items-center justify-center p-6">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 30 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 30 }}
                        className="bg-white rounded-[40px] w-full max-w-[500px] shadow-2xl overflow-hidden p-10 space-y-8"
                    >
                        <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <div className="flex items-center gap-2 text-orange-500">
                                    <Sparkles size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Saved Courses</span>
                                </div>
                                <h4 className="text-2xl font-black text-slate-900 tracking-tighter">나의 저장된 루트</h4>
                            </div>
                            <button onClick={onClose} className="p-2.5 bg-slate-50 rounded-xl text-slate-400 hover:text-slate-900 transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <p className="text-xs text-slate-400 font-bold leading-relaxed">커뮤니티에서 '저장'한 여행 코스들입니다. 새로운 여행의 기본 정보로 가져올 수 있습니다.</p>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                            {courses.map((course) => (
                                <button
                                    key={course.id}
                                    onClick={() => onImport(course)}
                                    className="w-full flex items-center gap-5 p-5 rounded-[2rem] border border-slate-100 hover:border-orange-200 hover:bg-orange-50/30 transition-all text-left group"
                                >
                                    <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                                        <img src={course.thumbnail} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-[10px] font-black text-orange-500 uppercase tracking-widest mb-1">{course.location}</p>
                                        <h5 className="text-sm font-black text-slate-900 line-clamp-1 group-hover:text-orange-600 transition-colors">{course.title}</h5>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1">{course.routes.length}개의 경유지 포함</p>
                                    </div>
                                    <Plus size={20} className="text-slate-200 group-hover:text-orange-400 transition-colors mr-2" />
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={onClose}
                            className="w-full py-4.5 rounded-2xl bg-slate-900 text-white font-black text-sm tracking-widest hover:bg-slate-800 transition-all shadow-xl shadow-slate-900/10"
                        >
                            닫기
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
