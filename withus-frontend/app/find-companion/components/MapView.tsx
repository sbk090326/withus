'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, X, Star, Users, MessageCircle } from 'lucide-react';
import Link from 'next/link';

interface MapViewProps {
    companions: any[];
}

export const MapView = ({ companions }: MapViewProps) => {
    const [selectedPin, setSelectedPin] = useState<any>(null);

    // Mock coordinates for pins over a generic map background
    const pins = companions.map((comp, idx) => ({
        ...comp,
        top: `${20 + (idx * 12) % 60}%`,
        left: `${15 + (idx * 15) % 70}%`,
    }));

    return (
        <div className="relative w-full h-[600px] bg-slate-100 rounded-[48px] overflow-hidden border border-slate-200 shadow-inner">
            {/* Mock Map Background - Using a stylized pattern or image */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center grayscale" />

            {/* Map Overlay Decor */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />

            {/* Pins Container */}
            <div className="absolute inset-0">
                {pins.map((pin) => (
                    <motion.button
                        key={pin.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        whileHover={{ scale: 1.2, zIndex: 50 }}
                        onClick={() => setSelectedPin(pin)}
                        className="absolute w-12 h-12 flex items-center justify-center group"
                        style={{ top: pin.top, left: pin.left }}
                    >
                        {/* Pulse Effect */}
                        <div className="absolute inset-0 bg-orange-500/20 rounded-full animate-ping" />

                        {/* Pin Body */}
                        <div className="relative w-10 h-10 rounded-full bg-white border-2 border-orange-500 shadow-xl flex items-center justify-center text-xl overflow-hidden group-hover:border-pink-500 transition-colors">
                            {pin.user.image}
                        </div>

                        {/* Arrow */}
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-3 bg-orange-500 rotate-45 group-hover:bg-pink-500 transition-colors" />
                    </motion.button>
                ))}
            </div>

            {/* Selected Info Card Over Map */}
            <AnimatePresence>
                {selectedPin && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-[400px] bg-white rounded-[32px] p-6 shadow-2xl border border-white z-[60] backdrop-blur-md"
                    >
                        <button
                            onClick={() => setSelectedPin(null)}
                            className="absolute top-4 right-4 p-2 hover:bg-slate-50 rounded-full text-slate-400"
                        >
                            <X size={18} />
                        </button>

                        <div className="flex gap-5">
                            <div className="w-20 h-20 rounded-2xl bg-slate-50 flex items-center justify-center text-5xl border border-slate-100">
                                {selectedPin.user.image}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-extrabold text-slate-900">{selectedPin.user.name}</h4>
                                    <span className="px-2 py-0.5 rounded-md bg-orange-50 text-orange-500 text-[10px] font-bold">
                                        {selectedPin.matchScore}% Match
                                    </span>
                                </div>
                                <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                                    <MapPin size={12} /> {selectedPin.location}
                                </p>
                                <h5 className="text-sm font-bold text-slate-900 line-clamp-1 mb-4">
                                    {selectedPin.title}
                                </h5>

                                <div className="flex gap-2">
                                    <Link
                                        href={`/find-companion/${selectedPin.id}`}
                                        className="flex-1 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold text-center hover:bg-slate-800 transition-colors"
                                    >
                                        상세보기
                                    </Link>
                                    <button className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-1">
                                        <MessageCircle size={14} />
                                        메시지
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Map Controls */}
            <div className="absolute top-8 right-8 flex flex-col gap-2">
                <button className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-orange-500 transition-colors">
                    <Users size={20} />
                </button>
                <button className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-orange-500 transition-colors font-bold">
                    +
                </button>
                <button className="w-12 h-12 bg-white rounded-2xl border border-slate-200 shadow-lg flex items-center justify-center text-slate-600 hover:text-orange-500 transition-colors font-bold">
                    -
                </button>
            </div>

            {/* Floating Hint */}
            <div className="absolute top-8 left-8">
                <div className="bg-white/80 backdrop-blur-md px-4 py-2 rounded-full border border-white shadow-lg flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-slate-700">현재 주변 동행 14명</span>
                </div>
            </div>
        </div>
    );
};
