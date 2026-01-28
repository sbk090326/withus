'use client';

import React from 'react';
import { EventCard } from './EventCard';
import { LoadMoreButton } from '@/app/components/ui/LoadMoreButton';

const ONGOING_EVENTS = [
    {
        id: 1,
        title: '신규 가입하고 첫 동행 지원금 받으세요! 💰',
        description: '지금 WithUs에 가입하고 첫 동행을 성공적으로 완료하면 10,000 포인트를 증정합니다.',
        image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=800',
        date: '2026.01.01 - 2026.03.31',
        category: 'SUPPORT',
        isHot: true,
        participants: '1,245'
    },
    {
        id: 2,
        title: '겨울 유럽 여행 메이트 특별 혜택 ❄️',
        description: '유럽 지역 동행 매칭 시 유레일 패스 20% 할인권과 현지 맛집 바우처를 드립니다.',
        image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&q=80&w=800',
        date: '2025.12.01 - 2026.02.28',
        category: 'TRAVEL',
        participants: '856'
    },
    {
        id: 3,
        title: '나만의 베스트 Recipe 챌린지! 🗺️',
        description: '직접 제작한 여행 루트가 이달의 베스트로 선정되면 네이버페이 5만 포인트를 드립니다.',
        image: 'https://images.unsplash.com/photo-1454165833206-38202d60bc84?auto=format&fit=crop&q=80&w=800',
        date: '상시 진행',
        category: 'COMMUNITY',
        participants: '432'
    },
    {
        id: 4,
        title: '친구 초대하고 여행 캐시 적립하기 🤝',
        description: '친구를 초대할 때마다 본인과 친구 모두에게 5,000원 여행 캐시가 즉시 적립됩니다.',
        image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
        date: '상시 진행',
        category: 'GIFT',
        participants: '3,120'
    },
    {
        id: 5,
        title: '포르투갈 캠핑카 투어 얼리버드 🚐',
        description: '올여름 포르투갈 캠핑카 투어를 미리 예약하시면 15% 할인과 캠핑 장구 세트를 무료로 대여해드립니다.',
        image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=80&w=800',
        date: '2026.02.01 - 2026.04.30',
        category: 'TRAVEL',
        participants: '215'
    },
    {
        id: 6,
        title: '위더스 커뮤니티 출석 체크 📅',
        description: '매일매일 위더스에 방문하고 출석 도장을 찍으세요. 한 달 개근 시 5,000 포인트가 쏟아집니다.',
        image: 'https://images.unsplash.com/photo-1506784982277-4c5999c7596b?auto=format&fit=crop&q=80&w=800',
        date: '상시 진행',
        category: 'SUPPORT',
        participants: '15,420'
    },
    {
        id: 7,
        title: '현지인 추천 맛집 제보 이벤트 🍜',
        description: '혼자만 알기 아까운 현지 숨은 맛집을 제보해주세요. 선정된 분들께는 외식 상품권을 드립니다.',
        image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=800',
        date: '2026.02.15 - 2026.03.15',
        category: 'COMMUNITY',
        participants: '678'
    }
];

export const EventList = ({ activeTab }: { activeTab: string }) => {
    const [visibleCount, setVisibleCount] = React.useState(3);
    const [isMoreLoading, setIsMoreLoading] = React.useState(false);

    // In real app, filter data based on activeTab
    const displayEvents = ONGOING_EVENTS;

    const handleLoadMore = () => {
        setIsMoreLoading(true);
        setTimeout(() => {
            setVisibleCount(prev => prev + 3);
            setIsMoreLoading(false);
        }, 600);
    };

    const hasMore = visibleCount < displayEvents.length;
    const paginatedEvents = displayEvents.slice(0, visibleCount);

    return (
        <div className="max-w-[1240px] mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                ))}
            </div>

            {hasMore && (
                <LoadMoreButton
                    onClick={handleLoadMore}
                    isLoading={isMoreLoading}
                    label="이벤트"
                    visibleCount={visibleCount}
                    totalCount={displayEvents.length}
                    className="pt-12"
                />
            )}
        </div>
    );
};
