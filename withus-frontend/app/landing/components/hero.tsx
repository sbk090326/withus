'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, Users, Search } from 'lucide-react';

export function Hero() {
    const [focusedField, setFocusedField] = useState<string | null>(null);

    const trendingKeywords = [
        '#JapanSnaps',
        '#EuropeTrainTrip',
        '#JejuFoodTour',
        '#QuitJobTrip',
    ];

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: `url(https://images.unsplash.com/photo-1758411897778-c3d21ce4309a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzY2VuaWMlMjB0cmF2ZWwlMjBhZHZlbnR1cmUlMjBzdW5zZXR8ZW58MXx8fHwxNzY2NzM3MTAzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral)`,
                    }}
                >
                    {/* Gradient Overlay for Text Legibility */}
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'linear-gradient(to top, rgba(26, 60, 90, 0.5) 0%, rgba(26, 60, 90, 0.2) 50%, rgba(26, 60, 90, 0) 100%)',
                        }}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[1200px] mx-auto px-8 pt-32 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="text-center"
                >
                    {/* Main Heading */}
                    <motion.h1
                        className="mb-6"
                        style={{
                            fontSize: '64px',
                            lineHeight: '1.2',
                            color: '#A3836B',
                            textShadow: '0 2px 12px rgba(0, 0, 0, 0.1)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        When solo travel feels daunting, Withus.
                    </motion.h1>

                    {/* Subheading */}
                    <motion.p
                        className="mb-12"
                        style={{
                            fontSize: '24px',
                            color: '#FFFFFF',
                            textShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Share your unique travel style, and find your perfect companion.
                    </motion.p>

                    {/* Search Component */}
                    <motion.div
                        className="max-w-[1000px] mx-auto mb-8"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="flex items-center gap-3">
                            {/* Input Fields Container */}
                            <div
                                className="flex-1 backdrop-blur-md rounded-full p-2 shadow-2xl"
                                style={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
                                }}
                            >
                                <div className="flex items-stretch gap-1">
                                    {/* Location Input */}
                                    <div
                                        className={`flex items-center gap-3 flex-1 px-5 py-3 rounded-full transition-all duration-300 ${focusedField === 'location' ? 'bg-white shadow-md' : ''
                                            }`}
                                        style={{
                                            border:
                                                focusedField === 'location'
                                                    ? '2px solid #A3836B'
                                                    : '2px solid transparent',
                                        }}
                                    >
                                        <MapPin size={18} style={{ color: '#A3836B' }} />
                                        <input
                                            type="text"
                                            placeholder="Where are you going?"
                                            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm"
                                            style={{ color: '#1A3C5A' }}
                                            onFocus={() => setFocusedField('location')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                    </div>

                                    {/* Divider */}
                                    <div className="w-[1px] self-center h-6 bg-gray-300" />

                                    {/* Date Input */}
                                    <div
                                        className={`flex items-center gap-3 flex-1 px-5 py-3 rounded-full transition-all duration-300 ${focusedField === 'date' ? 'bg-white shadow-md' : ''
                                            }`}
                                        style={{
                                            border:
                                                focusedField === 'date'
                                                    ? '2px solid #A3836B'
                                                    : '2px solid transparent',
                                        }}
                                    >
                                        <Calendar size={18} style={{ color: '#A3836B' }} />
                                        <input
                                            type="text"
                                            placeholder="Date Selection"
                                            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm"
                                            style={{ color: '#1A3C5A' }}
                                            onFocus={() => setFocusedField('date')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                    </div>

                                    {/* Divider */}
                                    <div className="w-[1px] self-center h-6 bg-gray-300" />

                                    {/* Travelers Input */}
                                    <div
                                        className={`flex items-center gap-3 flex-1 px-5 py-3 rounded-full transition-all duration-300 ${focusedField === 'travelers' ? 'bg-white shadow-md' : ''
                                            }`}
                                        style={{
                                            border:
                                                focusedField === 'travelers'
                                                    ? '2px solid #A3836B'
                                                    : '2px solid transparent',
                                        }}
                                    >
                                        <Users size={18} style={{ color: '#A3836B' }} />
                                        <input
                                            type="text"
                                            placeholder="Travelers"
                                            className="flex-1 bg-transparent outline-none placeholder-gray-400 text-sm"
                                            style={{ color: '#1A3C5A' }}
                                            onFocus={() => setFocusedField('travelers')}
                                            onBlur={() => setFocusedField(null)}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Search Button - Separate on the right */}
                            <motion.button
                                className="flex items-center justify-center gap-2 px-8 py-4 rounded-full text-white transition-all duration-300 whitespace-nowrap font-medium shadow-2xl"
                                style={{
                                    background: 'linear-gradient(90deg, #FF8A73 0%, #A3836B 100%)',
                                    boxShadow: '0 8px 32px rgba(255, 138, 115, 0.4)',
                                }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: '0 12px 40px rgba(255, 138, 115, 0.5)',
                                }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Search size={20} />
                                Find Companions
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Trending Keywords */}
                    <motion.div
                        className="flex items-center justify-center gap-4 flex-wrap"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        {trendingKeywords.map((keyword, index) => (
                            <motion.button
                                key={keyword}
                                className="px-4 py-2 rounded-full backdrop-blur-sm transition-all duration-300 hover:backdrop-blur-md"
                                style={{
                                    color: '#1A3C5A',
                                    backgroundColor: 'rgba(255, 255, 255, 0.7)',
                                }}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                                whileHover={{
                                    backgroundColor: 'rgba(163, 131, 107, 0.1)',
                                    scale: 1.05,
                                }}
                            >
                                <span style={{ color: '#A3836B' }}>#</span>
                                {keyword.slice(1)}
                            </motion.button>
                        ))}
                    </motion.div>
                </motion.div>
            </div>

            {/* Subtle grain texture overlay */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.02'/%3E%3C/svg%3E")`,
                    opacity: 0.03,
                }}
            />
        </section>
    );
}
