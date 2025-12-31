'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Coffee, Laptop, Mountain, Utensils, Camera, Tent, Music, BookOpen } from 'lucide-react';
import { colors, typography, spacing, borderRadius, shadows, animations } from '@/app/components/design-system/constants';

const CurationCard = ({ icon: Icon, title, description, delay }: { icon: any, title: string, description: string, delay: number }) => (
    <motion.div
        className="flex flex-col items-start p-8 bg-white/50 backdrop-blur-md border border-white/60 hover:border-[#FF8A73]/50 transition-colors group cursor-pointer"
        style={{
            borderRadius: '24px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
        }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -5, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
    >
        <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-300">
            <Icon size={28} color={colors.primary.navy} strokeWidth={1.5} />
        </div>
        <h3 className="text-xl font-bold mb-2" style={{ color: colors.primary.navy }}>
            {title}
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: colors.primary.navy, opacity: 0.7 }}>
            {description}
        </p>
    </motion.div>
);

export function CurationSection() {
    const curations = [
        { icon: Laptop, title: "Workcation", description: "Productive spaces with great wifi & views." },
        { icon: Mountain, title: "Adventure", description: "Thrilling treks and outdoor activities." },
        { icon: Coffee, title: "Healing", description: "Relaxing cafes and peaceful stays." },
        { icon: Utensils, title: "Gourmet", description: "Culinary journeys for food lovers." },
        { icon: Camera, title: "Photo Ops", description: "Scenic spots for the perfect shot." },
        { icon: Tent, title: "Camping", description: "Connect with nature under the stars." },
        { icon: Music, title: "Festivals", description: "Vibrant local events and culture." },
        { icon: BookOpen, title: "Culture", description: "Museums, history, and local life." },
    ];

    return (
        <section className={`w-full ${spacing.section.py} relative overflow-hidden bg-[#F7F3F0]`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-[#FF8A73] font-semibold tracking-wider text-sm uppercase mb-3 block">Personalized For You</span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: colors.primary.navy }}>
                        Oh! Is there a trip just for my taste?
                    </h2>
                    <p className="text-lg max-w-2xl mx-auto" style={{ color: colors.primary.navy, opacity: 0.7 }}>
                        We curate travel companions and plans based on your unique travel style.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {curations.map((item, index) => (
                        <CurationCard
                            key={index}
                            {...item}
                            delay={index * 0.1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
