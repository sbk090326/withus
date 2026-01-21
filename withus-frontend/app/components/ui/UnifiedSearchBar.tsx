'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Search, X } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

export interface SearchFieldConfig {
    id: string;
    icon: React.ReactNode;
    placeholder: string;
    type?: 'text' | 'date' | 'number';
    value: string;
    onChange: (value: string) => void;
}

interface UnifiedSearchBarProps {
    fields: SearchFieldConfig[];
    onSearch: () => void;
    buttonText?: string;
    buttonStyle?: React.CSSProperties;
    iconColor?: string;
    className?: string;
}

export const UnifiedSearchBar = ({
    fields,
    onSearch,
    buttonText = '검색',
    buttonStyle = { background: 'linear-gradient(to right, #f97316, #ec4899)' },
    iconColor = 'text-orange-500',
    className = ''
}: UnifiedSearchBarProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className={`w-full mx-auto ${className}`}
        >
            <div className="bg-white/70 backdrop-blur-xl border border-white p-2 md:p-3 rounded-[32px] shadow-2xl flex flex-col md:flex-row items-center gap-2">
                {fields.map((field, index) => (
                    <React.Fragment key={field.id}>
                        <div className={`flex-1 flex items-center gap-3 px-6 py-4 w-full group relative transition-all duration-300 ${index < fields.length - 1 ? 'border-b md:border-b-0 md:border-r border-slate-100' : ''}`}>
                            <div className={`${iconColor} flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                                {field.icon}
                            </div>
                            <input
                                type={field.type || 'text'}
                                placeholder={field.placeholder}
                                className="bg-transparent border-none outline-none w-full text-slate-900 font-semibold placeholder:text-slate-400 text-sm md:text-base selection:bg-orange-100"
                                value={field.value}
                                onChange={(e) => field.onChange(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && onSearch()}
                            />
                            {field.value && (
                                <button
                                    onClick={() => field.onChange('')}
                                    className="text-slate-300 hover:text-slate-500 transition-colors"
                                >
                                    <X size={16} />
                                </button>
                            )}
                        </div>
                    </React.Fragment>
                ))}

                <motion.button
                    onClick={onSearch}
                    className="w-full md:w-auto px-10 py-5 rounded-full text-white font-bold shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-2"
                    style={buttonStyle}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <Search size={22} />
                    {buttonText}
                </motion.button>
            </div>
        </motion.div>
    );
};

