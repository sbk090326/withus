import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/app/components/layout';


export const metadata: Metadata = {
    title: 'Withus - Find Your Perfect Travel Companion',
    description: 'Connect with compatible travel companions for unforgettable shared experiences around the world.',
};

import { AuthProvider } from '@/app/context/AuthContext';
import { OnboardingModal } from '@/app/components/onboarding/OnboardingModal';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="antialiased bg-[#FDFCFB]">
                <AuthProvider>
                    <Header />
                    <OnboardingModal />
                    {children}
                    <Footer />
                </AuthProvider>
            </body>
        </html>
    );
}
