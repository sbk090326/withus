'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, UserCheck, HeartHandshake, Lock } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

const TrustFeature = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        className="flex flex-col items-center text-center p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
    >
        <div className="w-20 h-20 rounded-full bg-[#1A3C5A] flex items-center justify-center mb-6 shadow-xl shadow-[#1A3C5A]/10">
            <Icon size={36} color="#FFFFFF" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold mb-3" style={{ color: colors.primary.navy }}>
            {title}
        </h3>
        <p className="leading-relaxed max-w-xs" style={{ color: colors.primary.navy, opacity: 0.7 }}>
            {description}
        </p>
    </motion.div>
);

export function ServiceIdentitySection() {
    return (
        <section className={`w-full ${spacing.section.py} bg-white rounded-t-[60px] -mt-10 relative z-10`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>
                <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20">
                    <motion.div
                        className="flex-1"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.primary.navy }}>
                            Is this reliable? <br />
                            <span className="text-[#FF8A73]">Absolutely.</span>
                        </h2>
                        <p className="text-lg" style={{ color: colors.primary.navy, opacity: 0.7 }}>
                            We prioritize your safety and satisfaction above all else.
                            Here is how we ensure a secure and enjoyable experience.
                        </p>
                    </motion.div>

                    <motion.div
                        className="flex-shrink-0"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <button className="px-8 py-3 rounded-full border border-[#1A3C5A] text-[#1A3C5A] font-medium hover:bg-[#1A3C5A] hover:text-white transition-colors">
                            Learn more about our safety standards
                        </button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <TrustFeature
                        icon={ShieldCheck}
                        title="Identity Verified"
                        description="All companions go through a rigorous multi-step identity verification process."
                        delay={0.1}
                    />
                    <TrustFeature
                        icon={Lock}
                        title="Secure Payments"
                        description="Your funds are held safely until the trip is confirmed and completed."
                        delay={0.2}
                    />
                    <TrustFeature
                        icon={UserCheck}
                        title="Vetted Community"
                        description="We enforce strict community guidelines to maintain a respectful environment."
                        delay={0.3}
                    />
                    <TrustFeature
                        icon={HeartHandshake}
                        title="24/7 Support"
                        description="Our dedicated support team is always available to help you anywhere."
                        delay={0.4}
                    />
                </div>
            </div>
        </section>
    );
}
