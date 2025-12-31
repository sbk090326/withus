'use client';

import { HeroWithImages } from './components/hero-with-images';
import { ServiceCoreValues } from './components/service-core-values';
import { HotDestinations } from './components/hot-destinations';
import { RecommendedCompanions } from './components/recommended-companions';
import { CommunityReviews } from './components/community-reviews';

export default function LandingPage() {
    return (
        <div className="min-h-screen">
            <HeroWithImages />
            <ServiceCoreValues />
            <HotDestinations />
            <RecommendedCompanions />
            <CommunityReviews />
        </div>
    );
}
