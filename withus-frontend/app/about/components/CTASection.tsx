'use client';

import React from 'react';
import Link from 'next/link';
import { UserPlus, Search } from 'lucide-react';
import { palette } from '@/app/components/design-system/constants';

export const CTASection = () => {
    return (
        <section
            className="w-full py-24 px-6 text-white text-center relative overflow-hidden"
            style={{
                background: `linear-gradient(to right, #f97316, #ec4899)`
            }}
        >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
                    새로운 여행을 <br /> 시작할 준비가 되셨나요?
                </h2>
                <p className="text-lg text-white/90 mb-10">
                    지금 바로 위드어스와 함께 당신만의 특별한 여행 메이트를 찾아보세요.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/signup">
                        <button
                            className="px-10 py-5 rounded-full bg-white font-bold text-lg hover:shadow-xl transition-all shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                            style={{ color: palette.coral[500] }}
                        >
                            <UserPlus size={20} />
                            무료로 가입하기
                        </button>
                    </Link>
                    <Link href="/find-companion">
                        <button
                            className="px-10 py-5 rounded-full font-bold text-lg text-white border-2 border-white/30 hover:bg-white/10 transition-colors shadow-lg shadow-black/10 flex items-center justify-center gap-2"
                        >
                            <Search size={20} />
                            동행 찾기
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
