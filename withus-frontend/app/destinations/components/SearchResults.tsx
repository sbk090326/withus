'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Users, Heart, Download, X, SlidersHorizontal } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

interface SearchResultsProps {
    query: string;
    onClose: () => void;
}

// Mock search results
const mockSearchResults = (query: string) => {
    const allResults = [
        {
            id: 1,
            title: "파리 로맨틱 여행 완벽 가이드",
            location: "프랑스, 파리",
            duration: "5박 6일",
            image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=600",
            likes: 1240,
            saves: 567,
            tags: ["파리", "로맨틱", "유럽"],
            route: ["에펠탑", "루브르 박물관", "몽마르트", "베르사유"]
        },
        {
            id: 2,
            title: "제주 동쪽 해안 드라이브 코스",
            location: "대한민국, 제주",
            duration: "3박 4일",
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600",
            likes: 980,
            saves: 432,
            tags: ["제주", "힐링", "드라이브"],
            route: ["성산 일출봉", "우도", "함덕 해수욕장"]
        },
        {
            id: 3,
            title: "발리 우붓 힐링 스테이 5박 6일",
            location: "인도네시아, 발리",
            duration: "5박 6일",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600",
            likes: 856,
            saves: 389,
            tags: ["발리", "힐링", "요가"],
            route: ["우붓", "테갈랄랑 계단식 논", "몽키 포레스트"]
        },
        {
            id: 4,
            title: "도쿄 시부야 & 하라주쿠 쇼핑 4박 5일",
            location: "일본, 도쿄",
            duration: "4박 5일",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600",
            likes: 742,
            saves: 356,
            tags: ["도쿄", "쇼핑", "시티"],
            route: ["시부야", "하라주쿠", "아키하바라", "신주쿠"]
        },
        {
            id: 5,
            title: "유럽 3개국 배낭여행 15박 16일",
            location: "유럽",
            duration: "15박 16일",
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=600",
            likes: 1523,
            saves: 892,
            tags: ["유럽", "배낭여행", "파리", "로마"],
            route: ["파리", "로마", "바르셀로나", "암스테르담"]
        }
    ];

    // Simple search filter
    const lowerQuery = query.toLowerCase();
    return allResults.filter(result =>
        result.title.toLowerCase().includes(lowerQuery) ||
        result.location.toLowerCase().includes(lowerQuery) ||
        result.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
};

export const SearchResults = ({ query, onClose }: SearchResultsProps) => {
    const results = mockSearchResults(query);

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full py-16 px-6 bg-white border-t-4 border-orange-500"
        >
            <div className="max-w-[1400px] mx-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            className="flex items-center gap-3 mb-3"
                        >
                            <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                                <MapPin className="text-orange-600" size={20} />
                            </div>
                            <h2 className="text-3xl md:text-4xl font-black text-slate-900">
                                "<span className="text-orange-600">{query}</span>" 검색 결과
                            </h2>
                        </motion.div>
                        <p className="text-slate-600 font-medium">
                            총 <span className="font-bold text-orange-600">{results.length}개</span>의 루트를 찾았습니다
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="px-4 py-2 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all flex items-center gap-2">
                            <SlidersHorizontal size={16} />
                            필터
                        </button>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Results Grid */}
                {results.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="text-6xl mb-6">🔍</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">검색 결과가 없습니다</h3>
                        <p className="text-slate-500 mb-8">다른 키워드로 검색해보시거나, 인기 여행지를 둘러보세요</p>
                        <button
                            onClick={onClose}
                            className="px-8 py-3 rounded-full bg-slate-900 text-white font-bold hover:bg-orange-500 transition-all"
                        >
                            인기 여행지 보기
                        </button>
                    </motion.div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {results.map((result, index) => (
                            <motion.div
                                key={result.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-[32px] overflow-hidden border border-slate-100 hover:border-orange-200 hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 cursor-pointer"
                            >
                                {/* Image */}
                                <div className="relative h-56 overflow-hidden">
                                    <motion.img
                                        src={result.image}
                                        alt={result.title}
                                        className="w-full h-full object-cover"
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    {/* Stats */}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white text-sm font-bold">
                                        <div className="flex items-center gap-1">
                                            <Heart size={14} />
                                            {result.likes}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            📌 {result.saves}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-4">
                                    <h3 className="font-bold text-lg text-slate-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                        {result.title}
                                    </h3>

                                    <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={14} />
                                            {result.location}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {result.duration}
                                        </div>
                                    </div>

                                    {/* Route Preview */}
                                    <div className="flex flex-wrap gap-2">
                                        {result.route.slice(0, 2).map((point, i) => (
                                            <span key={i} className="px-2 py-1 bg-orange-50 text-orange-600 text-xs font-bold rounded-lg">
                                                {point}
                                            </span>
                                        ))}
                                        {result.route.length > 2 && (
                                            <span className="px-2 py-1 bg-slate-50 text-slate-400 text-xs font-bold rounded-lg">
                                                +{result.route.length - 2}
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2">
                                        <button className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-orange-500 transition-all flex items-center justify-center gap-2">
                                            <Download size={14} />
                                            담기
                                        </button>
                                        <button className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:border-orange-200 hover:text-orange-600 hover:bg-orange-50 transition-all">
                                            상세
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </motion.section>
    );
};
