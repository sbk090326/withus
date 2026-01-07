'use client';

import React from 'react';
import { motion } from 'motion/react';

export function WelcomeStep() {
    return (
        <motion.div
            key="step0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-4"
        >
            <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                <span className="text-2xl mr-2">👋</span>
                반가워요! <span className="text-[#FF7E5F] font-bold">위드어스</span>에 오신 것을 환영합니다.<br />
                멋진 여행 동행을 찾기 위해 몇 가지 정보가 필요해요.
            </div>
        </motion.div>
    );
}
