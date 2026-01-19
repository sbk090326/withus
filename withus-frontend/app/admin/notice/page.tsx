'use client';

import React, { useState } from 'react';
import {
    Bell,
    Plus,
    MoreVertical,
    Eye,
    Edit2,
    Trash2,
    ChevronLeft,
    ChevronRight,
    EyeOff,
    CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { FilterTabs } from '../components/FilterTabs';
import { DataTable } from '../components/DataTable';

const mockNotices = [
    {
        id: 1,
        title: "📢 위더스 이용 약관 및 포인트 정책 개정 안내",
        category: "시스템",
        status: "Published",
        writer: "운영팀",
        date: "2026-01-15",
        views: 1240,
    },
    {
        id: 2,
        title: "📸 여행 후기 챌린지 2탄: 나만의 숨은 명소 공유하기",
        category: "이벤트",
        status: "Published",
        writer: "마케팅팀",
        date: "2026-01-10",
        views: 3500,
    },
    {
        id: 3,
        title: "⚠️ 설 연휴 고객센터 운영 시간 변경 안내",
        category: "시스템",
        status: "Draft",
        writer: "운영팀",
        date: "2026-01-17",
        views: 0,
    },
    {
        id: 4,
        title: "❄️ 겨울 맞이 일본 삿포로 공식 가이드 업데이트",
        category: "콘텐츠",
        status: "Published",
        writer: "에디토리얼팀",
        date: "2026-01-05",
        views: 890,
    }
];

export default function AdminNoticePage() {
    const [activeTab, setActiveTab] = useState('전체');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotices = mockNotices.filter((notice) => {
        const matchesTab = activeTab === '전체' || notice.category === activeTab;
        const matchesSearch = notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            notice.writer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTab && matchesSearch;
    });

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={Bell}
                    category="Management"
                    title="공지사항 관리"
                    action={
                        <Link href="/admin/notice/create">
                            <button className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-500 text-white font-black text-sm shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all">
                                <Plus size={20} />
                                새 공지 작성하기
                            </button>
                        </Link>
                    }
                />

                <FilterTabs
                    tabs={['전체', '시스템', '이벤트', '콘텐츠', '커뮤니티']}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    searchPlaceholder="공지 제목 또는 작성자 검색..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                />

                <DataTable headers={['ID', '상태', '분류', '제목', '작성자', '등록일', '조회수', '관리']}>
                    {filteredNotices.map((notice) => (
                        <tr
                            key={notice.id}
                            className="border-b border-slate-50 hover:bg-slate-50/30 transition-colors group"
                        >
                            <td className="px-8 py-6 text-sm font-bold text-slate-400 text-center">{notice.id}</td>
                            <td className="px-8 py-6">
                                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${notice.status === 'Published'
                                        ? 'bg-emerald-50 text-emerald-600'
                                        : 'bg-orange-50 text-orange-600'
                                    }`}>
                                    {notice.status === 'Published' ? <CheckCircle2 size={12} /> : <EyeOff size={12} />}
                                    {notice.status}
                                </div>
                            </td>
                            <td className="px-8 py-6">
                                <span className="text-sm font-black text-slate-900">{notice.category}</span>
                            </td>
                            <td className="px-8 py-6">
                                <p className="text-sm font-black text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1">
                                    {notice.title}
                                </p>
                            </td>
                            <td className="px-8 py-6">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[10px]">👤</div>
                                    <span className="text-sm font-bold text-slate-700">{notice.writer}</span>
                                </div>
                            </td>
                            <td className="px-8 py-6 text-sm font-bold text-slate-400">{notice.date}</td>
                            <td className="px-8 py-6 text-center text-sm font-black text-slate-900">{notice.views.toLocaleString()}</td>
                            <td className="px-8 py-6">
                                <div className="flex items-center justify-center gap-2">
                                    <button className="p-2 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all" title="수정">
                                        <Edit2 size={16} />
                                    </button>
                                    <button className="p-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" title="삭제">
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

                {/* Pagination */}
                <div className="mt-8 px-8 py-6 bg-white rounded-[2rem] border border-slate-100 flex items-center justify-between">
                    <p className="text-xs font-bold text-slate-500">전체 {mockNotices.length}개 중 1-4 표시</p>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-xl border border-slate-200 text-slate-400 bg-white hover:bg-slate-50 disabled:opacity-50" disabled>
                            <ChevronLeft size={16} />
                        </button>
                        <div className="flex items-center gap-1">
                            <button className="w-8 h-8 rounded-xl bg-slate-900 text-white text-xs font-black">1</button>
                            <button className="w-8 h-8 rounded-xl hover:bg-slate-200 text-slate-600 text-xs font-black">2</button>
                            <button className="w-8 h-8 rounded-xl hover:bg-slate-200 text-slate-600 text-xs font-black">3</button>
                        </div>
                        <button className="p-2 rounded-xl border border-slate-200 text-slate-400 bg-white hover:bg-slate-50">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}
