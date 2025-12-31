'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { colors, borderRadius, shadows, animations } from '../design-system/constants';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
    variant?: 'white' | 'cream';
    hover?: boolean;
    children: React.ReactNode;
    className?: string;
}

export function Card({
    variant = 'white',
    hover = true,
    children,
    className = '',
    ...props
}: CardProps) {
    const variantStyles = {
        white: {
            backgroundColor: colors.neutral.white,
        },
        cream: {
            backgroundColor: colors.neutral.cream,
        },
    };

    return (
        <motion.div
            className={`p-10 ${borderRadius.card} ${className}`}
            style={{
                ...variantStyles[variant],
                boxShadow: shadows.card,
            }}
            whileHover={hover ? {
                y: -8,
                boxShadow: shadows.cardHover,
                transition: { duration: animations.duration.fast },
            } : undefined}
            {...props}
        >
            {children}
        </motion.div>
    );
}
