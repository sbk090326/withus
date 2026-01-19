'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Calendar, Tag, Image as ImageIcon, Send, PlusCircle, Map, Plus, Trash2, Download } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';
import { ImportRouteModal } from './ImportRouteModal';

interface CreateCompanionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateCompanionModal = ({ isOpen, onClose }: CreateCompanionModalProps) => {
    const [formData, setFormData] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        description: '',
        tags: '',
        targetGender: '전체',
        targetAge: '전체',
        maxPeople: 4,
        isSmoker: '상관없음',
        budget: '',
        route: [] as string[],
    });

    const [newRoutePoint, setNewRoutePoint] = useState('');
    const [isImportModalOpen, setIsImportModalOpen] = useState(false);


    const addRoutePoint = () => {
        if (newRoutePoint.trim() && formData.route.length < 5) {
            setFormData({ ...formData, route: [...formData.route, newRoutePoint.trim()] });
            setNewRoutePoint('');
        }
    };

    const removeRoutePoint = (index: number) => {
        const newRoute = formData.route.filter((_, i) => i !== index);
        setFormData({ ...formData, route: newRoute });
    };

    const handleImportRoute = (importedRoute: string[]) => {
        setFormData({ ...formData, route: importedRoute });
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle post creation logic here
        console.log('Post Created:', formData);
        onClose();
    };

    const genderOptions = ['전체', '남성만', '여성만'];
    const ageOptions = ['전체', '20대', '30대', '40대+'];
    const smokingOptions = ['상관없음', '비흡연자만'];

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
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-lg">
                                    <PlusCircle size={20} fill="white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">새 동행 찾기</h2>
                                    <p className="text-xs text-slate-400">당신의 멋진 여행 계획을 공유해보세요!</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-400 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Form Body - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                            <form onSubmit={handleSubmit} className="space-y-10">
                                {/* Title */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-slate-700">여행 제목</label>
                                    <input
                                        type="text"
                                        placeholder="어떤 여행을 계획 중이신가요?"
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 focus:ring-4 focus:ring-orange-500/5 transition-all outline-none font-medium text-slate-900"
                                        required
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    />
                                </div>

                                {/* Location & Date Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-slate-700">목적지</label>
                                        <div className="relative">
                                            <MapPin size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="어디로 가시나요?"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900"
                                                required
                                                value={formData.location}
                                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-slate-700">날짜 설정</label>
                                        <div className="relative">
                                            <Calendar size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="2026.04.12 - 2026.04.15"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900"
                                                required
                                                value={formData.startDate}
                                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Key Route Section - NEW */}
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Map size={18} className="text-orange-500" />
                                            주요 동선 (최대 5곳)
                                        </label>
                                        <button
                                            type="button"
                                            onClick={() => setIsImportModalOpen(true)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 text-teal-600 text-xs font-bold hover:bg-teal-100 transition-all border border-teal-100"
                                        >
                                            <Download size={14} />
                                            일정 가져오기
                                        </button>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            placeholder="예) 에펠탑, 루브르 박물관 등"
                                            className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900"
                                            value={newRoutePoint}
                                            onChange={(e) => setNewRoutePoint(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addRoutePoint())}
                                        />
                                        <button
                                            type="button"
                                            onClick={addRoutePoint}
                                            className="px-6 rounded-2xl bg-slate-900 text-white font-bold hover:bg-orange-500 transition-all"
                                        >
                                            <Plus size={20} />
                                        </button>
                                    </div>


                                    <div className="flex flex-wrap gap-3 mt-4">
                                        {formData.route.map((point, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="flex items-center gap-2 px-4 py-2 bg-orange-50 rounded-xl border border-orange-100 group"
                                            >
                                                <span className="text-xs font-bold text-orange-600">{index + 1}</span>
                                                <span className="text-sm font-bold text-slate-700">{point}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeRoutePoint(index)}
                                                    className="text-slate-300 hover:text-rose-500 transition-colors"
                                                >
                                                    <X size={14} />
                                                </button>
                                                {index < formData.route.length - 1 && (
                                                    <div className="ml-2 w-4 h-[1px] bg-orange-200 hidden group-last:hidden" />
                                                )}
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>

                                {/* Recruitment Criteria */}
                                <div className="p-8 rounded-[32px] bg-slate-50/50 border border-slate-100 space-y-6">
                                    <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                                        모집 조건 설정
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Gender Selection */}
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">모집 성별</label>
                                            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                                                {genderOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, targetGender: option })}
                                                        className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${formData.targetGender === option
                                                            ? 'bg-orange-500 text-white shadow-md'
                                                            : 'text-slate-500 hover:text-slate-900'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Age Selection */}
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">선호 연령대</label>
                                            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                                                {ageOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, targetAge: option })}
                                                        className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${formData.targetAge === option
                                                            ? 'bg-orange-500 text-white shadow-md'
                                                            : 'text-slate-500 hover:text-slate-900'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Smoking Selection */}
                                        <div className="space-y-4">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">흡연 여부</label>
                                            <div className="flex bg-white p-1 rounded-2xl border border-slate-100 shadow-sm">
                                                {smokingOptions.map((option) => (
                                                    <button
                                                        key={option}
                                                        type="button"
                                                        onClick={() => setFormData({ ...formData, isSmoker: option })}
                                                        className={`flex-1 py-3 text-xs font-bold rounded-xl transition-all ${formData.isSmoker === option
                                                            ? 'bg-orange-500 text-white shadow-md'
                                                            : 'text-slate-500 hover:text-slate-900'
                                                            }`}
                                                    >
                                                        {option}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Budget Input */}
                                        <div className="space-y-4 md:col-span-2">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest text-orange-500/70">예상 1인 예산 (선택)</label>
                                            <div className="relative">
                                                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">₩</span>
                                                <input
                                                    type="text"
                                                    placeholder="예) 50만원 내외, 숙박비 제외 등"
                                                    className="w-full pl-12 pr-6 py-4 rounded-2xl bg-white border border-slate-100 focus:bg-white focus:border-orange-500/30 transition-all outline-none font-bold text-slate-900 text-sm shadow-sm"
                                                    value={formData.budget}
                                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Max People Slider/Input */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">최대 모집 인원</label>
                                            <span className="text-lg font-black text-orange-500">{formData.maxPeople}명</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="2"
                                            max="10"
                                            step="1"
                                            value={formData.maxPeople}
                                            onChange={(e) => setFormData({ ...formData, maxPeople: parseInt(e.target.value) })}
                                            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                                        />
                                        <div className="flex justify-between text-[10px] text-slate-300 font-bold">
                                            <span>2명</span>
                                            <span>10명</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div className="space-y-3">
                                    <label className="block text-sm font-bold text-slate-700">상세 설명</label>
                                    <textarea
                                        placeholder="여행 일정, 원하는 동행 스타일 등을 자세히 적어주세요."
                                        rows={5}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900 resize-none"
                                        required
                                        value={formData.description}
                                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                {/* Image & Tags Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-slate-700">태그 (쉼표로 구분)</label>
                                        <div className="relative">
                                            <Tag size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                                            <input
                                                type="text"
                                                placeholder="#맛집탐방, #뚜벅이"
                                                className="w-full pl-12 pr-6 py-4 rounded-2xl bg-slate-50 border border-transparent focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-900"
                                                value={formData.tags}
                                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <label className="block text-sm font-bold text-slate-700">대표 사진 첨부</label>
                                        <button
                                            type="button"
                                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 text-slate-400 hover:text-slate-600 hover:border-slate-300 transition-all flex items-center justify-center gap-2 font-medium"
                                        >
                                            <ImageIcon size={20} />
                                            사진 추가하기 (+5장)
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Footer - Sticky Bottom */}
                        <div className="px-8 py-6 bg-white border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <p className="text-[10px] text-slate-400 md:w-1/2 leading-relaxed text-center md:text-left">
                                허위 정보나 부적절한 게시글은 관리자에 의해 제재될 수 있으며, <br />
                                Withus 안전 수칙을 준수해 주시기 바랍니다.
                            </p>
                            <div className="flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={onClose}
                                    className="flex-1 md:flex-none px-6 py-3.5 rounded-2xl font-bold text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all text-sm"
                                >
                                    취소
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-[2] md:flex-none px-8 py-3.5 rounded-2xl font-bold text-white shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-sm whitespace-nowrap"
                                    style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                                >
                                    <Send size={18} />
                                    모집 시작하기
                                </button>
                            </div>
                        </div>
                    </motion.div>

                    {/* Import Route Modal */}
                    <ImportRouteModal
                        isOpen={isImportModalOpen}
                        onClose={() => setIsImportModalOpen(false)}
                        onImport={handleImportRoute}
                    />
                </div>
            )}
        </AnimatePresence>
    );
};
