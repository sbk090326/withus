'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Flame, Info, ChevronRight, Award } from 'lucide-react';

export const CommunitySidebar = () => {
    return (
        <div className="space-y-8">
            {/* Trending Topics */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                    <Flame size={18} className="text-orange-500" fill="currentColor" />
                    <h3 className="font-extrabold text-slate-900">오늘의 핫 토픽</h3>
                </div>

                <div className="space-y-5">
                    {[
                        { tag: '#파리_맛집_리스트', count: 124 },
                        { tag: '#제주_한달살기', count: 86 },
                        { tag: '#유럽_소매치기_조심', count: 54 },
                        { tag: '#비행기_명당자리', count: 42 },
                        { tag: '#로마_패키지vs자유', count: 31 },
                    ].map((topic, i) => (
                        <div key={i} className="flex items-center justify-between group cursor-pointer">
                            <span className="text-sm font-bold text-slate-600 group-hover:text-orange-500 transition-colors">
                                {topic.tag}
                            </span>
                            <span className="text-xs font-bold text-slate-300">
                                {topic.count}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Community Hall of Fame */}
            <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-3xl p-6 shadow-xl text-white">
                <div className="flex items-center gap-2 mb-6">
                    <Award size={20} className="text-teal-200" />
                    <h3 className="font-extrabold">이달의 우수 여행자</h3>
                </div>

                <div className="space-y-4">
                    {[
                        { name: '도토리여행자', points: 2450, emoji: '🐿️' },
                        { name: '구름위로', points: 1980, emoji: '☁️' },
                        { name: '라떼는말야', points: 1560, emoji: '☕' },
                    ].map((user, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-xl border border-white/30 shadow-sm">
                                {user.emoji}
                            </div>
                            <div>
                                <p className="text-sm font-bold">{user.name}</p>
                                <p className="text-[10px] text-teal-100 font-bold">{user.points.toLocaleString()} Points</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Community Rules */}
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100">
                <div className="flex items-center gap-2 mb-4">
                    <Info size={18} className="text-slate-400" />
                    <h3 className="font-extrabold text-slate-800">커뮤니티 가이드</h3>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    WithUs는 건강한 여행 문화를 응원합니다. 타인에 대한 비방이나 부적절한 게시글은 제재될 수 있습니다.
                </p>
                <button className="flex items-center gap-1 text-xs font-bold text-slate-900 hover:text-orange-500 transition-colors">
                    자세히 보기
                    <ChevronRight size={14} />
                </button>
            </div>
        </div>
    );
};
