'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface CompletionStepProps {
    nickname: string;
    onComplete: () => void;
}

export function CompletionStep({ nickname, onComplete }: CompletionStepProps) {
    return (
        <motion.div
            key="step6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex flex-col h-full items-center justify-center text-center py-4"
        >
            <motion.div
                initial={{ rotate: -10, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 text-[#FF7E5F]"
            >
                <CheckCircle2 size={40} fill="currentColor" />
            </motion.div>

            <h2 className="text-2xl font-bold text-slate-900 mb-4 leading-normal">
                반가워요, <span className="text-[#FF7E5F]">{nickname}</span>님!<br />
                이제 WithUs의 일원이 되었어요.
            </h2>

            <p className="text-slate-500 mb-10 leading-relaxed">
                설정해주신 성향을 바탕으로<br />
                딱 맞는 여행자들을 찾아두었어요.<br />
                지금 바로 확인해볼까요?
            </p>

            <button
                onClick={onComplete}
                className="w-full py-4 rounded-2xl bg-[#FF7E5F] text-white font-bold text-lg shadow-[0_8px_20px_rgba(255,126,95,0.3)] hover:shadow-[0_12px_24px_rgba(255,126,95,0.4)] hover:bg-[#FF6B47] hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 mb-4"
            >
                동행 만나러 가기
                <ArrowRight size={20} />
            </button>

            <button
                onClick={onComplete}
                className="text-slate-400 text-sm font-medium hover:text-slate-600 transition-colors"
            >
                홈으로 가기
            </button>
        </motion.div>
    );
}
