'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Star, MapPin, ChevronRight, Tags, ArrowRight, X, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { theme } from '@/app/components/design-system/constants';
import { SearchFilterPanel } from '@/app/components/ui/SearchFilterPanel';

const MOCK_DATA_BY_CATEGORY: Record<string, any[]> = {
    accomodation: [
        {
            id: 1,
            name: '페스타나 빈티지 포르투',
            type: '5성급 호텔',
            rating: 4.8,
            reviews: 245,
            price: '284,000',
            location: 'Portugal, Porto',
            distance: '중심가에서 500m',
            image: 'https://images.unsplash.com/photo-1551882547-ff43c63efe81?auto=format&fit=crop&q=80&w=800',
            tags: ['강변 뷰', '조식 포함', '무료 취소']
        },
        {
            id: 2,
            name: '포르투 베이 플로레스',
            type: '부티크 호텔',
            rating: 4.9,
            reviews: 128,
            price: '312,000',
            location: 'Portugal, Porto',
            distance: '역사 지구 중심',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800',
            tags: ['스파시설', '정원 보유', '럭셔리']
        }
    ],
    flights: [
        {
            id: 101,
            name: '대한항공 KE901 (직항)',
            type: '이코노미 / 왕복',
            rating: 4.7,
            reviews: 1200,
            price: '1,450,000',
            location: '인천(ICN) - 마드리드(MAD)',
            distance: '비행시간 13시간',
            image: 'https://images.unsplash.com/photo-1436491865332-7a61a109c0f2?auto=format&fit=crop&q=80&w=800',
            tags: ['기내 WiFi', '무료 위탁수하물', '국적기']
        },
        {
            id: 102,
            name: '에미레이트 항공 EK323',
            type: '이코노미 / 1회 경유',
            rating: 4.9,
            reviews: 3500,
            price: '1,120,000',
            location: '인천(ICN) - 두바이(DXB) 경유',
            distance: '두바이 대기 3시간',
            image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&q=80&w=800',
            tags: ['최신 항공기', 'A380 운항', '경유 특가']
        }
    ],
    activity: [
        {
            id: 201,
            name: '도우로 밸리 와이너리 투어',
            type: '데이투어 / 가이드 동행',
            rating: 4.9,
            reviews: 86,
            price: '85,000',
            location: '포르투 출발',
            distance: '점심 식사 포함',
            image: 'https://images.unsplash.com/photo-1543412849-c550097a9737?auto=format&fit=crop&q=80&w=800',
            tags: ['한국어 가이드', '와인 시음', '차량 제공']
        }
    ],
    insurance: [
        {
            id: 301,
            name: '카카오페이 여행자 보험',
            type: '표준형 보장',
            rating: 4.8,
            reviews: 450,
            price: '12,000',
            location: '전 세계 보장',
            distance: '보험금 즉시 지급 가능',
            image: 'https://images.unsplash.com/photo-1454165833206-38202d60bc84?auto=format&fit=crop&q=80&w=800',
            tags: ['간편 가입', '대기시간 보장', '의료비 포함']
        }
    ],
    network: [
        {
            id: 401,
            name: '유럽 통합 유심 (Orange)',
            type: '데이터 10GB / 30일',
            rating: 4.5,
            reviews: 320,
            price: '24,000',
            location: '유럽 전역 로밍',
            distance: '공항 픽업 가능',
            image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800',
            tags: ['LTE/5G', '테더링 가능', '현지 번호']
        }
    ]
};

interface SearchSectionProps {
    category: string;
    trip: any;
}

export const SearchSection = ({ category, trip }: SearchSectionProps) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // 카테고리에 맞는 데이터 필터링
    const results = useMemo(() => {
        return MOCK_DATA_BY_CATEGORY[category] || MOCK_DATA_BY_CATEGORY.accomodation;
    }, [category]);

    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 600);
        return () => clearTimeout(timer);
    }, [category]);

    return (
        <div className="space-y-8 min-h-[1000px]">
            {/* 📍 검색 인터페이스 */}
            <div className="flex flex-col gap-5">
                <div className="flex items-center gap-3">
                    <div className="flex-1 relative group">
                        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-orange-500 transition-colors pointer-events-none">
                            <Search size={18} />
                        </div>
                        <input
                            type="text"
                            placeholder={
                                category === 'flights' ? "어디로 날아가시나요?" :
                                    category === 'accomodation' ? "어디서 묵고 싶으신가요?" : "검색어를 입력하세요"
                            }
                            className="w-full h-[60px] pl-14 pr-6 rounded-[20px] bg-white border border-slate-100 focus:border-orange-200 outline-none font-bold text-[14px] text-slate-700 shadow-sm transition-all placeholder:text-slate-300"
                        />
                    </div>

                    <button
                        className="h-[60px] px-8 rounded-[20px] text-white font-black hover:shadow-xl hover:shadow-orange-500/20 transition-all active:scale-95 flex items-center gap-3 shrink-0 shadow-lg"
                        style={{ background: theme.colors.gradients.brand }}
                    >
                        <span className="text-[13px]">검색</span>
                        <ArrowRight size={16} strokeWidth={3} />
                    </button>

                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`h-[60px] w-[60px] rounded-[20px] flex items-center justify-center transition-all shrink-0 shadow-md group relative ${isFilterOpen ? 'bg-orange-500 text-white' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
                    >
                        {isFilterOpen ? <X size={20} /> : <Filter size={20} />}
                    </button>
                </div>

                <SearchFilterPanel isOpen={isFilterOpen} />
            </div>

            {/* 🗂️ 검색 결과 리스트 - 카테고리 기반 렌더링 */}
            <div className="space-y-6">
                {isLoading ? (
                    <>
                        <SearchItemSkeleton />
                        <SearchItemSkeleton />
                    </>
                ) : (
                    results.map((item, idx) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500 group"
                        >
                            <div className="flex flex-col md:flex-row p-4 gap-6">
                                {/* 🎇 이미지 섹션 */}
                                <div className="w-full md:w-[240px] h-[180px] overflow-hidden rounded-[18px] relative shrink-0">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/20 text-white font-black text-[9px]">
                                        <Star size={10} className="text-orange-400 fill-orange-400" />
                                        <span>{item.rating}</span>
                                    </div>
                                </div>

                                {/* 📝 콘텐츠 섹션 */}
                                <div className="flex-1 flex flex-col justify-between py-0.5 pr-2">
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-1.5">
                                                <div className="w-1 h-1 rounded-full bg-orange-500" />
                                                <span className="text-[9px] font-black text-orange-500 uppercase tracking-widest">{item.type}</span>
                                            </div>
                                            <h3 className="text-[18px] font-bold text-slate-900 tracking-tight leading-tight transition-colors group-hover:text-orange-500">
                                                {item.name}
                                            </h3>
                                        </div>

                                        <div className="p-3.5 rounded-[16px] bg-slate-50/70 border border-slate-100/50 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <MapPin size={14} className="text-slate-400 shrink-0" />
                                                <div className="space-y-px">
                                                    <p className="text-[12px] font-bold text-slate-700">{item.location}</p>
                                                    <p className="text-[10px] font-medium text-slate-400 italic">{item.distance}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1.5">
                                            {item.tags.map((tag: string) => (
                                                <span key={tag} className="px-3 py-1 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500">
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50 mt-4">
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-[22px] font-black text-slate-900 tracking-tighter">{item.price}</span>
                                            <span className="text-[13px] font-bold text-slate-500">원~</span>
                                        </div>

                                        <button
                                            className="h-11 px-6 rounded-xl bg-slate-900 text-white font-black hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center gap-2 text-[12px] tracking-tight shadow-md"
                                        >
                                            <span>자세히 보기</span>
                                            <ChevronRight size={16} strokeWidth={3} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
};

/**
 * SearchItemSkeleton - Loading state UI
 */
export const SearchItemSkeleton = () => {
    return (
        <div className="bg-white rounded-[24px] overflow-hidden border border-slate-100 shadow-sm animate-pulse">
            <div className="flex flex-col md:flex-row p-4 gap-6">
                <div className="w-full md:w-[240px] h-[180px] bg-slate-100 rounded-[18px] shrink-0" />
                <div className="flex-1 flex flex-col justify-between py-1 pr-2">
                    <div className="space-y-5">
                        <div className="space-y-2">
                            <div className="w-24 h-3 bg-slate-50 rounded-full" />
                            <div className="w-3/4 h-7 bg-slate-100 rounded-lg" />
                        </div>
                        <div className="h-14 w-full bg-slate-50/70 rounded-[16px] border border-slate-100/50" />
                        <div className="flex gap-2">
                            <div className="w-16 h-6 bg-slate-50 rounded-lg" />
                            <div className="w-20 h-6 bg-slate-50 rounded-lg" />
                        </div>
                    </div>
                    <div className="flex items-center justify-between pt-5 border-t border-slate-50 mt-5">
                        <div className="w-32 h-8 bg-slate-100 rounded-lg" />
                        <div className="w-28 h-11 bg-slate-900/10 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
};
