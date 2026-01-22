'use client';

import React from 'react';
import { motion } from 'motion/react';

interface EventTabsProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

export const EventTabs = ({ activeTab, setActiveTab }: EventTabsProps) => {
    const tabs = [
        { id: 'ongoing', label: '진행 중인 이벤트' },
        { id: 'ended', label: '종료된 이벤트' },
        { id: 'winners', label: '당첨자 발표' }
    ];

    return (
        <div className="max-w-[1240px] mx-auto px-6 mb-12">
            <div className="flex items-center gap-8 border-b border-slate-100 overflow-x-auto no-scrollbar">
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`relative pb-4 text-sm font-black transition-colors whitespace-nowrap ${activeTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        {tab.label}
                        {activeTab === tab.id && (
                            <motion.div
                                layoutId="activeTabBorder"
                                className="absolute bottom-0 left-0 right-0 h-1 bg-orange-500 rounded-full"
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};
