import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Withus - Find Your Perfect Travel Companion',
    description: 'Connect with compatible travel companions for unforgettable shared experiences around the world.',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ko">
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
