'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Smile, Handshake } from 'lucide-react';
import { palette, theme, animations } from '@/app/components/design-system/constants';

const values = [
    {
        icon: Heart,
        title: "진정한 마음의 연결",
        description: "단순히 일정을 맞추는게 다가 아니에요. 서로의 취향과 마음이 통하는 진짜 '인연'을 맺을 수 있도록 돕습니다.",
        color: "text-pink-500",
        bg: "bg-pink-50"
    },
    {
        icon: Smile,
        title: "웃음이 끊이지 않는 여행",
        description: "낯선 곳에서도 미소가 가득하도록. 위드어스는 안전하고 즐거운 동행 문화를 만들어가고 있습니다.",
        color: "text-orange-500",
        bg: "bg-orange-50"
    },
    {
        icon: Handshake,
        title: "믿고 의지하는 친구",
        description: "여행 중 겪을 수 있는 어려움을 함께 나누고 서로에게 든든한 버팀목이 되어주는 소중한 친구가 되어보세요.",
        color: "text-teal-600",
        bg: "bg-teal-50"
    }
];

export const ValuesSection = () => {
    return (
        <section className="w-full py-32 px-6 bg-white relative overflow-hidden">
            {/* Subtle Radial Gradient for premium look */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-teal-50/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3 pointer-events-none" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <div className="space-y-8 text-center lg:text-left">
                        <span className="text-sm font-bold text-orange-400">Our Heart</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                            위드어스가 꿈꾸는 <br />
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>따뜻한 동행의 가치</span>
                        </h2>
                        <p className="text-slate-500 text-lg leading-relaxed max-w-sm mx-auto lg:mx-0">
                            우리는 기술보다 사람을, <br /> 숫자보다 웃음을 더 중요하게 생각합니다.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {values.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className="p-8 bg-slate-50/50 rounded-3xl flex items-center gap-8 group hover:bg-white hover:shadow-xl transition-all duration-500"
                                >
                                    <div className={`flex-shrink-0 w-16 h-16 rounded-2xl ${item.bg} flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-12`}>
                                        <Icon className={item.color} size={28} strokeWidth={2.5} />
                                    </div>
                                    <div className="space-y-1">
                                        <h3 className="text-xl font-black text-slate-900">{item.title}</h3>
                                        <p className="text-slate-500 leading-relaxed font-medium">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
