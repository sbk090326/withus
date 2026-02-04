'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowUp, ArrowDown, Minus, Users, Heart } from 'lucide-react';

const regionFilters = [
  { id: 'all', label: '전체' },
  { id: 'domestic', label: '국내' },
  { id: 'asia', label: '아시아' },
  { id: 'europe', label: '유럽' },
  { id: 'americas', label: '미주/기타' }
];

const rankingData = [
  { rank: 1, city: '파리', country: '프랑스', region: 'europe', travelers: 1240, routes: 89, change: 2, flag: '🇫🇷' },
  { rank: 2, city: '제주', country: '대한민국', region: 'domestic', travelers: 980, routes: 67, change: 5, flag: '🇰🇷' },
  { rank: 3, city: '발리', country: '인도네시아', region: 'asia', travelers: 856, routes: 54, change: 0, flag: '🇮🇩' },
  { rank: 4, city: '도쿄', country: '일본', region: 'asia', travelers: 742, routes: 43, change: -1, flag: '🇯🇵' },
  { rank: 5, city: '런던', country: '영국', region: 'europe', travelers: 698, routes: 38, change: 3, flag: '🇬🇧' },
  { rank: 6, city: '뉴욕', country: '미국', region: 'americas', travelers: 1540, routes: 124, change: -2, flag: '🇺🇸' },
  { rank: 7, city: '로마', country: '이탈리아', region: 'europe', travelers: 1100, routes: 76, change: 1, flag: '🇮🇹' },
  { rank: 8, city: '방콕', country: '태국', region: 'asia', travelers: 2100, routes: 145, change: 4, flag: '🇹🇭' },
  { rank: 9, city: '부산', country: '대한민국', region: 'domestic', travelers: 620, routes: 42, change: 2, flag: '🇰🇷' },
  { rank: 10, city: '바르셀로나', country: '스페인', region: 'europe', travelers: 890, routes: 58, change: -3, flag: '🇪🇸' }
];

const getRankIcon = (rank: number) => {
  if (rank === 1) return '🥇';
  if (rank === 2) return '🥈';
  if (rank === 3) return '🥉';
  return rank;
};

const getChangeIcon = (change: number) => {
  if (change > 0) return <ArrowUp size={14} className="text-red-500" />;
  if (change < 0) return <ArrowDown size={14} className="text-blue-500" />;
  return <Minus size={14} className="text-slate-400" />;
};

const getChangeColor = (change: number) => {
  if (change > 0) return 'text-red-500';
  if (change < 0) return 'text-blue-500';
  return 'text-slate-400';
};

export const RealTimeRanking = () => {
  const [activeRegion, setActiveRegion] = useState('all');

  const filteredData = activeRegion === 'all'
    ? rankingData
    : rankingData.filter(item => item.region === activeRegion);

  return (
    <section className="w-full py-16 px-6 bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-orange-500" size={24} />
            <span className="text-sm font-bold text-orange-500 uppercase tracking-wider">Real-Time Ranking</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                📊 실시간 인기 여행지 <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">TOP 10</span>
              </h2>
              <p className="text-slate-600 font-medium">지금 이 순간 가장 많은 사람들이 찾는 여행지</p>
            </div>

            {/* Region Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              {regionFilters.map((filter) => (
                <motion.button
                  key={filter.id}
                  onClick={() => setActiveRegion(filter.id)}
                  className={`px-4 py-2 rounded-full font-bold text-sm transition-all ${activeRegion === filter.id
                      ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30'
                      : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-orange-300 hover:text-orange-600'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {filter.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Ranking Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl border-2 border-slate-100 overflow-hidden shadow-lg"
        >
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 border-b-2 border-slate-100 font-black text-xs text-slate-500 uppercase tracking-wider">
            <div className="col-span-1">순위</div>
            <div className="col-span-4">여행지</div>
            <div className="col-span-2 text-center hidden md:block">저장 수</div>
            <div className="col-span-2 text-center hidden md:block">루트 수</div>
            <div className="col-span-3 text-center">변동</div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-slate-100">
            {filteredData.map((item, index) => (
              <motion.div
                key={item.rank}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="grid grid-cols-12 gap-4 px-6 py-4 hover:bg-orange-50/50 transition-colors cursor-pointer group"
              >
                {/* Rank */}
                <div className="col-span-1 flex items-center">
                  <span className="text-2xl font-black">{getRankIcon(item.rank)}</span>
                </div>

                {/* Destination */}
                <div className="col-span-4 flex items-center gap-3">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 group-hover:text-orange-500 transition-colors">
                      {item.city}
                    </h3>
                    <p className="text-sm text-slate-500 font-medium">{item.country}</p>
                  </div>
                </div>

                {/* Travelers */}
                <div className="col-span-2 hidden md:flex items-center justify-center">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Users size={16} className="text-orange-500" />
                    <span className="font-bold">{item.travelers.toLocaleString()}</span>
                  </div>
                </div>

                {/* Routes */}
                <div className="col-span-2 hidden md:flex items-center justify-center">
                  <div className="flex items-center gap-2 text-slate-700">
                    <Heart size={16} className="text-pink-500" />
                    <span className="font-bold">{item.routes}</span>
                  </div>
                </div>

                {/* Change */}
                <div className="col-span-3 flex items-center justify-center">
                  <div className={`flex items-center gap-2 font-black ${getChangeColor(item.change)}`}>
                    {getChangeIcon(item.change)}
                    <span>{Math.abs(item.change)}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
