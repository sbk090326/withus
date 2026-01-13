'use client';

import React from 'react';
import { motion } from 'motion/react';
import { palette } from '@/app/components/design-system/constants';

export const StorySection = () => {
    return (
        <section className="w-full py-32 px-6 bg-white">
            <div className="max-w-4xl mx-auto text-center space-y-12">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <h2
                        className="text-3xl md:text-4xl font-bold mb-6"
                        style={{ color: palette.slate[900] }}
                    >
                        우리가 꿈꾸는 여행
                    </h2>
                    <p
                        className="text-lg leading-loose"
                        style={{ color: palette.slate[500] }}
                    >
                        여행은 어디를 가느냐보다 <span className="font-bold" style={{ color: palette.coral[400] }}>누구와 가느냐</span>가 더 중요하다고 믿습니다.<br />
                        나와 꼭 맞는 취향을 가진 여행 메이트를 만나,<br />
                        평생 잊지 못할 추억을 만들어보세요.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                    {/* Placeholder for images with nicer placeholders using Palette */}
                    <div
                        className="h-48 rounded-2xl flex items-center justify-center font-bold text-2xl"
                        style={{ backgroundColor: palette.coral[100], color: palette.coral[400] }}
                    >
                        Trip 1
                    </div>
                    <div
                        className="h-48 rounded-2xl flex items-center justify-center font-bold text-2xl mt-8"
                        style={{ backgroundColor: palette.teal[50], color: palette.teal[400] }}
                    >
                        Trip 2
                    </div>
                    <div
                        className="h-48 rounded-2xl flex items-center justify-center font-bold text-2xl"
                        style={{ backgroundColor: palette.slate[100], color: palette.slate[400] }}
                    >
                        Trip 3
                    </div>
                    <div
                        className="h-48 rounded-2xl flex items-center justify-center font-bold text-2xl mt-8"
                        style={{ backgroundColor: palette.coral[50], color: palette.coral[300] }}
                    >
                        Trip 4
                    </div>
                </div>
            </div>
        </section>
    );
};
