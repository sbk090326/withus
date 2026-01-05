'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Globe, Map, Navigation } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

const RegionPill = ({ name }: { name: string }) => (
    <motion.button
        className="px-6 py-3 rounded-full bg-white border border-slate-200 text-slate-900 font-medium hover:bg-[#FF7E5F] hover:text-white hover:border-[#FF7E5F] transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        {name}
    </motion.button>
);

export function RegionQuickExploreSection() {
    const regions = [
        "Europe", "Asia", "North America", "South America",
        "Africa", "Oceania", "Middle East", "Caribbean"
    ];

    const popular = [
        "Paris", "London", "Tokyo", "New York", "Bali", "Seoul", "Bangkok", "Rome"
    ];

    return (
        <section className={`w-full ${spacing.section.py} bg-[#FDFCFB] relative z-10`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px} text-center`}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 bg-white rounded-full shadow-md text-[#FF7E5F]">
                        <Globe size={24} />
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                        다음 여행지는 어디인가요?
                    </h2>
                    <p className="text-slate-600">
                        대륙별 인기 여행지와 핫한 도시를 빠르게 찾아보세요.
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    <div className="mb-8">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center justify-center gap-2">
                            <Map size={16} /> 대륙별
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {regions.map((r) => <RegionPill key={r} name={r} />)}
                        </div>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6 flex items-center justify-center gap-2">
                            <Navigation size={16} /> 인기 도시
                        </h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {popular.map((p) => <RegionPill key={p} name={p} />)}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
