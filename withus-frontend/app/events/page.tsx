'use client';

import React, { useState } from 'react';
import { EventHero } from './components/EventHero';
import { EventTabs } from './components/EventTabs';
import { EventList } from './components/EventList';
import { palette, theme } from '@/app/components/design-system/constants';
import { motion } from 'motion/react';

export default function EventsPage() {
    const [activeTab, setActiveTab] = useState('ongoing');

    return (
        <main className="min-h-screen" style={{ backgroundColor: palette.cream.base }}>
            {/* 1. Hero Section */}
            <EventHero />

            {/* 2. Main Content Section */}
            <div className="relative pt-12">
                {/* Decoration background blur */}
                <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-teal-100/10 rounded-full blur-[120px] pointer-events-none" />

                {/* Section Header */}
                <div className="max-w-[1240px] mx-auto px-6 mb-12 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl font-black text-slate-900 mb-2">진행 중인 이벤트</h2>
                        <p className="text-slate-500 font-bold">참여하고 특별한 혜택을 놓치지 마세요!</p>
                    </motion.div>
                </div>

                {/* Event Category Tabs */}
                <EventTabs activeTab={activeTab} setActiveTab={setActiveTab} />

                {/* Event Cards Grid */}
                <EventList activeTab={activeTab} />
            </div>

            {/* 3. Footer Banner (Optional CTA) */}
            <section className="max-w-[1240px] mx-auto px-6 pb-32">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="relative p-12 md:p-16 rounded-[48px] overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl shadow-orange-500/20"
                    style={{ background: theme.colors.gradients.brand }}
                >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')] opacity-10 pointer-events-none" />

                    <div className="relative z-10 space-y-4">
                        <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">
                            아직 WithUs 회원이 아니신가요? <br />
                            <span className="text-white/80">지금 가입하고 첫 동행의 설렘을 느껴보세요!</span>
                        </h2>
                        <p className="text-white/70 font-medium text-lg">가입 즉시 사용 가능한 웰컴 쿠폰팩이 지급됩니다.</p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10 px-10 py-5 rounded-full bg-white text-slate-900 font-black text-lg shadow-2xl hover:bg-slate-900 hover:text-white transition-all shrink-0"
                    >
                        지금 바로 시작하기 🚀
                    </motion.button>
                </motion.div>
            </section>
        </main>
    );
};
