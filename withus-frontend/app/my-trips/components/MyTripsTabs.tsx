'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, FileText, Users, Heart } from 'lucide-react';

interface MyTripsTabsProps {
    activeTab: string;
    onTabChange: (tab: string) => void;
}

const tabs = [
    { id: 'planner', label: '여행 플래너', icon: Calendar },
    { id: 'checklist', label: '공동 체크리스트', icon: FileText },
    { id: 'participation', label: '참여 현황', icon: Users },
    { id: 'activity', label: '내 활동 관리', icon: Heart },
];

export const MyTripsTabs = ({ activeTab, onTabChange }: MyTripsTabsProps) => {
    return (
        <div className="flex items-center gap-1 bg-white/50 p-1.5 rounded-[24px] border border-white max-w-fit overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;

                return (
                    <button
                        key={tab.id}
                        onClick={() => onTabChange(tab.id)}
                        className={`relative flex items-center gap-2.5 px-6 py-3.5 rounded-[18px] font-bold text-sm whitespace-nowrap transition-all ${isActive
                            ? 'text-white shadow-lg'
                            : 'text-slate-500 hover:text-slate-900'
                            }`}
                    >
                        <Icon size={18} className="relative z-10" />
                        <span className="relative z-10">{tab.label}</span>
                        {isActive && (
                            <motion.div
                                layoutId="activeTripTab"
                                className="absolute inset-0 bg-slate-900 rounded-[18px]"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                );
            })}
        </div>
    );
};
