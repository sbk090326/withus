'use client';

import React from 'react';
import { motion } from 'motion/react';
import { UserCircle, MessagesSquare, TreePalm } from 'lucide-react';
import { palette, theme, animations } from '@/app/components/design-system/constants';

const steps = [
    {
        num: "01",
        title: "나만의 색깔 등록하기",
        description: "당신이 좋아하는 여행 스타일과 MBTI를 살짝 알려주세요. 딱 맞는 인연을 찾는 시작점이 됩니다.",
        tag: "Taste",
        icon: UserCircle,
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        num: "02",
        title: "가벼운 인사 건네기",
        description: "나와 결이 맞는 메이트를 찾으셨나요? 1:1 채팅으로 가볍게 인사를 나누며 일정을 맞춰보세요.",
        tag: "Chat",
        icon: MessagesSquare,
        color: "text-teal-600",
        bg: "bg-teal-50"
    },
    {
        num: "03",
        title: "함께 떠나는 설렘",
        description: "이제 준비는 끝났어요! 새로운 친구와 함께 낯선 곳에서의 특별한 하루를 만들어보세요.",
        tag: "Journey",
        icon: TreePalm,
        color: "text-pink-500",
        bg: "bg-pink-50"
    }
];

export const ProcessSection = () => {
    return (
        <section className="w-full py-32 px-6 overflow-hidden relative" style={{ backgroundColor: palette.cream.section }}>
            {/* Subtle floating elements to break monotony */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-orange-100/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-100/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="text-center mb-24 space-y-4">
                    <span className="text-sm font-bold text-orange-400">Easy Step-by-Step</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        위드어스와 함께하는 <br /> <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>기분 좋은 세 단계</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.8 }}
                                className="p-10 bg-white shadow-sm rounded-[40px] hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 group border border-transparent hover:border-orange-100"
                            >
                                <div className="flex flex-col h-full space-y-8">
                                    <div className={`w-16 h-16 rounded-2xl ${step.bg} flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                                        <Icon className={step.color} size={30} strokeWidth={2} />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-2xl font-black text-slate-900 leading-tight">
                                            {step.title}
                                        </h3>
                                        <p className="text-slate-500 leading-relaxed font-medium">
                                            {step.description}
                                        </p>
                                    </div>
                                    <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                                        <span className={`text-[10px] font-black tracking-widest uppercase ${step.color}`}>{step.tag}</span>
                                        <span className="text-xs font-black text-slate-200 group-hover:text-slate-900 transition-colors">STEP {step.num}</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
