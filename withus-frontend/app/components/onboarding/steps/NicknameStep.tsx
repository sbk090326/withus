'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface NicknameStepProps {
    nickname: string;
    setNickname: (name: string) => void;
    mbti: string;
    setMbti: (mbti: string) => void;
}

const MBTI_LIST = [
    'ENFP', 'ENFJ', 'ENTP', 'ENTJ',
    'ESFP', 'ESFJ', 'ESTP', 'ESTJ',
    'INFP', 'INFJ', 'INTP', 'INTJ',
    'ISFP', 'ISFJ', 'ISTP', 'ISTJ'
];

export function NicknameStep({ nickname, setNickname, mbti, setMbti }: NicknameStepProps) {
    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
        >
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                반가워요! 먼저 여행에서 사용할 <span className="text-[#FF7E5F] font-bold">닉네임</span>과 <span className="text-[#FF7E5F] font-bold">MBTI</span>를 알려주세요.
            </div>

            <div className="space-y-6 self-end w-full max-w-[90%]">
                <div className="relative">
                    <input
                        type="text"
                        value={nickname}
                        onChange={(e) => setNickname(e.target.value)}
                        placeholder="닉네임 입력..."
                        autoFocus
                        className="w-full text-right text-xl font-medium border-2 border-[#FF7E5F] rounded-2xl pl-4 pr-12 py-3 focus:outline-none bg-white text-slate-900 placeholder:text-slate-300"
                    />
                    {nickname && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-[#FF7E5F]"
                        >
                            <Check size={20} />
                        </motion.div>
                    )}
                </div>

                <div className="grid grid-cols-4 gap-2 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                    {MBTI_LIST.map((m) => (
                        <button
                            key={m}
                            onClick={() => setMbti(m)}
                            className={`py-2 rounded-xl text-xs font-bold transition-all ${mbti === m
                                    ? 'bg-[#FF7E5F] text-white shadow-md shadow-orange-200 scale-105'
                                    : 'bg-slate-50 text-slate-400 hover:bg-slate-100'
                                }`}
                        >
                            {m}
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
