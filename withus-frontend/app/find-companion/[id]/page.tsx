'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    ArrowLeft,
    X,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { palette } from '../../components/design-system/constants';
import { useRouter } from 'next/navigation';
import { ChatDrawer } from '../components/ChatDrawer';
import { ApplyCompanionModal } from '../components/ApplyCompanionModal';
import { DetailGallery } from '../components/DetailGallery';
import { DetailContent } from '../components/DetailContent';
import { DetailAuthorCard } from '../components/DetailAuthorCard';
import { DetailQna } from '../components/DetailQna';
import { DetailRoute } from '../components/DetailRoute';

export default function CompanionDetailPage() {
    const router = useRouter();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
    const [applicationStatus, setApplicationStatus] = useState<'idle' | 'pending' | 'approved'>('idle');
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleApply = (message: string) => {
        setApplicationStatus('pending');
        // Simulate approval for demo purposes
        setTimeout(() => {
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
        currentPeople: 3,
        maxPeople: 4,
        targetGender: "여성만",
        targetAge: "20대 후반",
        isSmoker: "비흡연자만",
        budget: "50만원 내외",
        route: ["에펠탑", "루브르 박물관", "몽생미셸", "지베르니", "오르세 미술관"],
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
        <main className="min-h-screen pt-28 pb-32" style={{ backgroundColor: palette.cream.base }}>
            <div className="max-w-[1200px] mx-auto px-6">

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors mb-8 group"
                >
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="font-medium text-sm">목록으로 돌아가기</span>
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left: Content Area (Spans 8 columns) */}
                    <div className="lg:col-span-8 space-y-12">
                        <DetailGallery
                            images={data.gallery}
                            onImageClick={(img) => setSelectedImage(img)}
                        />

                        <DetailContent data={data as any} />

                        {data.route && data.route.length > 0 && (
                            <DetailRoute route={data.route} />
                        )}

                        <DetailQna />
                    </div>


                    {/* Right: Author & Match Area (Spans 4 columns) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32">
                            <DetailAuthorCard
                                author={data.author}
                                matchScore={data.matchScore}
                                applicationStatus={applicationStatus}
                                isLiked={isLiked}
                                onApply={() => setIsApplyModalOpen(true)}
                                onToggleLike={() => setIsLiked(!isLiked)}
                                onOpenChat={() => setIsChatOpen(true)}
                            />
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
                            <button
                                className="absolute top-10 right-10 text-white/50 hover:text-white transition-all p-3 hover:bg-white/10 rounded-full z-[2002]"
                                onClick={() => setSelectedImage(null)}
                            >
                                <X size={32} />
                            </button>

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

                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-sm font-medium backdrop-blur-md">
                                {data.gallery.indexOf(selectedImage) + 1} / {data.gallery.length}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
