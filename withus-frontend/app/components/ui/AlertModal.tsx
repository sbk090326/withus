'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useModal } from '@/app/context/ModalContext';
import { CheckCircle, XCircle, Info, ArrowRight } from 'lucide-react';

export function AlertModal() {
    const { isOpen, options, closeModal } = useModal();

    if (!options) return null;

    const { title, message, type = 'info', actionLabel, onAction } = options;

    const handleAction = () => {
        if (onAction) onAction();
        closeModal();
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={24} className="text-[#10B981]" />;
            case 'error':
                return <XCircle size={24} className="text-[#FF4B4B]" />;
            default:
                return <Info size={24} className="text-[#FF7E5F]" />;
        }
    };

    const getHeaderColor = () => {
        // Keeps the gradient consistent but maybe subtle variations if needed
        return 'bg-gradient-to-br from-[#FF7E5F] to-[#FEB47B]';
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeModal}
                        className="absolute inset-0 bg-black/60 backdrop-blur-md"
                    />

                    {/* Modal Content - Styled like OnboardingModal */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        className="w-full max-w-md bg-white rounded-[32px] overflow-hidden relative flex flex-col border border-slate-100 shadow-2xl"
                    >
                        {/* Chat Header / Bot Identity */}
                        <div className="flex-none px-6 pt-6 pb-4 flex items-center gap-3 border-b border-slate-50">
                            <div className={`w-10 h-10 rounded-full ${getHeaderColor()} flex items-center justify-center text-white shadow-sm`}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                </svg>
                            </div>
                            <div>
                                <div className="font-bold text-slate-800 text-sm">위드어스 알림</div>
                                <div className="text-xs text-slate-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                    확인 요청
                                </div>
                            </div>
                        </div>

                        {/* Main Body Area */}
                        <div className="flex-1 px-6 py-8 flex flex-col">
                            <div className="flex gap-4">
                                {/* Optional: Icon as part of the message or separate */}
                                <div className="flex-shrink-0 mt-1">
                                    {getIcon()}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">
                                        {title}
                                    </h3>
                                    <p className="text-slate-600 leading-relaxed text-[15px]">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* User Action Area (Footer) */}
                        <div className="flex-none p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleAction}
                                className="px-6 py-3 rounded-2xl font-bold text-white bg-[#FF7E5F] hover:bg-[#F9603D] shadow-lg shadow-orange-200 flex items-center gap-2 transition-all"
                            >
                                {actionLabel || '확인'}
                                <ArrowRight size={18} />
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
