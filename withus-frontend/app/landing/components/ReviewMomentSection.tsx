'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Quote, User, Star, CheckCircle2, Heart, ArrowRight } from 'lucide-react';
import { theme, palette } from '@/app/components/design-system/constants';

interface Review {
    id: number;
    name: string;
    role: string;
    text: string;
    rating: number;
    keywords: string[];
    imageEmoji: string;
    bgColor: string;
    location: string;
    imageUrl: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: '김은지',
        role: '혼자 여행객',
        text: '카파도키아의 열기구 체험은 제 버킷리스트였는데, WithUs에서 만난 동행들 덕분에 혼자가 아닌 웃음 가득한 아침이 되었어요! 🎈',
        rating: 5,
        keywords: ['친절해요', '시간엄수'],
        imageEmoji: '👩🏻',
        bgColor: 'bg-orange-50',
        location: '터키 카파도키아',
        imageUrl: 'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 2,
        name: '박서준',
        role: '역사 탐방객',
        text: '피렌체 두오모 성당 앞에서 나눈 대화들은 잊지 못할 거예요. 서로 다른 시선으로 역사를 바라보는 경험이 정말 신선했습니다. 🏛️',
        rating: 5,
        keywords: ['배려왕', '응답빠름'],
        imageEmoji: '👨🏻',
        bgColor: 'bg-teal-50',
        location: '이탈리아 피렌체',
        imageUrl: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 3,
        name: '이수민',
        role: '모험가',
        text: '혼자 떠난 제주도, 우연히 만난 WithUs 동행들과 올레길을 걸으며 인생 사진도 서로 남겨주고 너무 행복한 3박 4일이었어요! 🍊',
        rating: 5,
        keywords: ['긍정적', '준비성'],
        imageEmoji: '👩🏼',
        bgColor: 'bg-pink-50',
        location: '대한민국 제주',
        imageUrl: 'https://images.unsplash.com/photo-1502791451862-7bd8c1df43a7?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 4,
        name: '최영호',
        role: '사진작가',
        text: '베네치아의 좁은 골목들을 촬영하며 길을 잃었지만, 함께한 친구들 덕분에 그마저도 즐거운 에피소드가 되었네요. 완벽한 동행이었습니다! 📸',
        rating: 5,
        keywords: ['인생샷메이커', '유머러스'],
        imageEmoji: '🧔🏻',
        bgColor: 'bg-slate-50',
        location: '이탈리아 베네치아',
        imageUrl: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?auto=format&fit=crop&q=80&w=800'
    },
    {
        id: 5,
        name: '강민준',
        role: '배낭여행객',
        text: '한라산 정상에서 먹은 컵라면보다 더 따뜻했던 건 동행자분들의 격려였어요. 무사히 완등할 수 있게 도와주셔서 감사합니다! 🏔️',
        rating: 5,
        keywords: ['매너온도최고', '소통왕'],
        imageEmoji: '👨🏽',
        bgColor: 'bg-blue-50',
        location: '대한민국 한라산',
        imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800'
    }
];

const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
    <motion.div
        className="flex-shrink-0 w-[290px] md:w-[400px] bg-white rounded-[2.5rem] overflow-hidden shadow-[0_4px_25px_rgba(15,23,42,0.03)] border border-slate-100/80 relative group flex flex-col"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        whileHover={{ y: -10, boxShadow: '0 25px 50px -12px rgba(15,23,42,0.08)', borderColor: 'rgba(255,126,95,0.2)' }}
    >
        {/* Top: Immersive Image (Height optimized) */}
        <div className="relative h-44 md:h-56 w-full overflow-hidden">
            <img
                src={review.imageUrl}
                alt={review.location}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
            <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[10px] md:text-[11px] font-black text-white uppercase tracking-widest">{review.location}</span>
                </div>
            </div>
            <div className="absolute top-4 right-5 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-2xl flex items-center gap-1.5 shadow-lg">
                <Star size={12} className="text-orange-500 fill-orange-500" />
                <span className="text-[11px] font-black text-slate-900">{review.rating.toFixed(1)}</span>
            </div>
        </div>

        {/* Content Area */}
        <div className="p-6 md:p-9 flex flex-col flex-1">
            <p className="text-slate-800 font-bold leading-[1.6] text-[15px] md:text-[17px] mb-6 line-clamp-3 italic">
                "{review.text}"
            </p>

            <div className="mt-auto">
                {/* Refined Tags: Subtle Warmth */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {review.keywords.slice(0, 2).map((kw, i) => (
                        <span key={i} className="text-[10px] md:text-[11px] font-extrabold px-3 py-1 rounded-lg bg-orange-50/60 text-[#F97316] border border-orange-100/50 uppercase tracking-tighter">
                            #{kw}
                        </span>
                    ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-50">
                    <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl ${review.bgColor} flex items-center justify-center text-xl shadow-inner border-2 border-white`}>
                        {review.imageEmoji}
                    </div>
                    <div>
                        <h4 className="font-bold text-slate-900 leading-none mb-0.5 text-xs md:text-sm">{review.name}</h4>
                        <p className="text-[9px] md:text-[10px] text-slate-400 font-bold uppercase tracking-wider">{review.role}</p>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
);

export function ReviewMomentSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const progress = (target.scrollLeft / (target.scrollWidth - target.clientWidth)) * 100;
        setScrollProgress(progress);
    };

    const scrollTo = (direction: 'prev' | 'next') => {
        if (scrollContainerRef.current) {
            const container = scrollContainerRef.current;
            const scrollAmount = window.innerWidth < 768 ? 320 : 420;
            const newScrollLeft = direction === 'next'
                ? container.scrollLeft + scrollAmount
                : container.scrollLeft - scrollAmount;

            container.scrollTo({
                left: newScrollLeft,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className={`w-full py-20 md:py-28 bg-[#FFF9F7] relative overflow-hidden`}>
            {/* Ultra-refined Ambient Background Color accents */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-100/15 rounded-full blur-[140px] -z-10 translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-pink-100/10 rounded-full blur-[120px] -z-10 -translate-x-1/2 translate-y-1/2" />

            <div className={`max-w-[1400px] mx-auto px-6 md:px-12`}>
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-8 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="max-w-2xl"
                    >
                        <span
                            className="inline-block py-1 px-3 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                            style={{
                                backgroundColor: '#F0FDFA', // theme.colors.secondary.bg
                                color: '#2DD4BF' // theme.colors.secondary.DEFAULT
                            }}
                        >
                            User Testimonials
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-black leading-[1.1] text-slate-900 mb-6 tracking-tighter">
                            당신의 첫 동행, <br className="hidden md:block" />
                            <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent">최고의 선택</span>이 되도록
                        </h2>
                        <p className="text-base md:text-lg text-slate-600 font-medium max-w-lg mx-auto md:mx-0">
                            이미 12,000명 이상의 여행자가 WithUs를 통해 새로운 인연과 안전한 모험을 시작했습니다.
                        </p>
                    </motion.div>

                    <div className="flex justify-center md:justify-end gap-3">
                        <button onClick={() => scrollTo('prev')} className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:border-slate-900 hover:bg-slate-50 transition-all shadow-sm">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                        </button>
                        <button onClick={() => scrollTo('next')} className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center text-white hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-1">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                        </button>
                    </div>
                </div>

                <div
                    ref={scrollContainerRef}
                    onScroll={handleScroll}
                    className="flex gap-5 md:gap-8 overflow-x-auto pb-10 px-1 no-scrollbar snap-x snap-mandatory"
                >
                    {reviews.map((review, index) => (
                        <div key={review.id} className="snap-center">
                            <ReviewCard review={review} index={index} />
                        </div>
                    ))}
                </div>

                {/* Refined Footer & Progress */}
                <div className="flex flex-col items-center mt-6 md:mt-10">
                    <div className="w-48 h-[3px] bg-slate-100 rounded-full mb-12 relative overflow-hidden">
                        <motion.div
                            className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-400 to-pink-500"
                            style={{ width: `${scrollProgress}%` }}
                        />
                    </div>

                    <div className="flex flex-col sm:flex-row items-center gap-8">
                        <button className="group relative px-10 py-5 rounded-full bg-slate-900 text-white text-[15px] font-black tracking-tight transition-all overflow-hidden flex items-center gap-3 shadow-2xl hover:shadow-orange-200/50">
                            <span className="relative z-10">더 많은 리얼 후기 보기</span>
                            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <ArrowRight size={20} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                        </button>

                        <div className="flex items-center gap-4 group cursor-default">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <motion.div
                                        key={i}
                                        whileHover={{ y: -5, zIndex: 10 }}
                                        className="w-9 h-9 md:w-11 md:h-11 rounded-full border-4 border-white bg-slate-50 flex items-center justify-center text-sm md:text-base grayscale group-hover:grayscale-0 transition-all duration-500 shadow-sm"
                                    >
                                        {['👍', '❤️', '🌏', '📸'][i - 1]}
                                    </motion.div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[14px] md:text-[16px] font-black text-slate-900 leading-none">12,400+</span>
                                <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-1 group-hover:text-orange-500 transition-colors">Travelers Joined</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    );
}
