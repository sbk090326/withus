'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { colors, borderRadius, shadows, animations } from '../design-system/constants';

interface GradientButtonProps extends Omit<HTMLMotionProps<'button'>, 'style'> {
    variant?: 'primary' | 'gradient';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
}

export function GradientButton({
    variant = 'primary',
    size = 'md',
    children,
    ...props
}: GradientButtonProps) {
    const sizeStyles = {
        sm: 'px-6 py-2 text-sm',
        md: 'px-8 py-3 text-base',
        lg: 'px-12 py-5 text-lg',
    };

    const variantStyles = {
        primary: {
            background: colors.primary.tan,
            hoverBackground: colors.primary.tanDark,
        },
        gradient: {
            background: `linear-gradient(90deg, ${colors.accent.coral} 0%, ${colors.primary.tan} 100%)`,
            hoverBackground: `linear-gradient(90deg, ${colors.accent.coral} 0%, ${colors.primary.tanDark} 100%)`,
        },
    };

    return (
        <motion.button
            className={`${sizeStyles[size]} ${borderRadius.button} text-white transition-all duration-300`}
            style={{
                background: variantStyles[variant].background,
                boxShadow: shadows.button,
            }}
            whileHover={{
                scale: 1.02,
                backgroundColor: variant === 'primary' ? variantStyles[variant].hoverBackground : undefined,
                boxShadow: shadows.buttonHover,
                transition: { duration: animations.duration.fast },
            }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    );
}
