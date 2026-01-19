'use client';

import React, { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { Plus, Check, Sparkles, Wand2 } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';
import { TripCard } from './upcoming-trips/TripCard';
import { ImportRouteModal } from './upcoming-trips/ImportRouteModal';
import { CreateTripModal } from './upcoming-trips/CreateTripModal';

const INITIAL_TRIPS = [
    {
        id: 1,
        title: '포르투갈 서핑 정복기 🏄‍♂️',
        location: '포르투갈, 포르투',
        date: '2026.05.02 - 2026.05.10',
        status: 'D-12',
        isCompleted: false,
        isRecruiting: true,
        thumbnail: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
        companions: 2,
    },
    {
        id: 2,
        title: '파리 에펠탑 피크닉 & 스냅 🥖',
        location: '프랑스, 파리',
        date: '2026.04.12 - 2026.04.18',
        status: '완료됨',
        isCompleted: true,
        isRecruiting: false,
        thumbnail: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800',
        companions: 4,
    }
];

const MOCK_SAVED_COURSES = [
    {
        id: 10,
        title: '포르투 한 달 살기가 추천하는 서핑 루트 🌊',
        location: '포르투갈, 포르투',
        routes: ['마토지뉴슈 해변', '시티 파크', '펠리구에이라 등대', '리베이라 광장'],
        thumbnail: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 11,
        title: '방 Bangkok 야경에 취하는 인스타 인생샷 코스 🥂',
        location: '태국, 방콕',
        routes: ['딸랏노이 벽화마을', '왓 아룬 야경', '티추카 루프탑', '카오산 로드'],
        thumbnail: 'https://images.unsplash.com/photo-1508939232145-159d460d3fc1?auto=format&fit=crop&q=80&w=300'
    }
];

export const UpcomingTrips = () => {
    const [trips, setTrips] = useState(INITIAL_TRIPS);
    const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
    const [isAdding, setIsAdding] = useState(false);
    const [showImportModal, setShowImportModal] = useState(false);

    const [step, setStep] = useState(1);
    const [newTrip, setNewTrip] = useState({
        title: '',
        location: '',
        startDate: '',
        endDate: '',
        routes: [] as string[],
    });
    const [tempRoute, setTempRoute] = useState('');

    const handleImportRoute = (course: typeof MOCK_SAVED_COURSES[0]) => {
        setNewTrip({
            ...newTrip,
            title: course.title,
            location: course.location,
            routes: course.routes,
        });
        setShowImportModal(false);
        setStep(1);
        setIsAdding(true);
    };

    const handleAddTrip = () => {
        if (!newTrip.title || !newTrip.location || !newTrip.startDate) return;

        const trip = {
            id: Date.now(),
            title: newTrip.title,
            location: newTrip.location,
            date: `${newTrip.startDate} - ${newTrip.endDate || '미정'}`,
            status: '준비 중',
            isCompleted: false,
            isRecruiting: false,
            thumbnail: newTrip.location.toLowerCase().includes('포르투')
                ? 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800'
                : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
            companions: 0,
        };

        setTrips([trip, ...trips]);
        resetForm();
    };

    const resetForm = () => {
        setNewTrip({ title: '', location: '', startDate: '', endDate: '', routes: [] });
        setTempRoute('');
        setStep(1);
        setIsAdding(false);
        setShowImportModal(false);
    };

    const addRoute = () => {
        if (tempRoute.trim()) {
            setNewTrip({ ...newTrip, routes: [...newTrip.routes, tempRoute.trim()] });
            setTempRoute('');
        }
    };

    const removeRoute = (index: number) => {
        setNewTrip({
            ...newTrip,
            routes: newTrip.routes.filter((_, i) => i !== index)
        });
    };

    const deleteTrip = (id: number) => {
        if (confirm('이 계획을 삭제하시겠습니까?')) {
            setTrips(trips.filter(t => t.id !== id));
        }
    };

    const openReviewModal = (title: string) => {
        alert(`'${title}' 여행의 동행자 키워드 평가를 시작합니다.`);
    };

    const filteredTrips = trips.filter(trip => {
        if (filter === 'active') return !trip.isCompleted;
        if (filter === 'completed') return trip.isCompleted;
        return true;
    });

    return (
        <div className="space-y-10">
            {/* 상단 헤더 */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-orange-500">
                        <Wand2 size={16} />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">나의 여정</span>
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">나의 여행 기록</h3>
                    <p className="text-xs text-slate-400 font-bold max-w-md">준비 중인 설렘부터 완료된 추억까지 한곳에서 관리하세요.</p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setShowImportModal(true)}
                        className="px-5 py-2.5 rounded-xl bg-white border border-slate-100 shadow-sm text-[11px] font-black text-slate-600 hover:border-orange-200 hover:text-orange-500 transition-all flex items-center gap-2"
                    >
                        <Sparkles size={14} className="text-orange-500" />
                        루트 가져오기
                    </button>
                    <div className="px-5 py-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-400 text-[10px] font-black tracking-widest flex items-center gap-2">
                        <Check size={14} className="text-teal-500" />
                        총 {trips.length}개
                    </div>
                </div>
            </div>

            {/* 필터 및 등록 섹션 */}
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                    {[
                        { id: 'all', label: '전체' },
                        { id: 'active', label: '준비/모집 중' },
                        { id: 'completed', label: '다녀온 여행' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setFilter(item.id as any)}
                            className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all border ${filter === item.id
                                ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/10'
                                : 'bg-white text-slate-400 border-slate-100 hover:border-slate-200'
                                }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => setIsAdding(true)}
                    className="px-6 py-2.5 rounded-2xl bg-orange-500 text-white text-xs font-black transition-all shadow-lg shadow-orange-500/10 hover:shadow-orange-500/20 active:scale-95 flex items-center gap-2"
                    style={{ background: theme.colors.gradients.brand }}
                >
                    <Plus size={16} strokeWidth={3} />
                    새로운 여행 만들기
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence mode="popLayout">
                    {filteredTrips.map((trip) => (
                        <TripCard
                            key={trip.id}
                            trip={trip}
                            onDelete={deleteTrip}
                            onReview={openReviewModal}
                        />
                    ))}
                </AnimatePresence>
            </div>

            {/* 루트 가져오기 모달 */}
            <ImportRouteModal
                isOpen={showImportModal}
                onClose={() => setShowImportModal(false)}
                courses={MOCK_SAVED_COURSES}
                onImport={handleImportRoute}
            />

            {/* 새로운 여행 만들기 모달 */}
            <CreateTripModal
                isOpen={isAdding}
                onClose={resetForm}
                step={step}
                setStep={setStep}
                newTrip={newTrip}
                setNewTrip={setNewTrip}
                tempRoute={tempRoute}
                setTempRoute={setTempRoute}
                addRoute={addRoute}
                removeRoute={removeRoute}
                onSubmit={handleAddTrip}
            />
        </div>
    );
};
