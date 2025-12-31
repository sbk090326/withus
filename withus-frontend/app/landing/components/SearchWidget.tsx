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
        <div style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.8)' : `${colors.primary.navy}cc` /* cc = 80% opacity */ }}>
            {icon}
        </div>
        <div className="flex flex-col">
            <span
                className="text-xs font-medium uppercase tracking-wider mb-1"
                style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.6)' : `${colors.primary.navy}99` /* 99 = 60% opacity */ }}
            >
                {label}
            </span>
            <input
                type="text"
                placeholder={placeholder}
                className="bg-transparent border-none outline-none w-full font-medium"
                style={{
                    color: theme === 'dark' ? colors.neutral.white : colors.primary.navy,
                    '--placeholder-color': theme === 'dark' ? 'rgba(255,255,255,0.9)' : `${colors.primary.navy}80`
                } as React.CSSProperties}
            />
            <style jsx>{`
                input::placeholder {
                    color: var(--placeholder-color) !important;
                }
            `}</style>
        </div>
    </div>
);

export function SearchWidget({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
    return (
        <motion.div
            className="w-full max-w-[900px] h-[88px] backdrop-blur-xl rounded-full flex items-center p-2 pl-4 shadow-2xl transition-colors duration-300"
            style={{
                backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.6)',
                borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)',
                borderWidth: '1px'
            }}
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
                className="h-[72px] px-8 rounded-full font-semibold text-lg flex items-center gap-2 transition-colors duration-300"
                style={{
                    backgroundColor: theme === 'dark' ? colors.neutral.white : colors.primary.navy,
                    color: theme === 'dark' ? colors.primary.navy : colors.neutral.white
                }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <span>Find my trip</span>
            </motion.button>
        </motion.div>
    );
}
