'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Camera, Check, Sparkles, User, MessageSquare, Map, Wallet, Utensils, Moon } from 'lucide-react';

interface ProfileEditProps {
    user: {
        name: string;
        image?: string;
        intro?: string;
        mbti?: string;
        preferences?: {
            interests: string[];
            planStyle: 'PLANNED' | 'IMPROMPTU';
            paceStyle: 'FAST' | 'BALANCED' | 'RELAXED';
            budgetStyle: 'ECONOMY' | 'MODERATE' | 'LUXURY';
            foodStyle: 'LOCAL' | 'KOREAN';
            lifestyleStyle: 'MORNING' | 'NIGHT';
        };
    };
    onBack: () => void;
}

export const ProfileEdit = ({ user, onBack }: ProfileEditProps) => {
    const [formData, setFormData] = useState({
        name: user.name,
        intro: user.intro || '여행과 사진을 사랑하는 자유로운 영혼입니다 ✈️',
        mbti: user.mbti || 'ENFP',
        image: user.image || '🧔',
        customImageUrl: null as string | null,
        planStyle: user.preferences?.planStyle || 'PLANNED',
        paceStyle: user.preferences?.paceStyle || 'BALANCED',
        budgetStyle: user.preferences?.budgetStyle || 'MODERATE',
        foodStyle: user.preferences?.foodStyle || 'LOCAL',
        lifestyleStyle: user.preferences?.lifestyleStyle || 'MORNING'
    });
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({
                    ...prev,
                    customImageUrl: reader.result as string,
                    image: '' // Clear emoji if custom image is used
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('프로필 및 여행 성향 정보가 저장되었습니다.');
            onBack();
        }, 1500);
    };

    const emojis = ['🧔', '👦', '👧', '👩', '👨', '👵', '👴', '👱‍♂️', '👱‍♀️', '👩‍🦰', '👨‍🦱', '👩‍🎨'];
    const mbtis = [
        'ENFP', 'ENFJ', 'ENTP', 'ENTJ',
        'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
        'INFP', 'INFJ', 'INTP', 'INTJ',
        'ISFP', 'ISFJ', 'ISTP', 'ISTJ'
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 transition-all shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">프로필 정보 수정</h3>
                    <p className="text-xs text-slate-400 font-bold">나의 기본 정보와 여행 성향을 관리하세요.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-10 max-w-4xl mx-auto">
                {/* 1. Profile Image Section - Now at the Top */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                    <div className="flex flex-col md:flex-row items-center gap-10">
                        <div className="relative group cursor-pointer shrink-0" onClick={() => fileInputRef.current?.click()}>
                            <div className="w-40 h-40 rounded-[48px] bg-slate-50 border-4 border-white shadow-xl flex items-center justify-center text-7xl select-none group-hover:scale-105 transition-transform duration-500 overflow-hidden">
                                {formData.customImageUrl ? (
                                    <img src={formData.customImageUrl} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    formData.image
                                )}
                            </div>
                            <div className="absolute -bottom-2 -right-2 p-3 bg-slate-900 text-white rounded-2xl shadow-lg hover:scale-110 active:scale-95 transition-all">
                                <Camera size={18} />
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="space-y-1">
                                <p className="text-base font-black text-slate-900 tracking-tight">프로필 캐릭터 및 사진</p>
                                <p className="text-xs text-slate-400 font-bold">이미지를 클릭해 직접 사진을 업로드하거나, 아래 캐릭터 중 하나를 선택하세요.</p>
                            </div>
                            <div className="grid grid-cols-6 sm:grid-cols-12 gap-2">
                                {emojis.map(emoji => (
                                    <button
                                        key={emoji}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, image: emoji, customImageUrl: null })}
                                        className={`aspect-square rounded-xl flex items-center justify-center text-xl transition-all ${formData.image === emoji
                                            ? 'bg-orange-500 scale-110 shadow-lg shadow-orange-200 text-white'
                                            : 'bg-slate-50 hover:bg-slate-100'
                                            }`}
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                            <div className="pt-4 flex items-center gap-2 text-teal-600">
                                <Sparkles size={16} />
                                <span className="text-[11px] font-black uppercase tracking-widest">Premium Trust Identity</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. Basic Info Section */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-500">
                            <User size={16} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">기본 정보</h4>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">닉네임</label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/30 transition-all outline-none font-bold text-slate-800"
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">MBTI</label>
                            <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                                {mbtis.map(m => (
                                    <button
                                        key={m}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, mbti: m })}
                                        className={`py-2 rounded-xl text-[10px] font-bold transition-all border ${formData.mbti === m
                                            ? 'bg-slate-900 text-white border-slate-900 shadow-lg'
                                            : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                                            }`}
                                    >
                                        {m}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">한 줄 소개</label>
                        <textarea
                            rows={3}
                            value={formData.intro}
                            onChange={(e) => setFormData({ ...formData, intro: e.target.value })}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/30 transition-all outline-none font-bold text-slate-800 resize-none"
                        />
                    </div>
                </div>

                {/* 3. Travel Preference Section */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-500">
                            <Map size={16} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">여행 성향 (온보딩 설정)</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        {/* Plan Style */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <Map size={14} /> 일정 계획
                            </label>
                            <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                                {[
                                    { id: 'PLANNED', label: '철저한 계획파' },
                                    { id: 'IMPROMPTU', label: '유연한 즉흥파' }
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, planStyle: item.id as any })}
                                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${formData.planStyle === item.id
                                            ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pace Style */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <Sparkles size={14} /> 이동 속도
                            </label>
                            <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                                {[
                                    { id: 'FAST', label: '강행군' },
                                    { id: 'BALANCED', label: '밸런스' },
                                    { id: 'RELAXED', label: '느긋함' }
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, paceStyle: item.id as any })}
                                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${formData.paceStyle === item.id
                                            ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Budget Style */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <Wallet size={14} /> 예산 관리
                            </label>
                            <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                                {[
                                    { id: 'ECONOMY', label: '알뜰형' },
                                    { id: 'MODERATE', label: '적당형' },
                                    { id: 'LUXURY', label: '플렉스' }
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, budgetStyle: item.id as any })}
                                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${formData.budgetStyle === item.id
                                            ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Food Style */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <Utensils size={14} /> 선호 식단
                            </label>
                            <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                                {[
                                    { id: 'LOCAL', label: '현지식 정복' },
                                    { id: 'KOREAN', label: '무조건 한식' }
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, foodStyle: item.id as any })}
                                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${formData.foodStyle === item.id
                                            ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Lifestyle Style */}
                        <div className="space-y-4">
                            <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest ml-1">
                                <Moon size={14} /> 생활 패턴
                            </label>
                            <div className="flex p-1 bg-slate-50 rounded-2xl border border-slate-100">
                                {[
                                    { id: 'MORNING', label: '얼리버드' },
                                    { id: 'NIGHT', label: '나이트아울' }
                                ].map(item => (
                                    <button
                                        key={item.id}
                                        type="button"
                                        onClick={() => setFormData({ ...formData, lifestyleStyle: item.id as any })}
                                        className={`flex-1 py-3 rounded-xl text-xs font-bold transition-all ${formData.lifestyleStyle === item.id
                                            ? 'bg-white text-slate-900 shadow-sm border border-slate-100'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {item.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-10 flex justify-end">
                        <button
                            type="submit"
                            disabled={isSaving}
                            className="px-12 py-5 rounded-3xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center gap-3 disabled:opacity-50"
                        >
                            {isSaving ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    저장 중...
                                </>
                            ) : (
                                <>
                                    <Check size={20} />
                                    프로필 변경사항 모두 저장하기
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </motion.div>
    );
};
