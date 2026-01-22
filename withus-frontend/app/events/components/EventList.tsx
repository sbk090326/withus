'use client';

import React from 'react';
import { EventCard } from './EventCard';

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
    }
];

export const EventList = ({ activeTab }: { activeTab: string }) => {
    // In real app, filter data based on activeTab
    const displayEvents = ONGOING_EVENTS;

    return (
        <div className="max-w-[1240px] mx-auto px-6 pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {displayEvents.map((event, index) => (
                    <EventCard key={event.id} event={event} index={index} />
                ))}
            </div>
        </div>
    );
};
