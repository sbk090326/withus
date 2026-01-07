'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Check } from 'lucide-react';

interface NicknameStepProps {
    nickname: string;
    setNickname: (name: string) => void;
}

export function NicknameStep({ nickname, setNickname }: NicknameStepProps) {
    return (
        <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
        >
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                먼저, 여행에서 사용할 <span className="text-[#FF7E5F] font-bold">닉네임</span>을 알려주세요.<br />
                <span className="text-sm text-slate-500 mt-2 block">나중에 언제든 바꿀 수 있어요.</span>
            </div>

            <div className="relative self-end max-w-[80%] w-full">
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
        </motion.div>
    );
}
