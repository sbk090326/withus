'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { theme } from '@/app/components/design-system/constants';
import { ArrowLeft, User, Mail, Lock, Check, ChevronRight } from 'lucide-react';

export default function SignUpPage() {
    const [allAgreed, setAllAgreed] = useState(false);
    const [agreements, setAgreements] = useState({
        age: false,
        service: false,
        privacy: false,
        marketing: false,
        promotion: false,
    });

    const handleAllCheck = (checked: boolean) => {
        setAllAgreed(checked);
        setAgreements({
            age: checked,
            service: checked,
            privacy: checked,
            marketing: checked,
            promotion: checked,
        });
    };

    const handleSingleCheck = (key: keyof typeof agreements) => {
        setAgreements(prev => {
            const newAgreements = { ...prev, [key]: !prev[key] };
            const allChecked = Object.values(newAgreements).every(val => val);
            setAllAgreed(allChecked);
            return newAgreements;
        });
    };

    // Sync allAgreed state when individual items change manually (handled in handleSingleCheck generally, but good for safety)
    useEffect(() => {
        const allChecked = Object.values(agreements).every(val => val);
        if (allAgreed !== allChecked) {
            setAllAgreed(allChecked);
        }
    }, [agreements, allAgreed]);

    return (
        <main className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-[#FDFCFB]">
            {/* Background Decorations */}
            <div
                className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-40 pointer-events-none"
                style={{ backgroundColor: theme.colors.primary.light }}
            />
            <div
                className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[100px] opacity-40 pointer-events-none"
                style={{ backgroundColor: theme.colors.secondary.light }}
            />

            {/* Content Container */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-[480px] p-8 mt-12"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 text-center">

                    {/* Back Button */}
                    <Link href="/login" className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>

                    {/* Logo & Headline */}
                    <div className="mb-5 mt-2">
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-1">
                            WITHUS
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            새로운 여행의 시작을 함께해요!
                        </p>
                    </div>

                    {/* Sign Up Form */}
                    <form className="text-left w-full mb-6" onSubmit={(e) => e.preventDefault()}>


                        {/* Email */}
                        <div className="mb-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">이메일</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="example@email.com"
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#FF7E5F] focus:ring-4 focus:ring-[#FF7E5F]/10 outline-none transition-all text-sm"
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-2">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">비밀번호</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="8자 이상 입력해주세요"
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#FF7E5F] focus:ring-4 focus:ring-[#FF7E5F]/10 outline-none transition-all text-sm"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            </div>
                        </div>

                        {/* Password Confirm */}
                        <div className="mb-5">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">비밀번호 확인</label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="비밀번호를 한번 더 입력해주세요"
                                    className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#FF7E5F] focus:ring-4 focus:ring-[#FF7E5F]/10 outline-none transition-all text-sm"
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="mb-6 bg-slate-50 rounded-xl p-4 border border-slate-100">
                            {/* Agree All */}
                            <div className="flex items-start gap-3 mb-3 pb-3 border-b border-slate-200/60 cursor-pointer" onClick={() => handleAllCheck(!allAgreed)}>
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${allAgreed ? 'bg-[#FF7E5F] border-[#FF7E5F]' : 'bg-white border-slate-300'}`}>
                                    {allAgreed && <Check size={14} className="text-white" strokeWidth={3} />}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-slate-900 font-bold leading-none mb-0.5 text-sm">모두 동의합니다</p>
                                    <p className="text-[11px] text-slate-500">선택 동의 항목 포함</p>
                                </div>
                            </div>

                            {/* Terms List */}
                            <div className="flex flex-col gap-2">
                                {/* Item 1 */}
                                <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleSingleCheck('age')}>
                                    <Check size={16} className={`transition-colors ${agreements.age ? 'text-[#FF7E5F]' : 'text-slate-300'}`} />
                                    <span className={`text-xs flex-1 text-left ${agreements.age ? 'text-slate-800' : 'text-slate-500'}`}>
                                        <span className="text-[#FF7E5F] mr-1">[필수]</span> 만 14세 이상입니다
                                    </span>
                                </div>

                                {/* Item 2 */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => handleSingleCheck('service')}>
                                        <Check size={16} className={`transition-colors ${agreements.service ? 'text-[#FF7E5F]' : 'text-slate-300'}`} />
                                        <span className={`text-xs text-left ${agreements.service ? 'text-slate-800' : 'text-slate-500'}`}>
                                            <span className="text-[#FF7E5F] mr-1">[필수]</span> 이용약관 동의
                                        </span>
                                    </div>
                                    <button type="button" className="text-[10px] text-slate-400 underline hover:text-slate-600">내용 보기</button>
                                </div>

                                {/* Item 3 */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => handleSingleCheck('privacy')}>
                                        <Check size={16} className={`transition-colors ${agreements.privacy ? 'text-[#FF7E5F]' : 'text-slate-300'}`} />
                                        <span className={`text-xs text-left ${agreements.privacy ? 'text-slate-800' : 'text-slate-500'}`}>
                                            <span className="text-[#FF7E5F] mr-1">[필수]</span> 개인정보 수집 및 이용 동의
                                        </span>
                                    </div>
                                    <button type="button" className="text-[10px] text-slate-400 underline hover:text-slate-600">내용 보기</button>
                                </div>

                                {/* Item 4 */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => handleSingleCheck('marketing')}>
                                        <Check size={16} className={`transition-colors ${agreements.marketing ? 'text-[#FF7E5F]' : 'text-slate-300'}`} />
                                        <span className={`text-xs text-left ${agreements.marketing ? 'text-slate-800' : 'text-slate-500'}`}>
                                            <span className="text-slate-400 mr-1">[선택]</span> 개인정보 수집 및 이용 동의
                                        </span>
                                    </div>
                                    <button type="button" className="text-[10px] text-slate-400 underline hover:text-slate-600">내용 보기</button>
                                </div>

                                {/* Item 5 */}
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-2 flex-1 cursor-pointer" onClick={() => handleSingleCheck('promotion')}>
                                        <Check size={16} className={`transition-colors ${agreements.promotion ? 'text-[#FF7E5F]' : 'text-slate-300'}`} />
                                        <span className={`text-xs text-left ${agreements.promotion ? 'text-slate-800' : 'text-slate-500'}`}>
                                            <span className="text-slate-400 mr-1">[선택]</span> 광고성 정보 수신 모두 동의
                                        </span>
                                    </div>
                                    <button type="button" className="text-[10px] text-slate-400 underline hover:text-slate-600">펼치기</button>
                                </div>
                            </div>
                        </div>

                        <button className="w-full py-3.5 rounded-xl bg-[#FF7E5F] text-white font-bold text-lg shadow-[0_4px_14px_0_rgba(255,126,95,0.39)] hover:shadow-[0_6px_20px_rgba(255,126,95,0.23)] hover:bg-[#FF6B47] hover:-translate-y-0.5 transition-all duration-300">
                            회원가입 완료
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="text-sm text-slate-500">
                        이미 계정이 있으신가요?
                        <Link href="/login" className="ml-2 font-bold text-[#FF7E5F] hover:underline transition-colors">
                            로그인하기
                        </Link>
                    </div>

                </div>
            </motion.div>
        </main>
    );
}
