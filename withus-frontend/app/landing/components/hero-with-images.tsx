'use client';

import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';
import { colors, typography, spacing, animations } from '@/app/components/design-system/constants';

const destinations = [
    {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80',
        city: 'Seoul',
        country: 'South Korea',
        description: 'Modern elegance meets tradition',
    },
    {
        type: 'video' as const,
        url: 'https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4',
        city: 'New York',
        country: 'United States',
        description: 'The city that never sleeps',
    },
    {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1200&q=80',
        city: 'Tokyo',
        country: 'Japan',
        description: 'Innovation and culture intertwine',
    },
    {
        type: 'image' as const,
        url: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80',
        city: 'Paris',
        country: 'France',
        description: 'The city of lights and romance',
    },
];



export function HeroWithImages() {
    const [focusedField, setFocusedField] = useState<string | null>(null);
    const imageGridRef = useRef(null);
    const heroRef = useRef(null);
    const isInView = useInView(imageGridRef, { once: true, amount: 0.1 });

    const { scrollYProgress: heroScrollProgress } = useScroll({
        target: heroRef,
        offset: ["start start", "end start"]
    });

    const { scrollYProgress } = useScroll({
        target: imageGridRef,
        offset: ["start end", "end start"]
    });

    // Eloura-style scroll effects
    const backgroundOpacity = useTransform(heroScrollProgress, [0, 0.6, 1], [1, 0.2, 0]);
    const backgroundScale = useTransform(heroScrollProgress, [0, 1], [1, 1.15]);
    const contentOpacity = useTransform(heroScrollProgress, [0, 0.3, 0.5], [1, 0.5, 0]);

    // Asymmetric parallax - left up, right down
    const yLeft = useTransform(scrollYProgress, [0, 1], [80, -120]);  // 왼쪽: 위로
    const yCenter = useTransform(scrollYProgress, [0, 1], [40, -80]);  // 중앙: 약간 위로
    const yRight1 = useTransform(scrollYProgress, [0, 1], [-60, 100]); // 오른쪽 위: 아래로
    const yRight2 = useTransform(scrollYProgress, [0, 1], [-80, 120]); // 오른쪽 아래: 더 아래로




    return (
        <section ref={heroRef} className="relative min-h-[200vh] flex flex-col overflow-hidden">
            {/* Fixed Hero Background - Eloura Style */}
            <motion.div
                className="fixed inset-0 z-0"
                style={{ opacity: backgroundOpacity }}
            >
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80)',
                        scale: backgroundScale,
                    }}
                >
                    <div
                        className="absolute inset-0"
                        style={{
                            background: `linear-gradient(to bottom, ${colors.primary.navy}40 0%, ${colors.primary.navy}70 100%)`,
                        }}
                    />
                </motion.div>
            </motion.div>

            {/* Cream overlay fade in */}
            <motion.div
                className="fixed inset-0 z-0"
                style={{
                    backgroundColor: colors.neutral.cream,
                    opacity: useTransform(heroScrollProgress, [0, 0.5, 1], [0, 0.8, 1]),
                }}
            />

            {/* Hero Content */}
            <motion.div
                className="relative z-10 max-w-[1200px] mx-auto px-12 pt-48 pb-32"
                style={{ opacity: contentOpacity }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.4, ease: animations.easing.smooth }}
                    className="text-center"
                >
                    {/* Tagline */}
                    <motion.p
                        className="mb-8 tracking-[0.35em] uppercase font-light"
                        style={{
                            color: colors.primary.tan,
                            fontSize: '11px',
                            letterSpacing: '0.35em',
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.9 }}
                        transition={{ duration: 1.2, delay: 0.3 }}
                    >
                        Tailored Travel Experiences
                    </motion.p>

                    {/* Main Heading - Eloura Editorial Style */}
                    <motion.h1
                        className="mb-10"
                        style={{
                            fontSize: '68px',
                            lineHeight: '1.15',
                            color: colors.neutral.white,
                            fontWeight: '300',
                            letterSpacing: '-0.02em',
                            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                        }}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, ease: animations.easing.smooth }}
                    >
                        Tailored escapes into the world's
                        <br />
                        <span style={{
                            color: colors.primary.tan,
                            fontStyle: 'italic',
                            fontWeight: '300',
                        }}>
                            most vibrant cities
                        </span>
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        className="mb-16 font-light leading-relaxed"
                        style={{
                            fontSize: '20px',
                            color: colors.neutral.white,
                            maxWidth: '750px',
                            margin: '0 auto 4rem',
                            textShadow: '0 2px 12px rgba(0,0,0,0.3)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.7 }}
                    >
                        Where culture, style, and sophistication meet.
                        <br />
                        Discover companions who share your passion for exploration.
                    </motion.p>

                    {/* Search Bar - Refined */}
                    <motion.div
                        className="max-w-[900px] mx-auto mb-10"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.9 }}
                    >
                        <div className="flex items-center gap-3">
                            <div
                                className="flex-1 rounded-full p-1.5"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255, 255, 255, 0.2)',
                                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.15)',
                                }}
                            >
                                <div className="flex items-stretch">
                                    <div
                                        className={`flex items-center gap-3 flex-1 px-6 py-4 rounded-full transition-all duration-400 ${focusedField === 'location' ? 'bg-white' : ''
                                            }`}
                                        style={{ borderRight: '1px solid #f0f0f0' }}
                                    >
                                        <MapPin size={18} style={{ color: colors.primary.tan }} strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            placeholder="Destination"
                                            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm font-light"
                                            style={{ color: colors.primary.navy }}
                                            onFocus={() => setFocusedField('location')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 flex-1 px-6 py-4 rounded-full transition-all duration-400 ${focusedField === 'date' ? 'bg-white' : ''
                                            }`}
                                        style={{ borderRight: '1px solid #f0f0f0' }}
                                    >
                                        <Calendar size={18} style={{ color: colors.primary.tan }} strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            placeholder="When"
                                            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm font-light"
                                            style={{ color: colors.primary.navy }}
                                            onFocus={() => setFocusedField('date')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                    </div>
                                    <div
                                        className={`flex items-center gap-3 flex-1 px-6 py-4 rounded-full transition-all duration-400 ${focusedField === 'travelers' ? 'bg-white' : ''
                                            }`}
                                    >
                                        <Users size={18} style={{ color: colors.primary.tan }} strokeWidth={1.5} />
                                        <input
                                            type="text"
                                            placeholder="Travelers"
                                            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm font-light"
                                            style={{ color: colors.primary.navy }}
                                            onFocus={() => setFocusedField('travelers')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <motion.button
                                className="flex items-center justify-center gap-2 px-10 py-5 rounded-full text-white font-light tracking-wide"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.accent.coral} 0%, ${colors.primary.tan} 100%)`,
                                    boxShadow: '0 8px 24px rgba(255, 138, 115, 0.35)',
                                }}
                                whileHover={{
                                    scale: 1.03,
                                    boxShadow: '0 12px 32px rgba(255, 138, 115, 0.45)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Search size={18} strokeWidth={1.5} />
                                Find Companions
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Trending Keywords */}
                    <motion.div
                        className="flex items-center justify-center gap-5"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.1 }}
                    >
                        {['#CulturalImmersion', '#LuxuryTravel', '#AuthenticExperiences'].map((keyword, index) => (
                            <motion.button
                                key={keyword}
                                className="text-sm font-light tracking-wide transition-all duration-400"
                                style={{ color: 'rgba(255, 255, 255, 0.8)' }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 0.8, y: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 + index * 0.1 }}
                                whileHover={{
                                    color: colors.primary.tan,
                                    opacity: 1,
                                }}
                            >
                                {keyword}
                            </motion.button>
                        ))}
                    </motion.div>
                </motion.div>
            </motion.div>

            {/* Image Grid Section - Eloura Style */}
            <div ref={imageGridRef} className="relative z-10 max-w-[1600px] mx-auto px-12 pb-40 mt-40">
                {/* Section Intro */}
                <motion.div
                    className="text-center mb-28 max-w-[800px] mx-auto"
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, ease: animations.easing.smooth }}
                >
                    <p
                        className="tracking-[0.35em] uppercase mb-5 font-light"
                        style={{
                            color: colors.primary.tan,
                            fontSize: '11px',
                            letterSpacing: '0.35em',
                        }}
                    >
                        Featured Destinations
                    </p>
                    <h2
                        className="font-light mb-6"
                        style={{
                            fontSize: '52px',
                            color: colors.primary.navy,
                            letterSpacing: '-0.01em',
                            lineHeight: '1.2',
                        }}
                    >
                        What does your
                        <br />
                        <span style={{ color: colors.primary.tan, fontStyle: 'italic' }}>
                            Urban Discovery
                        </span> look like?
                    </h2>
                    <p
                        className="font-light leading-relaxed"
                        style={{
                            fontSize: '17px',
                            color: colors.primary.navy,
                            opacity: 0.7,
                        }}
                    >
                        Explore cultural icons, modern design, and culinary excellence
                        <br />
                        with companions who share your sense of adventure.
                    </p>
                </motion.div>

                {/* Non-Overlapping Asymmetric Grid */}
                <div className="relative h-[900px]">
                    {/* Left Image - Seoul */}
                    <motion.div
                        className="absolute left-0 top-[180px] w-[22%] h-[480px]"
                        style={{ y: yLeft }}
                        initial={{ opacity: 0, x: -60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.4, ease: animations.easing.smooth }}
                    >
                        <div className="relative w-full h-full group cursor-pointer overflow-hidden rounded-xl shadow-2xl">
                            <motion.img
                                src={destinations[0].url}
                                alt={destinations[0].city}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.06 }}
                                transition={{ duration: 0.9, ease: animations.easing.smooth }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(to top, ${colors.primary.navy}90 0%, ${colors.primary.navy}30 50%, transparent 100%)`,
                                }}
                            />
                            <motion.div
                                className="absolute bottom-8 left-8 right-8"
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p
                                    className="tracking-[0.25em] uppercase mb-2 font-light"
                                    style={{
                                        color: colors.primary.tan,
                                        fontSize: '10px',
                                    }}
                                >
                                    {destinations[0].country}
                                </p>
                                <h3
                                    className="font-light mb-2"
                                    style={{
                                        fontSize: '26px',
                                        color: colors.neutral.white,
                                    }}
                                >
                                    {destinations[0].city}
                                </h3>
                                <p
                                    className="font-light text-xs"
                                    style={{
                                        color: colors.neutral.white,
                                        opacity: 0.9,
                                    }}
                                >
                                    {destinations[0].description}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Center Video - New York (Large) */}
                    <motion.div
                        className="absolute left-1/2 top-[100px] -translate-x-1/2 w-[52%] h-[680px] z-10"
                        style={{ y: yCenter }}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.6, delay: 0.2, ease: animations.easing.smooth }}
                    >
                        <div className="relative w-full h-full group cursor-pointer overflow-hidden rounded-2xl shadow-2xl">
                            <video
                                src={destinations[1].url}
                                className="w-full h-full object-cover"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(to top, ${colors.primary.navy}85 0%, ${colors.primary.navy}20 60%, transparent 100%)`,
                                }}
                            />
                            <motion.div
                                className="absolute bottom-14 left-14 right-14"
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p
                                    className="tracking-[0.3em] uppercase mb-4 font-light"
                                    style={{
                                        color: colors.primary.tan,
                                        fontSize: '11px',
                                    }}
                                >
                                    {destinations[1].country}
                                </p>
                                <h3
                                    className="font-light mb-4"
                                    style={{
                                        fontSize: '48px',
                                        color: colors.neutral.white,
                                        letterSpacing: '-0.01em',
                                    }}
                                >
                                    {destinations[1].city}
                                </h3>
                                <p
                                    className="font-light"
                                    style={{
                                        fontSize: '16px',
                                        color: colors.neutral.white,
                                        opacity: 0.95,
                                    }}
                                >
                                    {destinations[1].description}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Top Image - Tokyo */}
                    <motion.div
                        className="absolute right-0 top-[60px] w-[22%] h-[380px]"
                        style={{ y: yRight1 }}
                        initial={{ opacity: 0, x: 60 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.4, delay: 0.3, ease: animations.easing.smooth }}
                    >
                        <div className="relative w-full h-full group cursor-pointer overflow-hidden rounded-xl shadow-2xl">
                            <motion.img
                                src={destinations[2].url}
                                alt={destinations[2].city}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.06 }}
                                transition={{ duration: 0.9, ease: animations.easing.smooth }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(to top, ${colors.primary.navy}90 0%, ${colors.primary.navy}30 50%, transparent 100%)`,
                                }}
                            />
                            <motion.div
                                className="absolute bottom-8 left-8 right-8"
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p
                                    className="tracking-[0.25em] uppercase mb-2 font-light"
                                    style={{
                                        color: colors.primary.tan,
                                        fontSize: '10px',
                                    }}
                                >
                                    {destinations[2].country}
                                </p>
                                <h3
                                    className="font-light mb-2"
                                    style={{
                                        fontSize: '26px',
                                        color: colors.neutral.white,
                                    }}
                                >
                                    {destinations[2].city}
                                </h3>
                                <p
                                    className="font-light text-xs"
                                    style={{
                                        color: colors.neutral.white,
                                        opacity: 0.9,
                                    }}
                                >
                                    {destinations[2].description}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right Bottom Image - Paris */}
                    <motion.div
                        className="absolute right-0 top-[460px] w-[22%] h-[400px]"
                        style={{ y: yRight2 }}
                        initial={{ opacity: 0, x: 60, y: 40 }}
                        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                        transition={{ duration: 1.4, delay: 0.4, ease: animations.easing.smooth }}
                    >
                        <div className="relative w-full h-full group cursor-pointer overflow-hidden rounded-xl shadow-2xl">
                            <motion.img
                                src={destinations[3].url}
                                alt={destinations[3].city}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.06 }}
                                transition={{ duration: 0.9, ease: animations.easing.smooth }}
                            />
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(to top, ${colors.primary.navy}90 0%, ${colors.primary.navy}30 50%, transparent 100%)`,
                                }}
                            />
                            <motion.div
                                className="absolute bottom-8 left-8 right-8"
                                initial={{ opacity: 1, y: 0 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p
                                    className="tracking-[0.25em] uppercase mb-2 font-light"
                                    style={{
                                        color: colors.primary.tan,
                                        fontSize: '10px',
                                    }}
                                >
                                    {destinations[3].country}
                                </p>
                                <h3
                                    className="font-light mb-2"
                                    style={{
                                        fontSize: '26px',
                                        color: colors.neutral.white,
                                    }}
                                >
                                    {destinations[3].city}
                                </h3>
                                <p
                                    className="font-light text-xs"
                                    style={{
                                        color: colors.neutral.white,
                                        opacity: 0.9,
                                    }}
                                >
                                    {destinations[3].description}
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>




                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-36"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <motion.button
                        className="px-14 py-5 rounded-full font-light tracking-wide transition-all duration-500"
                        style={{
                            border: `1.5px solid ${colors.primary.navy}`,
                            color: colors.primary.navy,
                            fontSize: '15px',
                        }}
                        whileHover={{
                            backgroundColor: colors.primary.navy,
                            color: colors.neutral.white,
                        }}
                    >
                        Explore All Destinations
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
}
