'use client';

import React, { useState, useEffect } from "react";
import { Pagination } from "./Pagination";
import { LoadMoreButton } from "./LoadMoreButton";

interface ResponsivePaginationProps {
  // 페이지네이션 모드용
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

  // 더보기 모드용
  onLoadMore: () => void;
  isLoadMoreLoading?: boolean;
  visibleCount?: number;
  totalCount?: number;
  label?: string;

  className?: string;
}

/**
 * 반응형 페이지네이션 컴포넌트
 * - 웹/데스크탑 (768px 이상): 페이지네이션 표시
 * - 모바일 (768px 미만): 더보기 버튼 표시
 */

export const ResponsivePagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onLoadMore,
  isLoadMoreLoading = false,
  visibleCount,
  totalCount,
  label = "더 보기",
  className = ""
}: ResponsivePaginationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 모바일 여부 체크 (768px 이하를 모바일로 간주)
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 초기 체크
    checkMobile();
    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 모바일이면 더보기 버튼, 아니면 페이지네이션
  if (isMobile) {
    // 더보기 버튼 표시 (모바일 앱)
    // 마지막 페이지면 더보기 버튼 숨김
    if (currentPage >= totalPages) {
      return null;
    }
    return (
      <LoadMoreButton
        onClick={onLoadMore}
        isLoading={isLoadMoreLoading}
        label={label}
        visibleCount={visibleCount}
        totalCount={totalCount}
        className={className}
      />
    );
  }

  // 페이지네이션 표시 (웹/데스크탑)
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      className={className}
    />
  );
};