'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { MapPin, Calendar, User, Search } from 'lucide-react';
import { colors, animations, theme as designTheme } from '@/app/components/design-system/constants';

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

const SearchField = ({ icon, label, placeholder, value, onChange, hasSeparator = true, theme = 'dark', isActive = false, onClick, type = "text", list, min }: SearchFieldProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const handleContainerClick = () => {
        onClick?.();
        // input에 포커스
        inputRef.current?.focus();
        // 날짜 입력인 경우 달력 열기
        if (type === 'date' && inputRef.current) {
            try {
                (inputRef.current as any).showPicker?.();
            } catch (e) {
                // showPicker가 지원되지 않는 브라우저에서는 무시
            }
        }
    };

    return (
        <div
            className={`relative flex items-center gap-6 flex-1 px-5 py-2 cursor-pointer group transition-all duration-300 rounded-full hover:bg-white/5 ${isActive ? 'bg-white/10' : ''}`}
            onClick={handleContainerClick}
        >
            <div
                className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110"
                style={{
                    backgroundColor: theme === 'dark'
                        ? (isActive ? 'rgba(255, 126, 95, 0.15)' : 'rgba(255, 255, 255, 0.1)')
                        : (isActive ? 'rgba(255, 126, 95, 0.1)' : 'rgba(248, 250, 252, 1)'),
                    color: theme === 'dark'
                        ? (isActive ? '#FF7E5F' : 'rgba(255,255,255,0.8)')
                        : (isActive ? '#FF7E5F' : 'rgba(0,0,0,0.6)')
                }}
            >
                {icon}
            </div>
            <div className="flex flex-col min-w-0 w-full">
                <span
                    className="text-[10px] font-semibold uppercase tracking-wide mb-0.5 transition-colors duration-300"
                    style={{
                        color: theme === 'dark'
                            ? (isActive ? '#fff' : 'rgba(255,255,255,0.6)')
                            : (isActive ? colors.primary.main : 'rgba(0,0,0,0.5)')
                    }}
                >
                    {label}
                </span>
                <input
                    ref={inputRef}
                    type={type}
                    list={list}
                    min={min}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={`bg-transparent border-none outline-none w-full font-medium text-base p-0 placeholder-gray-400/60 ${type === 'date' ? 'uppercase [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-inner-spin-button]:hidden' : ''}`}
                    style={{
                        color: theme === 'dark' ? colors.neutral.white : 'rgba(156, 163, 175, 0.8)',
                        textOverflow: 'ellipsis',
                        colorScheme: theme === 'dark' ? 'dark' : 'light'
                    }}
                />
            </div>

            {/* Separator */}
            {hasSeparator && (
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-10 w-[1px] bg-slate-200/60 group-hover:bg-slate-200/40 transition-colors" />
            )}
        </div>
    );
};

export function SearchWidget({ theme = 'dark' }: { theme?: 'light' | 'dark' }) {
    const [activeField, setActiveField] = useState<string | null>(null);
    const [searchValues, setSearchValues] = useState({ location: '', dates: '', guests: '' });

    const handleInputChange = (field: string, value: string) => {
        setSearchValues(prev => ({ ...prev, [field]: value }));
    };

    const popularTags = [
        "제주도", "혼자 여행", "맛집 투어", "당일치기", "힐링 여행"
    ];

    // Sample data for autocomplete - 국내외 여행지
    const destinations = [
        "서울", "부산", "제주도", "강릉",
        "경주", "전주", "여수", "속초",
        "대구", "광주", "인천", "포항",
        "춘천", "평창", "보령", "통영",
        "도쿄", "파리", "방콕", "뉴욕",
        "바르셀로나", "런던", "로마", "싱가포르"
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
                className="w-full max-w-[1000px] h-[80px] backdrop-blur-xl rounded-full flex items-center px-6 transition-all duration-300 relative z-20"
                style={{
                    backgroundColor: theme === 'dark' ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.9)',
                    borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.8)',
                    borderWidth: '1px',
                    // 떠있는 느낌을 주는 그림자 (3중 레이어)
                    boxShadow: theme === 'dark'
                        ? '0 20px 60px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(0, 0, 0, 0.3), 0 5px 15px rgba(0, 0, 0, 0.2)'
                        : '0 20px 60px rgba(0, 0, 0, 0.12), 0 10px 30px rgba(0, 0, 0, 0.08), 0 5px 15px rgba(0, 0, 0, 0.05)',
                    // 살짝 위로 올라가는 효과
                    transform: 'translateY(-4px)'
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: animations.duration.normal, delay: 0.4, ease: animations.easing.smooth }}
                // 호버 시 더 떠오르는 효과
                whileHover={{
                    y: -2,
                    boxShadow: theme === 'dark'
                        ? '0 25px 70px rgba(0, 0, 0, 0.6), 0 15px 40px rgba(0, 0, 0, 0.4), 0 8px 20px rgba(0, 0, 0, 0.3)'
                        : '0 25px 70px rgba(0, 0, 0, 0.15), 0 15px 40px rgba(0, 0, 0, 0.1), 0 8px 20px rgba(0, 0, 0, 0.08)'
                }}
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
                    className="h-[52px] w-[52px] rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300 shadow-md"
                    style={{
                        backgroundColor: colors.primary.main,
                        color: '#fff'
                    }}
                    whileHover={{ scale: 1.05, backgroundColor: colors.primary.hover }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Search size={22} strokeWidth={2.5} />
                </motion.button>
            </motion.div>

            {/* Quick Tags */}
            <motion.div
                className="mt-10 flex flex-wrap items-center justify-center gap-3"
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
