'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
    const router = useRouter();

    useEffect(() => {
        // 루트 경로를 랜딩 페이지로 리다이렉트
        router.push('/landing');
    }, [router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4" style={{ color: '#1A3C5A' }}>
                    With<span style={{ color: '#A3836B' }}>us</span>
                </h1>
                <p className="text-gray-600">Loading...</p>
            </div>
        </div>
    );
}
