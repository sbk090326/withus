'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, User, Search } from 'lucide-react';
import { colors, borderRadius, animations, theme as designTheme } from '@/app/components/design-system/constants';

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
        "일본", "혼자 여행", "맛집 투어", "유럽 여름", "하이킹"
    ];

    // Sample data for autocomplete
    const destinations = [
        "서울, 대한민국", "도쿄, 일본", "오사카, 일본", "교토, 일본",
        "파리, 프랑스", "런던, 영국", "뉴욕, 미국", "방콕, 태국",
        "싱가포르", "발리, 인도네시아", "바르셀로나, 스페인", "로마, 이탈리아",
        "시드니, 호주", "다낭, 베트남", "제주도"
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
                    label="여행지"
                    placeholder="어디로 떠나세요?"
                    theme={theme}
                    isActive={activeField === 'location'}
                    onClick={() => setActiveField('location')}
                    value={searchValues.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    list="destinations-list"
                />
                <SearchField
                    icon={<Calendar size={22} />}
                    label="일정"
                    placeholder="언제 떠나시나요?"
                    theme={theme}
                    isActive={activeField === 'dates'}
                    onClick={() => setActiveField('dates')}
                    value={searchValues.dates}
                    onChange={(e) => handleInputChange('dates', e.target.value)}
                    type="date"
                />
                <SearchField
                    icon={<User size={22} />}
                    label="인원"
                    placeholder="몇 명인가요?"
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
                <span
                    className="text-sm font-medium mr-2"
                    style={{ color: theme === 'dark' ? 'rgba(255,255,255,0.7)' : designTheme.colors.text.secondary }}
                >
                    인기:
                </span>
                {popularTags.map((tag, i) => (
                    <motion.button
                        key={tag}
                        className="px-4 py-1.5 rounded-full backdrop-blur-md border text-sm font-medium transition-all cursor-pointer"
                        style={{
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.6)',
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.1)' : designTheme.colors.primary.light,
                            color: theme === 'dark' ? 'rgba(255,255,255,0.9)' : designTheme.colors.text.secondary,
                        }}
                        whileHover={{
                            y: -2,
                            backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)',
                            borderColor: theme === 'dark' ? 'rgba(255,255,255,0.3)' : designTheme.colors.primary.hover,
                            color: theme === 'dark' ? '#fff' : designTheme.colors.primary.hover,
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        #{tag}
                    </motion.button>
                ))}
            </motion.div>
        </div>
    );
}
