import { Metadata } from 'next';
import { HeroParallax } from './components/HeroParallax';

export const metadata: Metadata = {
    title: 'Withus - Find Your Next Unforgettable Trip',
    description: 'Discover hidden gems, chill spots, and wild adventures with the best travel companion platform.',
};

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-[#F7F3F0]">
            <HeroParallax />
        </main>
    );
}
