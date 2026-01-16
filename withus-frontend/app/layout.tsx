import type { Metadata } from 'next';
import './globals.css';
import { Header, Footer } from '@/app/components/layout';


export const metadata: Metadata = {
    title: 'Withus - Find Your Perfect Travel Companion',
    description: 'Connect with compatible travel companions for unforgettable shared experiences around the world.',
};

import { AuthProvider } from '@/app/context/AuthContext';
import { OnboardingModal } from '@/app/components/onboarding/OnboardingModal';
import { ModalProvider } from '@/app/context/ModalContext';
import { AlertModal } from '@/app/components/ui/AlertModal';
import { PageTransition } from '@/app/components/layout/PageTransition';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="antialiased bg-[#FDFCFB]">
                <AuthProvider>
                    <ModalProvider>
                        <Header />
                        <OnboardingModal />
                        <AlertModal />
                        <PageTransition>
                            {children}
                        </PageTransition>
                        <Footer />
                    </ModalProvider>
                </AuthProvider>
            </body>
        </html>
    );
}
