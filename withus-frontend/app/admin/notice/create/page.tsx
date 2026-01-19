'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ChevronLeft,
    Save,
    Send,
    Image as ImageIcon,
    Link as LinkIcon,
    Bold,
    Italic,
    List,
    Heading1,
    Heading2,
    Monitor,
    Smartphone,
    Eye,
    Settings2,
    Calendar,
    Pin,
    Globe,
    Lock
} from 'lucide-react';
import Link from 'next/link';
import { AdminSidebar } from '../../components/AdminSidebar';

export default function CreateNoticePage() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('시스템');
    const [isPreview, setIsPreview] = useState(false);
    const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Fixed Top Toolbar */}
                <header className="px-12 py-6 bg-white border-b border-slate-100 flex items-center justify-between shrink-0 z-20">
                    <div className="flex items-center gap-6">
                        <Link href="/admin/notice">
                            <button className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-all font-bold group">
                                <ChevronLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                                목록으로
                            </button>
                        </Link>
                        <div className="w-px h-6 bg-slate-100" />
                        <h2 className="text-xl font-black text-slate-900 tracking-tighter">새 공지사항 작성</h2>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsPreview(!isPreview)}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm transition-all border ${isPreview
                                    ? 'bg-slate-900 text-white border-slate-900'
                                    : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'
                                }`}
                        >
                            <Eye size={18} />
                            {isPreview ? '편집기로 돌아가기' : '미리보기'}
                        </button>
                        <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border border-slate-100 text-slate-600 font-bold text-sm hover:border-slate-300 transition-all">
                            <Save size={18} />
                            임시저장
                        </button>
                        <button className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-orange-500 text-white font-black text-sm shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all">
                            <Send size={18} />
                            배포하기
                        </button>
                    </div>
                </header>

                <div className="flex-1 flex overflow-hidden">
                    {/* Main Writing Area */}
                    <section className="flex-1 overflow-y-auto p-12 scrollbar-hide bg-white">
                        <div className={`mx-auto transition-all duration-500 ${isPreview && viewMode === 'mobile' ? 'max-w-sm border-[12px] border-slate-900 rounded-[3rem] h-[700px] mt-8 overflow-y-auto bg-white shadow-2xl relative' : 'max-w-4xl'}`}>

                            {/* Device Toggle for Preview */}
                            {isPreview && (
                                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-6 bg-slate-900 rounded-full z-10 pointer-events-none" />
                            )}

                            {!isPreview ? (
                                <div className="space-y-12">
                                    {/* Category Select */}
                                    <div className="flex items-center gap-3">
                                        {['시스템', '이벤트', '콘텐츠', '커뮤니티'].map((cat) => (
                                            <button
                                                key={cat}
                                                onClick={() => setCategory(cat)}
                                                className={`px-4 py-2 rounded-xl text-xs font-black transition-all border ${category === cat
                                                        ? 'bg-orange-500 border-orange-500 text-white shadow-lg'
                                                        : 'bg-white border-slate-100 text-slate-400 hover:border-slate-300'
                                                    }`}
                                            >
                                                {cat}
                                            </button>
                                        ))}
                                    </div>

                                    {/* Title Input */}
                                    <input
                                        type="text"
                                        placeholder="제목을 입력하세요..."
                                        className="w-full text-5xl font-black text-slate-900 placeholder:text-slate-100 focus:outline-none tracking-tighter"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />

                                    {/* Fake Toolbar */}
                                    <div className="flex items-center gap-1 p-2 bg-slate-50 border border-slate-100 rounded-2xl">
                                        <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all"><Heading1 size={18} /></button>
                                        <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all"><Heading2 size={18} /></button>
                                        <div className="w-px h-6 bg-slate-100 mx-2" />
                                        <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all"><Bold size={18} /></button>
                                        <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all"><Italic size={18} /></button>
                                        <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all"><List size={18} /></button>
                                        <div className="w-px h-6 bg-slate-100 mx-2" />
                                        <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all"><ImageIcon size={18} /></button>
                                        <button className="p-2.5 rounded-xl text-slate-500 hover:bg-white hover:text-slate-900 transition-all"><LinkIcon size={18} /></button>
                                    </div>

                                    {/* Content Textarea */}
                                    <textarea
                                        placeholder="내용을 작성해주세요. 이미지를 붙여넣거나 파일을 드래그할 수 있습니다."
                                        className="w-full h-[600px] text-lg font-bold text-slate-700 placeholder:text-slate-200 focus:outline-none resize-none leading-relaxed"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    />
                                </div>
                            ) : (
                                /* Preview Content */
                                <div className={`space-y-8 ${viewMode === 'mobile' ? 'p-6 pt-12' : ''}`}>
                                    <div className="space-y-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest bg-indigo-600 text-white`}>
                                            공지사항
                                        </span>
                                        <h1 className={`${viewMode === 'mobile' ? 'text-2xl' : 'text-4xl'} font-black text-slate-900 tracking-tighter`}>
                                            {title || '제목이 여기에 표시됩니다'}
                                        </h1>
                                        <div className="flex items-center gap-3 text-xs font-bold text-slate-400">
                                            <span>위더스 운영지원팀</span>
                                            <div className="w-1 h-1 rounded-full bg-slate-200" />
                                            <span>방금 전</span>
                                        </div>
                                    </div>
                                    <div className="h-px bg-slate-100" />
                                    <div className="text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                                        {content || '작성된 내용이 미리보기로 표시됩니다.'}
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Right Settings Sidebar */}
                    <aside className="w-96 bg-[#FDFBF7] border-l border-slate-100 p-8 space-y-8 overflow-y-auto shrink-0">
                        <div className="space-y-6">
                            <div className="flex items-center gap-3">
                                <Settings2 size={18} className="text-slate-900" />
                                <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs">Publish Settings</h3>
                            </div>

                            <div className="space-y-4">
                                {/* Pin to Top */}
                                <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-slate-100 shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <Pin size={18} className="text-slate-400" />
                                        <span className="text-sm font-bold text-slate-700">최상단 고정</span>
                                    </div>
                                    <div className="w-10 h-6 bg-slate-100 rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                                    </div>
                                </div>

                                {/* Privacy */}
                                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Visibility</p>
                                    <div className="flex gap-2">
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold">
                                            <Globe size={14} /> 공개
                                        </button>
                                        <button className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-slate-50 text-slate-400 text-xs font-bold border border-slate-100">
                                            <Lock size={14} /> 비공개
                                        </button>
                                    </div>
                                </div>

                                {/* Schedule */}
                                <div className="p-4 rounded-2xl bg-white border border-slate-100 shadow-sm space-y-4">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Release Schedule</p>
                                    <button className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 text-slate-500 text-xs font-bold">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            즉시 발행
                                        </div>
                                        <ChevronLeft size={14} className="-rotate-90" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Preview Device Select */}
                        {isPreview && (
                            <div className="space-y-4 p-6 rounded-[2rem] bg-slate-900 text-white">
                                <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Preview Device</h4>
                                <div className="flex gap-2">
                                    <button
                                        onClick={() => setViewMode('desktop')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${viewMode === 'desktop' ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-400'}`}
                                    >
                                        <Monitor size={16} /> Desktop
                                    </button>
                                    <button
                                        onClick={() => setViewMode('mobile')}
                                        className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${viewMode === 'mobile' ? 'bg-orange-500 text-white' : 'bg-white/10 text-slate-400'}`}
                                    >
                                        <Smartphone size={16} /> Mobile
                                    </button>
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </div>
    );
}
