'use client';

import React from 'react';
import { motion, HTMLMotionProps, useInView } from 'motion/react';
import { colors, typography, animations } from '../design-system/constants';

interface SectionTitleProps extends Omit<HTMLMotionProps<'h2'>, 'style'> {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export function SectionTitle({
    children,
    className = '',
    animate = true,
    ...props
}: SectionTitleProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.h2
            ref={ref}
            className={`text-center mb-16 ${className}`}
            style={{
                fontSize: typography.fontSize['3xl'],
                color: colors.primary.navy,
            }}
            initial={animate ? { opacity: 0, y: 30 } : { opacity: 1, y: 0 }}
            animate={animate ? (isInView ? { opacity: 1, y: 0 } : {}) : { opacity: 1, y: 0 }}
            transition={animate ? {
                duration: animations.duration.normal,
                ease: animations.easing.smooth
            } : undefined}
            {...props}
        >
            {children}
        </motion.h2>
    );
}

interface SectionDescriptionProps extends Omit<HTMLMotionProps<'p'>, 'style'> {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

export function SectionDescription({
    children,
    className = '',
    animate = true,
    ...props
}: SectionDescriptionProps) {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <motion.p
            ref={ref}
            className={`text-center mb-12 ${className}`}
            style={{
                fontSize: typography.fontSize.base,
                color: colors.primary.navy,
                opacity: 0.8,
            }}
            initial={animate ? { opacity: 0, y: 20 } : { opacity: 0.8, y: 0 }}
            animate={animate ? (isInView ? { opacity: 0.8, y: 0 } : {}) : { opacity: 0.8, y: 0 }}
            transition={animate ? {
                duration: animations.duration.normal,
                delay: 0.2,
                ease: animations.easing.smooth
            } : undefined}
            {...props}
        >
            {children}
        </motion.p>
    );
}
