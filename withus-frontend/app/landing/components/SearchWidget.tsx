'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, User, Search } from 'lucide-react';
import { colors, borderRadius, animations } from '@/app/components/design-system/constants';

interface SearchFieldProps {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    hasSeparator?: boolean;
    theme?: 'light' | 'dark';
}

const SearchField = ({ icon, label, placeholder, hasSeparator = true, theme = 'dark' }: SearchFieldProps) => (
    <div className={`flex items-center gap-4 flex-1 px-6 ${hasSeparator ? (theme === 'dark' ? 'border-r border-white/20' : 'border-r border-black/10') : ''}`}>
        <div className={theme === 'dark' ? 'text-white/80' : 'text-[#1A3C5A]/80'}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span className={`text-xs font-medium uppercase tracking-wider mb-1 ${theme === 'dark' ? 'text-white/60' : 'text-[#1A3C5A]/60'}`}>{label}</span>
            <input
                type="text"
                placeholder={placeholder}
                className={`bg-transparent border-none outline-none w-full font-medium ${theme === 'dark' ? 'text-white placeholder-white/90' : 'text-[#1A3C5A] placeholder-[#1A3C5A]/50'}`}
            />
        </div>
    </div>
);

export function SearchWidget({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
    return (
        <motion.div
            className={`w-full max-w-[900px] h-[88px] backdrop-blur-xl rounded-full flex items-center p-2 pl-4 shadow-2xl ${theme === 'dark'
                ? 'bg-black/20 border border-white/10'
                : 'bg-white/60 border border-white/40' // Added white/40 border for light mode
                }`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: animations.duration.normal, delay: 0.4, ease: animations.easing.smooth }}
        >
            <SearchField
                icon={<MapPin size={20} />}
                label="Location"
                placeholder="Where to next?"
                theme={theme}
            />
            <SearchField
                icon={<Calendar size={20} />}
                label="Date"
                placeholder="Pick your dates"
                theme={theme}
            />
            <SearchField
                icon={<User size={20} />}
                label="Guests"
                placeholder="2 Persons, 1 Room"
                hasSeparator={false}
                theme={theme}
            />

            <motion.button
                className={`h-[72px] px-8 rounded-full font-semibold text-lg flex items-center gap-2 transition-colors ${theme === 'dark'
                    ? 'bg-white text-[#1A3C5A] hover:bg-white/90'
                    : 'bg-[#1A3C5A] text-white hover:bg-[#1A3C5A]/90'
                    }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span>Find my trip</span>
            </motion.button>
        </motion.div>
    );
}
