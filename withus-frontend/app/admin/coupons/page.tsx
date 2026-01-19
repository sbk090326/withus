'use client';

import React, { useState } from 'react';
import {
    Ticket,
    Plus,
    MoreVertical,
    Tag,
    Users,
    DollarSign,
    ArrowUpRight,
    CheckCircle2,
    Clock,
    XCircle,
    Copy,
    Download,
    Edit2,
    Trash2,
    Percent,
    Calendar
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { StatCard } from '../components/StatCard';
import { FilterTabs } from '../components/FilterTabs';
import { DataTable } from '../components/DataTable';

const initialCoupons = [
    {
        id: 1,
        name: "신규 가입 환영 할인",
        code: "WELCOME2026",
        type: "Percentage",
        value: 10,
        usage: 1240,
        limit: null,
        status: "Active",
        expiry: "2026.12.31",
        target: "New Users"
    },
    {
        id: 2,
        name: "겨울 홋카이도 프로모션",
        code: "WINTERHOK",
        type: "Fixed",
        value: 20000,
        usage: 450,
        limit: 500,
        status: "Active",
        expiry: "2026.02.28",
        target: "All Users"
    },
    {
        id: 3,
        name: "베스트 리뷰어 감사 쿠폰",
        code: "THANKS_REVIEW",
        type: "Percentage",
        value: 15,
        usage: 12,
        limit: 50,
        status: "Draft",
        expiry: "2026.06.30",
        target: "Reviewers"
    },
    {
        id: 4,
        name: "2025 연말 정기 세일",
        code: "BYE2025",
        type: "Fixed",
        value: 10000,
        usage: 2000,
        limit: 2000,
        status: "Expired",
        expiry: "2025.12.31",
        target: "All Users"
    }
];

export default function CouponManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('전체');
    const [coupons, setCoupons] = useState(initialCoupons);
    const [showCreateModal, setShowCreateModal] = useState(false);

    const filteredCoupons = coupons.filter((coupon) => {
        const matchesTab =
            activeTab === '전체' ||
            (activeTab === '발행 중' && coupon.status === 'Active') ||
            (activeTab === '임시 저장' && coupon.status === 'Draft') ||
            (activeTab === '만료됨' && coupon.status === 'Expired');

        const matchesSearch =
            coupon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            coupon.code.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const copyCouponCode = (code: string) => {
        navigator.clipboard.writeText(code);
        alert(`쿠폰 코드 "${code}"가 클립보드에 복사되었습니다!`);
    };

    const deleteCoupon = (id: number) => {
        const coupon = coupons.find(c => c.id === id);
        if (confirm(`정말 "${coupon?.name}" 쿠폰을 삭제하시겠습니까?`)) {
            setCoupons(coupons.filter(c => c.id !== id));
        }
    };

    const toggleStatus = (id: number) => {
        setCoupons(coupons.map(c =>
            c.id === id
                ? { ...c, status: c.status === 'Active' ? 'Draft' : 'Active' }
                : c
        ));
    };

    // Calculate statistics
    const activeCoupons = coupons.filter(c => c.status === 'Active').length;
    const totalClaims = coupons.reduce((sum, c) => sum + c.usage, 0);

    const totalDiscountValue = coupons.reduce((sum, c) => {
        if (c.type === 'Fixed') {
            return sum + (c.value * c.usage);
        } else {
            // Assume average order value of 200,000 for percentage discounts
            return sum + (200000 * (c.value / 100) * c.usage);
        }
    }, 0);

    const redemptionRate = coupons.reduce((sum, c) => {
        if (c.limit) {
            return sum + ((c.usage / c.limit) * 100);
        }
        return sum;
    }, 0) / coupons.filter(c => c.limit).length || 0;

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={Ticket}
                    category="Promotion & Marketing"
                    title="프로모션 쿠폰 관리"
                    action={
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-500 text-white font-black text-sm shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all"
                        >
                            <Plus size={20} />
                            새 쿠폰 발행하기
                        </button>
                    }
                />

                <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <StatCard
                        title="Active Coupons"
                        value={`${activeCoupons}개`}
                        change="+2"
                        isPositive={true}
                        icon={Ticket}
                        color="#f97316"
                    />
                    <StatCard
                        title="Total Claims"
                        value={`${(totalClaims / 1000).toFixed(1)}k`}
                        change="+12%"
                        isPositive={true}
                        icon={Users}
                        color="#3b82f6"
                    />
                    <StatCard
                        title="Total Discount Value"
                        value={`₩${(totalDiscountValue / 1000000).toFixed(1)}M`}
                        change="+8%"
                        isPositive={true}
                        icon={DollarSign}
                        color="#10b981"
                    />
                    <StatCard
                        title="Redemption Rate"
                        value={`${redemptionRate.toFixed(1)}%`}
                        change="-2.1%"
                        isPositive={false}
                        icon={ArrowUpRight}
                        color="#6366f1"
                    />
                </section>

                <FilterTabs
                    tabs={['전체', '발행 중', '임시 저장', '만료됨']}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    searchPlaceholder="쿠폰명 또는 코드 검색..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <DataTable headers={['쿠폰 정보 / 코드', '유형 / 혜택', '사용 현황', '대상', '만료일', '상태', '관리']}>
                    {filteredCoupons.map((coupon) => {
                        const usagePercent = coupon.limit ? (coupon.usage / coupon.limit) * 100 : 0;

                        return (
                            <tr key={coupon.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex flex-col gap-1">
                                        <p className="text-sm font-black text-slate-900 group-hover:text-orange-500 transition-colors uppercase tracking-tight">{coupon.name}</p>
                                        <div className="flex items-center gap-2">
                                            <code className="px-2 py-0.5 rounded bg-slate-100 text-[11px] font-black text-slate-600 tracking-wider">{coupon.code}</code>
                                            <button
                                                onClick={() => copyCouponCode(coupon.code)}
                                                className="p-1 rounded text-slate-400 hover:bg-slate-200 hover:text-slate-900 transition-all"
                                                title="코드 복사"
                                            >
                                                <Copy size={12} />
                                            </button>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-orange-50 text-orange-500">
                                            {coupon.type === 'Percentage' ? <Percent size={14} /> : <Tag size={14} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900">
                                                {coupon.type === 'Percentage' ? `${coupon.value}%` : `₩${coupon.value.toLocaleString()}`}
                                            </p>
                                            <p className="text-[10px] font-bold text-slate-400">{coupon.type}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <p className="text-sm font-black text-slate-900">
                                        {coupon.usage.toLocaleString()} / {coupon.limit ? coupon.limit.toLocaleString() : 'Unlimit'}
                                    </p>
                                    {coupon.limit && (
                                        <div className="w-20 h-1 bg-slate-100 rounded-full mx-auto mt-1.5 overflow-hidden">
                                            <div
                                                className={`h-full ${usagePercent >= 90 ? 'bg-red-500' : usagePercent >= 70 ? 'bg-orange-500' : 'bg-emerald-500'}`}
                                                style={{ width: `${Math.min(usagePercent, 100)}%` }}
                                            />
                                        </div>
                                    )}
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <span className="text-[10px] font-black text-slate-500 bg-slate-50 px-2 py-1 rounded-lg uppercase tracking-widest">{coupon.target}</span>
                                </td>
                                <td className="px-8 py-6 text-sm font-bold text-slate-400">{coupon.expiry}</td>
                                <td className="px-8 py-6 text-center">
                                    <button
                                        onClick={() => toggleStatus(coupon.id)}
                                        disabled={coupon.status === 'Expired'}
                                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${coupon.status === 'Active' ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100' :
                                                coupon.status === 'Draft' ? 'bg-orange-50 text-orange-600 hover:bg-orange-100' :
                                                    'bg-red-50 text-red-600 cursor-not-allowed'
                                            }`}
                                    >
                                        {coupon.status === 'Active' ? <CheckCircle2 size={12} /> :
                                            coupon.status === 'Draft' ? <Clock size={12} /> : <XCircle size={12} />}
                                        {coupon.status}
                                    </button>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all" title="수정">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 transition-all" title="다운로드">
                                            <Download size={18} />
                                        </button>
                                        <button
                                            onClick={() => deleteCoupon(coupon.id)}
                                            className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                            title="삭제"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </DataTable>

                {filteredCoupons.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <Ticket size={32} className="text-slate-300" />
                        </div>
                        <p className="text-lg font-black text-slate-400">검색 결과가 없습니다</p>
                        <p className="text-sm font-bold text-slate-300 mt-2">다른 검색어나 필터를 시도해보세요</p>
                    </div>
                )}

                {/* Create Coupon Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-8">
                        <div className="bg-white rounded-[3rem] max-w-2xl w-full shadow-2xl">
                            <div className="p-10 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">새 쿠폰 발행하기</h3>
                                        <p className="text-sm font-bold text-slate-400">프로모션 쿠폰을 생성하세요</p>
                                    </div>
                                    <button
                                        onClick={() => setShowCreateModal(false)}
                                        className="p-3 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                    >
                                        <XCircle size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-10 space-y-6 max-h-[60vh] overflow-y-auto">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">쿠폰명</label>
                                    <input
                                        type="text"
                                        placeholder="예: 신규 가입 환영 할인"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">쿠폰 코드</label>
                                    <input
                                        type="text"
                                        placeholder="WELCOME2026"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 uppercase"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">할인 유형</label>
                                        <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                                            <option>Percentage (%)</option>
                                            <option>Fixed (₩)</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">할인 값</label>
                                        <input
                                            type="number"
                                            placeholder="10"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">사용 제한</label>
                                        <input
                                            type="number"
                                            placeholder="500 (빈칸 시 무제한)"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">대상 유저</label>
                                        <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                                            <option>All Users</option>
                                            <option>New Users</option>
                                            <option>Reviewers</option>
                                            <option>VIP Members</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Calendar size={12} />
                                        만료일
                                    </label>
                                    <input
                                        type="date"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>
                            </div>

                            <div className="p-10 border-t border-slate-100 flex gap-4">
                                <button
                                    onClick={() => setShowCreateModal(false)}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black text-sm hover:bg-slate-200 transition-all"
                                >
                                    취소
                                </button>
                                <button className="flex-1 px-6 py-4 rounded-2xl bg-slate-200 text-slate-600 font-black text-sm hover:bg-slate-300 transition-all">
                                    임시저장
                                </button>
                                <button className="flex-1 px-6 py-4 rounded-2xl bg-orange-500 text-white font-black text-sm hover:scale-105 transition-all shadow-xl shadow-orange-500/20">
                                    발행하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
