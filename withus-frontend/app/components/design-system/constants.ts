// Design System - Color Palette
export const colors = {
    primary: {
        navy: '#1A3C5A',
        tan: '#A3836B',
        tanDark: '#8e7260',
    },
    accent: {
        coral: '#FF8A73',
    },
    neutral: {
        cream: '#F7F3F0',
        white: '#FFFFFF',
        creamDark: '#E8E0D8',
    },
} as const;

// Design System - Typography
export const typography = {
    fontSize: {
        xs: '14px',
        sm: '16px',
        base: '18px',
        lg: '20px',
        xl: '24px',
        '2xl': '28px',
        '3xl': '48px',
        '4xl': '64px',
    },
    lineHeight: {
        tight: '1.2',
        normal: '1.6',
        relaxed: '1.7',
        loose: '1.8',
    },
} as const;

// Design System - Spacing
export const spacing = {
    section: {
        py: 'py-24',
        px: 'px-8',
    },
    container: {
        maxWidth: 'max-w-[1400px]',
        maxWidthWide: 'max-w-[1600px]',
        maxWidthNarrow: 'max-w-[1200px]',
    },
} as const;

// Design System - Border Radius
export const borderRadius = {
    card: 'rounded-[32px]',
    button: 'rounded-full',
} as const;

// Design System - Shadows
export const shadows = {
    card: '0 8px 24px rgba(26, 60, 90, 0.1)',
    cardHover: '0 16px 48px rgba(26, 60, 90, 0.15)',
    button: '0 4px 20px rgba(255, 138, 115, 0.3)',
    buttonHover: '0 6px 30px rgba(255, 138, 115, 0.4)',
} as const;

// Design System - Animations
export const animations = {
    easing: {
        smooth: [0.22, 1, 0.36, 1] as const,
    },
    duration: {
        fast: 0.3,
        normal: 0.8,
        slow: 1.5,
    },
} as const;
