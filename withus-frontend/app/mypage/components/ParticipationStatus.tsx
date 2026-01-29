'use client';

import React from 'react';
import { MessageCircle, MapPin, Clock, ChevronRight, UserCheck, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ManageApplicantsModal } from './ManageApplicantsModal';
import { TripDetailModal } from './TripDetailModal';
import { ChatDrawer } from '@/app/find-companion/components/ChatDrawer';
import { Pagination } from '@/app/components/ui/Pagination';
import { TripCardSkeleton } from './upcoming-trips/TripCard';

const mockAppointments = [
    {
        id: 1,
        title: '포르투 서핑 클래스 동행 🏄‍♂️',
        partners: ['지니', '로키'],
        location: '마토지뉴sh 비치 입구',
        time: '2026.05.02 10:00 AM',
        status: 'confirmed',
        chatId: 'chat-123'
    },
    {
        id: 2,
        title: '방콕 루프탑 바 번개 칵테일 🍸',
        partners: ['카이'],
        location: '티츄카 루프탑 입구',
        time: '2026.03.20 08:00 PM',
        status: 'upcoming',
        chatId: 'chat-456'
    }
];

interface ParticipationStatusProps {
    onTabChange: (tab: string) => void;
}

export const ParticipationStatus = ({ onTabChange }: ParticipationStatusProps) => {
    const [filter, setFilter] = React.useState<'joined' | 'hosted'>('joined');
    const [appointments, setAppointments] = React.useState(mockAppointments);
    const [selectedTrip, setSelectedTrip] = React.useState<any>(null);
    const [isManageModalOpen, setIsManageModalOpen] = React.useState(false);
    const [selectedPost, setSelectedPost] = React.useState<{ id: number; title: string } | null>(null);
    const [isChatOpen, setIsChatOpen] = React.useState(false);
    const [chatRecipient, setChatRecipient] = React.useState<{ name: string; image: string } | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(true);
    const [currentPage, setCurrentPage] = React.useState(1);
    const itemsPerPage = 3;

    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => setIsLoading(false), 400);
        return () => clearTimeout(timer);
    }, [filter, currentPage]);

    React.useEffect(() => {
        setCurrentPage(1);
    }, [filter]);

    const data = {
        joined: appointments.filter(a => a.id !== 3), // Mock: Everything except item 3
        hosted: [
            {
                id: 3,
                title: '포르투갈 캠핑카 투어 같이하실 분! 🚐',
                partners: ['미나', '소라', '민수'],
                location: '포르투 시내 집결',
                time: '2026.05.02 09:00 AM',
                status: 'recruiting',
                chatId: 'chat-789',
                currentCount: 3,
                maxCount: 4
            }
        ]
    };

    const currentData = filter === 'joined' ? data.joined : data.hosted;

    // Pagination Logic
    const totalPages = Math.ceil(currentData.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedData = currentData.slice(startIndex, startIndex + itemsPerPage);

    const handleDeleteItem = (id: number, title: string, isHost: boolean) => {
        const message = isHost
            ? `[모집 취소] '${title}' 모집을 중단하고 게시글을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없으며 대기 중인 신청자들에게 알림이 전송됩니다.`
            : `'${title}' 동행 참여를 취소하시겠습니까?`;

        if (confirm(message)) {
            setAppointments(prev => prev.filter(a => a.id !== id));
        }
    };

    const handleOpenChat = (recipient: { name: string; image: string }) => {
        setChatRecipient(recipient);
        setIsChatOpen(true);
    };

    const enterChat = (title: string) => {
        // For general "Enter Chat" functionality (like if multiple people are in a room)
        handleOpenChat({ name: '그룹', image: '👥' });
    };

    const handleManageRecruitment = (id: number, title: string) => {
        setSelectedPost({ id, title });
        setIsManageModalOpen(true);
    };

    const handleOpenDetail = (trip: any) => {
        setSelectedTrip(trip);
        setIsDetailModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">동행 참여 현황</h3>
                    <p className="text-xs text-slate-400 font-bold">확정된 약속부터 모집 중인 모임까지 한눈에 확인하세요.</p>
                </div>

                {/* 내부 가로 탭 (Filter) */}
                <div className="flex p-1 bg-slate-100/50 rounded-2xl border border-slate-100">
                    <button
                        onClick={() => setFilter('joined')}
                        className={`px-5 py-2.5 rounded-xl text-[11px] font-black transition-all ${filter === 'joined'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        내가 참여 중인
                    </button>
                    <button
                        onClick={() => setFilter('hosted')}
                        className={`px-5 py-2.5 rounded-xl text-[11px] font-black transition-all ${filter === 'hosted'
                            ? 'bg-white text-slate-900 shadow-sm'
                            : 'text-slate-400 hover:text-slate-600'
                            }`}
                    >
                        내가 모집 중인
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 min-h-[400px]">
                <AnimatePresence mode="popLayout">
                    {isLoading ? (
                        <div className="space-y-6">
                            <TripCardSkeleton />
                            <TripCardSkeleton />
                        </div>
                    ) : paginatedData.length > 0 ? (
                        paginatedData.map((app, idx) => (
                            <motion.div
                                key={app.id}
                                layout
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className={`bg-white rounded-[2.5rem] border border-slate-100 p-8 hover:shadow-xl transition-all group flex flex-col md:flex-row items-center gap-8 relative
                                    ${filter === 'hosted' ? 'hover:border-orange-200' : 'hover:border-teal-200'}`}
                            >
                                <div className="flex-1 space-y-6 w-full">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-3 py-1 rounded-lg text-[9px] font-black tracking-wider uppercase
                                                ${filter === 'hosted' ? 'bg-orange-50 text-orange-500' : 'bg-teal-50 text-teal-500'}`}>
                                                {filter === 'hosted' ? 'Host' : 'Guest'}
                                            </span>
                                            {app.status === 'confirmed' && (
                                                <span className="px-3 py-1 rounded-lg bg-slate-900 text-white text-[9px] font-black tracking-wider uppercase">
                                                    Matched
                                                </span>
                                            )}
                                        </div>
                                        <h4 className="text-xl font-black text-slate-900 group-hover:text-slate-700 transition-colors">
                                            {app.title}
                                        </h4>
                                        <div className="flex flex-wrap gap-5">
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <MapPin size={14} className="opacity-50" />
                                                <span className="text-xs font-bold">{app.location}</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-slate-400">
                                                <Clock size={14} className="opacity-50" />
                                                <span className="text-xs font-bold">{app.time}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                                        <div className="flex items-center gap-3">
                                            <div className="flex -space-x-3">
                                                {['👧', '🧔', '👱‍♀️'].slice(0, 2).map((emoji, i) => (
                                                    <div key={i} className="w-10 h-10 rounded-full bg-[#F0F7FF] border-2 border-white shadow-sm flex items-center justify-center text-lg overflow-hidden hover:z-10 transition-all">
                                                        {emoji}
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-[11px] font-black text-slate-400 tracking-tight">
                                                {filter === 'hosted'
                                                    ? `${app.partners.length}명이 대기 중이에요`
                                                    : `${app.partners[0]}님 외 ${app.partners.length}명 참여`
                                                }
                                            </span>
                                        </div>

                                        <button
                                            onClick={() => handleDeleteItem(app.id, app.title, filter === 'hosted')}
                                            className="text-slate-300 hover:text-rose-500 transition-colors text-[10px] font-black tracking-widest uppercase flex items-center gap-1.5"
                                        >
                                            <Trash2 size={14} />
                                            {filter === 'hosted' ? '모집 취소/삭제' : '참여 취소'}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3 w-full md:w-[180px] shrink-0">
                                    {/* 🎯 Primary Action Button */}
                                    {filter === 'hosted' ? (
                                        <button
                                            onClick={() => handleManageRecruitment(app.id, app.title)}
                                            className="w-full py-4 rounded-2xl bg-slate-900 text-white text-[12px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            모집 관리
                                            <ChevronRight size={14} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => enterChat(app.title)}
                                            className="w-full py-4 rounded-2xl bg-teal-500 text-white text-[12px] font-black uppercase tracking-widest hover:bg-teal-600 transition-all shadow-lg shadow-teal-100 active:scale-95 flex items-center justify-center gap-2"
                                        >
                                            <MessageCircle size={16} />
                                            채팅방 입장
                                        </button>
                                    )}

                                    {/* 🛠️ Secondary Action Row */}
                                    <div className="flex gap-2">
                                        {filter === 'hosted' ? (
                                            <>
                                                <button
                                                    onClick={() => enterChat(app.title)}
                                                    className="flex-1 py-3.5 rounded-2xl bg-white border border-slate-100 text-slate-400 text-[10px] font-black uppercase hover:bg-slate-50 hover:text-teal-600 transition-all flex items-center justify-center gap-1.5"
                                                >
                                                    <MessageCircle size={14} />
                                                    채팅방
                                                </button>
                                                <button
                                                    onClick={() => handleOpenDetail(app)}
                                                    className="flex-1 py-3.5 rounded-2xl bg-white border border-slate-100 text-slate-400 text-[10px] font-black uppercase hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center"
                                                >
                                                    상세 보기
                                                </button>
                                            </>
                                        ) : (
                                            <button
                                                onClick={() => handleOpenDetail(app)}
                                                className="w-full py-3.5 rounded-2xl bg-white border border-slate-100 text-slate-400 text-[10px] font-black uppercase hover:bg-slate-50 hover:text-slate-900 transition-all flex items-center justify-center gap-2"
                                            >
                                                상세 정보 보기
                                                <ChevronRight size={14} />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="py-24 text-center bg-slate-50/50 rounded-[40px] border-2 border-dashed border-slate-100"
                        >
                            <div className="text-5xl mb-6">🤝</div>
                            <p className="text-slate-400 font-bold tracking-tight">
                                {filter === 'joined'
                                    ? '참여 중인 여행이 없네요.\n새로운 동행을 찾아볼까요?'
                                    : '직접 모집 중인 여행이 없어요.\n첫 동행 모집을 시작해보세요!'}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {!isLoading && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                    className="pt-10"
                />
            )}

            {selectedPost && (
                <ManageApplicantsModal
                    isOpen={isManageModalOpen}
                    onClose={() => setIsManageModalOpen(false)}
                    postTitle={selectedPost.title}
                    onChatOpen={(recipient) => {
                        setIsManageModalOpen(false);
                        handleOpenChat(recipient);
                    }}
                />
            )}

            {chatRecipient && (
                <ChatDrawer
                    isOpen={isChatOpen}
                    onClose={() => setIsChatOpen(false)}
                    recipient={chatRecipient}
                />
            )}

            <TripDetailModal
                isOpen={isDetailModalOpen}
                onClose={() => setIsDetailModalOpen(false)}
                trip={selectedTrip}
                onTabChange={onTabChange}
            />
        </div>
    );
};
