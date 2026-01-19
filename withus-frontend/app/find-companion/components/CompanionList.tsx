import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CompanionCard } from './CompanionCard';
import { Filter, ChevronDown, Zap, List, Map as MapIcon, Navigation, X } from 'lucide-react';
import { MapView } from './MapView';
import { CompanionSkeleton } from './CompanionSkeleton';
import { AdvancedFilter } from './AdvancedFilter';
import { LoadMoreButton } from '../../components/ui/LoadMoreButton';

const mockCompanions = [
    {
        id: 1,
        user: { name: '지니', image: '👩‍🦰', tags: ['#E형인간', '#미식가', '#뚜벅이'] },
        title: '파리 에펠탑 야경 투어 같이 하실 분 계신가요?',
        location: '프랑스, 파리',
        date: '2026.04.12 - 2026.04.18',
        matchScore: 98,
        likeCount: 24,
        thumbnail: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800',
        targetGender: '여성만',
        targetAge: '20대',
        isSmoker: '비흡연자만',
        budget: '50만원 내외',
        currentPeople: 3,
        maxPeople: 4,
        route: ['에펠탑', '루브르 박물관', '몽생미셸']
    },
    {
        id: 2,
        user: { name: '로키', image: '🧔', tags: ['#액티비티', '#사진작가', '#MBTI-I'] },
        title: '포르투 서핑 클래스 동행 구합니다! 초보 환영 🏄‍♂️',
        location: '포르투갈, 포르투',
        date: '2026.05.02 - 2026.05.10',
        matchScore: 92,
        likeCount: 15,
        thumbnail: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=800',
        targetGender: '성별무관',
        targetAge: '전체',
        isSmoker: '상관없음',
        budget: '30만원',
        currentPeople: 1,
        maxPeople: 2,
        route: ['마토지뉴sh 비치', '리베이라 광장']
    },
    {
        id: 3,
        user: { name: '미나', image: '👧', tags: ['#박물관투어', '#여유로운', '#비건'] },
        title: '런던 테이트모던 전시 보고 애프터눈 티 세트 같이 먹어요.',
        location: '영국, 런던',
        date: '2026.04.15 - 2026.04.20',
        matchScore: 89,
        likeCount: 12,
        thumbnail: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=800',
        targetGender: '여성만',
        targetAge: '20-30대',
        isSmoker: '비흡연자만',
        budget: '20만원',
        currentPeople: 2,
        maxPeople: 4,
        route: ['테이트 모던', '브리티시 뮤지엄', '런던 아이']
    },
    {
        id: 4,
        user: { name: '카이', image: '🧑‍💻', tags: ['#디지털노마드', '#야경', '#술친구'] },
        title: '방콕 루프탑 바에서 칵테일 한 잔 하실 분?',
        location: '태국, 방콕',
        date: '2026.03.20 - 2026.03.30',
        matchScore: 85,
        likeCount: 31,
        thumbnail: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800',
        targetGender: '성별무관',
        targetAge: '전체',
        isSmoker: '상관없음',
        budget: '10만원 미만',
        currentPeople: 5,
        maxPeople: 6,
        route: ['카오산 로드', '티츄카 루프탑']
    },
    {
        id: 5,
        user: { name: '소라', image: '👱‍♀️', tags: ['#캠핑', '#운전가능', '#스냅사진'] },
        title: '제주도 동쪽 캠핑 여행 2박 3일 메이트 찾습니다.',
        location: '대한민국, 제주',
        date: '2026.04.01 - 2026.04.03',
        matchScore: 82,
        likeCount: 18,
        thumbnail: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
        targetGender: '여성만',
        targetAge: '전체',
        isSmoker: '비흡연자만',
        budget: '40만원',
        currentPeople: 2,
        maxPeople: 3,
        route: ['함덕 해수욕장', '성산 일출봉', '우도']
    },
    {
        id: 6,
        user: { name: '진', image: '👨', tags: ['#역사', '#도보여행', '#로컬맛집'] },
        title: '로마의 숨겨진 골목 투어, 현지인 맛집 위주로 다녀요.',
        location: '이탈리아, 로마',
        date: '2025.10.10 - 2025.10.15',
        matchScore: 78,
        likeCount: 9,
        thumbnail: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800',
        targetGender: '성별무관',
        targetAge: '30대 이상',
        isSmoker: '상관없음',
        budget: '자유',
        currentPeople: 1,
        maxPeople: 4,
        route: ['트레비 분수', '판테온', '콜로세움']
    },

];

export const CompanionList = () => {
    const [activeTab, setActiveTab] = useState<'all' | 'rec'>('all');
    const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
    const [isLoading, setIsLoading] = useState(true);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [filters, setFilters] = useState({ gender: '전체', age: '전체', smoking: '전체', style: [] });
    const [sortBy, setSortBy] = useState<'latest' | 'match' | 'popular'>('latest');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [locationStatus, setLocationStatus] = useState<'idle' | 'loading' | 'success'>('idle');
    const [isMoreLoading, setIsMoreLoading] = useState(false);

    useEffect(() => {
        // Simulate initial loading
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleNearMe = () => {
        setLocationStatus('loading');
        setTimeout(() => {
            setLocationStatus('success');
            // In real app, filter by actual coordinates
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 800);
        }, 1500);
    };

    const handleLoadMore = () => {
        setIsMoreLoading(true);
        // Simulate API call to fetch more data
        setTimeout(() => {
            setIsMoreLoading(false);
        }, 1500);
    };

    const getSortedCompanions = () => {
        let list = activeTab === 'all'
            ? [...mockCompanions]
            : mockCompanions.filter(c => c.matchScore >= 90);

        // Sorting logic
        if (sortBy === 'match') {
            list.sort((a, b) => sortOrder === 'desc' ? b.matchScore - a.matchScore : a.matchScore - b.matchScore);
        } else if (sortBy === 'popular') {
            // Popularity is currently based on likeCount
            list.sort((a, b) => sortOrder === 'desc' ? b.likeCount - a.likeCount : a.likeCount - b.likeCount);
        } else {
            // latest is default (based on id as proxy for creation time)
            list.sort((a, b) => sortOrder === 'desc' ? b.id - a.id : a.id - b.id);
        }

        return list;
    };

    const displayCompanions = getSortedCompanions();

    return (
        <div className="w-full max-w-[1200px] mx-auto px-6 pb-32">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-6">
                    <button
                        onClick={() => setActiveTab('all')}
                        className={`flex items-center gap-2 font-bold pb-2 border-b-2 transition-all ${activeTab === 'all' ? 'text-slate-900 border-orange-500' : 'text-slate-400 border-transparent hover:text-slate-600'
                            }`}
                    >
                        전체 동행
                    </button>
                    <button
                        onClick={() => setActiveTab('rec')}
                        className={`flex items-center gap-2 font-bold pb-2 border-b-2 transition-all ${activeTab === 'rec' ? 'text-slate-900 border-orange-500' : 'text-slate-400 border-transparent hover:text-slate-600'
                            }`}
                    >
                        맞춤 추천
                        <Zap size={14} className={activeTab === 'rec' ? 'text-orange-500' : 'text-slate-400'} fill={activeTab === 'rec' ? 'currentColor' : 'none'} />
                    </button>
                </div>

                <div className="flex items-center gap-3">
                    {/* Near Me Toggle */}
                    <button
                        onClick={handleNearMe}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all ${locationStatus === 'success'
                            ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                            : 'bg-white border border-slate-100 text-slate-500 hover:border-slate-200'
                            }`}
                    >
                        <Navigation size={16} className={locationStatus === 'loading' ? 'animate-spin' : ''} />
                        {locationStatus === 'loading' ? '위치 찾는 중...' : '내 주변'}
                    </button>

                    <div className="w-px h-6 bg-slate-200 mx-2 hidden md:block" />

                    {/* View Mode Toggle */}
                    <div className="flex bg-slate-100 p-1 rounded-full">
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-full transition-all ${viewMode === 'list' ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List size={18} />
                        </button>
                        <button
                            onClick={() => setViewMode('map')}
                            className={`p-2 rounded-full transition-all ${viewMode === 'map' ? 'bg-white text-orange-500 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <MapIcon size={18} />
                        </button>
                    </div>
                    <div className="w-px h-6 bg-slate-200 mx-2 hidden md:block" />

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-1">
                        <div className="relative group">
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="appearance-none bg-white border border-slate-100 pl-4 pr-10 py-2 rounded-full text-sm font-bold text-slate-600 hover:border-slate-200 cursor-pointer outline-none transition-all shadow-sm focus:border-orange-500"
                            >
                                <option value="latest">최신순</option>
                                <option value="match">매칭점수순</option>
                                <option value="popular">인기순</option>
                            </select>
                            <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none transition-transform group-hover:text-slate-600" />
                        </div>
                        <button
                            onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
                            className="p-2 rounded-full bg-white border border-slate-100 text-slate-400 hover:text-orange-500 hover:border-orange-500 transition-all shadow-sm"
                            title={sortOrder === 'desc' ? '내림차순' : '오름차순'}
                        >
                            {sortOrder === 'desc' ? (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="M11 4h10" /><path d="M11 8h7" /><path d="M11 12h4" /></svg>
                            ) : (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m3 8 4-4 4 4" /><path d="M7 4v16" /><path d="M11 12h4" /><path d="M11 16h7" /><path d="M11 20h10" /></svg>
                            )}
                        </button>
                    </div>

                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all border ${filters.style.length > 0 || filters.gender !== '전체' || filters.smoking !== '전체'
                            ? 'bg-slate-900 text-white border-slate-900'
                            : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
                            }`}
                    >
                        <Filter size={16} />
                        필터
                        {(filters.style.length > 0 || filters.gender !== '전체' || filters.smoking !== '전체') && (
                            <span className="w-4 h-4 bg-orange-500 text-[10px] rounded-full flex items-center justify-center text-white">
                                !
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* Active Filter Chips */}
            <AnimatePresence>
                {(filters.gender !== '전체' || filters.age !== '전체' || filters.style.length > 0) && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex flex-wrap items-center gap-3 mb-10"
                    >
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mr-2">Active Filters</span>

                        {filters.gender !== '전체' && (
                            <button
                                onClick={() => setFilters({ ...filters, gender: '전체' })}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-50 text-orange-600 text-xs font-bold border border-orange-100 hover:bg-orange-100 transition-colors group"
                            >
                                성별: {filters.gender}
                                <X size={12} className="text-orange-300 group-hover:text-orange-500" />
                            </button>
                        )}

                        {filters.age !== '전체' && (
                            <button
                                onClick={() => setFilters({ ...filters, age: '전체' })}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-pink-50 text-pink-600 text-xs font-bold border border-pink-100 hover:bg-pink-100 transition-colors group"
                            >
                                연령: {filters.age}
                                <X size={12} className="text-pink-300 group-hover:text-pink-500" />
                            </button>
                        )}

                        {filters.style.map((s) => (
                            <button
                                key={s}
                                onClick={() => setFilters({ ...filters, style: filters.style.filter(i => i !== s) })}
                                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold border border-slate-200 hover:bg-slate-200 transition-colors group"
                            >
                                {s}
                                <X size={12} className="text-slate-400 group-hover:text-slate-600" />
                            </button>
                        ))}

                        <button
                            onClick={() => setFilters({ gender: '전체', age: '전체', smoking: '전체', style: [] })}
                            className="text-xs text-slate-400 hover:text-orange-500 font-bold ml-2 transition-colors border-b border-transparent hover:border-orange-500"
                        >
                            전체 초기화
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <AnimatePresence mode="wait">
                {isLoading ? (
                    <motion.div
                        key="skeleton"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <CompanionSkeleton key={i} />
                        ))}
                    </motion.div>
                ) : viewMode === 'list' ? (
                    <motion.div
                        key="list-view"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {displayCompanions.map((comp, idx) => (
                                <CompanionCard key={comp.id} companion={comp} index={idx} />
                            ))}
                        </div>

                        {/* Load More Section */}
                        {displayCompanions.length >= 6 && (
                            <LoadMoreButton
                                onClick={handleLoadMore}
                                isLoading={isMoreLoading}
                            />
                        )}

                        {displayCompanions.length === 0 && (
                            <div className="py-40 text-center">
                                <div className="text-6xl mb-6">🔍</div>
                                <h3 className="text-xl font-bold text-slate-900 mb-2">조건에 맞는 동행이 없어요</h3>
                                <p className="text-slate-500">다른 필터나 전체 목록을 확인해보세요.</p>
                            </div>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        key="map-view"
                        initial={{ opacity: 0, scale: 1.02 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                    >
                        <MapView companions={displayCompanions} />
                    </motion.div>
                )}
            </AnimatePresence>

            <AdvancedFilter
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
                filters={filters}
                setFilters={setFilters}
            />
        </div>
    );
};

