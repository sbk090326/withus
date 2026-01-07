'use client';

import React from 'react';
import { motion } from 'motion/react';

interface PreferencesStepProps {
    preferences: string[];
    togglePreference: (pref: string) => void;
}

export const TRAVEL_PREFERENCES = [
    "📸 인생샷", "😋 맛집", "🏰 역사/문화", "🌿 힐링", "🏄 액티비티"
];

export function PreferencesStep({ preferences, togglePreference }: PreferencesStepProps) {
    return (
        <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-6"
        >
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                어떤 <span className="text-[#FF7E5F] font-bold">여행</span>을 선호하시나요?<br />
                <span className="text-sm text-slate-500 mt-2 block">최대 3개까지 선택할 수 있어요.</span>
            </div>

            <div className="flex flex-wrap gap-2 justify-end self-end max-w-[90%]">
                {TRAVEL_PREFERENCES.map((pref) => (
                    <button
                        key={pref}
                        onClick={() => togglePreference(pref)}
                        className={`px-5 py-3 rounded-2xl text-sm font-bold transition-all duration-200 border-2 ${preferences.includes(pref)
                            ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                            : 'bg-white border-slate-100 text-slate-600 hover:border-slate-200'
                            }`}
                    >
                        {pref}
                    </button>
                ))}
            </div>
        </motion.div>
    );
}
