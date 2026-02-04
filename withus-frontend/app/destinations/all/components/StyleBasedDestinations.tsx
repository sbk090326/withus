'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Target, Star, Users, Heart, Sparkles } from 'lucide-react';

const styles = [
  { id: 'healing', label: '힐링', icon: '🧘', color: 'green' },
  { id: 'activity', label: '액티비티', icon: '🏄', color: 'blue' },
  { id: 'food', label: '미식', icon: '🍽️', color: 'orange' },
  { id: 'shopping', label: '쇼핑', icon: '🛍️', color: 'pink' },
  { id: 'culture', label: '문화/예술', icon: '🎨', color: 'purple' },
  { id: 'nature', label: '자연', icon: '🏔️', color: 'emerald' }
];

const styleData = {
  healing: [
    {
      id: 1,
      city: '발리',
      country: '인도네시아',
      flag: '🇮🇩',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      travelers: 856,
      routes: 54,
      reasons: ['요가 리트릿', '정글 스파', '명상 센터'],
      targetPersona: ['번아웃 극복하고 싶은 직장인', '조용한 휴식이 필요한 분', '요가/명상에 관심 있는 분']
    },
    {
      id: 2,
      city: '제주',
      country: '대한민국',
      flag: '🇰🇷',
      image: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      travelers: 980,
      routes: 67,
      reasons: ['해변 휴양', '올레길 트레킹', '카페 투어'],
      targetPersona: ['주말 힐링이 필요한 분', '자연 속에서 쉬고 싶은 분', '가까운 곳으로 떠나고 싶은 분']
    },
    {
      id: 3,
      city: '치앙마이',
      country: '태국',
      flag: '🇹🇭',
      image: 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?auto=format&fit=crop&q=80&w=800',
      rating: 4.7,
      travelers: 432,
      routes: 28,
      reasons: ['스파 천국', '템플스테이', '저렴한 물가'],
      targetPersona: ['장기 휴식이 필요한 분', '디지털 노마드', '스파/마사지 애호가']
    }
  ],
  activity: [
    {
      id: 4,
      city: '퀸즈타운',
      country: '뉴질랜드',
      flag: '🇳🇿',
      image: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      travelers: 520,
      routes: 35,
      reasons: ['번지점프', '스카이다이빙', '제트보트'],
      targetPersona: ['스릴을 즐기는 분', '익스트림 스포츠 애호가', '모험을 좋아하는 분']
    },
    {
      id: 5,
      city: '인터라켄',
      country: '스위스',
      flag: '🇨🇭',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      travelers: 680,
      routes: 42,
      reasons: ['패러글라이딩', '알프스 등산', '스키'],
      targetPersona: ['산악 스포츠 애호가', '자연 속 액티비티를 즐기는 분', '유럽 여행 계획 중인 분']
    },
    {
      id: 6,
      city: '푸켓',
      country: '태국',
      flag: '🇹🇭',
      image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?auto=format&fit=crop&q=80&w=800',
      rating: 4.6,
      travelers: 1200,
      routes: 78,
      reasons: ['스쿠버다이빙', '서핑', '섬 호핑'],
      targetPersona: ['해양 스포츠 애호가', '다이빙 자격증 취득 희망자', '열대 바다를 좋아하는 분']
    }
  ],
  food: [
    {
      id: 7,
      city: '방콕',
      country: '태국',
      flag: '🇹🇭',
      image: 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      travelers: 2100,
      routes: 145,
      reasons: ['야시장', '스트릿푸드', '미슐랭 맛집'],
      targetPersona: ['먹방 여행을 원하는 분', '로컬 음식을 좋아하는 분', '가성비 좋은 미식 여행 원하는 분']
    },
    {
      id: 8,
      city: '오사카',
      country: '일본',
      flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      travelers: 1450,
      routes: 92,
      reasons: ['타코야키', '오코노미야키', '쿠로몬 시장'],
      targetPersona: ['일본 음식 애호가', '시장 투어를 좋아하는 분', '가까운 미식 여행 원하는 분']
    },
    {
      id: 9,
      city: '파리',
      country: '프랑스',
      flag: '🇫🇷',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800',
      rating: 4.7,
      travelers: 1240,
      routes: 89,
      reasons: ['미슐랭 레스토랑', '베이커리', '와인 바'],
      targetPersona: ['파인 다이닝 경험 원하는 분', '프렌치 요리 애호가', '와인 애호가']
    }
  ],
  shopping: [
    {
      id: 10,
      city: '도쿄',
      country: '일본',
      flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      travelers: 742,
      routes: 43,
      reasons: ['하라주쿠', '시부야', '긴자'],
      targetPersona: ['패션 트렌드에 관심 많은 분', '한정판 제품 수집가', 'K-POP 굿즈 쇼핑 원하는 분']
    },
    {
      id: 11,
      city: '밀라노',
      country: '이탈리아',
      flag: '🇮🇹',
      image: 'https://images.unsplash.com/photo-1513581166391-887a96ddeafd?auto=format&fit=crop&q=80&w=800',
      rating: 4.7,
      travelers: 890,
      routes: 56,
      reasons: ['명품 쇼핑', '아울렛', '패션위크'],
      targetPersona: ['명품 쇼핑 원하는 분', '패션에 관심 많은 분', '유럽 브랜드 애호가']
    },
    {
      id: 12,
      city: '홍콩',
      country: '중국',
      flag: '🇭🇰',
      image: 'https://images.unsplash.com/photo-1536599018102-9f803c140fc1?auto=format&fit=crop&q=80&w=800',
      rating: 4.6,
      travelers: 1320,
      routes: 84,
      reasons: ['면세점', '야시장', '전자제품'],
      targetPersona: ['면세 쇼핑 원하는 분', '전자제품 구매 계획 있는 분', '가까운 쇼핑 여행 원하는 분']
    }
  ],
  culture: [
    {
      id: 13,
      city: '로마',
      country: '이탈리아',
      flag: '🇮🇹',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      travelers: 1100,
      routes: 76,
      reasons: ['콜로세움', '바티칸', '역사 유적'],
      targetPersona: ['역사에 관심 많은 분', '유럽 문화 체험 원하는 분', '건축물 감상 좋아하는 분']
    },
    {
      id: 14,
      city: '교토',
      country: '일본',
      flag: '🇯🇵',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      travelers: 950,
      routes: 62,
      reasons: ['전통 사찰', '기모노 체험', '정원'],
      targetPersona: ['일본 전통 문화 애호가', '사진 촬영 좋아하는 분', '조용한 여행 원하는 분']
    },
    {
      id: 15,
      city: '파리',
      country: '프랑스',
      flag: '🇫🇷',
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      travelers: 1240,
      routes: 89,
      reasons: ['루브르', '오르세', '예술 전시'],
      targetPersona: ['미술 애호가', '박물관 투어 좋아하는 분', '예술에 관심 많은 분']
    }
  ],
  nature: [
    {
      id: 16,
      city: '아이슬란드',
      country: '아이슬란드',
      flag: '🇮🇸',
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&q=80&w=800',
      rating: 5.0,
      travelers: 680,
      routes: 45,
      reasons: ['오로라', '빙하', '온천'],
      targetPersona: ['자연 경관 애호가', '오로라 보고 싶은 분', '독특한 경험 원하는 분']
    },
    {
      id: 17,
      city: '설악산',
      country: '대한민국',
      flag: '🇰🇷',
      image: 'https://images.unsplash.com/photo-1583562835057-a62d1beffbf3?auto=format&fit=crop&q=80&w=800',
      rating: 4.8,
      travelers: 520,
      routes: 34,
      reasons: ['등산', '단풍', '케이블카'],
      targetPersona: ['등산 애호가', '자연 속 힐링 원하는 분', '가까운 자연 여행 원하는 분']
    },
    {
      id: 18,
      city: '스위스',
      country: '스위스',
      flag: '🇨🇭',
      image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=800',
      rating: 4.9,
      travelers: 890,
      routes: 58,
      reasons: ['알프스', '융프라우', '호수'],
      targetPersona: ['산악 경관 애호가', '유럽 자연 여행 원하는 분', '트레킹 좋아하는 분']
    }
  ]
};

export const StyleBasedDestinations = () => {
  const [activeStyle, setActiveStyle] = useState('healing');

  const currentData = styleData[activeStyle as keyof typeof styleData];

  return (
    <section className="w-full py-16 px-6" style={{ backgroundColor: '#F8FAFC' }}>
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <Target className="text-purple-500" size={24} />
            <span className="text-sm font-bold text-purple-500 uppercase tracking-wider">Travel Style</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mb-2">
                🎯 여행 스타일별 인기 여행지
              </h2>
              <p className="text-slate-600 font-medium">나의 여행 스타일에 딱 맞는 여행지를 찾아보세요</p>
            </div>

            {/* Style Tabs */}
            <div className="flex items-center gap-2 flex-wrap">
              {styles.map((style) => (
                <motion.button
                  key={style.id}
                  onClick={() => setActiveStyle(style.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-bold text-sm transition-all ${activeStyle === style.id
                      ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                      : 'bg-white border-2 border-slate-200 text-slate-600 hover:border-purple-300 hover:text-purple-600'
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-base">{style.icon}</span>
                  {style.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStyle}
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
                <div className="relative h-[480px] rounded-[28px] overflow-hidden bg-white border-2 border-slate-100 shadow-lg hover:shadow-2xl transition-all">
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

                    {/* Flag */}
                    <div className="absolute top-4 left-4">
                      <span className="text-4xl drop-shadow-lg">{destination.flag}</span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-4 right-4">
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm">
                        <Star size={14} fill="#F59E0B" className="text-amber-500" />
                        <span className="text-sm font-black text-slate-900">{destination.rating}</span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-2xl font-black text-slate-900 mb-1 group-hover:text-purple-500 transition-colors">
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
                      <p className="text-xs font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                        <Sparkles size={12} />
                        추천 이유
                      </p>
                      <div className="space-y-1.5">
                        {destination.reasons.map((reason, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-purple-500" />
                            <span className="text-sm text-slate-700 font-medium">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Target Persona */}
                    <div className="pt-3 border-t border-slate-100">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">👤 이런 분들께 추천</p>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">
                        {destination.targetPersona[0]}
                      </p>
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
