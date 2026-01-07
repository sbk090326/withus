'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { theme } from '@/app/components/design-system/constants';
import { ArrowLeft } from 'lucide-react';
import { useAuth } from '@/app/context/AuthContext';

export default function LoginPage() {
    const { login, setShowOnboarding } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login with empty nickname to simulate new user flow
        login({ nickname: '', avatarUrl: '' });
        // Trigger onboarding modal
        setShowOnboarding(true);
    };

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
                className="relative z-10 w-full max-w-[480px] p-8 mt-24"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 text-center">

                    {/* Back Button */}
                    <Link href="/" className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>

                    {/* Logo & Headline */}
                    <div className="mb-6 mt-2">
                        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent mb-1">
                            WITHUS
                        </h1>
                        <p className="text-slate-500 text-sm font-medium">
                            여행의 설렘, 좋은 사람들과 함께하세요.
                        </p>
                    </div>

                    {/* Email & Password Form */}
                    <form className="text-left w-full mb-6" onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">이메일</label>
                            <input
                                type="email"
                                placeholder="example@email.com"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#FF7E5F] focus:ring-4 focus:ring-[#FF7E5F]/10 outline-none transition-all"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">비밀번호</label>
                            <input
                                type="password"
                                placeholder="비밀번호를 입력해주세요"
                                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#FF7E5F] focus:ring-4 focus:ring-[#FF7E5F]/10 outline-none transition-all"
                            />
                        </div>

                        <button className="w-full py-3.5 rounded-xl bg-[#FF7E5F] text-white font-bold text-lg shadow-[0_4px_14px_0_rgba(255,126,95,0.39)] hover:shadow-[0_6px_20px_rgba(255,126,95,0.23)] hover:bg-[#FF6B47] hover:-translate-y-0.5 transition-all duration-300">
                            로그인
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs font-medium uppercase text-slate-400">
                            <span className="bg-white px-4">또는 소셜 로그인</span>
                        </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex flex-col gap-3 mb-8">
                        {/* Kakao */}
                        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#FEE500] text-[#000000] font-semibold hover:opacity-90 transition-opacity shadow-sm text-sm">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 3C5.373 3 0 7.373 0 12.768c0 3.39 2.14 6.42 5.48 8.16-.25 2.11-1.63 7.63-1.67 7.97-.04.38.3.56.63.34.33-.21 4.54-3.09 6.26-4.32.42.04.85.07 1.29.07 6.627 0 12-4.373 12-9.768C24 7.373 18.627 3 12 3z" />
                            </svg>
                            카카오로 시작하기
                        </button>

                        {/* Naver */}
                        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-[#03C75A] text-white font-semibold hover:opacity-90 transition-opacity shadow-sm text-sm">
                            <span className="font-black text-base">N</span> 네이버로 시작하기
                        </button>

                        {/* Google */}
                        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-sm text-sm">
                            <svg width="18" height="18" viewBox="0 0 24 24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                            </svg>
                            구글로 시작하기
                        </button>
                    </div>

                    {/* Footer Links */}
                    <div className="text-sm text-slate-500">
                        <Link href="/signup" className="hover:text-slate-800 hover:underline transition-colors">
                            회원가입
                        </Link>
                        <span className="mx-3 text-slate-300">|</span>
                        <Link href="/forgot-password" className="hover:text-slate-800 hover:underline transition-colors">
                            비밀번호 찾기
                        </Link>
                    </div>

                </div>
            </motion.div>
        </main>
    );
}
