'use client';

import React from 'react';

// The root layout already includes Header and Footer
// This layout is just a wrapper for landing page specific content

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
