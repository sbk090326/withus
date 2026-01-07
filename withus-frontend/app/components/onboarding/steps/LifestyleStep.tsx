'use client';

import React from 'react';
import { motion } from 'motion/react';

type LifestyleType = 'morning' | 'night' | null;

interface LifestyleStepProps {
    lifestyleStyle: LifestyleType;
    setLifestyleStyle: (style: LifestyleType) => void;
}

export function LifestyleStep({ lifestyleStyle, setLifestyleStyle }: LifestyleStepProps) {
    return (
        <motion.div
            key="step5"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
        >
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                <span className="text-[#FF7E5F] font-bold">05.</span> 나는 어떤 타입인가요?<br />
                <span className="text-sm text-slate-500 mt-2 block">선택하지 않고 건너뛰셔도 돼요.</span>
            </div>

            <div className="flex flex-col gap-2 self-end items-end">
                <button
                    onClick={() => setLifestyleStyle(lifestyleStyle === 'morning' ? null : 'morning')}
                    className={`p-4 rounded-2xl text-sm font-medium transition-all text-right border-2 ${lifestyleStyle === 'morning'
                        ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                        : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <span className="font-bold mr-1">[얼리버드]</span> 일찍 일어나요 ☀️
                </button>
                <button
                    onClick={() => setLifestyleStyle(lifestyleStyle === 'night' ? null : 'night')}
                    className={`p-4 rounded-2xl text-sm font-medium transition-all text-right border-2 ${lifestyleStyle === 'night'
                        ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                        : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                        }`}
                >
                    <span className="font-bold mr-1">[나이트아울]</span> 밤 늦게까지 놀아요 🌙
                </button>
            </div>
        </motion.div>
    );
}
