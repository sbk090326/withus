'use client';

import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Plus, Check, Sparkles, Wand2 } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';
import { TripCard, TripCardSkeleton } from './upcoming-trips/TripCard';
import { Pagination } from '@/app/components/ui/Pagination';
import { ImportRouteModal } from './upcoming-trips/ImportRouteModal';
import { CreateTripModal } from './upcoming-trips/CreateTripModal';
import { EditTripModal } from './upcoming-trips/EditTripModal';

const INITIAL_TRIPS: Array<{
    id: number;
    title: string;
    location: string;
    date: string;
    status: string;
    isCompleted: boolean;
    isRecruiting: boolean;
    role: 'host' | 'guest';
    progress: number;
    highlights?: string[];
    thumbnail: string;
    companions: number;
}> = [
        {
            id: 1,
            title: '포르투갈 서핑 정복기 🏄‍♂️',
            location: '포르투갈, 포르투',
            date: '2026.05.02 - 2026.05.10',
            status: 'D-12',
            isCompleted: false,
            isRecruiting: true,
            role: 'host',
            progress: 65,
            highlights: ['마토지뉴슈', '도우로 밸리', '리베이라'],
            thumbnail: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
            companions: 2,
        },
        {
            id: 2,
            title: '방콕 루프탑 바 번개 칵테일 🍸',
            location: '태국, 방콕',
            date: '2026.03.20 08:00 PM',
            status: 'D-52',
            isCompleted: false,
            isRecruiting: false,
            role: 'guest',
            progress: 30,
            highlights: ['티츄카', '왓 아룬', '조드페어'],
            thumbnail: 'https://images.unsplash.com/photo-1508939232145-159d460d3fc1?auto=format&fit=crop&q=80&w=800',
            companions: 1,
        },
        {
            id: 3,
            title: '파리 에펠탑 피크닉 & 스냅 🥖',
            location: '프랑스, 파리',
            date: '2026.04.12 - 2026.04.18',
            status: '완료됨',
            isCompleted: true,
            isRecruiting: false,
            role: 'guest',
            progress: 100,
            highlights: ['에펠탑', '루브르', '몽마르뜨'],
            thumbnail: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800',
            companions: 4,
        },
        {
            id: 4,
            title: '나홀로 런던 스케치 여행 🎨',
            location: '영국, 런던',
            date: '2026.08.15 - 2026.08.25',
            status: '기획 중',
            isCompleted: false,
            isRecruiting: false,
            role: 'host',
            progress: 15,
            highlights: ['빅벤', '테이트 모던', '브리티시 뮤지엄'],
            thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
            companions: 0,
        },
        {
            id: 5,
            title: '도쿄 미식 탐방 🍱',
            location: '일본, 도쿄',
            date: '2026.09.10 - 2026.09.15',
            status: '준비 중',
            isCompleted: false,
            isRecruiting: true,
            role: 'host',
            progress: 45,
            highlights: ['츠키지 시장', '시부야', '아사쿠사'],
            thumbnail: 'https://images.unsplash.com/photo-1540959733332-e94e270b4d48?auto=format&fit=crop&q=80&w=800',
            companions: 3,
        },
        {
            id: 6,
            title: '뉴욕 크리스마스 여행 🎄',
            location: '미국, 뉴욕',
            date: '2026.12.20 - 2026.12.30',
            status: '완료됨',
            isCompleted: true,
            isRecruiting: false,
            role: 'guest',
            progress: 100,
            highlights: ['타임스퀘어', '센트럴파크', '록펠러센터'],
            thumbnail: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
            companions: 2,
        },
        {
            id: 7,
            title: '아이슬란드 오로라 헌팅 🌌',
            location: '아이슬란드, 레이캬비크',
            date: '2027.01.05 - 2027.01.12',
            status: 'D-340',
            isCompleted: false,
            isRecruiting: false,
            role: 'host',
            progress: 10,
            highlights: ['블루라군', '굴포스', '검은모래해변'],
            thumbnail: 'https://images.unsplash.com/photo-1476610182048-b716b8518aae?auto=format&fit=crop&q=80&w=800',
            companions: 0,
        },
        {
            id: 8,
            title: '바르셀로나 축구 직관 여행 ⚽',
            location: '스페인, 바르셀로나',
            date: '2026.10.15 - 2026.10.22',
            status: '준비 중',
            isCompleted: false,
            isRecruiting: true,
            role: 'guest',
            progress: 60,
            highlights: ['캄 노우', '사그라다 파밀리아', '구엘 공원'],
            thumbnail: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800',
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
    const [filter, setFilter] = useState<'all' | 'planning' | 'active' | 'completed'>('all');
    const [isLoading, setIsLoading] = useState(true);
    const [trips, setTrips] = useState(INITIAL_TRIPS);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, [filter, currentPage]);

    // 필터 변경 시에만 첫 페이지로 이동
    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTripToEdit, setSelectedTripToEdit] = useState<typeof INITIAL_TRIPS[0] | null>(null);
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

        const trip: {
            id: number;
            title: string;
            location: string;
            date: string;
            status: string;
            isCompleted: boolean;
            isRecruiting: boolean;
            role: 'host' | 'guest';
            progress: number;
            highlights?: string[];
            thumbnail: string;
            companions: number;
        } = {
            id: Date.now(),
            title: newTrip.title,
            location: newTrip.location,
            date: `${newTrip.startDate} - ${newTrip.endDate || '미정'}`,
            status: '준비 중',
            isCompleted: false,
            isRecruiting: false,
            role: 'host',
            progress: 0,
            highlights: newTrip.routes.slice(0, 3),
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

    const handleUpdateTrip = (updatedTrip: any) => {
        setTrips(trips.map(t => t.id === updatedTrip.id ? updatedTrip : t));
        setIsEditing(false);
        setSelectedTripToEdit(null);
    };

    const handleDelete = (id: number) => {
        if (confirm('이 계획을 삭제하시겠습니까?')) {
            setTrips(trips.filter(t => t.id !== id));
        }
    };

    const openReviewModal = (title: string) => {
        alert(`'${title}' 여행의 동행자 키워드 평가를 시작합니다.`);
    };

    const filteredTrips = trips.filter(trip => {
        if (filter === 'planning') return !trip.isCompleted && !trip.isRecruiting && trip.role === 'host' && trip.companions === 0;
        if (filter === 'active') return !trip.isCompleted && (trip.isRecruiting || trip.role === 'guest' || trip.companions > 0);
        if (filter === 'completed') return trip.isCompleted;
        return true;
    });

    const totalPages = Math.ceil(filteredTrips.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedTrips = filteredTrips.slice(startIndex, startIndex + itemsPerPage);

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
                        { id: 'planning', label: '나만의 계획' },
                        { id: 'active', label: '모집/참여 중' },
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[600px]">
                {isLoading ? (
                    <>
                        <TripCardSkeleton />
                        <TripCardSkeleton />
                        <TripCardSkeleton />
                        <TripCardSkeleton />
                    </>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:col-span-2">
                        {paginatedTrips.map((trip) => (
                            <TripCard
                                key={trip.id}
                                trip={trip}
                                onDelete={handleDelete}
                                onReview={(title) => alert(`${title}의 리뷰 페이지로 이동합니다.`)}
                                onEdit={() => {
                                    setSelectedTripToEdit(trip);
                                    setIsEditing(true);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Premium Pagination - Management Optimized */}
            {!isLoading && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-16"
                />
            )}

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
            {/* 여정 수정 모달 */}
            <EditTripModal
                isOpen={isEditing}
                onClose={() => {
                    setIsEditing(false);
                    setSelectedTripToEdit(null);
                }}
                trip={selectedTripToEdit}
                onSave={handleUpdateTrip}
            />
        </div>
    );
};
