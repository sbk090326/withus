'use client';

import React from 'react';
import { Search } from 'lucide-react';

interface FilterTabsProps {
    tabs: string[];
    activeTab: string;
    onTabChange: (tab: string) => void;
    searchPlaceholder?: string;
    searchValue?: string;
    onSearchChange?: (value: string) => void;
    extraActions?: React.ReactNode;
}

export const FilterTabs = ({
    tabs,
    activeTab,
    onTabChange,
    searchPlaceholder,
    searchValue,
    onSearchChange,
    extraActions
}: FilterTabsProps) => {
    return (
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => onTabChange(tab)}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab
                                ? 'bg-slate-900 text-white shadow-md'
                                : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {(searchPlaceholder || extraActions) && (
                <div className="flex items-center gap-4 w-full md:w-auto">
                    {searchPlaceholder && onSearchChange && (
                        <div className="relative flex-1 md:w-80">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                placeholder={searchPlaceholder}
                                className="w-full pl-12 pr-6 py-3 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all"
                                value={searchValue}
                                onChange={(e) => onSearchChange(e.target.value)}
                            />
                        </div>
                    )}
                    {extraActions}
                </div>
            )}
        </section>
    );
};
