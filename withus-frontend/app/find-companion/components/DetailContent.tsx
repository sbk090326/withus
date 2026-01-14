'use client';
import React from 'react';
import { Clock, MapPin, Calendar, ShieldCheck, Users } from 'lucide-react';

interface DetailContentProps {
    data: {
        title: string;
        location: string;
        date: string;
        description: string;
        tags: string[];
        createdAt: string;
        currentPeople: number;
        maxPeople: number;
        targetGender: string;
        targetAge: string;
        isSmoker: string;
        budget: string;
    };
}

export const DetailContent = ({ data }: DetailContentProps) => {
    return (
        <div className="space-y-20">
            {/* Main Article Section - Airy & Open */}
            <div className="bg-transparent">
                <div className="flex items-center justify-between mb-12">
                    <div className="flex items-center gap-4">
                        <span className="px-5 py-2 rounded-full bg-orange-500 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-orange-500/30">
                            Recruiting
                        </span>
                        <div className="flex items-center gap-2 text-slate-400 text-xs font-bold tracking-tight">
                            <Clock size={16} className="text-slate-300" />
                            {data.createdAt} 등록됨
                        </div>
                    </div>
                </div>

                <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-12 leading-[1.05] tracking-tight">
                    {data.title}
                </h1>

                {/* Logistics Bar - Modern Floating Style */}
                <div className="flex flex-wrap gap-12 mb-20">
                    <div className="flex items-center gap-5 group">
                        <div className="w-16 h-16 rounded-[24px] bg-white border border-slate-100 shadow-sm flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                            <MapPin size={28} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-2">Location</span>
                            <span className="font-extrabold text-slate-700 text-xl leading-none">{data.location}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-5 group">
                        <div className="w-16 h-16 rounded-[24px] bg-white border border-slate-100 shadow-sm flex items-center justify-center text-orange-500 group-hover:scale-110 group-hover:shadow-md transition-all duration-500">
                            <Calendar size={28} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-2">Trip Date</span>
                            <span className="font-extrabold text-slate-700 text-xl leading-none">{data.date}</span>
                        </div>
                    </div>
                </div>

                {/* Description Body */}
                <div className="max-w-[800px]">
                    <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[17px] font-medium">
                        {data.description}
                    </p>
                </div>

                {/* Tags - Simplified */}
                <div className="flex flex-wrap gap-2 mt-16 pt-10 border-t border-slate-50">
                    {data.tags.map((tag) => (
                        <span key={tag} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-500 text-[13px] font-bold hover:bg-orange-50 hover:text-orange-600 transition-colors cursor-default">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Recruitment Details Panel - Simple & Clean */}
            <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                    <ShieldCheck className="text-[#FF7E5F]" size={20} />
                    모집 상세 조건
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">성별 및 연령</span>
                        <p className="font-bold text-slate-700 text-sm">{data.targetGender} · {data.targetAge}</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">흡연 여부</span>
                        <p className="font-bold text-slate-700 text-sm">{data.isSmoker}</p>
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">모집 인원</span>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <span className="font-black text-[#14B8A6] text-sm leading-none">{data.currentPeople}/{data.maxPeople} 명</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#14B8A6] rounded-full"
                                    style={{ width: `${(data.currentPeople / data.maxPeople) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">예상 예산</span>
                        <p className="font-bold text-slate-700 text-sm">💰 {data.budget || '미정'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
