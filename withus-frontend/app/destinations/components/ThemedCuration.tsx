'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Palmtree, Building2, Mountain, Coffee, Camera, Utensils } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

type ThemeType = 'healing' | 'city' | 'adventure' | 'cafe' | 'photo' | 'food';

const themes = [
    { id: 'healing' as ThemeType, label: '🌿 힐링', icon: Palmtree, color: 'teal' },
    { id: 'city' as ThemeType, label: '🏙️ 시티', icon: Building2, color: 'slate' },
    { id: 'adventure' as ThemeType, label: '🧗 어드벤처', icon: Mountain, color: 'orange' },
    { id: 'cafe' as ThemeType, label: '☕ 카페', icon: Coffee, color: 'amber' },
    { id: 'photo' as ThemeType, label: '📸 인생샷', icon: Camera, color: 'pink' },
    { id: 'food' as ThemeType, label: '🍜 맛집', icon: Utensils, color: 'rose' }
];

const mockRoutes: Record<ThemeType, any[]> = {
    healing: [
        {
            id: 1,
            title: "발리 우붓 힐링 스테이 5박 6일",
            location: "인도네시아, 발리",
            image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=600",
            likes: 342,
            saves: 128
        },
        {
            id: 2,
            title: "제주 동쪽 해안 드라이브 3박 4일",
            location: "대한민국, 제주",
            image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=600",
            likes: 289,
            saves: 95
        },
        {
            id: 3,
            title: "치앙마이 템플 투어 & 스파 4박 5일",
            location: "태국, 치앙마이",
            image: "https://images.unsplash.com/photo-1563492065213-f6c0c1e8f1c7?auto=format&fit=crop&q=80&w=600",
            likes: 256,
            saves: 87
        }
    ],
    city: [
        {
            id: 4,
            title: "뉴욕 맨해튼 야경 투어 6박 7일",
            location: "미국, 뉴욕",
            image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=600",
            likes: 412,
            saves: 156
        },
        {
            id: 5,
            title: "도쿄 시부야 & 하라주쿠 쇼핑 4박 5일",
            location: "일본, 도쿄",
            image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=600",
            likes: 378,
            saves: 142
        },
        {
            id: 6,
            title: "런던 뮤지엄 & 웨스트엔드 5박 6일",
            location: "영국, 런던",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=600",
            likes: 298,
            saves: 112
        }
    ],
    adventure: [
        {
            id: 7,
            title: "스위스 알프스 트레킹 7박 8일",
            location: "스위스, 인터라켄",
            image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=600",
            likes: 456,
            saves: 189
        },
        {
            id: 8,
            title: "아이슬란드 링로드 자동차 여행 10박 11일",
            location: "아이슬란드",
            image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80&w=600",
            likes: 523,
            saves: 234
        }
    ],
    cafe: [
        {
            id: 9,
            title: "파리 몽마르트 카페 투어 4박 5일",
            location: "프랑스, 파리",
            image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=600",
            likes: 367,
            saves: 145
        }
    ],
    photo: [
        {
            id: 10,
            title: "산토리니 선셋 포인트 3박 4일",
            location: "그리스, 산토리니",
            image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&q=80&w=600",
            likes: 612,
            saves: 278
        }
    ],
    food: [
        {
            id: 11,
            title: "방콕 야시장 맛집 탐방 3박 4일",
            location: "태국, 방콕",
            image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=600",
            likes: 445,
            saves: 198
        }
    ]
};

export const ThemedCuration = () => {
    const [activeTheme, setActiveTheme] = useState<ThemeType>('healing');

    return (
        <section className="w-full py-32 px-6" style={{ backgroundColor: palette.cream.section }}>
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16 space-y-4">
                    <span className="text-sm font-bold text-orange-400 uppercase tracking-wider">Curated for You</span>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                        테마별 <span className="text-transparent bg-clip-text" style={{ backgroundImage: theme.colors.gradients.brand }}>맞춤 추천</span>
                    </h2>
                    <p className="text-slate-600 font-medium">당신의 여행 스타일에 맞는 완벽한 루트를 찾아보세요</p>
                </div>

                {/* Theme Tabs */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {themes.map((theme) => {
                        const Icon = theme.icon;
                        const isActive = activeTheme === theme.id;
                        return (
                            <button
                                key={theme.id}
                                onClick={() => setActiveTheme(theme.id)}
                                className={`px-6 py-3 rounded-full font-bold text-sm transition-all flex items-center gap-2 ${isActive
                                        ? 'bg-slate-900 text-white shadow-lg scale-105'
                                        : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100'
                                    }`}
                            >
                                <Icon size={16} />
                                {theme.label}
                            </button>
                        );
                    })}
                </div>

                {/* Routes Grid */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTheme}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    >
                        {mockRoutes[activeTheme].map((route, index) => (
                            <motion.div
                                key={route.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-100/50 transition-all duration-500 cursor-pointer border border-transparent hover:border-orange-100"
                            >
                                {/* Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={route.image}
                                        alt={route.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Stats Overlay */}
                                    <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-white text-xs font-bold">
                                        <div className="flex items-center gap-1">
                                            ❤️ {route.likes}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            📌 {route.saves}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-3">
                                    <h3 className="font-bold text-lg text-slate-900 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                                        {route.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 font-medium">{route.location}</p>

                                    <button className="w-full py-3 rounded-2xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-orange-50 hover:text-orange-600 transition-all">
                                        일정 자세히 보기 →
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};
