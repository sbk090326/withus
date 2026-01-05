// ============================================
// WithUs Design System
// ============================================
// A unified design system based on the "Warm & Friendly" travel companion concept.
// This file acts as the single source of truth for all design tokens.

export const palette = {
    // Brand Colors (Warm & Energetic)
    coral: {
        50: '#FFF7F5',
        100: '#FFE5DF',
        200: '#FFC8BB',
        300: '#FFA08D',
        400: '#FF7E5F', // Primary Brand Color
        500: '#F9603D',
        600: '#D6401F',
    },
    // Secondary Colors (Clean & Trust)
    sky: {
        50: '#F0F9FF',
        100: '#E0F2FE',
        200: '#BAE6FD',
        300: '#7DD3FC',
        400: '#38BDF8', // Accent Color
        500: '#0EA5E9',
        600: '#0284C7',
    },
    // Neutrals (Slate-based for modern crisp look)
    slate: {
        50: '#F8FAFC',
        100: '#F1F5F9', // Light backgrounds
        200: '#E2E8F0', // Borders
        300: '#CBD5E1',
        400: '#94A3B8', // Subtitles/Icons
        500: '#64748B', // Body text
        600: '#475569', // Secondary text
        700: '#334155',
        800: '#1E293B',
        900: '#0F172A', // Headings
    },
    // Semantic Backgrounds
    cream: {
        base: '#FDFCFB',    // Main Page Background (Warm White)
        section: '#FFF9F7', // Highlight Section Background
    },
    // Functional
    danger: '#FF4B4B',
    success: '#10B981',
} as const;

export const theme = {
    colors: {
        primary: {
            DEFAULT: palette.coral[400],
            hover: palette.coral[500],
            light: palette.coral[100],
            bg: palette.coral[50],
        },
        secondary: {
            DEFAULT: palette.sky[400],
            light: palette.sky[200],
            bg: palette.sky[50],
        },
        text: {
            primary: palette.slate[900],   // Strong Heatdings
            secondary: palette.slate[600], // Detailed text
            tertiary: palette.slate[400],  // Labels/Meta
            white: '#FFFFFF',
        },
        background: {
            main: palette.cream.base,
            secondary: palette.cream.section,
            white: '#FFFFFF',
            modal: '#FFFFFF',
        },
        border: {
            default: palette.slate[200],
            hover: palette.coral[300], // Interactive border
            active: palette.coral[400],
        },
        status: {
            urgent: {
                text: palette.danger,
                bg: 'rgba(255, 75, 75, 0.1)',
            },
            success: palette.success,
        },
        gradients: {
            brand: 'linear-gradient(to right, #F97316, #EC4899)', // Orange to Pink
            warmHaze: 'linear-gradient(to bottom, #FFF7ED, #FFFFFF, #F0F9FF)', // Orange-50 via White to Sky-50
        }
    },

    // Typography System
    typography: {
        fontFamily: {
            sans: 'var(--font-pretendard), -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif',
        },
        fontSize: {
            xs: '12px',
            sm: '14px',
            base: '16px',
            lg: '18px',
            xl: '20px',
            '2xl': '24px',
            '3xl': '32px',
            '4xl': '40px',
            '5xl': '48px',
            huge: 'clamp(40px, 5.5vw, 72px)', // Hero Text
        },
        fontWeight: {
            regular: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
        },
        lineHeight: {
            tight: '1.2',
            normal: '1.5',
            relaxed: '1.75',
        }
    },

    // Layout & Spacing
    layout: {
        container: {
            base: 'max-w-[1400px]',
            wide: 'max-w-[1800px]',
            narrow: 'max-w-[800px]',
        },
        section: {
            paddingX: 'px-4 md:px-12',
            paddingY: 'py-16 md:py-24',
        },
        card: {
            padding: 'p-5 md:p-6',
        }
    },

    // Shapes
    borderRadius: {
        sm: 'rounded-lg',       // 8px
        md: 'rounded-xl',       // 12px
        lg: 'rounded-2xl',      // 16px (Cards default)
        xl: 'rounded-3xl',      // 24px (Large Containers)
        full: 'rounded-full',   // Buttons/Badges
    },

    // Effects
    shadows: {
        sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        glow: '0 0 15px rgba(255, 126, 95, 0.3)', // Brand Glow
        cardHover: '0 20px 40px -5px rgba(0, 0, 0, 0.1)',
    },

    // Animation Tokens
    animation: {
        duration: {
            fast: 0.2,
            normal: 0.3,
            medium: 0.5,
            slow: 0.8,
        },
        ease: {
            default: [0.25, 0.1, 0.25, 1], // ease
            smooth: [0.22, 1, 0.36, 1], // custom smooth
            bounce: [0.68, -0.55, 0.265, 1.55],
        }
    }
} as const;

// Helper to get class names for common patterns
export const styles = {
    // Utility classes combining multiple tokens
    glass: 'bg-white/70 backdrop-blur-md border border-white/20',
    glassDark: 'bg-black/50 backdrop-blur-md border border-white/10',

    // Interactive element styles
    button: {
        primary: 'bg-[#FF7E5F] hover:bg-[#F9603D] text-white shadow-lg hover:shadow-xl transition-all duration-300',
        secondary: 'bg-white text-slate-900 border border-slate-200 hover:border-[#FF7E5F] hover:bg-orange-50 transition-all duration-300',
        ghost: 'text-slate-600 hover:text-[#FF7E5F] hover:bg-orange-50/50 transition-colors',
    },

    // Card styles
    card: {
        base: 'bg-white rounded-2xl border border-slate-200 overflow-hidden hover:border-[#FF7E5F]/30 hover:shadow-cardHover transition-all duration-300',
    }
} as const;

// ============================================
// Backward Compatibility / Shortcuts
// ============================================
// These exports allow existing components to continue working while we migrate to `theme.*` usage.

export const colors = {
    background: {
        primary: palette.cream.base,
        secondary: theme.colors.background.white,
    },
    text: theme.colors.text,
    primary: {
        main: palette.coral[400],
        hover: palette.coral[500],
        light: palette.coral[100],
        ghost: palette.coral[50], // approximation
    },
    secondary: {
        main: palette.slate[200],
        hover: palette.slate[300],
        text: palette.slate[600],
    },
    accent: {
        sky: palette.sky[400],
        skyLight: palette.sky[200],
    },
    card: {
        background: theme.colors.background.white,
        border: theme.colors.border.default,
        borderHover: theme.colors.border.hover,
    },
    neutral: {
        white: '#FFFFFF',
        black: palette.slate[900],
    }
};

export const typography = theme.typography;

export const spacing = {
    section: {
        py: theme.layout.section.paddingY,
        px: theme.layout.section.paddingX,
    },
    container: {
        maxWidth: theme.layout.container.base,
        maxWidthWide: theme.layout.container.wide,
        maxWidthNarrow: theme.layout.container.narrow,
    }
};

export const borderRadius = theme.borderRadius;
export const shadows = theme.shadows;
export const animations = {
    duration: theme.animation.duration,
    easing: theme.animation.ease,
};

