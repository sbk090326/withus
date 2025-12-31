'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Quote, X, MapPin } from 'lucide-react';
import { colors, animations } from '@/app/components/design-system/constants';

const reviews = [
    {
        quote:
            'Are we strangers? Our personalities matched so well, it felt like traveling with a 10-year friend!',
        match: 95,
        location: 'Switzerland',
        userId: '@traveler_jane',
        image:
            'https://images.unsplash.com/photo-1535027935858-1310d311ccb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2l0emVybGFuZCUyMHRyYXZlbCUyMGZyaWVuZHN8ZW58MXx8fHwxNzY2NzM3NDI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
        fullStory:
            'I was nervous about traveling with a stranger, but Withus matched me with someone who shared my love for early morning hikes and cozy evening conversations. We explored the Swiss Alps together, and it truly felt like reconnecting with an old friend. The personality matching algorithm is incredible!',
    },
    {
        quote:
            'From awkward hellos to lifelong friends. Best decision I ever made!',
        match: 92,
        location: 'Japan',
        userId: '@wanderlust_mike',
        image:
            'https://images.unsplash.com/photo-1648871647634-0c99b483cb63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc2NjYzNTY2MXww&ixlib=rb-4.1.0&q=80&w=1080',
        fullStory:
            'Meeting my travel companion in Tokyo was surreal. We bonded over our shared passion for street photography and ramen. What started as a two-week trip turned into a friendship that spans continents. We still video call every week!',
    },
    {
        quote: 'Solo travel anxiety? Gone. This platform changed everything for me.',
        match: 97,
        location: 'Bali',
        userId: '@island_soul',
        image:
            'https://images.unsplash.com/photo-1698466632744-f79b37b88ffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhJTIwYmVhY2h8ZW58MXx8fHwxNzY2NjM5NTUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
        fullStory:
            'I had always wanted to travel but felt too anxious to go alone. Withus gave me the confidence I needed. My companion and I explored Bali together, from sunrise yoga sessions to sunset beach walks. This experience has opened up the world for me.',
    },
    {
        quote: 'The verification process made me feel safe. Great experience!',
        match: 89,
        location: 'Barcelona',
        userId: '@explorer_sam',
        image:
            'https://images.unsplash.com/photo-1595685842822-7893ddb30176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzcGFpbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjY2OTIxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
        fullStory:
            'Safety was my top concern, but the ID verification and personality matching gave me peace of mind. Barcelona was incredible, and having a trusted companion made it unforgettable.',
    },
];

export function CommunityReviews() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [selectedReview, setSelectedReview] = useState<number | null>(null);

    return (
        <section className="py-24 px-8" style={{ backgroundColor: colors.neutral.cream }}>
            <div className="max-w-[1400px] mx-auto" ref={ref}>
                {/* Title */}
                <motion.h2
                    className="text-center mb-16"
                    style={{
                        fontSize: '48px',
                        color: colors.primary.navy,
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: animations.duration.normal, ease: animations.easing.smooth }}
                >
                    Unforgettable memories made with Withus
                </motion.h2>

                {/* Review Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {reviews.map((review, index) => {
                        const isLarge = index === 0;
                        return (
                            <motion.div
                                key={index}
                                className={`p-8 rounded-[32px] cursor-pointer group ${isLarge ? 'md:col-span-2' : ''
                                    }`}
                                style={{
                                    backgroundColor: colors.neutral.white,
                                    boxShadow: '0 4px 16px rgba(26, 60, 90, 0.08)',
                                    border: `1px solid ${colors.neutral.creamDark}`,
                                }}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: animations.duration.normal,
                                    delay: index * 0.1,
                                    ease: animations.easing.smooth,
                                }}
                                whileHover={{
                                    scale: 1.02,
                                    boxShadow: '0 12px 32px rgba(26, 60, 90, 0.15)',
                                    transition: { duration: 0.3 },
                                }}
                                onClick={() => setSelectedReview(index)}
                            >
                                {/* Quote Icon */}
                                <Quote size={32} style={{ color: colors.primary.navy, opacity: 0.15 }} />

                                {/* Quote Text */}
                                <p
                                    className="font-serif-accent my-6 italic"
                                    style={{
                                        fontSize: isLarge ? '24px' : '20px',
                                        color: colors.primary.navy,
                                        lineHeight: '1.6',
                                    }}
                                >
                                    "{review.quote}"
                                </p>

                                {/* Metadata */}
                                <div className="flex items-center justify-between flex-wrap gap-4">
                                    <div className="flex items-center gap-6">
                                        <div>
                                            <span style={{ color: colors.primary.tan }}>
                                                Personality Match: {review.match}%
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin size={16} style={{ color: colors.primary.navy }} />
                                            <span style={{ color: colors.primary.navy }}>Visited: {review.location}</span>
                                        </div>
                                    </div>
                                    <span style={{ color: colors.primary.navy, opacity: 0.6 }}>{review.userId}</span>
                                </div>

                                {/* Hover hint */}
                                <motion.p
                                    className="mt-4"
                                    style={{ fontSize: '14px', color: colors.primary.tan, opacity: 0 }}
                                    animate={{ opacity: 0 }}
                                    whileHover={{ opacity: 1 }}
                                >
                                    Click to read full story →
                                </motion.p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>

            {/* Full Story Modal */}
            <AnimatePresence>
                {selectedReview !== null && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-8"
                        style={{ backgroundColor: `${colors.primary.navy}E6` }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedReview(null)}
                    >
                        <motion.div
                            className="max-w-[800px] w-full rounded-[32px] overflow-hidden"
                            style={{ backgroundColor: colors.neutral.white }}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{ duration: animations.duration.fast, ease: animations.easing.smooth }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image */}
                            <div className="relative h-[400px]">
                                <img
                                    src={reviews[selectedReview].image}
                                    alt={reviews[selectedReview].location}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    className="absolute top-6 right-6 p-3 rounded-full backdrop-blur-md hover:scale-110 transition-transform"
                                    style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                                    onClick={() => setSelectedReview(null)}
                                >
                                    <X size={24} style={{ color: colors.primary.navy }} />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="p-10">
                                <Quote size={40} style={{ color: colors.primary.navy, opacity: 0.15 }} />

                                <p
                                    className="font-serif-accent my-6 italic"
                                    style={{
                                        fontSize: '24px',
                                        color: colors.primary.navy,
                                        lineHeight: '1.6',
                                    }}
                                >
                                    "{reviews[selectedReview].quote}"
                                </p>

                                <p
                                    className="mb-8"
                                    style={{
                                        fontSize: '18px',
                                        color: colors.primary.navy,
                                        lineHeight: '1.8',
                                        opacity: 0.8,
                                    }}
                                >
                                    {reviews[selectedReview].fullStory}
                                </p>

                                <div className="flex items-center gap-8 flex-wrap">
                                    <div>
                                        <span style={{ color: colors.primary.tan }}>
                                            Personality Match: {reviews[selectedReview].match}%
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={18} style={{ color: colors.primary.navy }} />
                                        <span style={{ color: colors.primary.navy }}>
                                            Visited: {reviews[selectedReview].location}
                                        </span>
                                    </div>
                                    <span style={{ color: colors.primary.navy, opacity: 0.6 }}>
                                        {reviews[selectedReview].userId}
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
