'use client';

import React from 'react';
import { CountUp } from '@/app/components/ui/CountUp';
import { palette } from '@/app/components/design-system/constants';

const stats = [
    { value: 15420, suffix: "+", label: "누적 동행 매칭" },
    { value: 8700, suffix: "+", label: "함께한 여행자" },
    { value: 98, suffix: "%", label: "사용자 만족도" },
];

export const StatsSection = () => {
    return (
        <section
            className="w-full border-y py-16"
            style={{
                backgroundColor: '#FFFFFF',
                borderColor: palette.slate[100]
            }}
        >
            <div className="max-w-[1400px] mx-auto px-6 md:px-12">
                <div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x"
                    style={{ borderColor: palette.slate[100] }}
                >
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center text-center p-4">
                            <span
                                className="text-4xl md:text-5xl font-extrabold mb-2"
                                style={{ color: palette.coral[400] }}
                            >
                                <CountUp end={stat.value} duration={2500} suffix={stat.suffix} />
                            </span>
                            <span
                                className="font-medium text-sm tracking-wide"
                                style={{ color: palette.slate[500] }}
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
