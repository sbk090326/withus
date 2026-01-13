'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { CompanionHero } from './components/CompanionHero';
import { CompanionList } from './components/CompanionList';
import { LiveMatchingAlert } from './components/LiveMatchingAlert';
import { CreateCompanionModal } from './components/CreateCompanionModal';
import { palette } from '@/app/components/design-system/constants';

export default function FindCompanionPage() {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    return (
        <main className="min-h-screen pt-20" style={{ backgroundColor: palette.cream.base }}>
            <CompanionHero />
            <CompanionList />
            <LiveMatchingAlert />

            {/* Floating Action Button */}
            <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsCreateModalOpen(true)}
                className="fixed bottom-10 right-10 w-16 h-16 rounded-full flex items-center justify-center text-white shadow-2xl z-50 overflow-hidden group"
                style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}
            >
                <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
            </motion.button>

            <CreateCompanionModal
                isOpen={isCreateModalOpen}
                onClose={() => setIsCreateModalOpen(false)}
            />
        </main>
    );
}
