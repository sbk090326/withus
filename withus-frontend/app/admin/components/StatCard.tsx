'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface StatCardProps {
    title: string;
    value: string | number;
    change?: string;
    isPositive?: boolean;
    icon: LucideIcon;
    color: string;
    subtitle?: string;
}

export const StatCard = ({ title, value, change, isPositive, icon: Icon, color, subtitle }: StatCardProps) => {
    const bgColor = `${color}/10`;

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
                <div className={`p-3 rounded-2xl bg-opacity-10`} style={{ backgroundColor: `${color}20` }}>
                    <Icon size={24} className={color.replace('bg-', 'text-')} style={{ color: color.replace('bg-', '') }} />
                </div>
                {change && (
                    <div className={`flex items-center gap-1 text-[11px] font-black px-2 py-1 rounded-lg ${isPositive ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'
                        }`}>
                        {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                        {change}
                    </div>
                )}
            </div>
            <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{title}</p>
                <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{value}</h4>
                {subtitle && <p className="text-[11px] font-bold text-slate-400 mt-1">{subtitle}</p>}
            </div>
        </div>
    );
};
