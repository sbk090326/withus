'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Sparkles, HeartHandshake, Fingerprint } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

const TrustFeature = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        className="flex flex-col items-start text-left p-8 rounded-2xl bg-white hover:shadow-lg transition-all duration-300 group border border-slate-100"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#FF7E5F]/10 to-[#38BDF8]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Icon size={28} className="text-[#FF7E5F] group-hover:text-[#38BDF8] transition-colors" strokeWidth={1.5} />
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
                <div className="flex flex-col lg:flex-row items-end justify-between gap-12 mb-20">
                    <motion.div
                        className="flex-1 max-w-2xl"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block py-1 px-3 rounded-full bg-[#FF7E5F]/10 text-[#FF7E5F] text-xs font-bold uppercase tracking-wider mb-4">
                            Why Withus?
                        </span>
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                            믿을 수 있는 동행, <br />
                            <span className="text-[#38BDF8]">검증된 만남.</span>
                        </h2>
                        <p className="text-lg text-slate-600 leading-relaxed">
                            여행 친구 찾기, 이제 스트레스 받지 마세요. <br className="hidden md:block" />
                            위드어스는 철저한 신원 인증과 여행 스타일 매칭으로 오직 여행의 즐거움에만 집중할 수 있게 도와드립니다.
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
                        icon={Sparkles}
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
