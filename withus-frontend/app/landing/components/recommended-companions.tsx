'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { colors, animations } from '@/app/components/design-system/constants';

const companions = [
    {
        image:
            'https://images.unsplash.com/photo-1664312572933-0563f14484a1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHRyYXZlbGVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY2NzM3Mzg4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        nickname: 'Sarah_Explorer',
        mannerScore: 98,
        tags: ['#Planner', '#PhotoEnthusiast', '#Extrovert'],
        latestPost: 'Looking for someone to explore hidden cafes in Seoul!',
    },
    {
        image:
            'https://images.unsplash.com/photo-1514498985748-90e19faa521d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWwlMjBwaG90b2dyYXBoZXIlMjB3b21hbnxlbnwxfHx8fDE3NjY3MzczODl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        nickname: 'Mike_Wanderer',
        mannerScore: 95,
        tags: ['#Spontaneous', '#Foodie', '#NightOwl'],
        latestPost: 'Anyone want to catch sunrise at Mount Fuji?',
    },
    {
        image:
            'https://images.unsplash.com/photo-1692571825592-f1618a10ab77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGV4cGxvcmVyJTIwYmFja3BhY2t8ZW58MXx8fHwxNzY2NzM3Mzg5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        nickname: 'Alex_Nomad',
        mannerScore: 96,
        tags: ['#Adventure', '#Minimalist', '#EarlyBird'],
        latestPost: 'Looking for someone to do a snap shoot in Kyoto!',
    },
];

export function RecommendedCompanions() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <section className="py-24 px-8" style={{ backgroundColor: colors.neutral.cream }}>
            <div className="max-w-[1400px] mx-auto" ref={ref}>
                {/* Title */}
                <motion.h2
                    className="text-center mb-4"
                    style={{
                        fontSize: '48px',
                        color: colors.primary.navy,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: animations.duration.normal, ease: animations.easing.smooth }}
                >
                    Your perfect travel companions
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-center mb-16"
                    style={{
                        fontSize: '18px',
                        color: colors.primary.navy,
                        opacity: 0.8,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 0.8, y: 0 } : {}}
                    transition={{ duration: animations.duration.normal, delay: 0.2, ease: animations.easing.smooth }}
                >
                    A preview of companions perfectly matching your travel style.
                </motion.p>

                {/* Profile Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {companions.map((companion, index) => (
                        <motion.div
                            key={index}
                            className="p-8 rounded-[32px] relative"
                            style={{
                                backgroundColor: colors.neutral.white,
                                border: `1px solid ${colors.neutral.cream}`,
                                boxShadow: '0 8px 24px rgba(26, 60, 90, 0.08)',
                            }}
                            initial={{ opacity: 0, y: 40 }}
                            animate={
                                isInView
                                    ? {
                                        opacity: 1,
                                        y: [0, -10, 0],
                                    }
                                    : {}
                            }
                            transition={{
                                duration: animations.duration.normal,
                                delay: index * 0.15,
                                ease: animations.easing.smooth,
                                y: {
                                    duration: 4 + index * 0.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                },
                            }}
                            whileHover={{
                                y: -12,
                                boxShadow: '0 20px 40px rgba(26, 60, 90, 0.12)',
                                transition: { duration: 0.3 },
                            }}
                        >
                            {/* Profile Picture with Circular Progress */}
                            <div className="flex flex-col items-center mb-6">
                                <div className="relative mb-4">
                                    {/* Circular Progress Bar */}
                                    <svg className="absolute -inset-2" width="120" height="120">
                                        <circle
                                            cx="60"
                                            cy="60"
                                            r="54"
                                            fill="none"
                                            stroke={colors.neutral.cream}
                                            strokeWidth="4"
                                        />
                                        <motion.circle
                                            cx="60"
                                            cy="60"
                                            r="54"
                                            fill="none"
                                            stroke={colors.primary.tan}
                                            strokeWidth="4"
                                            strokeLinecap="round"
                                            strokeDasharray={`${2 * Math.PI * 54}`}
                                            initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                                            animate={
                                                isInView
                                                    ? {
                                                        strokeDashoffset:
                                                            2 * Math.PI * 54 * (1 - companion.mannerScore / 100),
                                                    }
                                                    : {}
                                            }
                                            transition={{ duration: 1.5, delay: index * 0.15 + 0.5 }}
                                            style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                                        />
                                    </svg>

                                    {/* Profile Image */}
                                    <div
                                        className="w-24 h-24 rounded-full overflow-hidden"
                                        style={{ border: `3px solid ${colors.neutral.white}` }}
                                    >
                                        <img
                                            src={companion.image}
                                            alt={companion.nickname}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Nickname */}
                                <h3
                                    className="mb-2"
                                    style={{
                                        fontSize: '24px',
                                        color: colors.primary.navy,
                                    }}
                                >
                                    {companion.nickname}
                                </h3>

                                {/* Manner Score */}
                                <p style={{ fontSize: '16px', color: colors.primary.navy }}>
                                    Manner Score:{' '}
                                    <span style={{ color: colors.primary.tan }}>{companion.mannerScore}</span>
                                </p>
                            </div>

                            {/* Personality Tags */}
                            <div className="flex flex-wrap gap-2 mb-6 justify-center">
                                {companion.tags.map((tag, tagIndex) => (
                                    <motion.span
                                        key={tagIndex}
                                        className="px-4 py-2 rounded-full cursor-pointer"
                                        style={{
                                            backgroundColor: colors.neutral.cream,
                                            color: colors.primary.navy,
                                            fontSize: '14px',
                                        }}
                                        whileHover={{
                                            backgroundColor: colors.neutral.creamDark,
                                            scale: 1.05,
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {tag}
                                    </motion.span>
                                ))}
                            </div>

                            {/* Latest Trip Post */}
                            <p
                                className="mb-6 text-center italic"
                                style={{
                                    fontSize: '14px',
                                    color: colors.primary.navy,
                                    opacity: 0.7,
                                    lineHeight: '1.6',
                                }}
                            >
                                "{companion.latestPost}"
                            </p>

                            {/* CTA */}
                            <div className="text-center">
                                <motion.a
                                    href="#profile"
                                    style={{ color: colors.accent.coral }}
                                    whileHover={{ scale: 1.05 }}
                                    className="inline-block"
                                >
                                    View Profile →
                                </motion.a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
