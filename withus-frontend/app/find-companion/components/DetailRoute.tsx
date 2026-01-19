'use client';
import React from 'react';
import { motion } from 'motion/react';
import { Map, Flag, ChevronRight } from 'lucide-react';
import { palette, theme } from '@/app/components/design-system/constants';

interface DetailRouteProps {
    route: string[];
}

export const DetailRoute = ({ route }: DetailRouteProps) => {
    if (!route || route.length === 0) return null;

    return (
        <div className="space-y-8">
            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Map className="text-orange-500" size={22} />
                여행 주요 동선
            </h3>

            <div className="relative bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                <div className="relative flex flex-col gap-6">
                    {route.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-6 group"
                        >
                            <div className="flex flex-col items-center">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black shadow-md transition-all group-hover:scale-110 z-10 ${index === 0 ? 'bg-slate-900 text-white' :
                                        index === route.length - 1 ? 'bg-orange-500 text-white' :
                                            'bg-white border border-slate-200 text-slate-400'
                                    }`}>
                                    {index === 0 ? <Flag size={14} /> : index + 1}
                                </div>
                                {index < route.length - 1 && (
                                    <div className="w-[2px] h-12 bg-slate-100 group-hover:bg-orange-200 transition-colors" />
                                )}
                            </div>

                            <div className="flex-1 pt-1">
                                <h4 className="font-bold text-slate-800 text-lg group-hover:text-orange-500 transition-colors">
                                    {point}
                                </h4>
                                <p className="text-sm text-slate-400 font-medium">
                                    {index === 0 ? 'Starting Point' :
                                        index === route.length - 1 ? 'Final Destination' :
                                            `Day ${index + 1} Schedule`}
                                </p>
                            </div>

                            <ChevronRight className="text-slate-100 group-hover:text-orange-200 transition-colors mt-2" size={20} />
                        </motion.div>
                    ))}
                </div>

                {/* Map Button Placeholder */}
                <div className="mt-10 pt-8 border-t border-slate-50 flex justify-center">
                    <button className="flex items-center gap-2 px-8 py-3 rounded-full bg-slate-50 text-slate-600 font-bold text-sm hover:bg-orange-50 hover:text-orange-600 transition-all border border-transparent hover:border-orange-100">
                        <Map size={16} />
                        전체 경로 지도로 보기
                    </button>
                </div>
            </div>
        </div>
    );
};
