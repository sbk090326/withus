'use client';

import React from 'react';

// We rely on the page to define its own layout structure (Header/Hero/Footer)
// or we can add a Footer here if needed later.
// For now, we want a clean slate for the Hero section demo.

export default function LandingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}
