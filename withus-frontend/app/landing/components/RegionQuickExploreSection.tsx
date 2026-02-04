'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BookOpen, Heart, Star, MapPin, ArrowRight, Calendar, Bookmark } from 'lucide-react';
import { colors, spacing } from '@/app/components/design-system/constants';
import Image from 'next/image';

interface Recipe {
    id: string;
    title: string;
    region: string;
    regionType: string; // '국내' or '해외'
    category: string;
    rating: number;
    saves: number;
    image: string;
    duration: string;
    preview: string[];
}

const recipes: Recipe[] = [
    {
        id: '1',
        title: '제주 힐링 코스',
        region: '제주도',
        regionType: '국내',
        category: '힐링 여행',
        rating: 4.8,
        saves: 1200,
        image: '/recipe_jeju_1768566676361.png',
        duration: '3박 4일',
        preview: ['1일: 협재 해변 & 한담 산책로', '2일: 한라산 등반', '3일: 성산일출봉']
    },
    {
        id: '2',
        title: '도쿄 맛집 투어',
        region: '일본',
        regionType: '해외',
        category: '맛집 탐방',
        rating: 4.9,
        saves: 2323,
        image: '/recipe_tokyo_1768566696870.png',
        duration: '4박 5일',
        preview: ['1일: 츠키지 시장 투어', '2일: 시부야 라멘 거리', '3일: 아사쿠사 전통 음식']
    },
    {
        id: '3',
        title: '부산 바다 여행',
        region: '부산',
        regionType: '국내',
        category: '힐링 여행',
        rating: 4.7,
        saves: 2112,
        image: '/recipe_busan_1768566713223.png',
        duration: '2박 3일',
        preview: ['1일: 해운대 해변', '2일: 감천문화마을', '3일: 자갈치 시장']
    },
    {
        id: '4',


        title: '방콕 야시장 탐방',
        region: '태국',
        regionType: '해외',
        category: '문화 체험',
        rating: 4.6,
        saves: 1855,
        image: '/recipe_bangkok_1768566728870.png',
        duration: '5박 6일',
        preview: ['1일: 왓아룬 사원', '2일: 수상시장 투어', '3일: 카오산로드 야시장']
    },
    {
        id: '5',
        title: '파리 미술관 투어',
        region: '프랑스',
        regionType: '해외',
        category: '문화 체험',
        rating: 4.9,
        saves: 1234,
        image: '/recipe_paris_1768566744102.png',
        duration: '6박 7일',
        preview: ['1일: 루브르 박물관', '2일: 오르세 미술관', '3일: 몽마르트 언덕']
    },
    {
        id: '6',
        title: '강릉 카페 투어',
        region: '강원도',
        regionType: '국내',
        category: '힐링 여행',
        rating: 4.5,
        saves: 2232,
        image: '/recipe_gangneung_1768566762103.png',
        duration: '2박 3일',
        preview: ['1일: 정동진 해돋이', '2일: 커피거리 투어', '3일: 안목해변 카페']
    },
    {
        id: '7',
        title: '경주 역사 탐방',
        region: '경상도',
        regionType: '국내',
        category: '문화 체험',
        rating: 4.8,
        saves: 1234,
        image: '/recipe_gyeongju_1768566779267.png',
        duration: '1박 2일',
        preview: ['1일: 불국사 & 석굴암', '2일: 첨성대 & 안압지']
    },
    {
        id: '8',
        title: '뉴욕 자유여행',
        region: '미국',
        regionType: '해외',
        category: '도시 탐방',
        rating: 4.7,
        saves: 1655,
        image: '/recipe_newyork_1768566795324.png',
        duration: '7박 8일',
        preview: ['1일: 자유의 여신상', '2일: 타임스퀘어', '3일: 센트럴파크']
    },
];

const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const [isSaved, setIsSaved] = useState(false);

    return (
        <div
            className="group relative overflow-hidden rounded-2xl cursor-pointer bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
        >
            {/* Image Container */}
            <div className="relative h-48 overflow-hidden">
                <Image
                    src={recipe.image}
                    alt={recipe.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Overlay gradient for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

                {/* Save Button */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsSaved(!isSaved);
                    }}
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform z-10"
                >
                    <Heart
                        size={20}
                        className={isSaved ? 'text-red-500 fill-red-500' : 'text-slate-600'}
                    />
                </button>

                {/* Duration Badge */}
                <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm">
                    <span className="text-xs font-semibold text-slate-900">{recipe.duration}</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Title */}
                <h4 className="text-xl font-extrabold text-slate-900 mb-2 group-hover:text-[#FF7E5F] transition-colors line-clamp-1">
                    {recipe.title}
                </h4>

                {/* Location & Stats Row */}
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                        <MapPin size={14} />
                        <span className="text-sm">{recipe.region}</span>
                    </div>

                    {/* Rating & Saves */}
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                            <Star size={14} className="text-yellow-500" fill="currentColor" />
                            <span className="text-sm font-bold text-slate-900">{recipe.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 text-slate-500">
                            <Bookmark size={14} />
                            <span className="text-sm font-semibold">{recipe.saves.toLocaleString()}</span>
                        </div>
                    </div>
                </div>

                {/* Preview - reduced to 2 lines */}
                <div className="mb-4 space-y-1">
                    {recipe.preview.slice(0, 2).map((item, i) => (
                        <p key={i} className="text-xs text-slate-500 truncate">
                            • {item}
                        </p>
                    ))}
                    <p className="text-xs text-slate-400 pl-3">...</p>
                </div>

                {/* CTA Button */}
                <button className="w-full py-2.5 rounded-lg bg-slate-900 text-white font-semibold text-sm hover:bg-[#FF7E5F] transition-colors flex items-center justify-center gap-2 group/btn">
                    내 플래너로 가져오기
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export function RegionQuickExploreSection() {
    const [selectedDuration, setSelectedDuration] = useState<string>('전체');
    const [selectedRegion, setSelectedRegion] = useState<string>('전체');
    const [selectedStyle, setSelectedStyle] = useState<string>('전체');

    const durations = ['전체', '1박2일', '2박3일', '3박4일', '5박 이상'];
    const regions = ['전체', '국내', '해외'];
    const styles = ['전체', '힐링 여행', '맛집 탐방', '문화 체험', '도시 탐방'];

    const filteredRecipes = recipes.filter(recipe => {
        // Duration filter
        let durationMatch = true;
        if (selectedDuration !== '전체') {
            if (selectedDuration === '5박 이상') {
                const nights = parseInt(recipe.duration.split('박')[0]);
                durationMatch = nights >= 5;
            } else {
                durationMatch = recipe.duration.startsWith(selectedDuration.replace('일', ''));
            }
        }

        // Region filter
        const regionMatch = selectedRegion === '전체' || recipe.regionType === selectedRegion;

        // Style filter
        const styleMatch = selectedStyle === '전체' || recipe.category === selectedStyle;

        return durationMatch && regionMatch && styleMatch;
    });

    return (
        <section className={`w-full ${spacing.section.py} bg-white relative z-10`}>
            <div className={`max-w-[1400px] mx-auto ${spacing.section.px}`}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <span
                                className="inline-block py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                                style={{
                                    backgroundColor: '#FFF5F2', // theme.colors.primary.bg
                                    color: '#FF7E5F' // theme.colors.primary.DEFAULT
                                }}
                            >
                                Travel Recipes
                            </span>

                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] text-slate-900 mb-6 tracking-tighter">
                                인기 콘텐츠로 시작하기
                            </h2>
                            <p className="text-base md:text-lg text-slate-600 font-medium max-w-lg mx-auto md:mx-0">
                                검증된 여행 일정을 내 플래너로 가져와서 자유롭게 편집하세요.
                            </p>
                        </div>
                        <button className="hidden md:flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors font-medium group">
                            전체 보기
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Multi-level Filters */}
                    <div className="space-y-4">
                        {/* Duration Filter */}
                        <div>
                            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {durations.map((duration) => (
                                    <button
                                        key={duration}
                                        onClick={() => setSelectedDuration(duration)}
                                        className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedDuration === duration
                                            ? 'bg-slate-900 text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {duration}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Region & Style Filters */}
                        <div className="flex items-center gap-6">
                            {/* Region */}
                            <div className="flex items-center gap-3">
                                <MapPin size={16} className="text-slate-500" />
                                {regions.map((region) => (
                                    <button
                                        key={region}
                                        onClick={() => setSelectedRegion(region)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedRegion === region
                                            ? 'bg-[#FF7E5F] text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {region}
                                    </button>
                                ))}
                            </div>

                            {/* Style */}
                            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
                                {styles.map((style) => (
                                    <button
                                        key={style}
                                        onClick={() => setSelectedStyle(style)}
                                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${selectedStyle === style
                                            ? 'bg-[#FF7E5F] text-white'
                                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                            }`}
                                    >
                                        {style}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Recipe Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredRecipes.map((recipe) => (
                        <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                        />
                    ))}
                </div>

                {/* Empty State */}
                {filteredRecipes.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-slate-500 text-lg mb-4">해당 조건의 Recipe가 없습니다.</p>
                        <button
                            onClick={() => {
                                setSelectedDuration('전체');
                                setSelectedRegion('전체');
                                setSelectedStyle('전체');
                            }}
                            className="text-[#FF7E5F] hover:underline font-medium"
                        >
                            필터 초기화
                        </button>
                    </div>
                )}

                {/* See All Button - Mobile */}
                <div className="mt-8 text-center md:hidden">
                    <button className="inline-flex items-center gap-2 text-slate-600 hover:text-orange-500 transition-colors font-medium">
                        See All
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </section>
    );
}
