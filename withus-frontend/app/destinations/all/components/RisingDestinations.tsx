'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Flame, TrendingUp, Users, Heart } from 'lucide-react';

const risingData = [
  {
    id: 1,
    city: '치앙마이',
    country: '태국',
    flag: '🇹🇭',
    image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&q=80&w=800',
    growthRate: 127,
    travelers: 432,
    routes: 28,
    reasons: ['송크란 축제', '디지털 노마드 핫플', '저렴한 물가']
  },
  {
    id: 2,
    city: '부산',
    country: '대한민국',
    flag: '🇰🇷',
    image: 'https://images.unsplash.com/photo-1608481337062-4093bf3ed404?auto=format&fit=crop&q=80&w=800',
    growthRate: 89,
    travelers: 620,
    routes: 42,
    reasons: ['벚꽃 축제', '해운대 야경', '국제영화제']
  },
  {
    id: 3,
    city: '바르셀로나',
    country: '스페인',
    flag: '🇪🇸',
    image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&q=80&w=800',
    growthRate: 76,
    travelers: 1050,
    routes: 68,
    reasons: ['가우디 전시회', '봄 축제', '항공권 할인']
  },
  {
    id: 4,
    city: '다낭',
    country: '베트남',
    flag: '🇻🇳',
    image: 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?auto=format&fit=crop&q=80&w=800',
    growthRate: 65,
    travelers: 780,
    routes: 51,
    reasons: ['해변 리조트', '저렴한 가격', '직항 노선 증가']
  }
];

export const RisingDestinations = () => {
  return (
    <section className="w-full py-16 px-6" style={{ backgroundColor: '#FFF9F5' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Flame className="text-red-500" size={24} />
            <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Rising Fast</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
            🚀 급상승 여행지 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">(이번 주)</span>
          </h2>
          <p className="text-slate-600 font-medium">전주 대비 검색량이 폭발적으로 증가한 여행지</p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {risingData.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group cursor-pointer"
            >
              <div className="relative h-[380px] rounded-[28px] overflow-hidden bg-white border-2 border-slate-100 shadow-lg hover:shadow-2xl transition-all">
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={destination.image}
                    alt={destination.city}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Growth Badge */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-red-500 text-white font-black text-sm shadow-xl"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <TrendingUp size={16} />
                      ↑ {destination.growthRate}%
                    </motion.div>
                  </div>

                  {/* Flag */}
                  <div className="absolute bottom-4 left-4">
                    <span className="text-4xl drop-shadow-lg">{destination.flag}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-orange-500 transition-colors">
                      {destination.city}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{destination.country}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Users size={14} className="text-orange-500" />
                      <span className="font-bold">{destination.travelers}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <Heart size={14} className="text-pink-500" />
                      <span className="font-bold">{destination.routes}</span>
                    </div>
                  </div>

                  {/* Reasons */}
                  <div className="space-y-2">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-wider">🔥 지금 뜨는 이유</p>
                    <div className="space-y-1.5">
                      {destination.reasons.map((reason, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-red-500" />
                          <span className="text-sm text-slate-700 font-medium">{reason}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
