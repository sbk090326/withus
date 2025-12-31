'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Flame, ArrowUpRight } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

interface TrendItemProps {
    rank: number;
    keyword: string;
    category: string;
    growth: string;
}

const TrendItem = ({ rank, keyword, category, growth }: TrendItemProps) => (
    <motion.div
        className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer group"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
    >
        <div className="flex items-center gap-6">
            <span className="text-2xl font-bold text-[#FF8A73] w-8">{rank}</span>
            <div>
                <h4 className="font-bold text-[#1A3C5A] text-lg mb-0.5 group-hover:text-[#FF8A73] transition-colors">{keyword}</h4>
                <span className="text-sm text-gray-400">{category}</span>
            </div>
        </div>
        <div className="flex items-center gap-2 text-[#1A3C5A] font-medium">
            <TrendingUp size={16} className="text-[#FF8A73]" />
            {growth}
        </div>
    </motion.div>
);

export function TrendingSection() {
    const trends = [
        { rank: 1, keyword: "Kyoto, Japan", category: "Destination", growth: "+124%" },
        { rank: 2, keyword: "Solo Female Travel", category: "Theme", growth: "+85%" },
        { rank: 3, keyword: "Eco-Friendly Stays", category: "Accommodation", growth: "+62%" },
        { rank: 4, keyword: "Lisbon Digital Nomads", category: "Community", growth: "+58%" },
        { rank: 5, keyword: "Weekend Surfing", category: "Activity", growth: "+45%" },
    ];

    return (
        <section className={`w-full ${spacing.section.py} bg-white relative z-10`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Heading & Context */}
                    <div className="lg:w-1/3">
                        <div className="flex items-center gap-2 mb-4 text-[#FF8A73]">
                            <Flame size={24} fill="#FF8A73" />
                            <span className="font-bold uppercase tracking-wider">Live Insights</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-6 text-[#1A3C5A]">
                            Trending & <br />
                            Real-time Status
                        </h2>
                        <p className="text-lg text-gray-500 mb-8">
                            See what's capturing the hearts of travelers right now. Join the wave or find your own path.
                        </p>
                        <button className="flex items-center gap-2 text-[#1A3C5A] font-semibold hover:text-[#FF8A73] transition-colors group">
                            View all trends
                            <ArrowUpRight size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </button>
                    </div>

                    {/* Right: Trend List */}
                    <div className="lg:w-2/3">
                        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100 p-8 border border-gray-100">
                            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
                                <h3 className="text-xl font-bold text-[#1A3C5A]">Top Searches</h3>
                                <span className="text-sm text-gray-400">Updated 5 mins ago</span>
                            </div>
                            <div className="flex flex-col gap-2">
                                {trends.map((trend, i) => (
                                    <TrendItem key={i} {...trend} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
