'use client';

import React, { useState } from 'react';
import {
    ShoppingBag,
    Plus,
    Filter,
    ExternalLink,
    TrendingUp,
    Hotel,
    Plane,
    Train,
    Ticket,
    MoreVertical,
    DollarSign,
    MousePointer2,
    BarChart2,
    Pause,
    Play,
    Trash2,
    XCircle,
    Link2,
    Percent
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { StatCard } from '../components/StatCard';
import { FilterTabs } from '../components/FilterTabs';
import { DataTable } from '../components/DataTable';

const initialProducts = [
    {
        id: 1,
        name: "파리 에펠탑 뷰 아다지오 아파트먼트",
        category: "숙소",
        provider: "Agoda",
        price: "245,000원",
        commission: 8,
        clicks: 1240,
        conversions: 45,
        status: "Active",
        image: "https://images.unsplash.com/photo-1502602898657-3e91724ac695?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 2,
        name: "삿포로 비에이/후라노 일일 투어 패키지",
        category: "액티비티",
        provider: "Klook",
        price: "89,000원",
        commission: 12,
        clicks: 3500,
        conversions: 128,
        status: "Active",
        image: "https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 3,
        name: "인천 - 도쿄 나리타 왕복 항공권 (대한항공)",
        category: "항공",
        provider: "Skyscanner",
        price: "420,000원",
        commission: 3,
        clicks: 890,
        conversions: 12,
        status: "Active",
        image: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=200"
    },
    {
        id: 4,
        name: "유로스타 런던 - 파리 편도 티켓",
        category: "기차",
        provider: "Trip.com",
        price: "115,000원",
        commission: 5,
        clicks: 560,
        conversions: 24,
        status: "Paused",
        image: "https://images.unsplash.com/photo-1474487059635-43a53272442d?auto=format&fit=crop&q=80&w=200"
    }
];

export default function CommerceManagementPage() {
    const [activeTab, setActiveTab] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState(initialProducts);
    const [showAddModal, setShowAddModal] = useState(false);

    const filteredProducts = products.filter((product) => {
        const matchesTab = activeTab === '전체' || product.category === activeTab;
        const matchesSearch =
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.provider.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const toggleStatus = (id: number) => {
        setProducts(products.map(p =>
            p.id === id
                ? { ...p, status: p.status === 'Active' ? 'Paused' : 'Active' }
                : p
        ));
    };

    const deleteProduct = (id: number) => {
        if (confirm('정말 이 상품을 삭제하시겠습니까?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    // Calculate statistics
    const totalClicks = products.reduce((sum, p) => sum + p.clicks, 0);
    const totalConversions = products.reduce((sum, p) => sum + p.conversions, 0);
    const estimatedRevenue = products.reduce((sum, p) => {
        const price = parseInt(p.price.replace(/[^0-9]/g, ''));
        return sum + (price * p.conversions * p.commission / 100);
    }, 0);
    const conversionRate = totalClicks > 0 ? ((totalConversions / totalClicks) * 100).toFixed(2) : '0';
    const activePartners = [...new Set(products.map(p => p.provider))].length;

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={ShoppingBag}
                    category="Business Management"
                    title="상품 및 서비스 관리"
                    action={
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                        >
                            <Plus size={20} />
                            외부 상품 연동하기
                        </button>
                    }
                />

                <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="총 클릭 수"
                        value={`${(totalClicks / 1000).toFixed(1)}k`}
                        change="+12.5%"
                        isPositive={true}
                        icon={MousePointer2}
                        color="#3b82f6"
                    />
                    <StatCard
                        title="예상 수수료 수익"
                        value={`₩${(estimatedRevenue / 1000000).toFixed(1)}M`}
                        change="+8.2%"
                        isPositive={true}
                        icon={DollarSign}
                        color="#10b981"
                    />
                    <StatCard
                        title="평균 전환율"
                        value={`${conversionRate}%`}
                        change="+1.2%"
                        isPositive={true}
                        icon={TrendingUp}
                        color="#f97316"
                    />
                    <StatCard
                        title="연동된 제휴사"
                        value={`${activePartners}개`}
                        subtitle="All systems active"
                        icon={BarChart2}
                        color="#6366f1"
                    />
                </section>

                <FilterTabs
                    tabs={['전체', '숙소', '항공', '기차', '액티비티']}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    searchPlaceholder="상품명 또는 제휴사 검색..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    extraActions={
                        <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-500 hover:text-slate-900 transition-all">
                            <Filter size={18} />
                        </button>
                    }
                />

                <DataTable headers={['상품 정보', '분류', '제휴사', '수수료율', '클릭 / 성과', '상태', '관리']}>
                    {filteredProducts.map((product) => (
                        <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl overflow-hidden shadow-sm flex-shrink-0 bg-slate-100">
                                        <img src={product.image} alt="" className="w-full h-full object-cover" onError={(e) => {
                                            e.currentTarget.style.display = 'none';
                                        }} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 line-clamp-1 group-hover:text-orange-500 transition-colors">{product.name}</p>
                                        <p className="text-[11px] font-bold text-slate-400 mt-0.5">{product.price}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-black w-fit uppercase tracking-wider">
                                    {product.category === '숙소' && <Hotel size={12} />}
                                    {product.category === '항공' && <Plane size={12} />}
                                    {product.category === '기차' && <Train size={12} />}
                                    {product.category === '액티비티' && <Ticket size={12} />}
                                    {product.category}
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-sm font-bold text-slate-600">{product.provider}</span>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-sm font-black text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{product.commission}%</span>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <p className="text-sm font-black text-slate-900">{product.clicks.toLocaleString()}</p>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Conv. {product.conversions}</p>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <button
                                    onClick={() => toggleStatus(product.id)}
                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${product.status === 'Active'
                                            ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                            : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                                        }`}
                                >
                                    {product.status === 'Active' ? <Play size={10} /> : <Pause size={10} />}
                                    {product.status}
                                </button>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center justify-center gap-2">
                                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all" title="상세보기">
                                        <ExternalLink size={16} />
                                    </button>
                                    <button
                                        onClick={() => deleteProduct(product.id)}
                                        className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all"
                                        title="삭제"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </DataTable>

                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <ShoppingBag size={32} className="text-slate-300" />
                        </div>
                        <p className="text-lg font-black text-slate-400">검색 결과가 없습니다</p>
                        <p className="text-sm font-bold text-slate-300 mt-2">다른 검색어나 필터를 시도해보세요</p>
                    </div>
                )}

                {/* Add Product Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-8">
                        <div className="bg-white rounded-[3rem] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                            <div className="p-10 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">외부 상품 연동하기</h3>
                                        <p className="text-sm font-bold text-slate-400">제휴사 상품을 플랫폼에 추가하세요</p>
                                    </div>
                                    <button
                                        onClick={() => setShowAddModal(false)}
                                        className="p-3 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                    >
                                        <XCircle size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-10 overflow-y-auto max-h-[60vh] space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">상품명</label>
                                    <input
                                        type="text"
                                        placeholder="예: 파리 에펠탑 뷰 아다지오 아파트먼트"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">카테고리</label>
                                        <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                                            <option>숙소</option>
                                            <option>항공</option>
                                            <option>기차</option>
                                            <option>액티비티</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">제휴사</label>
                                        <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                                            <option>Agoda</option>
                                            <option>Klook</option>
                                            <option>Skyscanner</option>
                                            <option>Trip.com</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <DollarSign size={12} />
                                            가격 (원)
                                        </label>
                                        <input
                                            type="text"
                                            placeholder="245000"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                            <Percent size={12} />
                                            수수료율 (%)
                                        </label>
                                        <input
                                            type="number"
                                            placeholder="8"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Link2 size={12} />
                                        제휴사 링크 URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://..."
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>

                                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                                    <p className="text-xs font-bold text-blue-600 leading-relaxed">
                                        💡 <strong>Tip:</strong> 제휴사 API가 연동되어 있으면 자동으로 클릭 및 전환 데이터가 수집됩니다.
                                    </p>
                                </div>
                            </div>

                            <div className="p-10 border-t border-slate-100 flex gap-4">
                                <button
                                    onClick={() => setShowAddModal(false)}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black text-sm hover:bg-slate-200 transition-all"
                                >
                                    취소
                                </button>
                                <button className="flex-1 px-6 py-4 rounded-2xl bg-orange-500 text-white font-black text-sm hover:scale-105 transition-all shadow-xl shadow-orange-500/20">
                                    상품 추가하기
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
