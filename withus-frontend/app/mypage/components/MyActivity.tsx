'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Heart, Eye, Edit3, Trash2, MapPin, User, ChevronRight } from 'lucide-react';
import { Pagination } from '@/app/components/ui/Pagination';
import { TripCardSkeleton } from './upcoming-trips/TripCard';

interface MyActivityProps {
    type: 'posts' | 'companions' | 'bookmarks';
}

export const MyActivity = ({ type }: MyActivityProps) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 4;

    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, [type, currentPage]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [type]);
    // Mock Data for each type
    const data = {
        posts: [
            {
                id: 1,
                title: '나홀로 후쿠오카 3박 4일 먹방 여행기 🍜',
                date: '2026.01.12',
                comments: 45,
                likes: 128,
                views: 890,
                thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=300'
            },
            {
                id: 2,
                title: '이번 주말에 번개 모임 하실 분 계신가요?',
                date: '2026.01.10',
                comments: 5,
                likes: 12,
                views: 89,
            }
        ],
        companions: [
            {
                id: 1,
                title: '런던 테이트모던 전시 보고 애프터눈 티 세트 같이 먹어요.',
                location: '영국, 런던',
                date: '2026.04.15 - 2026.04.20',
                currentPeople: 2,
                maxPeople: 4,
                matchScore: 89
            }
        ],
        bookmarks: [
            {
                id: 1,
                title: '스위스 인터라켄 패러글라이딩 후기',
                author: '하늘지기',
                category: '여행후기',
                thumbnail: 'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?auto=format&fit=crop&q=80&w=300'
            }
        ]
    };

    const currentData = data[type];
    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = currentData.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-black text-slate-900">
                    {type === 'posts' ? '내가 쓴 포스트' : type === 'companions' ? '모집 중인 동행' : '저장한 여행 정보'}
                </h3>
            </div>

            <div className="space-y-6 min-h-[400px]">
                {isLoading ? (
                    <div className="grid grid-cols-1 gap-6">
                        <TripCardSkeleton />
                        <TripCardSkeleton />
                    </div>
                ) : (
                    <>
                        {type === 'posts' && (paginatedData as any[]).map((post, idx) => (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[32px] border border-slate-100 p-6 hover:shadow-xl hover:border-orange-200 transition-all group flex gap-6"
                            >
                                {post.thumbnail && (
                                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                        <img src={post.thumbnail} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex-1 space-y-3">
                                    <h4 className="font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{post.title}</h4>
                                    <div className="flex items-center gap-4 text-[11px] text-slate-400 font-bold">
                                        <span>{post.date}</span>
                                        <div className="flex items-center gap-1"><MessageSquare size={12} /> {post.comments}</div>
                                        <div className="flex items-center gap-1"><Heart size={12} /> {post.likes}</div>
                                        <div className="flex items-center gap-1"><Eye size={12} /> {post.views}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-teal-500 hover:bg-teal-50 transition-all">
                                        <Edit3 size={18} />
                                    </button>
                                    <button className="p-3 rounded-xl bg-slate-50 text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition-all">
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {type === 'companions' && (paginatedData as any[]).map((comp, idx) => (
                            <motion.div
                                key={comp.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[32px] border border-slate-100 p-8 hover:shadow-xl hover:border-orange-200 transition-all group flex items-center justify-between"
                            >
                                <div className="space-y-4 flex-1">
                                    <div className="flex items-center gap-3">
                                        <div className="px-3 py-1 rounded-full bg-teal-50 text-teal-600 text-[10px] font-black">
                                            MATCH {comp.matchScore}%
                                        </div>
                                        <div className="text-xs text-slate-400 font-bold">{comp.date}</div>
                                    </div>
                                    <h4 className="text-lg font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{comp.title}</h4>
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                            <MapPin size={14} className="text-orange-400" /> {comp.location}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500">
                                            <User size={14} className="text-slate-400" /> {comp.currentPeople}/{comp.maxPeople} 명 모집
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button className="px-6 py-3 rounded-2xl bg-slate-900 text-white font-bold text-sm hover:translate-x-1 transition-all flex items-center gap-2">
                                        관리하기 <ChevronRight size={16} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}

                        {type === 'bookmarks' && (paginatedData as any[]).map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[32px] border border-slate-100 p-6 hover:shadow-xl hover:border-orange-200 transition-all group flex gap-6 italic"
                            >
                                {item.thumbnail && (
                                    <div className="w-20 h-20 rounded-2xl overflow-hidden shrink-0">
                                        <img src={item.thumbnail} alt="" className="w-full h-full object-cover" />
                                    </div>
                                )}
                                <div className="flex-1 space-y-2">
                                    <div className="text-[10px] font-black text-rose-500 uppercase tracking-widest">{item.category}</div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-orange-500 transition-colors">{item.title}</h4>
                                    <p className="text-xs text-slate-400 font-bold">BY {item.author}</p>
                                </div>
                                <button className="self-center p-3 rounded-xl bg-rose-50 text-rose-500 hover:scale-110 transition-all">
                                    <Heart size={20} fill="currentColor" />
                                </button>
                            </motion.div>
                        ))}
                    </>
                )}
            </div>

            {!isLoading && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-10"
                />
            )}
        </div>
    );
};
