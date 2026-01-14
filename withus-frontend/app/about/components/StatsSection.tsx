'use client';

import React from 'react';
import { CountUp } from '@/app/components/ui/CountUp';
import { palette, theme } from '@/app/components/design-system/constants';

const stats = [
    { value: 15420, suffix: "+", label: "서로를 발견한 횟수", icon: "🤝" },
    { value: 8700, suffix: "+", label: "함께 웃은 여행자", icon: "😊" },
    { value: 98, suffix: "%", label: "다시 만나고 싶은 마음", icon: "🧡" },
];

export const StatsSection = () => {
    return (
        <section className="w-full py-24 px-6 bg-white border-y border-slate-50 relative overflow-hidden">
            {/* Subtle Background Accent */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,126,95,0.03)_0%,transparent_70%)] pointer-events-none" />

            <div className="max-w-[1200px] mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center px-4 md:px-12 py-8 group">
                            <span className="text-3xl mb-4 group-hover:scale-125 transition-transform duration-500">
                                {stat.icon}
                            </span>
                            <span
                                className="text-4xl md:text-6xl font-black mb-2 tracking-tight text-slate-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-orange-500 group-hover:to-pink-500 transition-all duration-500"
                            >
                                <CountUp end={stat.value} duration={2500} suffix={stat.suffix} />
                            </span>
                            <span
                                className="font-bold text-xs tracking-tight text-slate-400"
                            >
                                {stat.label}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
