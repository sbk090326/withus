'use client';

import React from 'react';
import { motion } from 'motion/react';
import { LayoutGrid, MessageCircle, HelpCircle, Camera, Info, Map as MapIcon, Bell } from 'lucide-react';

interface CommunityTabsProps {
    activeCategory: string;
    onCategoryChange: (category: string) => void;
}

const categories = [
    { id: 'all', label: '전체', icon: LayoutGrid },
    { id: 'notice', label: '공지사항', icon: Bell }, // 신규 탭
    { id: 'course', label: '여행 코스', icon: MapIcon },
    { id: 'review', label: '여행후기', icon: Camera },
    { id: 'info', label: '정보공유', icon: Info },
    { id: 'qna', label: '질문/답변', icon: HelpCircle },
    { id: 'free', label: '자유게시판', icon: MessageCircle },
];

export const CommunityTabs = ({ activeCategory, onCategoryChange }: CommunityTabsProps) => {
    return (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {categories.map((category) => {
                const Icon = category.icon;
                const isActive = activeCategory === category.id;

                return (
                    <button
                        key={category.id}
                        onClick={() => onCategoryChange(category.id)}
                        className={`relative flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all ${isActive
                            ? 'text-white shadow-lg'
                            : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-300 hover:text-slate-800'
                            }`}
                    >
                        <Icon size={18} className="relative z-10" />
                        <span className="relative z-10">{category.label}</span>
                        {isActive && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-slate-900 rounded-2xl"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
