'use client';

import React from 'react';
// import { motion, HTMLMotionProps, useInView } from 'motion/react'; // Cleaned up
import { colors, typography, animations } from '../design-system/constants';

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
    children: React.ReactNode;
    className?: string;
    animate?: boolean;
}

const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: animations.duration.normal,
            ease: animations.easing.smooth
        }
    }
};

const descriptionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 0.8,
        y: 0,
        transition: {
            duration: animations.duration.normal,
            delay: 0.2,
            ease: animations.easing.smooth
        }
    }
};

export function SectionTitle({
    children,
    className = '',
    animate = true,
    ...props
}: SectionTitleProps) {
    return (
        <h2
            className={`text-center mb-16 ${className}`}
            style={{
                fontSize: typography.fontSize['3xl'],
                color: colors.primary.navy,
                opacity: '1 !important' as any,
                visibility: 'visible !important' as any,
            }}
            {...props}
        >
            {children}
        </h2>
    );
}

interface SectionDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
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
    return (
        <p
            className={`text-center mb-12 ${className}`}
            style={{
                fontSize: typography.fontSize.base,
                color: colors.primary.navy,
                opacity: 0.8,
            }}
            {...props}
        >
            {children}
        </p>
    );
}
