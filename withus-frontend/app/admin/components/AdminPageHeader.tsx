'use client';

import React from 'react';
import { LucideIcon } from 'lucide-react';

interface AdminPageHeaderProps {
    icon: LucideIcon;
    category: string;
    title: string;
    action?: React.ReactNode;
}

export const AdminPageHeader = ({ icon: Icon, category, title, action }: AdminPageHeaderProps) => {
    return (
        <header className="flex items-center justify-between mb-12">
            <div>
                <div className="flex items-center gap-3 text-slate-400 mb-2">
                    <Icon size={18} />
                    <span className="text-xs font-black uppercase tracking-widest">{category}</span>
                </div>
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter">{title}</h2>
            </div>
            {action && <div>{action}</div>}
        </header>
    );
};
