'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, MapPin, Tent, Building2, Palmtree, Mountain } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

const destinations = [
    {
        id: 1,
        name: 'Santorini, Greece',
        description: 'Watch golden sunsets over whitewashed cliffs and enjoy romantic getaways by the Aegean Sea.',
        tags: ['Romantic', 'Luxury'],
        region: 'Europe',
        icon: Building2,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        id: 2,
        name: 'Kyoto, Japan',
        description: 'Wander through ancient temples, peaceful gardens, and charming streets filled with culture and tradition.',
        tags: ['Cultural', 'Calm Escape'],
        region: 'Asia',
        icon: Tent,
        color: 'bg-red-100 text-red-600'
    },
    {
        id: 3,
        name: 'Palawan, Philippines',
        description: 'A tropical paradise of crystal lagoons and limestone cliffs perfect for sun-seekers and island dreamers.',
        tags: ['Nature', 'Relaxation'],
        region: 'Asia',
        icon: Palmtree,
        color: 'bg-teal-100 text-teal-600'
    },
    {
        id: 4,
        name: 'Swiss Alps, Switzerland',
        description: 'Experience breathtaking peaks, ski resorts, and cozy chalets in the heart of the mountains.',
        tags: ['Adventure', 'Scenic'],
        region: 'Europe',
        icon: Mountain,
        color: 'bg-slate-200 text-slate-700'
    }
];

const categories = ['All', 'Asia', 'Europe', 'Oceania', 'Africa', 'Caribbean', 'Middle East'];

export function DiscoverSection() {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredDestinations = activeCategory === 'All'
        ? destinations
        : destinations.filter(d => d.region === activeCategory);

    return (
        <section className={`w-full ${spacing.section.py} bg-[#FFF9F7] relative z-10`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-6 text-slate-900"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        세계를 발견하세요
                    </motion.h2>
                    <motion.p
                        className="text-lg max-w-2xl mx-auto text-slate-600"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        숨겨진 해변부터 활기찬 도시까지, 모든 여행자를 위해 엄선된 전 세계 여행지를 만나보세요.
                    </motion.p>
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-12 overflow-x-auto pb-4">
                    {categories.map((cat, index) => (
                        <motion.button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 border ${activeCategory === cat
                                ? 'bg-[#FF7E5F] text-white border-[#FF7E5F]'
                                : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                                }`}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredDestinations.map((dest, index) => (
                        <motion.div
                            key={dest.id}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            className="group relative h-[420px] rounded-[32px] overflow-hidden cursor-pointer"
                        >
                            {/* Placeholder Image Background */}
                            <div className={`absolute inset-0 ${dest.color} transition-colors duration-500 flex items-center justify-center`}>
                                <dest.icon size={64} className="opacity-20 group-hover:scale-110 transition-transform duration-500" />
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-between text-white">
                                <div className="flex gap-2">
                                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-medium border border-white/10">
                                        {dest.region}
                                    </span>
                                </div>

                                <div>
                                    <h3 className="text-2xl font-bold mb-3 group-hover:-translate-y-1 transition-transform duration-300">
                                        {dest.name}
                                    </h3>
                                    <p className="text-sm text-white/80 leading-relaxed mb-6 line-clamp-3 group-hover:line-clamp-none transition-all">
                                        {dest.description}
                                    </p>

                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-2">
                                            {dest.tags.map(tag => (
                                                <span key={tag} className="text-xs font-medium text-white/70 bg-white/10 px-2 py-1 rounded">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                            <ArrowRight size={18} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
