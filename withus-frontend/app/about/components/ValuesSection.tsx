'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Heart, Users } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

const values = [
    {
        icon: ShieldCheck,
        title: "안전한 동행",
        description: "철저한 본인 인증과 신뢰도 시스템을 통해, 믿을 수 있는 여행 메이트만을 매칭합니다. 안전이 최우선입니다."
    },
    {
        icon: Heart,
        title: "취향 중심 매칭",
        description: "단순한 목적지 매칭을 넘어, 여행 스타일, 식성, 예산 등 세심한 취향 분석을 통해 '잘 맞는' 사람을 찾아드립니다."
    },
    {
        icon: Users,
        title: "따뜻한 커뮤니티",
        description: "여행 정보 공유부터 실시간 번개 모임까지. 여행을 사랑하는 사람들의 따뜻하고 활발한 소통 공간을 지향합니다."
    }
];

export const ValuesSection = () => {
    return (
        <section
            className="w-full py-24 px-6 bg-[#FDFCFB]"
        >
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16">
                    <h2
                        className="text-3xl font-bold text-slate-900"
                    >
                        우리가 중요하게 생각하는 가치
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((item, index) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="p-8 rounded-[32px] bg-white hover:shadow-lg transition-all duration-300 border border-slate-100 group"
                            >
                                <div
                                    className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                                    style={{
                                        background: `linear-gradient(135deg, ${palette.coral[100]}33, ${palette.teal[100]}33)`,
                                        ['--icon-base' as any]: palette.coral[400],
                                        ['--icon-hover' as any]: palette.teal[400],
                                    }}
                                >
                                    <Icon
                                        size={28}
                                        className="transition-colors duration-300 text-[var(--icon-base)] group-hover:text-[var(--icon-hover)]"
                                        strokeWidth={1.5}
                                    />
                                </div>
                                <h3
                                    className="text-xl font-bold mb-3 text-slate-900"
                                >
                                    {item.title}
                                </h3>
                                <p
                                    className="leading-relaxed text-slate-600"
                                >
                                    {item.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
