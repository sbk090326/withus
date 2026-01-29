'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Lock, Mail, Phone, User, Check, ShieldCheck, Eye, EyeOff } from 'lucide-react';

interface AccountSettingsProps {
    user: {
        name: string;
        email: string;
        phone?: string;
    };
    onBack: () => void;
}

export const AccountSettings = ({ user, onBack }: AccountSettingsProps) => {
    const [formData, setFormData] = useState({
        userName: user.name, // 실명
        email: user.email,
        phone: user.phone || '010-1234-5678',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [isSaving, setIsSaving] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('계정 정보 및 보안 설정이 업데이트되었습니다.');
            onBack();
        }, 1500);
    };

    const togglePasswordVisibility = (key: keyof typeof showPasswords) => {
        setShowPasswords(prev => ({ ...prev, [key]: !prev[key] }));
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
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">계정 및 보안 설정</h3>
                    <p className="text-xs text-slate-400 font-bold">인증된 개인 정보와 비밀번호를 안전하게 관리하세요.</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* 1. 개인 정보 관리 */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-500">
                            <User size={16} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">개인 정보 관리</h4>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* 실명 */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">실명 (인증됨)</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={formData.userName}
                                    onChange={(e) => setFormData({ ...formData, userName: e.target.value })}
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500/30 transition-all outline-none font-bold text-slate-800"
                                />
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1.5 text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-1 rounded-md">
                                    <ShieldCheck size={12} />
                                    인증됨
                                </div>
                            </div>
                        </div>

                        {/* 이메일 */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">이메일 주소</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={formData.email}
                                    readOnly
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-100 border border-slate-100 text-slate-400 font-bold cursor-not-allowed"
                                />
                                <Mail size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold ml-1">이메일은 변경할 수 없습니다. 고객센터에 문의해 주세요.</p>
                        </div>

                        {/* 휴대폰 번호 */}
                        <div className="space-y-3 md:col-span-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">휴대폰 번호</label>
                            <div className="flex gap-3">
                                <div className="relative flex-1">
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-blue-500/30 transition-all outline-none font-bold text-slate-800"
                                    />
                                    <Phone size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300" />
                                </div>
                                <button type="button" className="px-6 rounded-2xl border border-slate-200 text-xs font-black text-slate-600 hover:bg-slate-50 transition-all whitespace-nowrap">
                                    번호 변경 인증
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. 비밀번호 변경 */}
                <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-rose-100 flex items-center justify-center text-rose-500">
                            <Lock size={16} />
                        </div>
                        <h4 className="text-lg font-black text-slate-900 tracking-tight">비밀번호 변경</h4>
                    </div>

                    <div className="space-y-6 max-w-xl">
                        {/* 현재 비밀번호 */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">현재 비밀번호</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.current ? "text" : "password"}
                                    value={formData.currentPassword}
                                    onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                                    placeholder="현재 비밀번호를 입력하세요"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-rose-500/30 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                                >
                                    {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* 새 비밀번호 */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">새 비밀번호</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    value={formData.newPassword}
                                    onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                                    placeholder="8자 이상의 영문, 숫자, 특수문자 조합"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-rose-500/30 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                                >
                                    {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* 새 비밀번호 확인 */}
                        <div className="space-y-3">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">새 비밀번호 확인</label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    placeholder="새 비밀번호를 한 번 더 입력하세요"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:bg-white focus:border-rose-500/30 transition-all outline-none font-bold text-slate-800 placeholder:text-slate-300"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 transition-colors"
                                >
                                    {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {formData.newPassword && formData.confirmPassword && formData.newPassword !== formData.confirmPassword && (
                                <p className="text-[10px] text-rose-500 font-bold ml-1">비밀번호가 일치하지 않습니다.</p>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-12 py-5 rounded-3xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-xl active:scale-95 flex items-center gap-3 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                처리 중...
                            </>
                        ) : (
                            <>
                                <Check size={20} />
                                보안 설정 업데이트
                            </>
                        )}
                    </button>
                </div>
            </form>

            <div className="bg-slate-900/5 rounded-[40px] p-10 border border-dashed border-slate-200 text-center space-y-4">
                <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] leading-none">더 강력한 보안을 원하시나요?</p>
                <div className="flex justify-center gap-4">
                    <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors underline underline-offset-4">2단계 인증 설정</button>
                    <button className="text-xs font-bold text-slate-400 hover:text-slate-900 transition-colors underline underline-offset-4">회원 탈퇴</button>
                </div>
            </div>
        </motion.div>
    );
};
