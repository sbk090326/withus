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
                {/* Thumbnail Image */}
                <div className="relative h-48 w-full overflow-hidden">
                    <img
                        src={companion.thumbnail}
                        alt={companion.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Match Score Badge (Inside Image) */}
                    <div className="absolute top-4 right-4 z-10">
                        <div
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white font-bold text-[10px] shadow-lg backdrop-blur-md border border-white/20"
                            style={{ background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.8), rgba(236, 72, 153, 0.8))' }}
                        >
                            <Sparkles size={10} fill="white" />
                            {companion.matchScore}% Match
                        </div>
                    </div>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-4 mb-5">
                        <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-2xl shadow-inner border-2 border-white overflow-hidden">
                            {companion.user.image}
                        </div>
                        <div>
                            <h3 className="font-bold text-base text-slate-900 leading-none mb-1 group-hover:text-orange-500 transition-colors">
                                {companion.user.name}
                            </h3>
                            <p className="text-[10px] text-teal-500 font-bold uppercase tracking-wider">Verified Traveler</p>
                        </div>
                    </div>

                    <h4 className="font-bold text-lg text-slate-900 mb-4 line-clamp-2 leading-snug h-[52px]">
                        {companion.title}
                    </h4>

                    <div className="space-y-3 mb-8">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <MapPin size={16} className="text-slate-400" />
                            <span>{companion.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Calendar size={16} className="text-slate-400" />
                            <span>{companion.date}</span>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                        <div className="flex items-center gap-4">
                            <motion.button
                                whileTap={{ scale: 1.4 }}
                                onClick={handleLike}
                                className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-pink-500' : 'text-slate-400 hover:text-pink-500'
                                    }`}
                            >
                                <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
                                <span className="text-sm font-bold">{likes}</span>
                            </motion.button>
                        </div>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // Chat logic
                            }}
                            className="p-3 rounded-full bg-slate-50 text-slate-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300"
                        >
                            <MessageCircle size={22} />
                        </button>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
