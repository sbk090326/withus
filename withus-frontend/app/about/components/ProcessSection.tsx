'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Smile, Search, ShieldCheck } from 'lucide-react';
import { palette } from '@/app/components/design-system/constants';

const steps = [
    {
        icon: <Smile size={32} />,
        title: "여행 스타일 등록",
        description: "MBTI, 식성, 여행 스타일 등 나만의 여행 취향을 간단하게 등록하세요."
    },
    {
        icon: <Search size={32} />,
        title: "동행 찾기 & 대화",
        description: "나와 핏이 맞는 여행자를 찾아 대화를 나누고 일정을 조율해보세요."
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "안전 여행",
        description: "인증된 사용자와의 만남, 위드어스의 안전 가이드와 함께 즐거운 여행을 떠나세요."
    }
];

export const ProcessSection = () => {
    return (
        <section
            className="w-full py-24 px-6 relative"
            style={{ backgroundColor: palette.cream.section }}
        >
            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="text-center mb-16">
                    <span
                        className="font-bold tracking-wider text-sm uppercase mb-3 block"
                        style={{ color: palette.coral[400] }}
                    >
                        How it Works
                    </span>
                    <h2
                        className="text-3xl md:text-4xl font-bold"
                        style={{ color: palette.slate[900] }}
                    >
                        위드어스 이용 가이드
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) - simplified */}
                    <div
                        className="hidden md:block absolute top-[40px] left-[15%] right-[15%] h-[2px] z-0"
                        style={{ backgroundColor: palette.slate[100] }}
                    ></div>

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="relative z-10 flex flex-col items-center text-center group"
                        >
                            <div className="relative mb-6 group">
                                <div
                                    className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: '#FFFFFF',
                                        border: `1px solid ${palette.slate[200]}`
                                    }}
                                >
                                    <div style={{ color: palette.coral[400] }}>
                                        {step.icon}
                                    </div>
                                </div>
                                <div
                                    className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs text-white shadow-md z-20 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                                    style={{ backgroundColor: palette.teal[400] }}
                                >
                                    {index + 1}
                                </div>
                            </div>
                            <h3
                                className="text-lg font-bold mb-3"
                                style={{ color: palette.slate[900] }}
                            >
                                {step.title}
                            </h3>
                            <p
                                className="leading-relaxed text-sm max-w-[240px]"
                                style={{ color: palette.slate[500] }}
                            >
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
