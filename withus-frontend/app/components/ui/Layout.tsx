'use client';

import React from 'react';
import { colors, spacing } from '../design-system/constants';

interface SectionProps {
    children: React.ReactNode;
    variant?: 'white' | 'cream';
    className?: string;
}

export function Section({
    children,
    variant = 'cream',
    className = ''
}: SectionProps) {
    const variantStyles = {
        white: colors.neutral.white,
        cream: colors.neutral.cream,
    };

    return (
        <section
            className={`${spacing.section.py} ${spacing.section.px} ${className}`}
            style={{ backgroundColor: variantStyles[variant] }}
        >
            {children}
        </section>
    );
}

interface ContainerProps {
    children: React.ReactNode;
    size?: 'narrow' | 'normal' | 'wide';
    className?: string;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
    ({ children, size = 'normal', className = '' }, ref) => {
        const sizeStyles = {
            narrow: spacing.container.maxWidthNarrow,
            normal: spacing.container.maxWidth,
            wide: spacing.container.maxWidthWide,
        };

        return (
            <div ref={ref} className={`${sizeStyles[size]} mx-auto ${className}`}>
                {children}
            </div>
        );
    }
);

Container.displayName = 'Container';
