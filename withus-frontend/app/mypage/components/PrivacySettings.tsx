'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff, Globe, Lock, ShieldCheck, UserCheck } from 'lucide-react';

interface PrivacySettingsProps {
    onBack: () => void;
}

export const PrivacySettings = ({ onBack }: PrivacySettingsProps) => {
    const [settings, setSettings] = useState({
        profileVisibility: 'everybody', // everybody, member, private
        showHistory: true,
        showReviews: true,
        allowFriendSearch: true,
        dataMarketing: false
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('개인정보 및 공개 설정이 저장되었습니다.');
            onBack();
        }, 1000);
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
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">개인정보 공개 설정</h3>
                    <p className="text-xs text-slate-400 font-bold">나의 정보가 다른 사용자들에게 어떻게 보여질지 결정하세요.</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* 1. 프로필 공개 범위 */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-teal-100 flex items-center justify-center text-teal-500">
                            <Eye size={16} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">프로필 공개 범위</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: 'everybody', label: '전체 공개', icon: <Globe size={18} />, desc: '누구나 볼 수 있음' },
                            { id: 'member', label: '회원 공개', icon: <UserCheck size={18} />, desc: '회원만 볼 수 있음' },
                            { id: 'private', label: '비공개', icon: <Lock size={18} />, desc: '나만 볼 수 있음' },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSettings({ ...settings, profileVisibility: item.id })}
                                className={`p-6 rounded-3xl border-2 flex flex-col items-center gap-4 transition-all
                                    ${settings.profileVisibility === item.id
                                        ? 'border-slate-900 bg-slate-900 text-white shadow-xl transform scale-105'
                                        : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'}`}
                            >
                                <div className={`${settings.profileVisibility === item.id ? 'text-white' : 'text-slate-400'}`}>
                                    {item.icon}
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black">{item.label}</p>
                                    <p className={`text-[10px] font-bold ${settings.profileVisibility === item.id ? 'text-slate-300' : 'text-slate-400'}`}>
                                        {item.desc}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* 2. 상세 공개 설정 */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                            <p className="text-sm font-black text-slate-900">과거 동행 이력 공개</p>
                            <p className="text-[11px] text-slate-400 font-bold">내가 참여했거나 생성했던 동행 이력을 공개합니다.</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, showHistory: !settings.showHistory })}
                            className={`w-12 h-6 rounded-full transition-all relative ${settings.showHistory ? 'bg-slate-900' : 'bg-slate-100'}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${settings.showHistory ? 'left-[1.6rem]' : 'left-0.5'}`} />
                        </button>
                    </div>

                    <div className="w-full h-px bg-slate-50" />

                    <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                            <p className="text-sm font-black text-slate-900">리뷰 및 별점 공개</p>
                            <p className="text-[11px] text-slate-400 font-bold">다른 사용자들에게 받은 동행 리뷰와 내 매너 점수를 보여줍니다.</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, showReviews: !settings.showReviews })}
                            className={`w-12 h-6 rounded-full transition-all relative ${settings.showReviews ? 'bg-slate-900' : 'bg-slate-100'}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${settings.showReviews ? 'left-[1.6rem]' : 'left-0.5'}`} />
                        </button>
                    </div>

                    <div className="w-full h-px bg-slate-50" />

                    <div className="flex items-center justify-between group">
                        <div className="space-y-1">
                            <p className="text-sm font-black text-slate-900">친구 찾기 허용</p>
                            <p className="text-[11px] text-slate-400 font-bold">이메일이나 휴대폰 번호로 나를 찾을 수 있게 합니다.</p>
                        </div>
                        <button
                            onClick={() => setSettings({ ...settings, allowFriendSearch: !settings.allowFriendSearch })}
                            className={`w-12 h-6 rounded-full transition-all relative ${settings.allowFriendSearch ? 'bg-slate-900' : 'bg-slate-100'}`}
                        >
                            <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${settings.allowFriendSearch ? 'left-[1.6rem]' : 'left-0.5'}`} />
                        </button>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-12 py-5 rounded-3xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-xl active:scale-95 flex items-center gap-3 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <ShieldCheck size={20} />
                        )}
                        공개 설정 저장하기
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
