import { Metadata } from 'next';

import { HeroParallax } from './components/HeroParallax';
import { CurationSection } from './components/CurationSection';
import { DiscoverSection } from './components/DiscoverSection';
import { ReviewMomentSection } from './components/ReviewMomentSection';
import { ServiceIdentitySection } from './components/ServiceIdentitySection';
import { TrendingSection } from './components/TrendingSection';
import { RegionQuickExploreSection } from './components/RegionQuickExploreSection';
import { CallToActionSection } from './components/CallToActionSection';


export const metadata: Metadata = {
    title: 'Withus - Travel with Friends, Make Memories Together',
    description: 'Find your perfect travel buddy and explore the world together. Safe, verified, and fun! Join 10,000+ travelers worldwide.',
};

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-[#FDFCFB]">

            <HeroParallax />
            <ServiceIdentitySection />
            <TrendingSection />
            <RegionQuickExploreSection />
            <CurationSection />
            <ReviewMomentSection />
            <DiscoverSection />
            <CallToActionSection />

        </main>
    );
}
