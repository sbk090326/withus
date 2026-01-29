'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Heart, Flame, MapPin, ArrowRight, Crown } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

const trendingData = [
    {
        id: 1,
        city: "파리",
        country: "프랑스",
        image: "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=1200",
        travelers: 1240,
        routes: 89,
        description: "낭만의 도시에서 만나는 예술과 문화",
        tags: ["로맨틱", "예술", "카페"]
    },
    {
        id: 2,
        city: "제주",
        country: "대한민국",
        image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200",
        travelers: 980,
        routes: 67,
        description: "푸른 바다와 함께하는 힐링 여행",
        tags: ["힐링", "자연"]
    },
    {
        id: 3,
        city: "발리",
        country: "인도네시아",
        image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=1200",
        travelers: 856,
        routes: 54,
        description: "열대 낙원에서의 완벽한 휴식",
        tags: ["리조트", "요가"]
    },
    {
        id: 4,
        city: "도쿄",
        country: "일본",
        image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200",
        travelers: 742,
        routes: 43,
        description: "전통과 현대가 공존하는 메트로폴리스",
        tags: ["쇼핑", "맛집"]
    },
    {
        id: 5,
        city: "런던",
        country: "영국",
        image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&q=80&w=1200",
        travelers: 698,
        routes: 38,
        description: "역사가 살아 숨쉬는 클래식 시티",
        tags: ["박물관", "역사"]
    },
    {
        id: 6,
        city: "뉴욕",
        country: "미국",
        image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=1200",
        travelers: 1540,
        routes: 124,
        description: "잠들지 않는 위대한 도시의 에너지",
        tags: ["도시", "나이트라이프"]
    },
    {
        id: 7,
        city: "로마",
        country: "이탈리아",
        image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=1200",
        travelers: 1100,
        routes: 76,
        description: "영원한 도시에서 즐기는 과거로의 여행",
        tags: ["유적", "미식"]
    },
    {
        id: 8,
        city: "방콕",
        country: "태국",
        image: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=1200",
        travelers: 2100,
        routes: 145,
        description: "미식과 야시장의 천국",
        tags: ["야시장", "스트릿푸드"]
    }
];

export const TrendingDestinations = () => {
    const paginatedData = trendingData.slice(0, 5);

    return (
        <section className="w-full py-24 px-6 bg-white">
            <div className="max-w-[1400px] mx-auto">
                {/* Section Header */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <Flame className="text-orange-500" size={24} />
                        <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Hot Destinations</span>
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-3">
                                지금 가장 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">핫한 여행지</span>
                            </h2>
                            <p className="text-slate-600 font-medium">실시간 인기 급상승 중인 여행지를 만나보세요 🚀</p>
                        </div>
                        <motion.button
                            className="hidden md:block px-6 py-3 rounded-full border-2 border-slate-200 text-slate-600 font-bold text-sm hover:border-orange-500 hover:text-orange-600 transition-all font-black"
                            whileHover={{ scale: 1.05 }}
                        >
                            전체 보기 →
                        </motion.button>
                    </div>
                </motion.div>

                {/* Grid Layout: 1 Large + 4 Small + More if expanded */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Featured Card - Spans 2 columns */}
                    {paginatedData.length > 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="lg:col-span-2 group cursor-pointer"
                        >
                            <div className="relative h-[500px] rounded-[32px] overflow-hidden bg-slate-100">
                                {/* Image */}
                                <motion.div
                                    className="absolute inset-0"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <img
                                        src={paginatedData[0].image}
                                        alt={paginatedData[0].city}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                                </motion.div>

                                {/* Crown Badge */}
                                <div className="absolute top-6 left-6 z-10">
                                    <motion.div
                                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-black text-sm shadow-xl"
                                        animate={{ y: [0, -3, 0] }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        <Crown size={16} fill="white" />
                                        #1 BEST
                                    </motion.div>
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                                    <div className="flex items-center gap-2 mb-3">
                                        <MapPin className="text-orange-400" size={18} />
                                        <span className="text-white/90 font-bold">{paginatedData[0].country}</span>
                                    </div>
                                    <h3 className="text-5xl font-black text-white mb-3">
                                        {paginatedData[0].city}
                                    </h3>
                                    <p className="text-lg text-white/90 font-medium mb-4">
                                        {paginatedData[0].description}
                                    </p>

                                    <div className="flex items-center gap-4 mb-4">
                                        {paginatedData[0].tags.map((tag: string, i: number) => (
                                            <span key={i} className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-bold">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-6 text-white">
                                        <div className="flex items-center gap-2">
                                            <Users size={18} />
                                            <span className="font-bold">{paginatedData[0].travelers}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Heart size={18} />
                                            <span className="font-bold">{paginatedData[0].routes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Right Column - 2 Stacked Cards */}
                    <div className="space-y-6">
                        {paginatedData.slice(1, 3).map((destination, index) => (
                            <motion.div
                                key={destination.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: (index + 1) * 0.1 }}
                                className="group cursor-pointer"
                            >
                                <div className="relative h-[242px] rounded-[24px] overflow-hidden bg-slate-100">
                                    <motion.div
                                        className="absolute inset-0"
                                        whileHover={{ scale: 1.08 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img
                                            src={destination.image}
                                            alt={destination.city}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                    </motion.div>

                                    <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center z-10">
                                        <span className="text-white font-black text-sm">{index + 2}</span>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                                        <div className="flex items-center gap-1 mb-2">
                                            <MapPin className="text-orange-400" size={14} />
                                            <span className="text-white/80 text-xs font-medium">{destination.country}</span>
                                        </div>
                                        <h3 className="text-2xl font-black text-white mb-2">{destination.city}</h3>
                                        <div className="flex items-center gap-3 text-white/90 text-sm">
                                            <div className="flex items-center gap-1">
                                                <Users size={14} />
                                                <span className="font-bold">{destination.travelers}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Heart size={14} />
                                                <span className="font-bold">{destination.routes}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Row - 2 Cards (or more) */}
                    {paginatedData.slice(3).map((destination, index) => (
                        <motion.div
                            key={destination.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index + 3) * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="relative h-[320px] rounded-[24px] overflow-hidden bg-slate-100">
                                <motion.div
                                    className="absolute inset-0"
                                    whileHover={{ scale: 1.08 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <img
                                        src={destination.image}
                                        alt={destination.city}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                </motion.div>

                                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center z-10">
                                    <span className="text-white font-black text-sm">{index + 4}</span>
                                </div>

                                <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
                                    <div className="flex items-center gap-1 mb-2">
                                        <MapPin className="text-orange-400" size={14} />
                                        <span className="text-white/80 text-xs font-medium">{destination.country}</span>
                                    </div>
                                    <h3 className="text-2xl font-black text-white mb-2">{destination.city}</h3>
                                    <p className="text-sm text-white/80 mb-3 line-clamp-2">{destination.description}</p>
                                    <div className="flex items-center gap-3 text-white/90 text-sm">
                                        <div className="flex items-center gap-1">
                                            <Users size={14} />
                                            <span className="font-bold">{destination.travelers}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Heart size={14} />
                                            <span className="font-bold">{destination.routes}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
