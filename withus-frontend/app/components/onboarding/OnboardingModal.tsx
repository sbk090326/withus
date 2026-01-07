'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '@/app/context/AuthContext';
import { ArrowRight } from 'lucide-react';

import { WelcomeStep } from './steps/WelcomeStep';
import { NicknameStep } from './steps/NicknameStep';
import { PreferencesStep } from './steps/PreferencesStep';
import { TravelStyleStep } from './steps/TravelStyleStep';
import { TravelStyleStep2 } from './steps/TravelStyleStep2';
import { LifestyleStep } from './steps/LifestyleStep';
import { CompletionStep } from './steps/CompletionStep';

export function OnboardingModal() {
    const { showOnboarding, setShowOnboarding, user, login } = useAuth();
    const [step, setStep] = useState(0); // 0: Welcome, 1: Nickname, 2: Prefs, 3: Style1, 4: Style2, 5: Lifestyle, 6: Completion
    const [nickname, setNickname] = useState('');
    const [preferences, setPreferences] = useState<string[]>([]);
    const [planStyle, setPlanStyle] = useState<'planned' | 'impromptu' | null>(null);
    const [paceStyle, setPaceStyle] = useState<'fast' | 'balanced' | 'relaxed' | null>(null);
    const [budgetStyle, setBudgetStyle] = useState<'economy' | 'moderate' | 'luxury' | null>(null);
    const [foodStyle, setFoodStyle] = useState<'local' | 'korean' | null>(null);
    const [lifestyleStyle, setLifestyleStyle] = useState<'morning' | 'night' | null>(null);

    if (!showOnboarding) return null;

    const togglePreference = (pref: string) => {
        setPreferences(prev => {
            if (prev.includes(pref)) {
                return prev.filter(p => p !== pref);
            }
            if (prev.length < 3) {
                return [...prev, pref];
            }
            return prev;
        });
    };

    const handleNext = () => {
        if (step === 0) {
            setStep(1);
        } else if (step === 1 && nickname.trim()) {
            setStep(2);
        } else if (step === 2) {
            setStep(3);
        } else if (step === 3) {
            setStep(4);
        } else if (step === 4) {
            setStep(5);
        } else if (step === 5) {
            // Save data before showing completion screen
            if (user) {
                // In a real app, all preferences would be saved
                login({ ...user, nickname: nickname });
            }
            setStep(6);
        }
    };

    const handleClose = () => {
        setShowOnboarding(false);
    };

    const progressPercentage = step === 0 ? 0 : step === 1 ? 20 : step === 2 ? 40 : step === 3 ? 60 : step === 4 ? 80 : 100;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="w-full max-w-2xl bg-white rounded-[40px] overflow-hidden relative h-[700px] flex flex-col border border-slate-100"
                >
                    {/* Progress Line */}
                    {step > 0 && step < 6 && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-slate-100">
                            <motion.div
                                className="h-full bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progressPercentage}%` }}
                                transition={{ duration: 0.5, ease: "easeInOut" }}
                            />
                        </div>
                    )}

                    {/* Chat Header / Bot Identity */}
                    <div className="flex-none px-8 pt-8 pb-4 flex items-center gap-3 border-b border-slate-50">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF7E5F] to-[#FEB47B] flex items-center justify-center text-white">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            </svg>
                        </div>
                        <div>
                            <div className="font-bold text-slate-800 text-sm">위드어스 가이드</div>
                            <div className="text-xs text-slate-400 flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                대화중
                            </div>
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className="flex-1 overflow-y-auto px-8 py-6 flex flex-col">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                className="w-full"
                            >
                                {/* Bot Message Bubble Style Wrapper */}
                                <div className="flex flex-col gap-6">
                                    {/* The Step Content */}
                                    {step === 0 && <WelcomeStep />}
                                    {step === 1 && <NicknameStep nickname={nickname} setNickname={setNickname} />}
                                    {step === 2 && <PreferencesStep preferences={preferences} togglePreference={togglePreference} />}
                                    {step === 3 && <TravelStyleStep planStyle={planStyle} setPlanStyle={setPlanStyle} paceStyle={paceStyle} setPaceStyle={setPaceStyle} />}
                                    {step === 4 && <TravelStyleStep2 budgetStyle={budgetStyle} setBudgetStyle={setBudgetStyle} foodStyle={foodStyle} setFoodStyle={setFoodStyle} />}
                                    {step === 5 && <LifestyleStep lifestyleStyle={lifestyleStyle} setLifestyleStyle={setLifestyleStyle} />}
                                    {step === 6 && <CompletionStep nickname={nickname} onComplete={handleClose} />}
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* User Action Area (Footer) */}
                    {step < 6 && (
                        <div className="flex-none p-8 bg-white border-t border-slate-50 flex items-center gap-3">
                            {step > 0 && (
                                <button
                                    onClick={() => setStep(s => Math.max(0, s - 1))}
                                    className="px-6 py-4 rounded-2xl font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors"
                                >
                                    이전
                                </button>
                            )}

                            <div className="ml-auto flex items-center gap-3">
                                {(step >= 2 && step <= 5) && (
                                    <button
                                        onClick={handleNext}
                                        className="px-6 py-4 rounded-2xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-colors"
                                    >
                                        건너뛰기
                                    </button>
                                )}

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleNext}
                                    disabled={
                                        (step === 1 && !nickname.trim()) ||
                                        (step === 2 && preferences.length === 0) ||
                                        (step === 3 && (!planStyle || !paceStyle)) ||
                                        (step === 4 && (!budgetStyle || !foodStyle)) ||
                                        (step === 5 && !lifestyleStyle)
                                    }
                                    className={`px-8 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 transition-all duration-300 ${((step === 1 && !nickname.trim()) ||
                                        (step === 2 && preferences.length === 0) ||
                                        (step === 3 && (!planStyle || !paceStyle)) ||
                                        (step === 4 && (!budgetStyle || !foodStyle)) ||
                                        (step === 5 && !lifestyleStyle))
                                        ? 'bg-slate-100 text-slate-300 cursor-not-allowed'
                                        : (step === 5 ? 'bg-gradient-to-r from-[#FF7E5F] to-[#FEB47B] text-white' : 'bg-[#FF7E5F] text-white')
                                        }`}
                                >
                                    {step === 5 ? '완료하고 시작하기' : (step === 0 ? '시작하기' : '다음')}
                                    <ArrowRight size={20} />
                                </motion.button>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
