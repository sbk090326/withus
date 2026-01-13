'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useModal } from '@/app/context/ModalContext';
import { Send, User, Mail, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const { openModal } = useModal();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);
        openModal({
            title: '문의 접수 완료',
            message: '소중한 의견 감사합니다.\n빠른 시일 내에 답변 드리겠습니다.',
            type: 'success'
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
    };

    return (
        <div className="min-h-screen bg-[#FDFCFB] pt-32 pb-24 px-6 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-200/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-200/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

            <div className="max-w-[1000px] mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    {/* Left: Info */}
                    <div className="space-y-8">
                        <div>
                            <span className="text-[#FF7E5F] font-bold tracking-wider text-sm uppercase mb-2 block">
                                Contact Us
                            </span>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
                                궁금한 점이 <br /> 있으신가요?
                            </h1>
                            <p className="text-lg text-slate-500 leading-relaxed">
                                위드어스 팀은 여러분의 목소리에 항상 귀 기울이고 있습니다. 서비스 이용 문의, 제휴 제안, 혹은 단순한 응원까지 언제든 환영합니다.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[32px] shadow-sm border border-slate-100 space-y-6">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
                                    <Mail size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Email</h3>
                                    <p className="text-slate-500">support@withus.com</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
                                    <MessageSquare size={20} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-900">Live Chat</h3>
                                    <p className="text-slate-500">평일 10:00 - 18:00 (주말/공휴일 휴무)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-[40px] shadow-xl shadow-slate-200/50 p-8 md:p-10 border border-slate-100"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">이름</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF7E5F] transition-all"
                                        placeholder="홍길동"
                                        value={formData.name}
                                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">이메일</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                    <input
                                        type="email"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF7E5F] transition-all"
                                        placeholder="hello@example.com"
                                        value={formData.email}
                                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 ml-1">메시지</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-[#FF7E5F] transition-all resize-none"
                                    placeholder="무엇을 도와드릴까요?"
                                    value={formData.message}
                                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 rounded-2xl bg-[#FF7E5F] hover:bg-[#F9603D] text-white font-bold text-lg shadow-lg shadow-orange-200 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                            >
                                {isLoading ? (
                                    <span className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        보내기
                                        <Send size={20} />
                                    </>
                                )}
                            </button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
