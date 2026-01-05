'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, User, Search } from 'lucide-react';
import { colors, borderRadius, animations } from '@/app/components/design-system/constants';

interface SearchFieldProps {
    icon: React.ReactNode;
    label: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    hasSeparator?: boolean;
    theme?: 'light' | 'dark';
    isActive?: boolean;
    onClick?: () => void;
    type?: string;
    list?: string;
    min?: string;
}

const SearchField = ({ icon, label, placeholder, value, onChange, hasSeparator = true, theme = 'dark', isActive = false, onClick, type = "text", list, min }: SearchFieldProps) => (
    <div
        className={`relative flex items-center gap-4 flex-1 px-8 py-3 cursor-pointer group transition-all duration-300 rounded-full hover:bg-white/10 ${isActive ? 'bg-white/20' : ''}`}
        onClick={onClick}
    >
        <div
            className="transition-colors duration-300 flex-shrink-0"
            style={{
                color: theme === 'dark'
                    ? (isActive ? '#fff' : 'rgba(255,255,255,0.8)')
                    : (isActive ? colors.primary.main : colors.text.primary)
            }}
        >
            {icon}
        </div>
        <div className="flex flex-col min-w-0 w-full">
            <span
                className="text-xs font-bold uppercase tracking-wider mb-0.5 transition-colors duration-300"
                style={{
                    color: theme === 'dark'
                        ? (isActive ? '#fff' : 'rgba(255,255,255,0.6)')
                        : (isActive ? colors.primary.main : colors.text.secondary)
                }}
            >
                {label}
            </span>
            <input
                type={type}
                list={list}
                min={min}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`bg-transparent border-none outline-none w-full font-medium text-lg p-0 placeholder-gray-400/70 ${type === 'date' ? 'uppercase' : ''}`}
                style={{
                    color: theme === 'dark' ? colors.neutral.white : colors.text.primary,
                    textOverflow: 'ellipsis',
                    colorScheme: theme === 'dark' ? 'dark' : 'light' // Fix calendar icon color
                }}
            />
        </div>

        {/* Separator */}
        {hasSeparator && (
            <div className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-[1px] bg-white/20 group-hover:hidden" />
        )}
    </div>
);

export function SearchWidget({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
    const [activeField, setActiveField] = useState<string | null>(null);
    const [searchValues, setSearchValues] = useState({ location: '', dates: '', guests: '' });

    const handleInputChange = (field: string, value: string) => {
        setSearchValues(prev => ({ ...prev, [field]: value }));
    };

    const popularTags = [
        "Japan", "Solo Trip", "Food Tour", "Europe Summer", "Hiking"
    ];

    // Sample data for autocomplete
    const destinations = [
        "Seoul, South Korea", "Tokyo, Japan", "Osaka, Japan", "Kyoto, Japan",
        "Paris, France", "London, UK", "New York, USA", "Bangkok, Thailand",
        "Singapore", "Bali, Indonesia", "Barcelona, Spain", "Rome, Italy",
        "Sydney, Australia", "Vietnam", "Jeju Island, Korea"
    ];

    return (
        <div className="w-full flex flex-col items-center">

            {/* Datalist for Autocomplete */}
            <datalist id="destinations-list">
                {destinations.map((place, i) => (
                    <option key={i} value={place} />
                ))}
            </datalist>

            {/* Main Search Bar */}
            <motion.div
                className="w-full max-w-[920px] h-[92px] backdrop-blur-xl rounded-full flex items-center p-2 pl-4 shadow-2xl transition-all duration-300 relative z-20"
                style={{
                    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.8)',
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.5)',
                    borderWidth: '1px'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animations.duration.normal, delay: 0.4, ease: animations.easing.smooth }}
            >
                <SearchField
                    icon={<MapPin size={22} />}
                    label="Destination"
                    placeholder="Where to?"
                    theme={theme}
                    isActive={activeField === 'location'}
                    onClick={() => setActiveField('location')}
                    value={searchValues.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    list="destinations-list"
                />
                <SearchField
                    icon={<Calendar size={22} />}
                    label="Dates"
                    placeholder="Add dates"
                    theme={theme}
                    isActive={activeField === 'dates'}
                    onClick={() => setActiveField('dates')}
                    value={searchValues.dates}
                    onChange={(e) => handleInputChange('dates', e.target.value)}
                    type="date"
                />
                <SearchField
                    icon={<User size={22} />}
                    label="Travelers"
                    placeholder="Guests"
                    hasSeparator={false}
                    theme={theme}
                    isActive={activeField === 'guests'}
                    onClick={() => setActiveField('guests')}
                    value={searchValues.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    type="number"
                    min="1"
                />

                <motion.button
                    className="h-[64px] w-[64px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-lg ml-2"
                    style={{
                        backgroundColor: colors.primary.main,
                        color: '#fff'
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: colors.primary.hover }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Search size={26} strokeWidth={2.5} />
                </motion.button>
            </motion.div>

            {/* Quick Tags */}
            <motion.div
                className="mt-6 flex flex-wrap items-center justify-center gap-3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
            >
                <span className="text-white/70 text-sm font-medium mr-2">Popular:</span>
                {popularTags.map((tag, i) => (
                    <motion.button
                        key={tag}
                        className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white/90 text-sm font-medium hover:bg-white/20 hover:border-white/30 transition-all cursor-pointer"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        #{tag}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}
