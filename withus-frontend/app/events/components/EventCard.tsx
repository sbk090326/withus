'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Calendar, ChevronRight, Clock, Users } from 'lucide-react';
import { theme } from '@/app/components/design-system/constants';
import Link from 'next/link';

interface EventCardProps {
    event: {
        id: number;
        title: string;
        description: string;
        image: string;
        date: string;
        category: string;
        isHot?: boolean;
        participants?: string;
    };
    index: number;
}

export const EventCard = ({ event, index }: EventCardProps) => {
    return (
        <Link href={`/events/${event.id}`}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative bg-white rounded-[32px] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10 transition-all duration-500 cursor-pointer h-full flex flex-col"
            >
                {/* Image Section */}
                <div className="relative h-60 overflow-hidden shrink-0">
                    <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                    {/* Category Badge */}
                    <div className="absolute top-5 left-5">
                        <span className="px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-md text-[10px] font-black text-slate-900 uppercase tracking-widest shadow-sm border border-white">
                            {event.category}
                        </span>
                    </div>

                    {event.isHot && (
                        <div className="absolute top-5 right-5">
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/30">
                                <Clock size={12} className="animate-pulse" />
                                <span>마감 임박</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Content Section */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-3">
                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1 leading-tight">
                            {event.title}
                        </h3>
                        <p className="text-sm text-slate-500 font-medium line-clamp-2 leading-relaxed">
                            {event.description}
                        </p>
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-6">
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Calendar size={14} />
                                <span className="text-xs font-bold">{event.date}</span>
                            </div>
                            {event.participants && (
                                <div className="flex items-center gap-2 text-slate-400">
                                    <Users size={14} />
                                    <span className="text-xs font-bold">{event.participants}명 참여 중</span>
                                </div>
                            )}
                        </div>

                        <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 transition-all shadow-sm">
                            <ChevronRight size={18} />
                        </div>
                    </div>
                </div>

                {/* Hidden Gradients Effect on Hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1.5 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: theme.colors.gradients.brand }} />
            </motion.div>
        </Link>
    );
};
