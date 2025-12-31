import { Metadata } from 'next';
import { LandingHeader } from './components/LandingHeader';
import { HeroParallax } from './components/HeroParallax';
import { CurationSection } from './components/CurationSection';
import { DiscoverSection } from './components/DiscoverSection';
import { ReviewMomentSection } from './components/ReviewMomentSection';
import { ServiceIdentitySection } from './components/ServiceIdentitySection';
import { TrendingSection } from './components/TrendingSection';
import { RegionQuickExploreSection } from './components/RegionQuickExploreSection';
import { CallToActionSection } from './components/CallToActionSection';
import { Footer } from '@/app/components/layout/Footer';

export const metadata: Metadata = {
    title: 'Withus - Find Your Next Unforgettable Trip',
    description: 'Discover hidden gems, chill spots, and wild adventures with the best travel companion platform.',
};

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-[#F7F3F0]">
            <LandingHeader />
            <HeroParallax />
            <CurationSection />
            <DiscoverSection />
            <ReviewMomentSection />
            <ServiceIdentitySection />
            <TrendingSection />
            <RegionQuickExploreSection />
            <CallToActionSection />
            <Footer />
        </main>
    );
}
