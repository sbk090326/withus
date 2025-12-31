'use client';

import { Header, Footer } from '../components/layout';
import { CTASection } from './components/cta-section';

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            {children}
            <CTASection />
            <Footer />
        </>
    );
}
