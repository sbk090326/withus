'use client';

import React from 'react';
import { motion } from 'motion/react';

type PlanStyle = 'planned' | 'impromptu' | null;
type PaceStyle = 'fast' | 'balanced' | 'relaxed' | null;

interface TravelStyleStepProps {
    planStyle: PlanStyle;
    setPlanStyle: (style: PlanStyle) => void;
    paceStyle: PaceStyle;
    setPaceStyle: (style: PaceStyle) => void;
}

export function TravelStyleStep({ planStyle, setPlanStyle, paceStyle, setPaceStyle }: TravelStyleStepProps) {
    return (
        <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8 h-full overflow-y-auto"
        >
            {/* Question 1: Planning */}
            <div className="flex flex-col gap-4">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                    <span className="text-[#FF7E5F] font-bold">01.</span> 여행 일정을 짤 때 당신의 모습은 어떤가요?
                </div>
                <div className="flex flex-col gap-2 self-end items-end">
                    <button
                        onClick={() => setPlanStyle(planStyle === 'planned' ? null : 'planned')}
                        className={`p-4 rounded-2xl text-sm font-medium transition-all text-right border-2 ${planStyle === 'planned'
                            ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className="font-bold mr-1">[철저한 계획파]</span> 분 단위로 일정을 짜요
                    </button>
                    <button
                        onClick={() => setPlanStyle(planStyle === 'impromptu' ? null : 'impromptu')}
                        className={`p-4 rounded-2xl text-sm font-medium transition-all text-right border-2 ${planStyle === 'impromptu'
                            ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className="font-bold mr-1">[유연한 즉흥파]</span> 상황에 맞춰 움직여요
                    </button>
                </div>
            </div>

            {/* Question 2: Pace */}
            <div className="flex flex-col gap-4">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                    <span className="text-[#FF7E5F] font-bold">02.</span> 나의 여행 스타일은?
                </div>
                <div className="grid grid-cols-3 gap-2 self-end max-w-[90%]">
                    {[
                        { id: 'fast', label: '[강행군]', sub: '부지런히!' },
                        { id: 'balanced', label: '[밸런스]', sub: '적당히!' },
                        { id: 'relaxed', label: '[느긋함]', sub: '여유롭게!' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setPaceStyle(paceStyle === item.id ? null : item.id as PaceStyle)}
                            className={`p-3 rounded-2xl text-sm flex flex-col items-center justify-center gap-1 transition-all border-2 h-auto py-4 ${paceStyle === item.id
                                ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                                : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <span className="font-bold text-xs">{item.label}</span>
                            <span className="text-xs opacity-80">{item.sub}</span>
                        </button>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
