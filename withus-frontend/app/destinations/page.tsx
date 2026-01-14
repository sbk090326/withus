'use client';

import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { DestinationsHero } from './components/DestinationsHero';
import { SearchResults } from './components/SearchResults';
import { TrendingDestinations } from './components/TrendingDestinations';
import { ThemedCuration } from './components/ThemedCuration';
import { BestRoutes } from './components/BestRoutes';
import { DestinationsCTA } from './components/DestinationsCTA';

export default function DestinationsPage() {
    const [searchQuery, setSearchQuery] = useState<string | null>(null);

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        // Scroll to results
        setTimeout(() => {
            const resultsSection = document.getElementById('search-results');
            resultsSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    const handleCloseSearch = () => {
        setSearchQuery(null);
    };

    return (
        <main className="min-h-screen bg-[#FDFCFB]">
            <DestinationsHero onSearch={handleSearch} />

            <AnimatePresence>
                {searchQuery && (
                    <div id="search-results">
                        <SearchResults query={searchQuery} onClose={handleCloseSearch} />
                    </div>
                )}
            </AnimatePresence>

            {!searchQuery && (
                <>
                    <TrendingDestinations />
                    <ThemedCuration />
                    <BestRoutes />
                    <DestinationsCTA />
                </>
            )}
        </main>
    );
}

