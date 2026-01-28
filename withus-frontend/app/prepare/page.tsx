'use client';

import React, { useState } from 'react';
import { motion, useSpring } from 'motion/react';
import { palette, theme } from '@/app/components/design-system/constants';
import { PrepareHeader } from './components/PrepareHeader';
import { CategorySidebar } from './components/CategorySidebar';
import { SearchSection } from './components/SearchSection';
import { CollaborationWidget } from './components/CollaborationWidget';
import { Navigation, Send, Compass, MapPin as PinIcon } from 'lucide-react';

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
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        setMousePos({ x: e.clientX, y: e.clientY });
    };

    // 체크리스트 상태 관리 (내 여행과 동일한 로직)
    const [checklists, setChecklists] = useState(INITIAL_CHECKLISTS);

    // 현재 선택된 여행의 체크리스트 데이터
    const currentItems = checklists[selectedTrip.id] || [];
    const completedCount = currentItems.filter((i: any) => i.completed).length;
    const totalCount = currentItems.length;
    const progress = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return (
        <main
            onMouseMove={handleMouseMove}
            className="min-h-screen pt-20 pb-40 relative overflow-hidden"
            style={{ backgroundColor: palette.cream.section }}
        >
            {/* Premium Refined Background Decor - Cool & Minimal */}
            <div className="fixed inset-0 pointer-events-none z-0">
                {/* 1. Subtle Mouse Glow (Cool Tone) */}
                <motion.div
                    animate={{
                        x: mousePos.x - 250,
                        y: mousePos.y - 250,
                    }}
                    transition={{ type: "spring", damping: 50, stiffness: 100 }}
                    className="absolute w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[100px]"
                />

                {/* 2. Refined Mesh Gradients (Cool & Refreshing) */}
                <motion.div
                    animate={{
                        scale: [1, 1.05, 1],
                        x: [0 + (mousePos.x * 0.01)],
                        y: [0 + (mousePos.y * 0.01)],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] right-[-5%] w-[700px] h-[700px] bg-teal-50/40 rounded-full blur-[120px]"
                />
                <motion.div
                    animate={{
                        scale: [1.05, 1, 1.05],
                        x: [-20 - (mousePos.x * 0.005)],
                        y: [40 + (mousePos.y * 0.005)],
                    }}
                    transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[-15%] left-[-10%] w-[800px] h-[800px] bg-slate-100/30 rounded-full blur-[140px]"
                />

                {/* 3. Minimal Dotted Grid Overlay */}
                <motion.div
                    animate={{
                        x: -mousePos.x * 0.005,
                        y: -mousePos.y * 0.005,
                    }}
                    className="absolute inset-0 opacity-[0.25]"
                    style={{
                        backgroundImage: `radial-gradient(${palette.slate[200]} 1.5px, transparent 1.5px)`,
                        backgroundSize: '48px 48px'
                    }}
                />

                {/* 4. Subtle Path Lines (Refreshing) */}
                <motion.svg
                    animate={{
                        x: mousePos.x * 0.003,
                        y: mousePos.y * 0.003,
                    }}
                    className="absolute inset-0 w-full h-full opacity-[0.02] text-teal-900"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M-100 200 C 400 150 800 350 1500 200" stroke="currentColor" fill="none" strokeWidth="1" />
                    <circle cx="15%" cy="20%" r="100" stroke="currentColor" fill="none" strokeWidth="1" strokeDasharray="8 8" />
                    <circle cx="85%" cy="80%" r="150" stroke="currentColor" fill="none" strokeWidth="1" strokeDasharray="12 12" />
                </motion.svg>
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
                            progress={progress}
                            completedCount={completedCount}
                            totalCount={totalCount}
                        />
                    </div>
                </div>
            </div>
        </main >
    );
}
