'use client';

import React from 'react';
import { palette } from '@/app/components/design-system/constants';
import { HeroSection } from './components/HeroSection';
import { StatsSection } from './components/StatsSection';
import { ValuesSection } from './components/ValuesSection';
import { ProcessSection } from './components/ProcessSection';
import { StorySection } from './components/StorySection';
import { CTASection } from './components/CTASection';

export default function AboutPage() {
    return (
        <div
            className="min-h-screen pt-24 pb-0"
            style={{ backgroundColor: palette.cream.base }}
        >
            <HeroSection />
            <StatsSection />
            <ValuesSection />
            <ProcessSection />
            <StorySection />
            <CTASection />
        </div>
    );
}
