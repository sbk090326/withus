'use client';

import React, { useState } from 'react';
import {
    Map,
    Plus,
    MoreVertical,
    Eye,
    Edit2,
    Trash2,
    CheckCircle2,
    Clock,
    MapPin,
    Star,
    Image as ImageIcon,
    Send,
    XCircle,
    Upload
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { StatCard } from '../components/StatCard';
import { FilterTabs } from '../components/FilterTabs';
import { DataTable } from '../components/DataTable';

const mockOfficialGuides = [
    {
        id: 1,
        title: "파리 현지인들만 아는 에펠탑 뷰 호텔 Best 5",
        category: "City Tour",
        theme: "시티 투어",
        location: "프랑스, 파리",
        rating: 4.9,
        reviews: 128,
        status: "Published",
        writer: "WithUs 에디터",
        date: "2026-01-15",
        views: 8900
    },
    {
        id: 2,
        title: "겨울 홋카이도 비에이 설공 가이드: 준비물부터 루트까지",
        category: "Healing",
        theme: "힐링",
        location: "일본, 홋카이도",
        rating: 4.8,
        reviews: 245,
        status: "Published",
        writer: "WithUs 에디터",
        date: "2026-01-10",
        views: 12400
    },
    {
        id: 3,
        title: "발리 누사페니다 스노클링 포인트 총정리",
        category: "Nature",
        theme: "자연/명소",
        location: "인도네시아, 발리",
        rating: 4.7,
        reviews: 86,
        status: "Review",
        writer: "외부 기고가",
        date: "2026-01-14",
        views: 0
    },
    {
        id: 4,
        title: "방콕 로컬 푸드 투어: 백종원도 감탄한 뒷골목 맛집",
        category: "Local Food",
        theme: "로컬 맛집",
        location: "태국, 방콕",
        rating: 4.9,
        reviews: 312,
        status: "Draft",
        writer: "WithUs 에디터",
        date: "2026-01-17",
        views: 0
    }
];

export default function GuideManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('전체');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [guides, setGuides] = useState(mockOfficialGuides);

    const filteredGuides = guides.filter((guide) => {
        const matchesTab = activeTab === '전체' || guide.theme === activeTab;
        const matchesSearch =
            guide.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            guide.writer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const handlePublish = (id: number) => {
        setGuides(guides.map(g =>
            g.id === id ? { ...g, status: 'Published', date: new Date().toISOString().split('T')[0] } : g
        ));
    };

    const handleDelete = (id: number) => {
        if (confirm('정말 이 가이드를 삭제하시겠습니까?')) {
            setGuides(guides.filter(g => g.id !== id));
        }
    };

    const publishedCount = guides.filter(g => g.status === 'Published').length;
    const draftCount = guides.filter(g => g.status === 'Draft').length;
    const reviewCount = guides.filter(g => g.status === 'Review').length;
    const totalViews = guides.reduce((sum, g) => sum + g.views, 0);

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={Map}
                    category="Editorial Content"
                    title="공식 가이드 발행 관리"
                    action={
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all"
                        >
                            <Plus size={20} />
                            새 공식 가이드 제작
                        </button>
                    }
                />

                <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <StatCard title="Published Guides" value={`${publishedCount}개`} icon={Map} color="#3b82f6" />
                    <StatCard title="Total Read Count" value={`${(totalViews / 1000).toFixed(1)}k`} icon={Eye} color="#10b981" />
                    <StatCard title="In Review" value={`${reviewCount}개`} subtitle="Needs approval" icon={Clock} color="#f97316" />
                    <StatCard title="Drafts" value={`${draftCount}개`} subtitle="Work in progress" icon={Edit2} color="#6366f1" />
                </section>

                <FilterTabs
                    tabs={['전체', '시티 투어', '힐링', '자연/명소', '로컬 맛집']}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    searchPlaceholder="가이드 제목, 지역, 작성자 검색..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <DataTable headers={['가이드 정보', '테마 / 지역', '평점 / 조회', '상태', '최종 수정일', '관리']}>
                    {filteredGuides.map((guide) => (
                        <tr key={guide.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-12 rounded-xl bg-slate-100 overflow-hidden shadow-sm flex-shrink-0">
                                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <ImageIcon size={20} />
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900 line-clamp-1 group-hover:text-orange-500 transition-colors">{guide.title}</p>
                                        <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{guide.writer}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex flex-col items-center gap-1.5">
                                    <span className="px-3 py-1 rounded-lg bg-orange-50 text-orange-600 text-[10px] font-black uppercase whitespace-nowrap">
                                        {guide.theme}
                                    </span>
                                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                                        <MapPin size={10} /> {guide.location}
                                    </span>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <div className="flex flex-col items-center gap-0.5">
                                    <div className="flex items-center gap-1 text-sm font-black text-slate-900">
                                        <Star size={14} fill="#f97316" className="text-orange-500" />
                                        {guide.rating}
                                    </div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                        {guide.views.toLocaleString()} VIEWS
                                    </p>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-center">
                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${guide.status === 'Published' ? 'bg-emerald-50 text-emerald-600' :
                                    guide.status === 'Review' ? 'bg-orange-50 text-orange-600' : 'bg-slate-100 text-slate-400'
                                    }`}>
                                    {guide.status === 'Published' ? <CheckCircle2 size={12} /> :
                                        guide.status === 'Review' ? <Clock size={12} /> : <Edit2 size={12} />}
                                    {guide.status}
                                </span>
                            </td>
                            <td className="px-8 py-6 text-sm font-bold text-slate-400">{guide.date}</td>
                            <td className="px-8 py-6">
                                <div className="flex items-center justify-center gap-2">
                                    {guide.status !== 'Published' && (
                                        <button
                                            onClick={() => handlePublish(guide.id)}
                                            className="p-2.5 rounded-xl text-emerald-400 hover:text-emerald-600 hover:bg-emerald-50 transition-all"
                                            title="발행하기"
                                        >
                                            <Send size={18} />
                                        </button>
                                    )}
                                    <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all" title="수정">
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(guide.id)}
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
                    ))}
                </DataTable>

                {filteredGuides.length === 0 && (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                            <Map size={32} className="text-slate-300" />
                        </div>
                        <p className="text-lg font-black text-slate-400">검색 결과가 없습니다</p>
                        <p className="text-sm font-bold text-slate-300 mt-2">다른 검색어나 필터를 시도해보세요</p>
                    </div>
                )}

                {/* Create Guide Modal */}
                {showCreateModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-8">
                        <div className="bg-white rounded-[3rem] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                            <div className="p-10 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">새 공식 가이드 제작</h3>
                                        <p className="text-sm font-bold text-slate-400">WithUs 공식 여행 가이드를 작성하세요</p>
                                    </div>
                                    <button
                                        onClick={() => setShowCreateModal(false)}
                                        className="p-3 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                    >
                                        <XCircle size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-10 overflow-y-auto max-h-[60vh] space-y-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">가이드 제목</label>
                                    <input
                                        type="text"
                                        placeholder="예: 파리 현지인들만 아는 에펠탑 뷰 호텔 Best 5"
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">테마</label>
                                        <select className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20">
                                            <option>시티 투어</option>
                                            <option>힐링</option>
                                            <option>자연/명소</option>
                                            <option>로컬 맛집</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest">지역</label>
                                        <input
                                            type="text"
                                            placeholder="예: 프랑스, 파리"
                                            className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">커버 이미지</label>
                                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 text-center hover:border-orange-300 transition-all cursor-pointer">
                                        <Upload size={32} className="mx-auto text-slate-300 mb-3" />
                                        <p className="text-sm font-bold text-slate-400">클릭하여 이미지 업로드</p>
                                        <p className="text-xs font-bold text-slate-300 mt-1">JPG, PNG (최대 5MB)</p>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-400 uppercase tracking-widest">가이드 내용</label>
                                    <textarea
                                        placeholder="여행 가이드 내용을 작성하세요..."
                                        rows={8}
                                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20 resize-none"
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
