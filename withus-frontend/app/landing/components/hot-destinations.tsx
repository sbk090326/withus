'use client';

import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { colors, animations } from '@/app/components/design-system/constants';

const destinations = [
    {
        city: 'Tokyo',
        country: 'Japan',
        hashtags: ['#CityLife', '#FoodHeaven', '#Culture'],
        recruiting: 24,
        image:
            'https://images.unsplash.com/photo-1648871647634-0c99b483cb63?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMGphcGFuJTIwY2l0eXNjYXBlfGVufDF8fHx8MTc2NjYzNTY2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        city: 'Paris',
        country: 'France',
        hashtags: ['#Romance', '#Art', '#Cafes'],
        recruiting: 18,
        image:
            'https://images.unsplash.com/photo-1431274172761-fca41d930114?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMGVpZmZlbCUyMHRvd2VyfGVufDF8fHx8MTc2NjY5NjkwNXww&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        city: 'Barcelona',
        country: 'Spain',
        hashtags: ['#Architecture', '#Beach', '#NightLife'],
        recruiting: 15,
        image:
            'https://images.unsplash.com/photo-1595685842822-7893ddb30176?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXJjZWxvbmElMjBzcGFpbiUyMGFyY2hpdGVjdHVyZXxlbnwxfHx8fDE3NjY2OTIxNTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        city: 'Bali',
        country: 'Indonesia',
        hashtags: ['#Island', '#Yoga', '#Surfing'],
        recruiting: 21,
        image:
            'https://images.unsplash.com/photo-1698466632744-f79b37b88ffd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWxpJTIwaW5kb25lc2lhJTIwYmVhY2h8ZW58MXx8fHwxNzY2NjM5NTUzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
        city: 'Swiss Alps',
        country: 'Switzerland',
        hashtags: ['#Mountains', '#Adventure', '#Skiing'],
        recruiting: 12,
        image:
            'https://images.unsplash.com/photo-1633942515338-6bfe46d316d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzd2lzcyUyMGFscHMlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzY2NzM3MzA2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
];

export function HotDestinations() {
    const ref = useRef(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 400;
            scrollContainerRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className="py-24 px-8" style={{ backgroundColor: colors.neutral.cream }}>
            <div className="max-w-[1600px] mx-auto" ref={ref}>
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
                    Most popular destinations with active companions now
                </motion.h2>

                {/* Description */}
                <motion.p
                    className="text-center mb-12"
                    style={{
                        fontSize: '18px',
                        color: colors.primary.navy,
                        opacity: 0.8,
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 0.8, y: 0 } : {}}
                    transition={{ duration: animations.duration.normal, delay: 0.2, ease: animations.easing.smooth }}
                >
                    Discover where most companions are currently being recruited.
                </motion.p>

                {/* Horizontal Scroll Container */}
                <div className="relative">
                    {/* Navigation Buttons */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <ChevronLeft size={24} style={{ color: colors.primary.navy }} />
                    </button>

                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110"
                        style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.9)',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <ChevronRight size={24} style={{ color: colors.primary.navy }} />
                    </button>

                    {/* Cards */}
                    <div
                        ref={scrollContainerRef}
                        className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-2"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                        }}
                    >
                        {destinations.map((dest, index) => (
                            <motion.div
                                key={index}
                                className="flex-shrink-0 w-[380px] h-[520px] rounded-[32px] overflow-hidden cursor-pointer relative group"
                                initial={{ opacity: 0, x: 50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : {}}
                                transition={{
                                    duration: animations.duration.normal,
                                    delay: index * 0.1,
                                    ease: animations.easing.smooth,
                                }}
                                onMouseEnter={() => setHoveredCard(index)}
                                onMouseLeave={() => setHoveredCard(null)}
                                whileHover={{
                                    scale: 1.03,
                                    transition: { duration: 0.3 },
                                }}
                                style={{
                                    boxShadow:
                                        hoveredCard === index
                                            ? '0 20px 60px rgba(255, 138, 115, 0.3)'
                                            : '0 8px 24px rgba(26, 60, 90, 0.15)',
                                }}
                            >
                                {/* Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={dest.image}
                                        alt={`${dest.city}, ${dest.country}`}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    {/* Gradient Overlay */}
                                    <div
                                        className="absolute inset-0"
                                        style={{
                                            background:
                                                `linear-gradient(to top, ${colors.primary.navy}D9 0%, ${colors.primary.navy}66 30%, transparent 60%)`,
                                        }}
                                    />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <motion.h3
                                        className="mb-2"
                                        style={{
                                            fontSize: '28px',
                                            color: colors.neutral.white,
                                        }}
                                        initial={{ y: 10, opacity: 0 }}
                                        animate={
                                            hoveredCard === index ? { y: 0, opacity: 1 } : { y: 10, opacity: 1 }
                                        }
                                        transition={{ duration: 0.3 }}
                                    >
                                        {dest.city}, {dest.country}
                                    </motion.h3>

                                    <div className="flex gap-2 mb-3 flex-wrap">
                                        {dest.hashtags.map((tag, tagIndex) => (
                                            <span
                                                key={tagIndex}
                                                style={{
                                                    fontSize: '14px',
                                                    color: colors.accent.coral,
                                                }}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <p
                                        style={{
                                            fontSize: '16px',
                                            color: colors.neutral.white,
                                        }}
                                    >
                                        Recruiting: <strong>{dest.recruiting} trips</strong>
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
        </section>
    );
}
