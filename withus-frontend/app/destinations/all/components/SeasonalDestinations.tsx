'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Thermometer, DollarSign, Sparkles } from 'lucide-react';

const seasons = [
  { id: 'spring', label: '봄 (3-5월)', icon: '🌸', color: 'pink' },
  { id: 'summer', label: '여름 (6-8월)', icon: '☀️', color: 'yellow' },
  { id: 'autumn', label: '가을 (9-11월)', icon: '🍂', color: 'orange' },
  { id: 'winter', label: '겨울 (12-2월)', icon: '❄️', color: 'blue' }
];

const seasonalData = {
  spring: [
    {
      id: 1,
      city: '제주',
      country: '대한민국',
      flag: '🇰🇷',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
      avgTemp: '18°C',
      avgBudget: '₩850K',
      highlights: ['벚꽃 만개', '유채꽃 축제', '올레길 트레킹']
    },
    {
      id: 2,
      city: '교토',
      country: '일본',
      flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
      avgTemp: '16°C',
      avgBudget: '₩1.2M',
      highlights: ['벚꽃 명소', '전통 정원', '기모노 체험']
    },
    {
      id: 3,
      city: '파리',
      country: '프랑스',
      flag: '🇫🇷',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800',
      avgTemp: '14°C',
      avgBudget: '₩2.5M',
      highlights: ['봄 축제', '센느강 산책', '야외 카페']
    }
  ],
  summer: [
    {
      id: 4,
      city: '산토리니',
      country: '그리스',
      flag: '🇬🇷',
      image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800',
      avgTemp: '28°C',
      avgBudget: '₩3.0M',
      highlights: ['에게해 일몰', '화이트 빌리지', '해변 리조트']
    },
    {
      id: 5,
      city: '발리',
      country: '인도네시아',
      flag: '🇮🇩',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
      avgTemp: '30°C',
      avgBudget: '₩1.5M',
      highlights: ['서핑', '정글 스파', '비치 클럽']
    },
    {
      id: 6,
      city: '강릉',
      country: '대한민국',
      flag: '🇰🇷',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&q=80&w=800',
      avgTemp: '25°C',
      avgBudget: '₩600K',
      highlights: ['경포해변', '카페 거리', '해산물 맛집']
    }
  ],
  autumn: [
    {
      id: 7,
      city: '설악산',
      country: '대한민국',
      flag: '🇰🇷',
      image: 'https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?auto=format&fit=crop&q=80&w=800',
      avgTemp: '15°C',
      avgBudget: '₩500K',
      highlights: ['단풍 명소', '케이블카', '등산 코스']
    },
    {
      id: 8,
      city: '뉴욕',
      country: '미국',
      flag: '🇺🇸',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&q=80&w=800',
      avgTemp: '18°C',
      avgBudget: '₩3.5M',
      highlights: ['센트럴파크', '할로윈', '브로드웨이']
    },
    {
      id: 9,
      city: '프라하',
      country: '체코',
      flag: '🇨🇿',
      image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?auto=format&fit=crop&q=80&w=800',
      avgTemp: '12°C',
      avgBudget: '₩2.0M',
      highlights: ['구시가지', '맥주 축제', '야경 투어']
    }
  ],
  winter: [
    {
      id: 10,
      city: '홋카이도',
      country: '일본',
      flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1605537687867-e5f6e3e5c6a1?auto=format&fit=crop&q=80&w=800',
      avgTemp: '-5°C',
      avgBudget: '₩1.8M',
      highlights: ['설경', '온천', '스키 리조트']
    },
    {
      id: 11,
      city: '스위스',
      country: '스위스',
      flag: '🇨🇭',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
      avgTemp: '-2°C',
      avgBudget: '₩4.0M',
      highlights: ['알프스 스키', '융프라우', '크리스마스 마켓']
    },
    {
      id: 12,
      city: '강촌',
      country: '대한민국',
      flag: '🇰🇷',
      image: 'https://images.unsplash.com/photo-1548777123-e216912df7d8?auto=format&fit=crop&q=80&w=800',
      avgTemp: '-3°C',
      avgBudget: '₩400K',
      highlights: ['스키', '빙어축제', '겨울 기차 여행']
    }
  ]
};

export const SeasonalDestinations = () => {
  const [activeSeason, setActiveSeason] = useState('spring');

  const currentData = seasonalData[activeSeason as keyof typeof seasonalData];

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
            <Calendar className="text-blue-500" size={24} />
            <span className="text-sm font-bold text-blue-500 uppercase tracking-wider">Seasonal Picks</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                📅 시즌별 인기 여행지
              </h2>
              <p className="text-slate-600 font-medium">계절마다 가장 아름다운 순간을 만날 수 있는 곳</p>
            </div>

            {/* Season Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {seasons.map((season) => (
                <motion.button
                  key={season.id}
                  onClick={() => setActiveSeason(season.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${activeSeason === season.id
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-base">{season.icon}</span>
                  {season.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSeason}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {currentData.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
              >
                <div className="relative h-[420px] rounded-[28px] overflow-hidden bg-white border-2 border-slate-100 shadow-lg hover:shadow-2xl transition-all">
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <motion.img
                      src={destination.image}
                      alt={destination.city}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                    {/* Flag */}
                    <div className="absolute top-4 left-4">
                      <span className="text-4xl drop-shadow-lg">{destination.flag}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-blue-500 transition-colors">
                        {destination.city}
                      </h3>
                      <p className="text-sm text-slate-500 font-medium">{destination.country}</p>
                    </div>

                    {/* Info */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Thermometer size={16} className="text-red-500" />
                        <span className="font-bold text-slate-700">{destination.avgTemp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <DollarSign size={16} className="text-green-500" />
                        <span className="font-bold text-slate-700">{destination.avgBudget}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="space-y-2">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={12} />
                        추천 포인트
                      </p>
                      <div className="space-y-1.5">
                        {destination.highlights.map((highlight, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
                            <span className="text-sm text-slate-700 font-medium">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
