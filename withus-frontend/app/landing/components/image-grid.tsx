'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';

const images = [
    {
        url: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80',
        alt: 'Contemplative traveler by window',
        caption: 'Moments of reflection',
    },
    {
        url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=900&q=80',
        alt: 'Historic European architecture',
        caption: 'Timeless destinations',
    },
    {
        url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=700&q=80',
        alt: 'Luxury hotel interior',
        caption: 'Refined experiences',
    },
    {
        url: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&q=80',
        alt: 'Sunset aviation',
        caption: 'Journey in style',
    },
];

export function ImageGrid() {
    const containerRef = useRef(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.05 });

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Parallax transforms with different speeds for depth
    const yBackground = useTransform(scrollYProgress, [0, 1], [0, -80]);
    const y1 = useTransform(scrollYProgress, [0, 1], [200, -150]);
    const y2 = useTransform(scrollYProgress, [0, 1], [100, -200]);
    const y3 = useTransform(scrollYProgress, [0, 1], [250, -100]);
    const y4 = useTransform(scrollYProgress, [0, 1], [150, -250]);

    const opacity1 = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.5]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 1.01]);


    return (
        <section
            ref={containerRef}
            className="relative py-40 px-8 overflow-hidden"
            style={{
                background: 'linear-gradient(to bottom, rgba(247, 243, 240, 0) 0%, rgba(247, 243, 240, 0.5) 30%, #F7F3F0 70%)',
            }}
        >
            {/* Background city skyline - slow parallax */}
            <motion.div
                className="absolute inset-0 opacity-10"
                style={{ y: yBackground }}
            >
                <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: 'url(https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1920&q=80)',
                        filter: 'grayscale(100%) blur(2px)',
                    }}
                />
            </motion.div>

            <div className="max-w-[1800px] mx-auto relative">
                {/* Overlapping Brochure-style Layout */}
                <div className="relative min-h-[900px]">

                    {/* Left - Tall portrait image with rotation */}
                    <motion.div
                        className="absolute left-[5%] top-[80px] w-[340px] h-[520px] z-20"
                        style={{ y: y1, opacity: opacity1 }}
                        initial={{ opacity: 0, x: -120 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.4, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <motion.div
                            className="relative w-full h-full rounded-[8px] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.25)] group cursor-pointer"
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
                            }}
                        >
                            <motion.img
                                src={images[0].url}
                                alt={images[0].alt}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <motion.div
                                className="absolute bottom-8 left-8 right-8"
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-white text-sm font-light tracking-wide">{images[0].caption}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Center - Large featured image (Visual Anchor) */}
                    <motion.div
                        className="absolute left-1/2 top-[180px] -translate-x-1/2 w-[620px] h-[460px] z-30"
                        style={{ y: y2, scale }}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 1.6, delay: 0.3, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <motion.div
                            className="relative w-full h-full rounded-[12px] overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.3)] group cursor-pointer"
                            whileHover={{
                                scale: 1.02,
                                transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
                            }}
                        >
                            <motion.img
                                src={images[1].url}
                                alt={images[1].alt}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.08 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            <motion.div
                                className="absolute bottom-10 left-10 right-10"
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-white text-lg font-light tracking-wide">{images[1].caption}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Top - Medium landscape image */}
                    <motion.div
                        className="absolute right-[8%] top-[40px] w-[380px] h-[260px] z-25"
                        style={{ y: y3 }}
                        initial={{ opacity: 0, x: 120 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 1.4, delay: 0.4, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <motion.div
                            className="relative w-full h-full rounded-[8px] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,0.2)] group cursor-pointer"
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
                            }}
                        >
                            <motion.img
                                src={images[2].url}
                                alt={images[2].alt}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                            <motion.div
                                className="absolute bottom-6 left-6 right-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-white text-sm font-light tracking-wide">{images[2].caption}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Bottom - Small square image */}
                    <motion.div
                        className="absolute right-[12%] bottom-[100px] w-[320px] h-[280px] z-15"
                        style={{ y: y4 }}
                        initial={{ opacity: 0, x: 100, y: 80 }}
                        animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                        transition={{ duration: 1.4, delay: 0.5, ease: [0.19, 1, 0.22, 1] }}
                    >
                        <motion.div
                            className="relative w-full h-full rounded-[8px] overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.2)] group cursor-pointer"
                            whileHover={{
                                scale: 1.03,
                                transition: { duration: 0.6, ease: [0.19, 1, 0.22, 1] }
                            }}
                        >
                            <motion.img
                                src={images[3].url}
                                alt={images[3].alt}
                                className="w-full h-full object-cover"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.8, ease: [0.19, 1, 0.22, 1] }}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                            <motion.div
                                className="absolute bottom-6 left-6 right-6"
                                initial={{ opacity: 0, y: 20 }}
                                whileHover={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4 }}
                            >
                                <p className="text-white text-sm font-light tracking-wide">{images[3].caption}</p>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Decorative elements - Negative space enhancers */}
                    <motion.div
                        className="absolute left-[25%] top-[15%] w-24 h-24 rounded-full blur-[80px] opacity-20 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, #FF8A73 0%, transparent 70%)',
                            y: useTransform(scrollYProgress, [0, 1], [0, -60])
                        }}
                    />
                    <motion.div
                        className="absolute right-[35%] bottom-[20%] w-40 h-40 rounded-full blur-[100px] opacity-15 pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, #A3836B 0%, transparent 70%)',
                            y: useTransform(scrollYProgress, [0, 1], [0, 80])
                        }}
                    />
                </div>

                {/* Editorial text - positioned with intentional negative space */}
                <motion.div
                    className="relative mt-32 max-w-[600px] mx-auto text-center z-40"
                    initial={{ opacity: 0, y: 60 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1.2, delay: 0.8, ease: [0.19, 1, 0.22, 1] }}
                >
                    <motion.h2
                        className="text-5xl font-light mb-6 tracking-tight"
                        style={{ color: '#1A3C5A', lineHeight: '1.2' }}
                    >
                        Curated Journeys,
                        <br />
                        <span style={{ color: '#A3836B' }}>Shared Moments</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg font-light leading-relaxed"
                        style={{ color: '#1A3C5A', opacity: 0.7 }}
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 0.7 } : {}}
                        transition={{ duration: 1, delay: 1.2 }}
                    >
                        Every companion, every destination, every experience—
                        <br />
                        thoughtfully matched to create memories that transcend the ordinary.
                    </motion.p>
                </motion.div>
            </div>
        </section>
    );
}
