'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { theme } from '@/app/components/design-system/constants';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
    const [isSent, setIsSent] = useState(false);
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call
        if (email) {
            setIsSent(true);
        }
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
                className="relative z-10 w-full max-w-[480px] p-8 mt-12"
            >
                <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl border border-white/50 p-8 text-center">

                    {/* Back Button */}
                    <Link href="/login" className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 transition-colors">
                        <ArrowLeft size={24} />
                    </Link>

                    {!isSent ? (
                        <>
                            {/* Logo & Headline */}
                            <div className="mb-8 mt-4">
                                <h1 className="text-2xl font-bold text-slate-900 mb-2">
                                    비밀번호를 잊으셨나요? 🔒
                                </h1>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed">
                                    가입하신 이메일 주소를 입력해주시면 <br />
                                    비밀번호 재설정 링크를 보내드립니다.
                                </p>
                            </div>

                            <form className="text-left w-full mb-6" onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">이메일</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="example@email.com"
                                            required
                                            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-[#FF7E5F] focus:ring-4 focus:ring-[#FF7E5F]/10 outline-none transition-all"
                                        />
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                    </div>
                                </div>

                                <button className="w-full py-3.5 rounded-xl bg-[#FF7E5F] text-white font-bold text-lg shadow-[0_4px_14px_0_rgba(255,126,95,0.39)] hover:shadow-[0_6px_20px_rgba(255,126,95,0.23)] hover:bg-[#FF6B47] hover:-translate-y-0.5 transition-all duration-300">
                                    재설정 링크 받기
                                </button>
                            </form>
                        </>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="py-8"
                        >
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500">
                                <CheckCircle size={32} />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">메일을 발송했습니다!</h2>
                            <p className="text-slate-500 text-sm mb-8 leading-relaxed">
                                <span className="font-semibold text-slate-700">{email}</span>으로<br />
                                비밀번호 재설정 안내 메일을 보내드렸습니다.<br />
                                메일함을 확인해주세요.
                            </p>
                            <Link href="/login">
                                <button className="w-full py-3.5 rounded-xl bg-slate-900 text-white font-bold text-lg hover:bg-slate-800 transition-all">
                                    로그인으로 돌아가기
                                </button>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </motion.div>
        </main>
    );
}
