'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

interface CountUpProps {
    end: number;
    duration?: number;
    suffix?: string;
}

export function CountUp({ end, duration = 2000, suffix = '' }: CountUpProps) {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (!isInView) return;

        let startTime: number | null = null;
        const startValue = 0;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * (end - startValue) + startValue);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration, isInView]);

    return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}
