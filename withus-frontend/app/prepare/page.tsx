'use client';

import React, { useState } from 'react';
import { palette } from '@/app/components/design-system/constants';
import { PrepareHeader } from './components/PrepareHeader';
import { CategorySidebar } from './components/CategorySidebar';
import { SearchSection } from './components/SearchSection';
import { CollaborationWidget } from './components/CollaborationWidget';

const MOCK_UPCOMING_TRIPS = [
    {
        id: 1,
        title: '포르투갈 서핑 정복기 🏄‍♂️',
        location: '포르투갈, 포르투',
        date: '2026.05.02 - 2026.05.10',
        guests: 2,
    },
    {
        id: 2,
        title: '발리 한달 살기 🥥',
        location: '인도네시아, 발리',
        date: '2026.06.15 - 2026.07.15',
        guests: 1,
    }
];

// 내 여행(My Trips)의 JointChecklist와 동일한 구조의 초기 데이터 정의
const INITIAL_CHECKLISTS: Record<number, any[]> = {
    1: [
        { id: 1, text: '포르투 시내 에어비앤비 예약', completed: true, assignedTo: '나' },
        { id: 2, text: '마토지뉴슈 서핑 레슨 예약', completed: true, assignedTo: '민수' },
        { id: 3, text: '유심 10GB 구매', completed: false, assignedTo: '나' },
        { id: 4, text: '여행자 보험 가입', completed: false, assignedTo: '지니' },
        { id: 5, text: '렌터카 예약 확인', completed: false, assignedTo: '민수' },
    ],
    2: [
        { id: 101, text: '발리 왕복 항공권 결제', completed: true, assignedTo: '나' },
        { id: 102, text: '우붓 빌라 예약', completed: false, assignedTo: '나' },
    ]
};

export default function PreparePage() {
    const [selectedTrip, setSelectedTrip] = useState(MOCK_UPCOMING_TRIPS[0]);
    const [activeCategory, setActiveCategory] = useState('accomodation');

    // 체크리스트 상태 관리 (내 여행과 동일한 로직)
    const [checklists, setChecklists] = useState(INITIAL_CHECKLISTS);

    // 현재 선택된 여행의 체크리스트 데이터
    const currentItems = checklists[selectedTrip.id] || [];
    const completedCount = currentItems.filter(i => i.completed).length;
    const totalCount = currentItems.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <main className="min-h-screen pt-20 pb-40" style={{ backgroundColor: palette.cream.base }}>
            {/* V4.1 Standard Hero Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1400px] h-full pointer-events-none overflow-hidden">
                <div className="absolute top-[-5%] right-[-10%] w-[800px] h-[800px] bg-orange-200/20 rounded-full blur-[120px] mix-blend-multiply" />
                <div className="absolute bottom-[20%] left-[-10%] w-[700px] h-[700px] bg-pink-100/20 rounded-full blur-[110px] mix-blend-multiply" />
                <div className="absolute top-[30%] left-[-5%] w-[600px] h-[600px] bg-teal-50/20 rounded-full blur-[100px] mix-blend-multiply" />
            </div>

            <div className="max-w-[1400px] mx-auto px-6 space-y-12 relative z-10">
                <PrepareHeader
                    trips={MOCK_UPCOMING_TRIPS}
                    selectedTrip={selectedTrip}
                    onSelectTrip={setSelectedTrip}
                />

                <div className="grid grid-cols-12 gap-10 items-start">
                    {/* Main Workspace: Category + Search (Expanded) */}
                    <div className="col-span-12 lg:col-span-8 space-y-8">
                        {/* Horizontal Category Tab would go here, for now using existing sidebar but in wide layout */}
                        <div className="bg-white rounded-[40px] p-6 border border-slate-100 shadow-sm">
                            <CategorySidebar
                                activeCategory={activeCategory}
                                onCategoryChange={setActiveCategory}
                                selectedTrip={selectedTrip}
                                progress={progress}
                                completedCount={completedCount}
                                totalCount={totalCount}
                                isHorizontal={true}
                            />
                        </div>

                        <SearchSection
                            category={activeCategory}
                            trip={selectedTrip}
                        />
                    </div>

                    {/* Right Side: Essential Collaboration (Sticky) */}
                    <div className="col-span-12 lg:col-span-4">
                        <CollaborationWidget
                            checklists={checklists}
                            setChecklists={setChecklists}
                            selectedTripId={selectedTrip.id}
                        />
                    </div>
                </div>
            </div>
        </main>
    );
}
