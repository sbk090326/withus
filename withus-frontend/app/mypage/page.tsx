'use client';

import React, { useState, useEffect } from 'react';
import { palette } from '@/app/components/design-system/constants';
import { MyPageHero } from './components/MyPageHero';
import { MyPageTabs } from './components/MyPageTabs';
import { UpcomingTrips } from './components/UpcomingTrips';
import { MyActivity } from './components/MyActivity';
import { ParticipationStatus } from './components/ParticipationStatus';
import { MiniCalendar } from './components/MiniCalendar';
import { ProfileEdit } from './components/ProfileEdit';
import { NotificationSettings } from './components/NotificationSettings';
import { AccountSettings } from './components/AccountSettings';
import { BlockedUsers } from './components/BlockedUsers';
import { ExternalAccounts } from './components/ExternalAccounts';
import { PrivacySettings } from './components/PrivacySettings';
import { useSearchParams } from 'next/navigation';
import { Settings, User, Sparkles, Lock, UserX, Link, Eye } from 'lucide-react';

// 🔗 데이터 통합: PreparePage와 동일한 데이터셋 구성
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

export default function MyPage() {
    const searchParams = useSearchParams();
    const initialTab = searchParams.get('tab') || 'planner';

    const [activeTab, setActiveTab] = useState(initialTab === 'checklist' ? 'planner' : initialTab);
    const [checklists, setChecklists] = useState(INITIAL_CHECKLISTS);
    const [settingsView, setSettingsView] = useState<'menu' | 'profile' | 'notifications' | 'account' | 'blocked' | 'external' | 'privacy'>('menu');

    useEffect(() => {
        const tab = searchParams.get('tab');
        if (tab && tab !== 'checklist') setActiveTab(tab);
    }, [searchParams]);

    // 메인 여행(ID: 1) 데이터로 진행률 계산
    const portoItems = checklists[1] || [];
    const completedCount = portoItems.filter(i => i.completed).length;
    const totalCount = portoItems.length || 1;
    const progress = Math.round((completedCount / totalCount) * 100);
    const remainingItems = portoItems.filter(i => !i.completed).map(i => i.text);

    const user = {
        name: '정민수',
        mannerTemp: 37.5,
        isVerified: true,
        badges: ['🏅', '🎒', '📸'],
        completedTrips: 12
    };

    return (
        <main className="min-h-screen pb-32" style={{ backgroundColor: palette.cream.base }}>
            {/* MyPage Hero - Fully Upgraded */}
            <MyPageHero user={user} />

            <div className="max-w-[1240px] mx-auto px-6 mt-4">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    {/* Left: Sticky Dashboard */}
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="sticky top-32">
                            <MiniCalendar
                                progress={progress}
                                remainingCount={remainingItems.length}
                                pendingItems={remainingItems}
                            />

                            <div className="mt-8 bg-white/50 backdrop-blur-md rounded-[32px] p-9 border border-white shadow-sm space-y-8">
                                <div className="space-y-3">
                                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.3em] block">여정 통계</span>
                                    <p className="text-base font-bold text-slate-600 leading-relaxed tracking-tight">
                                        이번 달에는 <span className="text-slate-900 font-black underline decoration-orange-200 decoration-4 underline-offset-4">2개의 기대되는 여정</span>이 <br />당신을 기다리고 있어요!
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm group hover:border-orange-200 transition-all">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-orange-500 transition-colors">찜한 장소</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter">14</p>
                                    </div>
                                    <div className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm group hover:border-teal-400 transition-all">
                                        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 group-hover:text-teal-500 transition-colors">작성 후기</p>
                                        <p className="text-2xl font-black text-slate-900 tracking-tighter">8</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Right: Tabbed Content */}
                    <div className="lg:col-span-8 space-y-8">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-slate-100 pb-10">
                            <MyPageTabs activeTab={activeTab} onTabChange={setActiveTab} />
                        </div>

                        <div className="min-h-[600px] relative">
                            {activeTab === 'planner' && <UpcomingTrips />}
                            {activeTab === 'participation' && <ParticipationStatus onTabChange={setActiveTab} />}
                            {activeTab === 'activity' && <MyActivity type="posts" />}
                            {activeTab === 'settings' && (
                                <div className="space-y-10">
                                    {settingsView === 'menu' && (
                                        <>
                                            {/* 상단 헤더 - 타 탭과 통일 */}
                                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-slate-400">
                                                        <Settings size={16} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">환경 설정</span>
                                                    </div>
                                                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">계정 관리 및 설정</h3>
                                                    <p className="text-xs text-slate-400 font-bold max-w-md">나의 개인정보 보호와 서비스 이용 환경을 최적화하세요.</p>
                                                </div>
                                            </div>

                                            <div className="space-y-8">
                                                {/* Group 1: 프로필 및 소셜 */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">프로필 및 소셜 서비스</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <button
                                                            onClick={() => setSettingsView('profile')}
                                                            className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:border-orange-200 hover:shadow-xl hover:shadow-orange-200/5 transition-all group text-left"
                                                        >
                                                            <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center text-orange-500 group-hover:scale-110 transition-transform">
                                                                <User size={24} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-base font-black text-slate-900">프로필 정보 수정</p>
                                                                <p className="text-xs text-slate-400 font-bold">닉네임, 사진, 여행 성향 등</p>
                                                            </div>
                                                        </button>

                                                        <button
                                                            onClick={() => setSettingsView('external')}
                                                            className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-200/5 transition-all group text-left"
                                                        >
                                                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 group-hover:scale-110 transition-transform">
                                                                <Link size={24} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-base font-black text-slate-900">연동된 서비스 관리</p>
                                                                <p className="text-xs text-slate-400 font-bold">Google, Kakao 로그인 연동</p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Group 2: 계정 보안 및 프라이버시 */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">계정 보안 및 프라이버시</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <button
                                                            onClick={() => setSettingsView('account')}
                                                            className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:border-blue-200 hover:shadow-xl hover:shadow-blue-200/5 transition-all group text-left"
                                                        >
                                                            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                                                <Lock size={24} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-base font-black text-slate-900">계정 및 보안 설정</p>
                                                                <p className="text-xs text-slate-400 font-bold">비밀번호 변경, 개인정보 수정</p>
                                                            </div>
                                                        </button>

                                                        <button
                                                            onClick={() => setSettingsView('privacy')}
                                                            className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-200/5 transition-all group text-left"
                                                        >
                                                            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                                                                <Eye size={24} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-base font-black text-slate-900">개인정보 공개 설정</p>
                                                                <p className="text-xs text-slate-400 font-bold">프로필 및 이력 공개 범위</p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Group 3: 이용 환경 및 안전 */}
                                                <div className="space-y-4">
                                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">이용 환경 및 안전 관리</h4>
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                        <button
                                                            onClick={() => setSettingsView('notifications')}
                                                            className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:border-teal-200 hover:shadow-xl hover:shadow-teal-200/5 transition-all group text-left"
                                                        >
                                                            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-500 group-hover:scale-110 transition-transform">
                                                                <Sparkles size={24} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-base font-black text-slate-900">알림 및 푸시 설정</p>
                                                                <p className="text-xs text-slate-400 font-bold">실시간 소식 및 마케팅 알림</p>
                                                            </div>
                                                        </button>

                                                        <button
                                                            onClick={() => setSettingsView('blocked')}
                                                            className="flex items-center gap-6 p-6 rounded-[32px] bg-white border border-slate-100 shadow-sm hover:border-rose-200 hover:shadow-xl hover:shadow-rose-200/5 transition-all group text-left"
                                                        >
                                                            <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-500 group-hover:scale-110 transition-transform">
                                                                <UserX size={24} />
                                                            </div>
                                                            <div className="space-y-1">
                                                                <p className="text-base font-black text-slate-900">차단 및 신고 관리</p>
                                                                <p className="text-xs text-slate-400 font-bold">사용자 차단 및 신고 내역 확인</p>
                                                            </div>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="bg-slate-900/5 rounded-[32px] p-8 border border-dashed border-slate-200 text-center">
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none">추가 보안 및 환경 설정 기능을 준비 중입니다.</p>
                                            </div>
                                        </>
                                    )}

                                    {settingsView === 'profile' && (
                                        <ProfileEdit
                                            user={{ ...user, image: '🧔' }}
                                            onBack={() => setSettingsView('menu')}
                                        />
                                    )}

                                    {settingsView === 'notifications' && (
                                        <NotificationSettings
                                            onBack={() => setSettingsView('menu')}
                                        />
                                    )}

                                    {settingsView === 'account' && (
                                        <AccountSettings
                                            user={{
                                                name: '정민수',
                                                email: 'minsu.jeong@example.com',
                                                phone: '010-1234-5678'
                                            }}
                                            onBack={() => setSettingsView('menu')}
                                        />
                                    )}

                                    {settingsView === 'blocked' && (
                                        <BlockedUsers onBack={() => setSettingsView('menu')} />
                                    )}

                                    {settingsView === 'external' && (
                                        <ExternalAccounts onBack={() => setSettingsView('menu')} />
                                    )}

                                    {settingsView === 'privacy' && (
                                        <PrivacySettings onBack={() => setSettingsView('menu')} />
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
