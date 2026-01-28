'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Share2, Link as LinkIcon, Unlink, CheckCircle2, AlertCircle } from 'lucide-react';

interface ExternalAccountsProps {
    onBack: () => void;
}

export const ExternalAccounts = ({ onBack }: ExternalAccountsProps) => {
    const [accounts, setAccounts] = useState([
        { id: 'google', name: 'Google', email: 'user@gmail.com', connected: true, icon: '🌐' },
        { id: 'kakao', name: 'Kakao', email: 'user@kakao.com', connected: true, icon: '💬' },
        { id: 'apple', name: 'Apple', email: '', connected: false, icon: '🍎' },
    ]);

    const toggleConnection = (id: string, isConnected: boolean) => {
        if (isConnected) {
            if (confirm('계정 연동을 해제하시겠습니까? 해제 시 해당 계정으로 간편 로그인을 이용하실 수 없습니다.')) {
                setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, connected: false, email: '' } : acc));
            }
        } else {
            alert(`${id} 계정 연동을 진행합니다. (새 창으로 이동)`);
            setAccounts(prev => prev.map(acc => acc.id === id ? { ...acc, connected: true, email: 'new_connected@account.com' } : acc));
        }
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
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">연동된 서비스 관리</h3>
                    <p className="text-xs text-slate-400 font-bold">SNS 계정을 연동하여 더 간편하고 안전하게 로그인하세요.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {accounts.map((acc) => (
                    <div
                        key={acc.id}
                        className={`bg-white rounded-[40px] p-8 border hover:shadow-xl transition-all flex flex-col md:flex-row items-center justify-between gap-8 
                            ${acc.connected ? 'border-slate-100' : 'border-slate-100 bg-slate-50/50'}`}
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 rounded-[24px] bg-slate-50 flex items-center justify-center text-3xl shadow-inner border border-white">
                                {acc.icon}
                            </div>
                            <div className="space-y-1 text-center md:text-left">
                                <p className="text-lg font-black text-slate-900">{acc.name} 계정</p>
                                {acc.connected ? (
                                    <div className="flex items-center gap-2 text-teal-500">
                                        <CheckCircle2 size={14} />
                                        <span className="text-xs font-bold leading-none">{acc.email || '인증 완료'}</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <AlertCircle size={14} />
                                        <span className="text-xs font-bold leading-none">연동되지 않음</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={() => toggleConnection(acc.id, acc.connected)}
                            className={`px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all
                                ${acc.connected
                                    ? 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                    : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg'}`}
                        >
                            {acc.connected ? '연동 해제' : '연동하기'}
                        </button>
                    </div>
                ))}
            </div>

            <div className="bg-blue-50/50 rounded-[40px] p-10 border border-blue-100/50 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-500 shrink-0">
                    <LinkIcon size={20} />
                </div>
                <div className="space-y-1">
                    <p className="text-xs font-black text-blue-900">왜 연동해야 하나요?</p>
                    <p className="text-[10px] text-blue-700/70 font-bold leading-relaxed">
                        계정을 연동하면 비밀번호를 외울 필요 없이 안전하게 로그인할 수 있습니다.
                        또한 연동된 이메일을 통해 동행 매칭 정보 등 중요한 알림을 더 확실하게 받아보실 수 있습니다.
                    </p>
                </div>
            </div>
        </motion.div>
    );
};
