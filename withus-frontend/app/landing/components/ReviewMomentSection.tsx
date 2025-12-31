'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Quote, User, Camera } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';

const reviews = [
    {
        id: 1,
        name: 'Maria Carolina',
        role: 'Solo Traveler',
        text: 'The balloon ride was magical! Thank you for making it effortless.',
        imageColor: 'bg-orange-100',
        rotate: '-rotate-2',
        zIndex: 'z-10'
    },
    {
        id: 2,
        name: 'Alessia Marika',
        role: 'History Buff',
        text: 'The guided tour was incredible. I learned so much about the history and culture.',
        imageColor: 'bg-blue-100',
        rotate: 'rotate-3',
        zIndex: 'z-20'
    },
    {
        id: 3,
        name: 'Aisha Davina',
        role: 'Adventure Seeker',
        text: 'Nomura made my solo trip feel safe and easy. Every sunset felt like home.',
        imageColor: 'bg-emerald-100',
        rotate: '-rotate-1',
        zIndex: 'z-30'
    },
    {
        id: 4,
        name: 'Gino Kenji',
        role: 'Photographer',
        text: 'Everything was planned perfectly. I just had to show up and enjoy the city.',
        imageColor: 'bg-purple-100',
        rotate: 'rotate-2',
        zIndex: 'z-20'
    },
    {
        id: 5,
        name: 'Alan Philips',
        role: 'Backpacker',
        text: 'The best time of my life! I will remember the Halasan Islands forever.',
        imageColor: 'bg-yellow-100',
        rotate: '-rotate-3',
        zIndex: 'z-10'
    }
];

export function ReviewMomentSection() {
    return (
        <section className={`w-full ${spacing.section.py} bg-[#F7F3F0] relative z-10 overflow-hidden`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px} text-center`}>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h3 className="text-sm font-semibold tracking-wider uppercase text-gray-500 mb-3">
                        Real stories from real travelers
                    </h3>
                    <h2 className="text-3xl md:text-5xl font-bold leading-tight" style={{ color: colors.primary.navy }}>
                        Moments that made every journey <br className="hidden md:block" /> unforgettable
                    </h2>
                </motion.div>

                {/* Cards Container - Slightly Curved/Fan effect simulation via CSS grid/flex + rotation */}
                <div className="flex flex-nowrap md:justify-center gap-4 overflow-x-auto pb-12 pt-8 px-4 snap-x snap-mandatory scrollbar-hide md:overflow-visible">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={review.id}
                            className={`flex-shrink-0 w-[280px] md:w-[320px] bg-white p-4 pb-8 rounded-2xl shadow-xl transform ${review.rotate} snap-center transition-transform duration-300 hover:scale-105 hover:z-50 hover:rotate-0 border border-gray-100`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            {/* Polaroid-style Image Area */}
                            <div className={`w-full aspect-[4/3] ${review.imageColor} rounded-xl mb-6 flex items-center justify-center relative overflow-hidden`}>
                                <User size={48} className="text-gray-400 opacity-50" />
                                <div className="absolute inset-0 bg-gradient-to-tr from-black/5 to-transparent" />
                            </div>

                            <div className="text-left px-2">
                                <Quote size={24} className="text-[#FF8A73] mb-3 opacity-50" />
                                <p className="text-gray-700 font-medium leading-relaxed mb-6 min-h-[80px]">
                                    "{review.text}"
                                </p>
                                <div className="border-t border-gray-100 pt-4">
                                    <h4 className="font-bold text-lg text-gray-900">{review.name}</h4>
                                    <span className="text-sm text-gray-500">{review.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    className="mt-12"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                >
                    <button className={`px-8 py-3 rounded-full bg-[${colors.primary.navy}] text-white font-semibold hover:opacity-90 transition-opacity shadow-lg shadow-[#1A3C5A]/20`}>
                        See more happiness
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
