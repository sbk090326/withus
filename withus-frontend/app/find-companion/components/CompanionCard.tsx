import React, { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { palette } from '@/app/components/design-system/constants';
import { Sparkles, MessageCircle, MapPin, Calendar, Heart } from 'lucide-react';

interface CompanionCardProps {
    companion: {
        id: number;
        user: {
            name: string;
            image: string;
            tags: string[];
        };
        title: string;
        location: string;
        date: string;
        matchScore: number;
        likeCount: number;
        thumbnail: string;
        targetGender?: string;
        targetAge?: string;
        isSmoker?: string;
        budget?: string;
        currentPeople: number;
        maxPeople: number;
        route?: string[];
    };

    index: number;
}

export const CompanionCard = ({ companion, index }: CompanionCardProps) => {
    const [isLiked, setIsLiked] = useState(false);
    const [likes, setLikes] = useState(companion.likeCount);

    const handleLike = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLiked(!isLiked);
        setLikes(isLiked ? likes - 1 : likes + 1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 cursor-pointer"
        >
            <Link href={`/find-companion/${companion.id}`} className="block">
                {/* Thumbnail Section */}
                <div className="relative h-44 w-full overflow-hidden">
                    <img
                        src={companion.thumbnail}
                        alt={companion.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Top Layer: Floating Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-start pointer-events-none">
                        {companion.maxPeople - companion.currentPeople <= 1 ? (
                            <div className="px-2.5 py-1 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider animate-pulse shadow-lg border border-rose-400/30">
                                🔥 Closing
                            </div>
                        ) : <div />}

                        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-xl border border-white/20 text-white font-black text-[9px] tracking-tighter shadow-xl">
                            <Sparkles size={10} className="text-[#FF7E5F]" fill="currentColor" />
                            {companion.matchScore}%
                        </div>
                    </div>

                    {/* Bottom Layer: Quick Identity */}
                    <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full border border-white/50 shadow-lg bg-white/20 backdrop-blur-md flex items-center justify-center text-xs overflow-hidden">
                            {companion.user.image}
                        </div>
                        <span className="text-[11px] font-bold text-white drop-shadow-md">{companion.user.name}</span>
                    </div>
                </div>

                <div className="p-5 flex flex-col h-auto">
                    {/* Tags & Meta Row (Space-efficient) */}
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex gap-1.5 overflow-hidden">
                            {companion.user.tags.slice(0, 2).map((tag, i) => (
                                <span key={i} className="text-[9px] font-bold text-[#FF7E5F] bg-[#FFF7F5] px-1.5 py-0.5 rounded border border-[#FFE5DF]">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex items-center gap-1 text-[#14B8A6] font-black text-[10px]">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] animate-pulse" />
                            {companion.currentPeople}/{companion.maxPeople} 명
                        </div>
                    </div>

                    {/* Title (Limited to 2 lines, tight spacing) */}
                    <h4 className="font-bold text-[15px] text-slate-900 mb-3 line-clamp-1 leading-[1.4] group-hover:text-[#FF7E5F] transition-colors">
                        {companion.title}
                    </h4>

                    {/* Mini Route Visualization - NEW */}
                    {companion.route && companion.route.length > 0 && (
                        <div className="flex items-center gap-1 mb-4 overflow-hidden">
                            {companion.route.map((point, i, arr) => (
                                <React.Fragment key={i}>
                                    <div className="flex-shrink-0 px-2 py-0.5 rounded-lg bg-orange-50/50 border border-orange-100/50 text-[10px] font-bold text-orange-600 max-w-[80px] truncate">
                                        {point}
                                    </div>
                                    {i < arr.length - 1 && (
                                        <div className="flex-shrink-0 w-1.5 h-[1px] bg-slate-200" />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    )}



                    {/* Main Info Block (Compact) */}
                    <div className="space-y-1.5 mb-5 p-3 rounded-xl bg-slate-50/50 border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-500">
                            <MapPin size={12} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] font-bold truncate">{companion.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-500">
                            <Calendar size={12} className="text-slate-400 shrink-0" />
                            <span className="text-[10px] font-bold">{companion.date}</span>
                        </div>
                    </div>

                    {/* Criteria & Budget - Footer Meta */}
                    <div className="flex items-center justify-between pt-1">
                        <div className="flex gap-2 text-[10px] items-center">
                            <span className="text-slate-400 font-medium italic">{companion.targetGender} · {companion.targetAge}</span>
                            {companion.budget && (
                                <span className="text-[#14B8A6] font-bold border-l border-slate-200 pl-2 ml-2">
                                    💰 {companion.budget}
                                </span>
                            )}
                        </div>

                        <div className="flex items-center gap-2.5">
                            <button
                                onClick={handleLike}
                                className={`flex items-center gap-1 transition-all ${isLiked ? 'text-pink-500' : 'text-slate-300 hover:text-pink-400'}`}
                            >
                                <Heart size={16} fill={isLiked ? "currentColor" : "none"} />
                                <span className="text-[10px] font-black">{likes}</span>
                            </button>
                            <button className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center hover:bg-[#FF7E5F] transition-all shadow-sm">
                                <MessageCircle size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
