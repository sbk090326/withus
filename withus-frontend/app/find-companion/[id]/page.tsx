'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    MapPin,
    Calendar,
    MessageCircle,
    Heart,
    Share2,
    ArrowLeft,
    Sparkles,
    ShieldCheck,
    Clock,
    Users,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { palette } from '../../components/design-system/constants';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { ChatDrawer } from '../components/ChatDrawer';
import { ApplyCompanionModal } from '../components/ApplyCompanionModal';

export default function CompanionDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<'idle' | 'pending' | 'approved'>('idle');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleApply = (message: string) => {
        setApplicationStatus('pending');
        // Simulate approval for demo purposes after 3 seconds
        setTimeout(() => {
            // alert('신청이 승인되었습니다! 이제 채팅을 시작할 수 있습니다.');
            // setApplicationStatus('approved');
        }, 5000);
    };

    // Mock data - in real app, fetch by id
    const data = {
        title: "파리 에펠탑 야경 투어 같이 하실 분 계신가요?",
        location: "프랑스, 파리",
        date: "2026.04.12 - 2026.04.18",
        description: `안녕하세요! 4월 중순에 파리 여행을 계획 중인 20대 후반 직장인입니다.

에펠탑 야경은 혼자 보는 것보다 시원한 맥주나 와인 한 잔 하면서 소소하게 이야기 나눌 분이 있으면 좋을 것 같아서 글 올려봅니다! 
저는 사진 찍는 것도 좋아하고, 너무 빡빡한 일정보다는 여유롭게 카페에 앉아 있는 걸 선호해요. 

파리 맛집 투어도 같이 하실 분 환영합니다! 
신원 인증 완료된 매너 있는 분이면 좋겠어요.`,
        tags: ["#파리", "#에펠탑", "#야경투어", "#사진작가", "#20대후반"],
        matchScore: 98,
        likes: 24,
        views: 142,
        createdAt: "2시간 전",
        gallery: [
            "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=1200",
            "https://images.unsplash.com/photo-1493397212122-2b85bef83063?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1431274172761-fca41d930114?auto=format&fit=crop&q=80&w=600",
            "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=600"
        ],
        author: {
            name: "지니",
            image: "👩‍🦰",
            trustScore: 4.8,
            mbti: "ENFP",
            verified: true,
            intro: "여행과 사진을 사랑하는 자유로운 영혼입니다 ✈️"
        }
    };

    return (
        <main className="min-h-screen pt-24 pb-20" style={{ backgroundColor: palette.cream.base }}>
            <div className="max-w-[1000px] mx-auto px-6">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-sm">목록으로 돌아가기</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                    {/* Left: Content Area */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery Section */}
                        <div className="space-y-4">
                            <div
                                className="relative h-[400px] w-full rounded-[40px] overflow-hidden shadow-lg border border-white cursor-pointer group"
                                onClick={() => setSelectedImage(data.gallery[0])}
                            >
                                <img
                                    src={data.gallery[0]}
                                    alt="Main"
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <Sparkles className="text-white drop-shadow-lg" size={48} />
                                </div>
                                <div className="absolute top-6 right-6 flex gap-2">
                                    <button className="p-3 rounded-full bg-white/80 backdrop-blur-md text-slate-700 hover:bg-white transition-all shadow-sm">
                                        <Share2 size={20} />
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                                {data.gallery.slice(1).map((img, i) => (
                                    <div
                                        key={i}
                                        className="h-32 rounded-[24px] overflow-hidden border border-white shadow-sm hover:ring-2 hover:ring-orange-500 transition-all cursor-pointer group"
                                        onClick={() => setSelectedImage(img)}
                                    >
                                        <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Hero Info */}
                        <div className="bg-white rounded-[40px] p-8 md:p-10 border border-slate-100 shadow-sm">
                            <div className="flex items-center gap-3 mb-6">
                                <span className="px-3 py-1 rounded-full bg-orange-50 text-orange-600 text-[10px] font-bold uppercase tracking-wider">
                                    Recruiting
                                </span>
                                <div className="flex items-center gap-1 text-slate-400 text-xs">
                                    <Clock size={14} />
                                    {data.createdAt}
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
                                {data.title}
                            </h1>

                            <div className="flex flex-wrap gap-6 text-slate-600 mb-8 pb-8 border-b border-slate-50">
                                <div className="flex items-center gap-2 font-medium">
                                    <MapPin size={20} className="text-orange-500" />
                                    {data.location}
                                </div>
                                <div className="flex items-center gap-2 font-medium">
                                    <Calendar size={20} className="text-orange-500" />
                                    {data.date}
                                </div>
                            </div>

                            {/* Description */}
                            <div className="prose prose-slate max-w-none">
                                <p className="text-slate-600 leading-relaxed whitespace-pre-wrap text-[17px]">
                                    {data.description}
                                </p>
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mt-10">
                                {data.tags.map((tag) => (
                                    <span key={tag} className="px-4 py-2 rounded-xl bg-slate-50 text-slate-500 text-sm font-medium border border-slate-100 italic">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-orange-500">
                                    <ShieldCheck size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">안전 보증</h4>
                                    <p className="text-xs text-slate-400">인증된 회원과의 만남</p>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-[32px] border border-slate-100 shadow-sm flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-orange-500">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 text-sm">동행 인원</h4>
                                    <p className="text-xs text-slate-400">현재 모집 중 (최대 4명)</p>
                                </div>
                            </div>
                        </div>

                        {/* Q&A Section */}
                        <div className="bg-white rounded-[40px] p-8 md:p-10 border border-slate-100 shadow-sm space-y-8">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                    궁금한 점 물어보기
                                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-xs">2</span>
                                </h3>
                                <p className="text-xs text-slate-400">호스트에게 공개 질문을 남길 수 있습니다.</p>
                            </div>

                            {/* Question Input */}
                            <div className="relative group">
                                <textarea
                                    placeholder="호스트에게 궁금한 점을 남겨보세요! 개인정보 공유는 지양해 주세요."
                                    className="w-full px-6 py-5 rounded-[28px] bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-800 text-sm resize-none"
                                    rows={3}
                                />
                                <button className="absolute bottom-4 right-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-orange-500 transition-all shadow-lg active:scale-95">
                                    등록하기
                                </button>
                            </div>

                            {/* Questions List */}
                            <div className="space-y-6 pt-4">
                                {/* Question Item 1 */}
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shadow-sm">🧔</div>
                                        <div className="flex-1 space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="font-bold text-sm text-slate-900">로키</span>
                                                <span className="text-[10px] text-slate-400">1시간 전</span>
                                            </div>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                안녕하세요! 저도 사진 찍는 걸 좋아하는데 혹시 필름 카메라도 괜찮을까요? 일정 중에 스냅 찍는 시간이 따로 있을지도 궁금합니다!
                                            </p>
                                        </div>
                                    </div>
                                    {/* Host Reply */}
                                    <div className="ml-14 bg-slate-50 rounded-2xl p-5 border border-slate-100 relative">
                                        <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-50 border-t border-l border-slate-100 rotate-45" />
                                        <div className="flex gap-3">
                                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs shadow-sm border border-orange-100">👩‍🦰</div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-[11px] text-orange-600 uppercase tracking-tighter">Host</span>
                                                    <span className="text-[10px] text-slate-400">30분 전</span>
                                                </div>
                                                <p className="text-sm text-slate-600 leading-relaxed">
                                                    와 필카 유저시군요! 너무 환영입니다. 따로 스냅 시간을 정해둔 건 아니지만, 예쁜 카페나 장소 보이면 여유롭게 사진 찍으면서 다닐 예정이에요! 😊
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Question Item 2 */}
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shadow-sm">👧</div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-bold text-sm text-slate-900">미나</span>
                                            <span className="text-[10px] text-slate-400">45분 전</span>
                                        </div>
                                        <p className="text-sm text-slate-600 leading-relaxed">
                                            저 비건인데 혹시 식당 정할 때 비건 옵션 있는 곳도 가주실 수 있을까요?
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-4 rounded-2xl border border-slate-100 text-slate-400 text-xs font-bold hover:bg-slate-50 transition-all">
                                모든 질문 답변 보기
                            </button>
                        </div>
                    </div>

                    {/* Right: Author & Match Area */}
                    <div className="space-y-6">
                        {/* Profile Sticky Card */}
                        <div className="sticky top-28 space-y-6">
                            <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl relative overflow-hidden group">
                                {/* Decor Gradient Background */}
                                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 to-pink-500" />

                                <div className="flex flex-col items-center text-center">
                                    <div className="relative mb-6">
                                        <div className="w-24 h-24 rounded-full bg-slate-50 border-4 border-white shadow-md flex items-center justify-center text-5xl">
                                            {data.author.image}
                                        </div>
                                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                                            <div className="w-5 h-5 bg-green-500 rounded-full border-2 border-white" />
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-extrabold text-slate-900 mb-1">{data.author.name}</h3>
                                    <div className="flex items-center gap-2 mb-4">
                                        <span className="text-xs font-bold text-orange-500 bg-orange-50 px-2 py-0.5 rounded uppercase">
                                            {data.author.mbti}
                                        </span>
                                        <div className="w-1 h-1 rounded-full bg-slate-300" />
                                        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                                            매너 온도 <span className="text-orange-500 font-bold">{data.author.trustScore}</span>
                                        </div>
                                    </div>

                                    <p className="text-sm text-slate-500 mb-8 leading-relaxed italic">
                                        "{data.author.intro}"
                                    </p>

                                    {/* Match Score Display */}
                                    <div className="w-full bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-bold text-slate-600">나와의 매칭 점수</span>
                                            <span className="text-lg font-black text-orange-500">{data.matchScore}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${data.matchScore}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className="h-full bg-gradient-to-r from-orange-400 to-pink-500"
                                            />
                                        </div>
                                        <p className="text-[10px] text-slate-400 mt-2 text-left">
                                            * 사용자의 여행 성향 데이터를 기반으로 산출된 수치입니다.
                                        </p>
                                    </div>

                                    {/* Actions */}
                                    <div className="w-full space-y-3">
                                        {applicationStatus === 'idle' && (
                                            <button
                                                onClick={() => setIsApplyModalOpen(true)}
                                                className="w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                                style={{ background: 'linear-gradient(to right, #f97316, #ec4899)' }}
                                            >
                                                <MessageCircle size={20} />
                                                동행 신청하기
                                            </button>
                                        )}

                                        {applicationStatus === 'pending' && (
                                            <div className="w-full py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold flex items-center justify-center gap-2 cursor-default border border-slate-200">
                                                <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                                                신청 완료 (승인 대기 중)
                                            </div>
                                        )}

                                        {applicationStatus === 'approved' && (
                                            <button
                                                onClick={() => setIsChatOpen(true)}
                                                className="w-full py-4 rounded-2xl text-white font-bold shadow-lg shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                                                style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}
                                            >
                                                <MessageCircle size={20} />
                                                호스트와 채팅하기
                                            </button>
                                        )}

                                        <div className="flex gap-3">
                                            <motion.button
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setIsLiked(!isLiked)}
                                                className={`flex-[2] py-3 rounded-2xl border font-bold transition-all flex items-center justify-center gap-2 ${isLiked
                                                    ? 'bg-pink-50 border-pink-200 text-pink-500'
                                                    : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                                                    }`}
                                            >
                                                <Heart size={18} fill={isLiked ? "currentColor" : "none"} />
                                                {isLiked ? '찜 완료' : '찜하기'}
                                            </motion.button>
                                            <button className="flex-1 p-3 rounded-2xl bg-white border border-slate-200 text-slate-500 hover:bg-slate-50 transition-all flex items-center justify-center">
                                                <Share2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Application Modal */}
            <ApplyCompanionModal
                isOpen={isApplyModalOpen}
                onClose={() => setIsApplyModalOpen(false)}
                onApply={handleApply}
                companionTitle={data.title}
            />

            {/* Chat Drawer */}
            <ChatDrawer
                isOpen={isChatOpen}
                onClose={() => setIsChatOpen(false)}
                recipient={{
                    name: data.author.name,
                    image: data.author.image
                }}
            />

            {/* Image Zoom Modal */}
            <AnimatePresence mode="wait">
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4 md:p-20 group"
                        onClick={() => setSelectedImage(null)}
                    >
                        {/* Close button */}
                        <button
                            className="absolute top-10 right-10 text-white/50 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full z-[2002]"
                            onClick={() => setSelectedImage(null)}
                        >
                            <X size={32} />
                        </button>

                        {/* Navigation Buttons */}
                        <div className="absolute inset-x-6 md:inset-x-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[2005]">
                            <button
                                className="p-5 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 text-white transition-all pointer-events-auto disabled:opacity-0 disabled:pointer-events-none flex items-center justify-center backdrop-blur-md shadow-2xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = data.gallery.indexOf(selectedImage);
                                    if (currentIndex > 0) setSelectedImage(data.gallery[currentIndex - 1]);
                                }}
                                disabled={data.gallery.indexOf(selectedImage) === 0}
                            >
                                <ChevronLeft size={40} strokeWidth={2.5} />
                            </button>
                            <button
                                className="p-5 rounded-full bg-black/20 hover:bg-black/40 border border-white/20 text-white transition-all pointer-events-auto disabled:opacity-0 disabled:pointer-events-none flex items-center justify-center backdrop-blur-md shadow-2xl"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    const currentIndex = data.gallery.indexOf(selectedImage);
                                    if (currentIndex < data.gallery.length - 1) setSelectedImage(data.gallery[currentIndex + 1]);
                                }}
                                disabled={data.gallery.indexOf(selectedImage) === data.gallery.length - 1}
                            >
                                <ChevronRight size={40} strokeWidth={2.5} />
                            </button>
                        </div>

                        {/* Main Image */}
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={selectedImage}
                                initial={{ opacity: 0, scale: 0.95, x: 20 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95, x: -20 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                src={selectedImage}
                                alt="Full View"
                                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl select-none"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </AnimatePresence>

                        {/* Image Counter */}
                        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-medium backdrop-blur-md">
                            {data.gallery.indexOf(selectedImage) + 1} / {data.gallery.length}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </main>
    );
}

