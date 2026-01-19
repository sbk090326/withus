'use client';

import React, { useState } from 'react';
import { palette } from '@/app/components/design-system/constants';
import { MyTripsHero } from './components/MyTripsHero';
import { MyTripsTabs } from './components/MyTripsTabs';
import { UpcomingTrips } from './components/UpcomingTrips';
import { MyActivity } from './components/MyActivity';
import { JointChecklist } from './components/JointChecklist';
import { ParticipationStatus } from './components/ParticipationStatus';
import { MiniCalendar } from './components/MiniCalendar';

// Mock Checklist Data moved here for global sync
const INITIAL_CHECKLISTS: Record<number, any[]> = {
    1: [
        { id: 1, text: '유심/이심 구매하기', completed: true, assignedTo: '나' },
        { id: 2, text: '여행자 보험 가입', completed: true, assignedTo: '나' },
        { id: 3, text: '서핑 보드 렌탈 예약 확인', completed: false, assignedTo: '지니' },
    ],
    2: [
        { id: 4, text: '드레스코드 확인', completed: false, assignedTo: '나' },
        { id: 5, text: '그랩/볼트 앱 설치', completed: true, assignedTo: '카이' },
    ]
};

export default function MyTripsPage() {
    const [activeTab, setActiveTab] = useState('planner');
    const [checklists, setChecklists] = useState(INITIAL_CHECKLISTS);

    // Calculate progress for the main trip (Porto - ID 1)
    const portoItems = checklists[1] || [];
    const completedCount = portoItems.filter(i => i.completed).length;
    const totalCount = portoItems.length || 1;
    const progress = Math.round((completedCount / totalCount) * 100);
    const remainingItems = portoItems.filter(i => !i.completed).map(i => i.text);
    const remainingCount = remainingItems.length;

    // Mock User Data
    const user = {
        name: '정민수',
        mannerTemp: 37.5,
        isVerified: true,
        badges: ['🏅', '🎒', '📸'],
        completedTrips: 12
    };

    return (
        <main className="min-h-screen pb-32" style={{ backgroundColor: palette.cream.base }}>
            <MyTripsHero user={user} />

            <div className="max-w-[1240px] mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Left: Sticky Calendar/Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-32">
                            <MiniCalendar
                                progress={progress}
                                remainingCount={remainingCount}
                                pendingItems={remainingItems}
                            />

                            <div className="mt-8 bg-white/50 backdrop-blur-md rounded-[2.5rem] p-9 border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-8">
                                <div className="space-y-3">
                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] block">Travel Log</span>
                                    <p className="text-base font-medium text-slate-600 leading-relaxed tracking-tight">
                                        이번 달에는 <span className="text-slate-900 font-black underline decoration-orange-200 decoration-4 underline-offset-4">2개의 설레는 여정</span>이 <br />당신을 기다리고 있어요!
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-5">
                                    <div className="bg-white/80 p-5 rounded-3xl border border-slate-100 shadow-sm group hover:border-orange-200 transition-all">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-orange-500 transition-colors">가고 싶은 곳</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter">14</p>
                                    </div>
                                    <div className="bg-white/80 p-5 rounded-3xl border border-slate-100 shadow-sm group hover:border-teal-400 transition-all">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 group-hover:text-teal-500 transition-colors">나의 후기</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter">8</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right: Tabbed Content */}
                    <div className="lg:col-span-8 space-y-10">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-8">
                            <MyTripsTabs activeTab={activeTab} onTabChange={setActiveTab} />
                        </div>

                        <div className="min-h-[600px]">
                            {activeTab === 'planner' && <UpcomingTrips />}
                            {activeTab === 'checklist' && (
                                <JointChecklist
                                    checklists={checklists}
                                    setChecklists={setChecklists}
                                />
                            )}
                            {activeTab === 'participation' && <ParticipationStatus />}
                            {activeTab === 'activity' && <MyActivity type="posts" />}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
