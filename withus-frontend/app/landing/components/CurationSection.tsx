'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { Check, Sparkles, MessageCircle, Heart, Star } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';

interface MatchProfile {
    id: string;
    name: string;
    age: number;
    matchScore: number;
    tags: string[];
    bio: string;
    image: string; // Emoji for now as placeholder
    location: string;
}

const profiles: MatchProfile[] = [
    {
        id: 'p1',
        name: '김지은',
        age: 27,
        matchScore: 98,
        tags: ['#카페투어', '#사진찍기', '#여유롭게'],
        bio: '예쁜 카페 찾아다니고 인생샷 남기는 거 좋아해요! 📸',
        image: '👩🏻',
        location: '서울',
    },
    {
        id: 'p2',
        name: '이준호',
        age: 30,
        matchScore: 94,
        tags: ['#맛집탐방', '#수제맥주', '#야시장'],
        bio: '로컬 맛집이랑 야시장은 꼭 가봐야 직성이 풀리는 먹방러입니다. 🍺',
        image: '🧔🏻',
        location: '부산',
    },
    {
        id: 'p3',
        name: '박수진',
        age: 25,
        matchScore: 89,
        tags: ['#미술관', '#전시회', '#유럽감성'],
        bio: '하루 종일 미술관에서 시간 보내는 거 좋아해요. 같이 가실 분!',
        image: '👩🏼',
        location: '파리 거주',
    }
];

const MatchCard = ({ profile, index }: { profile: MatchProfile; index: number }) => {
    return (
        <motion.div
            className="relative bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all duration-300 group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ y: -8 }}
        >
            {/* Match Badge - Absolute position */}
            <div className="absolute -top-4 -right-4 bg-white p-1 rounded-full shadow-md z-10 rotate-12 group-hover:rotate-0 transition-transform duration-300">
                <div className="bg-gradient-to-br from-pink-500 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1">
                    <Sparkles size={12} fill="currentColor" />
                    {profile.matchScore}% 일치
                </div>
            </div>

            {/* Header: Avatar & Info */}
            <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-slate-50 border-2 border-white shadow-sm flex items-center justify-center text-3xl overflow-hidden">
                        {profile.image}
                    </div>
                    <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                        <div className="w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
                    </div>
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-900">{profile.name}</h3>
                    <p className="text-xs text-slate-500 font-medium">{profile.age} • {profile.location}</p>
                </div>
            </div>

            {/* Bio */}
            <p className="text-sm text-slate-600 mb-6 line-clamp-2 leading-relaxed h-[42px]">
                "{profile.bio}"
            </p>

            {/* Tags - Highlight matching ones */}
            <div className="flex flex-wrap gap-2 mb-6">
                {profile.tags.map((tag, i) => (
                    <span
                        key={i}
                        className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${i === 0
                            ? 'bg-orange-50 text-orange-600 border border-orange-100' // Highlight first tag as "Primary Match"
                            : 'bg-slate-50 text-slate-500 border border-slate-100'
                            }`}
                    >
                        {tag}
                    </span>
                ))}
            </div>

            {/* Action Area */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center text-xs text-slate-400 font-medium gap-1">
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                    <span>4.9</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300 mx-1"></span>
                    <span>Verified</span>
                </div>
                <button className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                    <MessageCircle size={16} />
                </button>
            </div>
        </motion.div>
    );
};

export function CurationSection() {
    return (
        <section className={`w-full ${theme.layout.section.paddingY} relative bg-[#FFF9F7] overflow-hidden`}>
            {/* Background Decor */}
            <div className="absolute top-20 left-0 w-64 h-64 bg-orange-200/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full blur-[100px] pointer-events-none" style={{ backgroundColor: `${theme.colors.secondary.light}33` }} />

            <div className={`max-w-[1400px] mx-auto ${theme.layout.section.paddingX} relative z-10`}>
                <div className="flex flex-col lg:flex-row gap-16 items-center">

                    {/* Left: Text Content */}
                    <div className="lg:w-1/3 text-center lg:text-left">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                        >
                            <span
                                className="inline-block py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                                style={{
                                    backgroundColor: theme.colors.secondary.bg,
                                    color: theme.colors.secondary.DEFAULT
                                }}
                            >
                                AI 매칭 시스템
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-[1.2]">
                                나와 여행 스타일이 <br />
                                <span className="bg-gradient-to-r from-orange-400 to-pink-500 bg-clip-text text-transparent">99% 일치하는 동행</span>
                            </h2>
                            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                                어색한 침묵은 걱정 마세요. <br className="hidden md:block" />
                                위드어스가 취향, 속도, 감성까지 딱 맞는 여행 메이트를 연결해 드립니다.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                                <button className="px-8 py-4 rounded-full bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
                                    무료 매칭 테스트 시작하기
                                </button>
                                <button className="px-8 py-4 rounded-full bg-white text-slate-900 border border-slate-200 font-semibold hover:bg-slate-50 transition-all">
                                    서비스 소개
                                </button>
                            </div>

                            {/* Trust Indicator */}
                            <div className="mt-10 flex items-center justify-center lg:justify-start gap-4">
                                <div className="flex -space-x-3">
                                    {['👩', '👨', '🧑', '👱‍♀️'].map((emoji, i) => (
                                        <div key={i} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-lg">
                                            {emoji}
                                        </div>
                                    ))}
                                </div>
                                <div className="text-sm font-medium text-slate-500">
                                    <strong className="text-slate-900">2,400+</strong> 쌍이 오늘 매칭되었습니다
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right: Cards Display */}
                    <div className="lg:w-2/3 w-full">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {profiles.map((profile, i) => (
                                <MatchCard key={profile.id} profile={profile} index={i} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
