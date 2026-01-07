'use client';

import React from 'react';
import { motion } from 'motion/react';

type BudgetStyle = 'economy' | 'moderate' | 'luxury' | null;
type FoodStyle = 'local' | 'korean' | null;

interface TravelStyleStep2Props {
    budgetStyle: BudgetStyle;
    setBudgetStyle: (style: BudgetStyle) => void;
    foodStyle: FoodStyle;
    setFoodStyle: (style: FoodStyle) => void;
}

export function TravelStyleStep2({ budgetStyle, setBudgetStyle, foodStyle, setFoodStyle }: TravelStyleStep2Props) {
    return (
        <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="flex flex-col gap-8 w-full"
        >
            {/* Question 3: Budget */}
            <div className="flex flex-col gap-4">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                    <span className="text-[#FF7E5F] font-bold">03.</span> 여행 예산은 어느 정도 생각하시나요?
                </div>
                <div className="flex flex-col gap-2 self-end items-end">
                    {[
                        { id: 'economy', label: '[알뜰]', sub: '가성비 최고' },
                        { id: 'moderate', label: '[적당]', sub: '쓸 땐 써야죠' },
                        { id: 'luxury', label: '[플렉스]', sub: '돈 아끼지 말아요' },
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setBudgetStyle(budgetStyle === item.id ? null : item.id as BudgetStyle)}
                            className={`p-4 rounded-2xl text-sm font-medium transition-all text-right border-2 flex items-center justify-end gap-2 ${budgetStyle === item.id
                                ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                                : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                                }`}
                        >
                            <span className="font-bold">{item.label}</span>
                            <span>{item.sub}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Question 4: Food */}
            <div className="flex flex-col gap-4">
                <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none text-slate-800 text-lg leading-relaxed self-start max-w-[90%]">
                    <span className="text-[#FF7E5F] font-bold">04.</span> 식사는 어떻게 할까요?
                </div>
                <div className="flex flex-col gap-2 self-end items-end">
                    <button
                        onClick={() => setFoodStyle(foodStyle === 'local' ? null : 'local')}
                        className={`p-4 rounded-2xl text-sm font-medium transition-all text-right border-2 ${foodStyle === 'local'
                            ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className="font-bold mr-1">[현지식 정복]</span> 로컬 맛집 위주
                    </button>
                    <button
                        onClick={() => setFoodStyle(foodStyle === 'korean' ? null : 'korean')}
                        className={`p-4 rounded-2xl text-sm font-medium transition-all text-right border-2 ${foodStyle === 'korean'
                            ? 'bg-[#FF7E5F] border-[#FF7E5F] text-white'
                            : 'bg-white border-slate-100 text-slate-600 hover:bg-slate-50'
                            }`}
                    >
                        <span className="font-bold mr-1">[한식 사랑]</span> 한 끼는 무조건 한식
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
