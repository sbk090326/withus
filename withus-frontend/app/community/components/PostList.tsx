'use client';

import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Heart, Eye, Clock, MapPin, ChevronRight, Save } from 'lucide-react';
import { LoadMoreButton } from '@/app/components/ui/LoadMoreButton';
import { ResponsivePagination } from '@/app/components/ui/ResponsivePagination';

interface Post {
    id: number;
    authorId: number;
    category: string;
    categoryLabel: string;
    title: string;
    excerpt: string;
    author: string;
    authorImage: string;
    date: string;
    comments: number;
    likes: number;
    views: number;
    thumbnail?: string;
    routes?: string[]; // 코스 전용 데이터
    location?: string; // 코스 전용 데이터
    tags?: string[]; // 태그 데이터
}

const mockPosts: Post[] = [
    {
        id: 100,
        authorId: 0, // 시스템 어카운트
        category: 'notice',
        categoryLabel: '공지사항',
        title: '📢 WithUs 이용 약관 및 포인트 정책 개정 안내',
        excerpt: '안녕하세요, WithUs 팀입니다. 서비스의 투명성 제고를 위해 이용 약관 및 포인트 사용 정책이 일부 변경되었습니다. 자세한 내용은 전문을 확인해주세요.',
        author: 'WithUs 운영지원팀',
        authorImage: '🛡️',
        date: '오늘',
        comments: 0,
        likes: 0,
        views: 1240,
        tags: ['공지', '정책변경', '필독']
    },
    {
        id: 10,
        authorId: 201,
        category: 'course',
        categoryLabel: '여행 코스',
        title: '포르투 한 달 살기가 추천하는 서핑 루트 🌊',
        excerpt: '서핑과 낭만 두 마리 토끼를 다 잡는 완벽한 포르투 서쪽 코스입니다. 제가 직접 가보고 검증한 최강 루트예요!',
        author: '포르투전문가',
        authorImage: '🏄',
        date: '30분 전',
        comments: 24,
        likes: 156,
        views: 2400,
        thumbnail: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=300',
        location: '포르투갈, 포르투',
        routes: ['마토지뉴슈 해변', '시티 파크', '펠리구에이라 등대', '리베이라 광장'],
        tags: ['서핑', '포르투갈', '한달살기', '유럽여행']
    },
    {
        id: 1,
        authorId: 101,
        category: 'qna',
        categoryLabel: '질문/답변',
        title: '파리 에펠탑 야경 명소 추천해주세요!',
        excerpt: '내일 파리 도착하는데 에펠탑이 한눈에 들어오는 식당이나 카페, 혹은 공원 명소가 어디일까요? 현지인들만 아는 곳이면 더 좋겠어요.',
        author: '여행홀릭',
        authorImage: '🐿️',
        date: '10분 전',
        comments: 12,
        likes: 24,
        views: 156,
        tags: ['파리', '에펠탑', '야경명소', '도움요청']
    },
    {
        id: 2,
        authorId: 1,
        category: 'review',
        categoryLabel: '여행후기',
        title: '나홀로 후쿠오카 3박 4일 먹방 여행기 🍜',
        excerpt: '이번에 혼자 후쿠오카 다녀왔어요. 혼자 가기 좋은 라멘집이랑 야키토리집 리스트 공유합니다! 사진 많음 주의하세요.',
        author: '미식가(나)',
        authorImage: '🍲',
        date: '2시간 전',
        comments: 45,
        likes: 128,
        views: 890,
        thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=300',
        tags: ['후쿠오카', '먹방', '라멘', '나홀로여행']
    },
    {
        id: 11,
        authorId: 202,
        category: 'course',
        categoryLabel: '여행 코스',
        title: '방콕 야경에 취하는 인스타 인생샷 코스 🥂',
        excerpt: '방콕 밤거리를 헤매지 마세요. 이동 동선 최적화! 하루 만에 끝내는 방콕 핫플레이스 투어 가이드입니다.',
        author: '방콕마스터',
        authorImage: '🐘',
        date: '1시간 전',
        comments: 18,
        likes: 89,
        views: 1200,
        thumbnail: 'https://images.unsplash.com/photo-1508939232145-159d460d3fc1?auto=format&fit=crop&q=80&w=300',
        location: '태국, 방콕',
        routes: ['딸랏노이 벽화마을', '왓 아룬 야경', '티추카 루프탑', '카오산 로드']
    },
    {
        id: 3,
        authorId: 99,
        category: 'info',
        categoryLabel: '정보공유',
        title: '2026년 유럽 여행 비자(ETIAS) 발급 총정리',
        excerpt: '유럽 여행 준비하시는 분들 주목! 내년부터 시행되는 ETIAS 비자 발급 방법과 주의사항 핵심만 정리해봤습니다.',
        author: 'WithUs운영자',
        authorImage: '📢',
        date: '5시간 전',
        comments: 8,
        likes: 56,
        views: 2400,
    },
    {
        id: 4,
        authorId: 105,
        category: 'review',
        categoryLabel: '여행후기',
        title: '스위스 인터라켄 패러글라이딩 하늘을 날다 🪂',
        excerpt: '살면서 한 번은 꼭 해봐야 할 버킷리스트! 동화 같은 풍경을 발아래 두고 나는 기분은 정말 말로 표현할 수 없어요.',
        author: '하늘덕후',
        authorImage: '☁️',
        date: '6시간 전',
        comments: 32,
        likes: 210,
        views: 1500,
        thumbnail: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&q=80&w=300'
    },
    {
        id: 5,
        authorId: 106,
        category: 'qna',
        categoryLabel: '질문/답변',
        title: '런던 여행 경비 얼마 정도 들까요? 💷',
        excerpt: '친구랑 둘이서 일주일 정도 런던 가려고 하는데, 숙소랑 식비 포함해서 최소 어느 정도 잡아야 할까요? 물가가 비싸다 해서 걱정이네요.',
        author: '런던꿈나무',
        authorImage: '💂',
        date: '8시간 전',
        comments: 15,
        likes: 12,
        views: 420
    },
    {
        id: 6,
        authorId: 107,
        category: 'review',
        categoryLabel: '여행후기',
        title: '베트남 다낭 가족 여행 3박 5일 코스 추천 🏮',
        excerpt: '부모님 모시고 다녀온 다낭 여행! 동선 짧고 맛집 위주로 짠 실속 코스 공유합니다. 리조트 선택 팁도 있어요.',
        author: '효도중',
        authorImage: '👵',
        date: '어제',
        comments: 56,
        likes: 189,
        views: 3200,
        thumbnail: 'https://images.unsplash.com/photo-1559592413-7ece35b462f7?auto=format&fit=crop&q=80&w=300'
    }
];

const PostCardSkeleton = () => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 animate-pulse shadow-sm h-[200px] flex items-center justify-center">
        <div className="flex-1 space-y-4">
            <div className="flex items-center gap-3">
                <div className="w-16 h-4 bg-slate-50 rounded-full" />
                <div className="w-24 h-4 bg-slate-50 rounded-full" />
            </div>
            <div className="w-2/3 h-6 bg-slate-100 rounded-lg" />
            <div className="space-y-2">
                <div className="w-full h-4 bg-slate-50 rounded-lg" />
                <div className="w-1/2 h-4 bg-slate-50 rounded-lg" />
            </div>
            <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                <div className="w-32 h-4 bg-slate-50 rounded-full" />
                <div className="w-24 h-8 bg-slate-50 rounded-full" />
            </div>
        </div>
    </div>
);

interface PostListProps {
    category: string;
    currentUserId: number;
    onEdit: (post: Post) => void;
    onDelete: (postId: number) => void;
    onSelect: (post: Post) => void;
}

export const PostList = ({ category, currentUserId, onEdit, onDelete, onSelect }: PostListProps) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [isMoreLoading, setIsMoreLoading] = React.useState(false);
    const [currentPage, setCurrentPage] = React.useState(1);
    const ITEMS_PER_PAGE = 3;

    const filteredPosts = category === 'all'
        ? mockPosts
        : mockPosts.filter(post => post.category === category);

    React.useEffect(() => {
        setIsLoading(true);
        const timer = setTimeout(() => {
            setIsLoading(false);
            setCurrentPage(1);
        }, 500);
        return () => clearTimeout(timer);
    }, [category]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleLoadMore = () => {
        setIsMoreLoading(true);
        setTimeout(() => {
            setCurrentPage(prev => prev + 1);
            setIsMoreLoading(false);
        }, 600);
    };

    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

    return (
        <div className="space-y-6">
            {isLoading ? (
                <>
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                    <PostCardSkeleton />
                </>
            ) : (
                <>
                    {paginatedPosts.map((post, index) => {
                        const isCourse = post.category === 'course';

                        return (
                            <motion.div
                                key={post.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => onSelect(post)}
                                className={`bg-white rounded-[2.5rem] border p-8 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-xl
                                    ${post.category === 'notice' ? 'border-indigo-100 bg-indigo-50/20 hover:border-indigo-300' :
                                        isCourse ? 'border-orange-100 hover:border-orange-300' :
                                            'border-slate-100 hover:border-orange-200'}
                                `}
                            >
                                <div className="flex flex-col md:flex-row gap-8">
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest ${post.category === 'notice' ? 'bg-indigo-600 text-white shadow-sm' :
                                                    post.category === 'qna' ? 'bg-orange-50 text-orange-600' :
                                                        post.category === 'review' ? 'bg-pink-50 text-pink-600' :
                                                            post.category === 'info' ? 'bg-teal-50 text-teal-600' :
                                                                post.category === 'course' ? 'bg-orange-500 text-white' :
                                                                    'bg-slate-50 text-slate-500'
                                                    }`}>
                                                    {post.categoryLabel}
                                                </span>
                                                {isCourse && post.location && (
                                                    <div className="flex items-center gap-1 text-[10px] font-black text-orange-500/70 uppercase tracking-widest">
                                                        <MapPin size={12} />
                                                        {post.location}
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-bold uppercase tracking-widest ml-auto md:ml-0">
                                                    <Clock size={12} />
                                                    {post.date}
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-black text-slate-900 group-hover:text-orange-500 transition-colors line-clamp-1 tracking-tighter">
                                                {post.title}
                                            </h3>

                                            {/* Course Routes display */}
                                            {isCourse && post.routes && (
                                                <div className="flex items-center gap-2 flex-wrap py-1">
                                                    {post.routes.map((route, i, arr) => (
                                                        <React.Fragment key={i}>
                                                            <span className="text-[10px] font-bold text-slate-500 px-2.5 py-1 bg-slate-50 rounded-lg border border-slate-100 uppercase tracking-tight">
                                                                {route}
                                                            </span>
                                                            {i < arr.length - 1 && <ChevronRight size={10} className="text-slate-300" />}
                                                        </React.Fragment>
                                                    ))}
                                                </div>
                                            )}

                                            <p className="text-slate-500 text-sm leading-relaxed line-clamp-2 font-medium">
                                                {post.excerpt}
                                            </p>

                                            {post.tags && (
                                                <div className="flex flex-wrap gap-2">
                                                    {post.tags.map((tag, i) => (
                                                        <span key={i} className="text-[10px] font-bold text-slate-400">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>

                                        <div className="flex items-center justify-between pt-6 border-t border-slate-50 mt-6">
                                            <div className="flex items-center gap-4 text-[11px] text-slate-400 font-black">
                                                <div className="flex items-center gap-1.5">
                                                    <MessageSquare size={14} className="text-slate-300" />
                                                    {post.comments}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Heart size={14} className="text-pink-400" />
                                                    {post.likes}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <Eye size={14} className="text-slate-300" />
                                                    {post.views}
                                                </div>
                                                {isCourse && (
                                                    <div className="flex items-center gap-1 text-orange-500">
                                                        <Save size={14} />
                                                        <span>42</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-slate-50/50 border border-slate-100/50">
                                                <div className="w-5 h-5 rounded-full bg-white shadow-sm flex items-center justify-center border border-slate-100 overflow-hidden text-[10px]">
                                                    {post.authorImage}
                                                </div>
                                                <span className="text-[11px] font-bold text-slate-700">{post.author}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {post.thumbnail && (
                                        <div className="w-full md:w-44 h-44 rounded-[2rem] overflow-hidden shadow-sm flex-shrink-0">
                                            <img
                                                src={post.thumbnail}
                                                alt={post.title}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            />
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}

                    {filteredPosts.length > ITEMS_PER_PAGE && (
                        <ResponsivePagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                            onLoadMore={handleLoadMore}
                            isLoadMoreLoading={isMoreLoading}
                            visibleCount={currentPage * ITEMS_PER_PAGE}
                            totalCount={filteredPosts.length}
                            label="게시글"
                            className="pt-8"
                        />
                    )}
                </>
            )}
        </div>
    );
};
