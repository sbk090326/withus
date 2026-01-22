'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Compass, HeartHandshake, Fingerprint } from 'lucide-react';
import { colors, spacing, theme } from '@/app/components/design-system/constants';

const TrustFeature = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        className="flex flex-col items-start text-left p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 group border border-slate-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <div
            className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
            style={{
                background: `linear-gradient(135deg, ${theme.colors.primary.light}33, ${theme.colors.secondary.light}33)`,
                // Define CSS variables for the icon colors
                ['--icon-base' as any]: theme.colors.primary.DEFAULT,
                ['--icon-hover' as any]: theme.colors.secondary.DEFAULT,
            }}
        >
            <Icon
                size={28}
                className="transition-colors duration-300 text-[var(--icon-base)] group-hover:text-[var(--icon-hover)]"
                strokeWidth={1.5}
            />
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-900">
            {title}
        </h3>
        <p className="leading-relaxed text-slate-600 text-sm">
            {description}
        </p>
    </motion.div>
);

export function ServiceIdentitySection() {
    return (
        <section className={`w-full ${spacing.section.py} bg-[#FDFCFB] rounded-t-[60px] -mt-20 relative z-30`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 mb-20">
                    <motion.div
                        className="flex-1 max-w-2xl text-center mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span
                            className="inline-block py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                            style={{
                                backgroundColor: theme.colors.primary.bg,
                                color: theme.colors.primary.DEFAULT
                            }}
                        >
                            Why Withus?
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] text-slate-900 mb-6 tracking-tighter">
                            믿을 수 있는 동행, <br />
                            <span style={{ color: theme.colors.secondary.DEFAULT }}>검증된 만남</span>
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 font-medium mx-auto md:mx-0">
                            WithUs는 철저한 신원 인증과 여행 스타일 매칭으로 오직 여행의 즐거움에만 <br /> 집중할 수 있게 도와드립니다.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex-shrink-0"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        {/* Optional: Stats or additional CTA could go here */}
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <TrustFeature
                        icon={Fingerprint}
                        title="100% 신원 검증"
                        description="모바일 본인 인증과 소셜 연동을 통해 검증된 회원만 활동할 수 있습니다."
                        delay={0.1}
                    />
                    <TrustFeature
                        icon={Compass}
                        title="여행 성향 매칭"
                        description="나와 딱 맞는 여행 스타일! 예산, 일정, 여행 속도까지 고려해 매칭해드립니다."
                        delay={0.2}
                    />
                    <TrustFeature
                        icon={ShieldCheck}
                        title="안전한 커뮤니티"
                        description="'매너 온도' 시스템과 철저한 신고 관리로 서로 존중하는 문화를 만듭니다."
                        delay={0.3}
                    />
                    <TrustFeature
                        icon={HeartHandshake}
                        title="노쇼(No-Show) 방지"
                        description="책임감 있는 동행을 위해 보증금 시스템과 패널티 정책을 운영합니다."
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
}
