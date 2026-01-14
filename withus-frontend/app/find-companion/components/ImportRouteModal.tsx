'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

interface ImportRouteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: (route: string[]) => void;
}

// Mock data - will be replaced with actual API calls
const mockMyPlanners = [
    {
        id: 1,
        title: "파리 로맨틱 여행 5박 6일",
        destination: "프랑스, 파리",
        date: "2026.04.10 - 2026.04.15",
        route: ["에펠탑", "루브르 박물관", "몽마르트 언덕", "베르사유 궁전", "오르세 미술관"],
        thumbnail: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 2,
        title: "제주 힐링 여행 3박 4일",
        destination: "대한민국, 제주",
        date: "2026.05.01 - 2026.05.04",
        route: ["성산 일출봉", "우도", "함덕 해수욕장", "카멜리아 힐"],
        thumbnail: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=400"
    }
];

const mockPopularRecipes = [
    {
        id: 101,
        title: "런던 뮤지엄 투어 4박 5일",
        destination: "영국, 런던",
        likes: 342,
        route: ["대영 박물관", "테이트 모던", "자연사 박물관", "빅토리아 앨버트 박물관"],
        thumbnail: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 102,
        title: "방콕 야시장 맛집 탐방 3박 4일",
        destination: "태국, 방콕",
        likes: 289,
        route: ["카오산 로드", "짜뚜짝 시장", "아시아티크", "탈랏 롯 파이"],
        thumbnail: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=400"
    },
    {
        id: 103,
        title: "로마 역사 탐방 5박 6일",
        destination: "이탈리아, 로마",
        likes: 456,
        route: ["콜로세움", "바티칸 시국", "트레비 분수", "판테온", "포로 로마노"],
        thumbnail: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=400"
    }
];

export const ImportRouteModal = ({ isOpen, onClose, onImport }: ImportRouteModalProps) => {
    const [activeTab, setActiveTab] = React.useState<'my-planner' | 'popular'>('my-planner');

    const handleImport = (route: string[]) => {
        onImport(route);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[1200] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-md"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-3xl bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header */}
                        <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between bg-white sticky top-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-400 to-teal-600 flex items-center justify-center text-white shadow-lg">
                                    <Sparkles size={20} fill="white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">일정 가져오기</h2>
                                    <p className="text-xs text-slate-400">저장된 일정이나 인기 코스를 선택하세요</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-slate-50 text-slate-400 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="px-8 pt-6 pb-4 bg-white border-b border-slate-50">
                            <div className="flex gap-4">
                                <button
                                    onClick={() => setActiveTab('my-planner')}
                                    className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all ${activeTab === 'my-planner'
                                            ? 'bg-slate-900 text-white shadow-lg'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    📋 내 플래너 ({mockMyPlanners.length})
                                </button>
                                <button
                                    onClick={() => setActiveTab('popular')}
                                    className={`flex-1 py-3 px-6 rounded-2xl font-bold text-sm transition-all ${activeTab === 'popular'
                                            ? 'bg-slate-900 text-white shadow-lg'
                                            : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                                        }`}
                                >
                                    🔥 인기 코스 ({mockPopularRecipes.length})
                                </button>
                            </div>
                        </div>

                        {/* Content Area - Scrollable */}
                        <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                            <AnimatePresence mode="wait">
                                {activeTab === 'my-planner' ? (
                                    <motion.div
                                        key="my-planner"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-4"
                                    >
                                        {mockMyPlanners.length === 0 ? (
                                            <div className="py-20 text-center">
                                                <div className="text-6xl mb-4">📝</div>
                                                <h3 className="text-lg font-bold text-slate-900 mb-2">저장된 플래너가 없습니다</h3>
                                                <p className="text-sm text-slate-500">먼저 '내 여행' 메뉴에서 일정을 만들어보세요!</p>
                                            </div>
                                        ) : (
                                            mockMyPlanners.map((planner) => (
                                                <motion.div
                                                    key={planner.id}
                                                    whileHover={{ scale: 1.01 }}
                                                    className="p-6 bg-white rounded-3xl border border-slate-100 hover:border-teal-200 hover:shadow-lg transition-all cursor-pointer group"
                                                    onClick={() => handleImport(planner.route)}
                                                >
                                                    <div className="flex gap-6">
                                                        <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                                                            <img src={planner.thumbnail} alt={planner.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex-1 space-y-3">
                                                            <h3 className="font-bold text-slate-900 text-lg group-hover:text-teal-600 transition-colors">
                                                                {planner.title}
                                                            </h3>
                                                            <div className="flex items-center gap-4 text-xs text-slate-500">
                                                                <div className="flex items-center gap-1">
                                                                    <MapPin size={14} />
                                                                    {planner.destination}
                                                                </div>
                                                                <div className="flex items-center gap-1">
                                                                    <Calendar size={14} />
                                                                    {planner.date}
                                                                </div>
                                                            </div>
                                                            <div className="flex flex-wrap gap-2">
                                                                {planner.route.slice(0, 3).map((point, i) => (
                                                                    <span key={i} className="px-2 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-lg">
                                                                        {point}
                                                                    </span>
                                                                ))}
                                                                {planner.route.length > 3 && (
                                                                    <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg">
                                                                        +{planner.route.length - 3}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <ChevronRight className="text-slate-200 group-hover:text-teal-500 transition-colors self-center" size={24} />
                                                    </div>
                                                </motion.div>
                                            ))
                                        )}
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="popular"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-4"
                                    >
                                        {mockPopularRecipes.map((recipe) => (
                                            <motion.div
                                                key={recipe.id}
                                                whileHover={{ scale: 1.01 }}
                                                className="p-6 bg-white rounded-3xl border border-slate-100 hover:border-orange-200 hover:shadow-lg transition-all cursor-pointer group"
                                                onClick={() => handleImport(recipe.route)}
                                            >
                                                <div className="flex gap-6">
                                                    <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100">
                                                        <img src={recipe.thumbnail} alt={recipe.title} className="w-full h-full object-cover" />
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        <div className="flex items-center gap-3">
                                                            <h3 className="font-bold text-slate-900 text-lg group-hover:text-orange-600 transition-colors">
                                                                {recipe.title}
                                                            </h3>
                                                            <span className="px-2 py-1 bg-orange-50 text-orange-600 text-[10px] font-black rounded-lg flex items-center gap-1">
                                                                ❤️ {recipe.likes}
                                                            </span>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-xs text-slate-500">
                                                            <MapPin size={14} />
                                                            {recipe.destination}
                                                        </div>
                                                        <div className="flex flex-wrap gap-2">
                                                            {recipe.route.slice(0, 3).map((point, i) => (
                                                                <span key={i} className="px-2 py-1 bg-orange-50 text-orange-600 text-[10px] font-bold rounded-lg">
                                                                    {point}
                                                                </span>
                                                            ))}
                                                            {recipe.route.length > 3 && (
                                                                <span className="px-2 py-1 bg-slate-50 text-slate-400 text-[10px] font-bold rounded-lg">
                                                                    +{recipe.route.length - 3}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <ChevronRight className="text-slate-200 group-hover:text-orange-500 transition-colors self-center" size={24} />
                                                </div>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100">
                            <p className="text-xs text-slate-400 text-center">
                                💡 가져온 일정은 자유롭게 수정할 수 있습니다
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};
