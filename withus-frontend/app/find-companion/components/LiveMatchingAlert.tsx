'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X } from 'lucide-react';

const mockNotifications = [
    { id: 1, user: '지은', location: '파리', action: '매칭 성공!' },
    { id: 2, user: '준호', location: '교토', action: '동행 찾는 중..' },
    { id: 3, user: '민서', location: '치앙마이', action: '매칭 성공!' },
];

export const LiveMatchingAlert = () => {
    const [current, setCurrent] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Show after 3 seconds
        const timer = setTimeout(() => setIsVisible(true), 3000);

        // Cycle every 8 seconds
        const interval = setInterval(() => {
            setIsVisible(false);
            setTimeout(() => {
                setCurrent((prev) => (prev + 1) % mockNotifications.length);
                setIsVisible(true);
            }, 500);
        }, 8000);

        return () => {
            clearTimeout(timer);
            clearInterval(interval);
        };
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, x: -50, y: 0 }}
                    animate={{ opacity: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, x: -20, scale: 0.95 }}
                    className="fixed bottom-10 left-10 z-[100] hidden md:flex items-center gap-3 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-orange-100 min-w-[280px]"
                >
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-white shadow-sm">
                        <Sparkles size={18} fill="white" />
                    </div>
                    <div className="flex-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">
                                {mockNotifications[current].user}님
                            </span>
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-orange-50 text-orange-600 font-bold">
                                LIVE
                            </span>
                        </div>
                        <p className="text-xs text-slate-500">
                            [{mockNotifications[current].location}] {mockNotifications[current].action}
                        </p>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="text-slate-300 hover:text-slate-500 transition-colors"
                    >
                        <X size={16} />
                    </button>

                    {/* Progress Bar */}
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 7.5, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-400 to-pink-500 rounded-b-2xl opacity-50"
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
};
