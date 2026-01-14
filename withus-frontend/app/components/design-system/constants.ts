/**
 * WithUs Design System Constants (Refined)
 * --------------------------------------------
 * 랜딩 페이지와 기존 컴포넌트들의 실제 활용 컬러를 기반으로한 단일 소스 오브 트루스.
 * 사용법: import { palette, theme } from '@/app/components/design-system/constants';
 */

export const palette = {
    // 1. Signature Coral (기존 브랜드 메인 컬러)
    coral: {
        50: '#FFF5F2',
        100: '#FFEBE6',
        200: '#FFD1C7',
        300: '#FFAFA1',
        400: '#FF7E5F', // 메인 포인트 (Coral)
        500: '#F9603D',
        600: '#E64A2E',
        700: '#C23D26',
        800: '#942B1B',
        900: '#66190D',
    },

    // 2. Vibrant Brand (랜딩 페이지 그라데이션 소스)
    orange: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316', // Tailwind Orange-500
        600: '#EA580C',
        700: '#C2410C',
    },
    pink: {
        50: '#FDF2F8',
        100: '#FCE7F3',
        200: '#FBCFE8',
        300: '#F9A8D4',
        400: '#F472B6',
        500: '#EC4899', // Tailwind Pink-500
        600: '#DB2777',
        700: '#BE185D',
    },

    // 3. Trust Secondary (신뢰감 & 매칭 시스템)
    teal: {
        50: '#F0FDFA',
        100: '#CCFBF1',
        200: '#99F6E4',
        300: '#5EEAD4',
        400: '#2DD4BF',
        500: '#14B8A6',
        600: '#0D9488',
    },

    // 4. Neutrals (Slate 계열 - 깔끔한 모던 스타일)
    slate: {
        50: '#F8FAFC',
        100: '#F1F5F9',
        200: '#E2E8F0',
        300: '#CBD5E1',
        400: '#94A3B8',
        500: '#64748B',
        600: '#475569',
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A',
    },

    // 5. Semantic & Backgrounds (랜딩 페이지 기준 배경색)
    cream: {
        base: '#FFFFFF',
        section: '#FDFCFB',    // TrendingSection 배경 (유백색)
        peach: '#FFF9F7',      // CurationSection 배경 (연한 피치)
    },
    white: '#FFFFFF',
    black: '#000000',
    danger: '#FF4B4B',
    success: '#10B981',

    // Aliases
    brand: {
        50: '#FFF7ED',
        100: '#FFEDD5',
        200: '#FED7AA',
        300: '#FDBA74',
        400: '#FB923C',
        500: '#F97316',
        600: '#EA580C',
        700: '#C2410C',
        DEFAULT: '#EA580C',
        pink: '#DB2777',
        accent: '#FF7E5F',
    },
    secondary_palette: {
        50: '#F0FDFA',
        100: '#CCFBF1',
        200: '#99F6E4',
        300: '#5EEAD4',
        400: '#2DD4BF',
        500: '#14B8A6',
        600: '#0D9488',
    },
} as const;

export const theme = {
    colors: {
        primary: {
            DEFAULT: palette.coral[400],
            main: palette.coral[400], // Alias for legacy components
            hover: palette.coral[500],
            light: palette.coral[100],
            bg: palette.coral[50],
        },
        secondary: {
            DEFAULT: palette.teal[400],
            main: palette.teal[400], // Alias
            hover: palette.teal[500],
            light: palette.teal[200],
            bg: palette.teal[50],
        },
        text: {
            primary: palette.slate[900],
            secondary: palette.slate[600],
            tertiary: palette.slate[400],
            white: '#FFFFFF',
        },
        neutral: {
            white: '#FFFFFF',
            black: '#000000',
        },
        background: {
            main: palette.cream.base,
            alt: palette.cream.section,
            highlight: palette.cream.peach,
        },
        gradients: {
            // 랜딩 페이지에서 사용되는 그라데이션
            brand: 'linear-gradient(to right, #F97316, #EC4899)', // Orange-500 to Pink-500
            brandDeep: 'linear-gradient(to right, #EA580C, #DB2777)', // Orange-600 to Pink-600
        }
    },

    // Shadows (Landing page quality)
    shadows: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    },

    // Border Radius
    borderRadius: {
        none: '0',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px',
    },

    // Spacing Helper
    layout: {
        section: {
            paddingY: 'py-20 md:py-32',
            paddingX: 'px-6 md:px-12',
        }
    }
} as const;

// Legacy Aliases (For backward compatibility with existing components)
export const colors = theme.colors;
export const spacing = {
    section: {
        py: theme.layout.section.paddingY,
        px: theme.layout.section.paddingX,
    }
};
export const typography = {
    h1: 'text-4xl md:text-6xl font-extrabold tracking-tight',
    h2: 'text-3xl md:text-5xl font-bold tracking-tight',
    body: 'text-base md:text-lg leading-relaxed text-slate-600',
};
export const animations = {
    duration: {
        fast: 0.2,
        normal: 0.3,
        slow: 0.5,
    },
    easing: {
        smooth: [0.22, 1, 0.36, 1] as any,
    }
};
