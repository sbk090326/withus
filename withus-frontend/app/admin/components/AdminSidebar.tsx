'use client';

import React from 'react';
import { motion } from 'motion/react';
import {
    LayoutDashboard,
    Bell,
    Users,
    Map,
    ShieldAlert,
    BarChart3,
    Settings,
    LogOut,
    CheckCircle2,
    AlertCircle,
    ArrowUpRight,
    ShoppingBag,
    Link2,
    DollarSign,
    Ticket
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { palette } from '@/app/components/design-system/constants';

interface SidebarItemProps {
    icon: any;
    label: string;
    href: string;
    active?: boolean;
    badge?: number;
}

const SidebarItem = ({ icon: Icon, label, href, active, badge }: SidebarItemProps) => {
    const pathname = usePathname();
    const isActuallyActive = pathname === href;

    return (
        <Link href={href} className="block w-full px-2">
            <button className={`w-full flex items-center justify-between px-5 py-3 rounded-xl transition-all ${isActuallyActive
                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                }`}>
                <div className="flex items-center gap-3">
                    <Icon size={18} />
                    <span className="font-bold text-xs tracking-tight">{label}</span>
                </div>
                {badge && (
                    <span className="bg-orange-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-lg shadow-sm">
                        {badge}
                    </span>
                )}
            </button>
        </Link>
    );
};

export const AdminSidebar = () => {
    return (
        <aside className="w-64 h-screen sticky top-0 bg-white border-r border-slate-100 flex flex-col shrink-0 z-50 overflow-hidden">
            {/* Logo Area */}
            <div className="p-8 pb-6 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-900 flex items-center justify-center text-white font-black text-lg">
                    W
                </div>
                <div className="leading-none">
                    <h1 className="text-lg font-black text-slate-900 tracking-tighter">WITHUS</h1>
                    <p className="text-[9px] font-black text-orange-500 uppercase tracking-widest mt-1">Admin Center</p>
                </div>
            </div>

            {/* Scrollable Nav Area */}
            <div className="flex-1 overflow-y-auto py-2 space-y-8 scrollbar-hide">
                <div className="space-y-1">
                    <p className="px-6 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Management</p>
                    <SidebarItem icon={LayoutDashboard} label="대시보드 홈" href="/admin" />
                    <SidebarItem icon={Bell} label="공지사항 관리" href="/admin/notice" />
                    <SidebarItem icon={Users} label="유저 및 매너온도" href="/admin/users" badge={12} />
                    <SidebarItem icon={Map} label="공식 가이드 발행" href="/admin/guides" />
                </div>

                <div className="space-y-1">
                    <p className="px-6 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Business & Revenue</p>
                    <SidebarItem icon={ShoppingBag} label="상품 및 서비스 관리" href="/admin/commerce" />
                    <SidebarItem icon={Link2} label="제휴사 API 관리" href="/admin/affiliates" />
                    <SidebarItem icon={DollarSign} label="수익 총괄 현황" href="/admin/revenue" />
                    <SidebarItem icon={Ticket} label="프로모션 쿠폰" href="/admin/coupons" />
                </div>

                <div className="space-y-1">
                    <p className="px-6 text-[9px] font-black text-slate-300 uppercase tracking-widest mb-2">Content Control</p>
                    <SidebarItem icon={ShieldAlert} label="신고된 게시글" href="/admin/reports" badge={3} />
                    <SidebarItem icon={BarChart3} label="트래픽 통계" href="/admin/stats" />
                    <SidebarItem icon={Settings} label="플랫폼 설정" href="/admin/settings" />
                </div>
            </div>

            {/* Profile Footer */}
            <div className="p-4 bg-slate-50/50 border-t border-slate-50">
                <div className="p-3 rounded-xl bg-white border border-slate-100 flex items-center gap-3 mb-2 shadow-sm">
                    <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-lg grayscale-0">
                        👨‍💻
                    </div>
                    <div className="min-w-0">
                        <p className="text-xs font-black text-slate-900 truncate">Admin Genie</p>
                        <p className="text-[9px] font-bold text-orange-500 tracking-tighter uppercase">Super User</p>
                    </div>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all font-bold text-[11px]">
                    <LogOut size={14} />
                    로그아웃
                </button>
            </div>
        </aside>
    );
};
