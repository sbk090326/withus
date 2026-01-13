'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Smile, Paperclip, MoreHorizontal } from 'lucide-react';
import { palette } from '@/app/components/design-system/constants';

interface ChatDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    recipient: {
        name: string;
        image: string;
    };
}

export const ChatDrawer = ({ isOpen, onClose, recipient }: ChatDrawerProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: "안녕하세요! 게시글 보고 메시지 드려요. 😊", sender: "me", time: "10:02 AM" },
        { id: 2, text: "오! 반갑습니다 지니님! 파리 여행 같이 가고 싶어요!", sender: "me", time: "10:02 AM" },
        { id: 3, text: "안녕하세요! 네 환영합니다 ㅎㅎ 어떤 일정 선호하시나요?", sender: "them", time: "10:05 AM" },
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = {
            id: messages.length + 1,
            text: message,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setMessage('');

        // Simulate reply
        setTimeout(() => {
            const reply = {
                id: messages.length + 2,
                text: "좋아요! 구체적인 장소는 어디로 생각하시나요?",
                sender: "them",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, reply]);
        }, 1500);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[1000]"
                    />

                    {/* Chat Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white shadow-2xl z-[1001] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-2xl border-2 border-white shadow-sm font-bold">
                                    {recipient.image}
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900">{recipient.name}님과의 대화</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-green-500" />
                                        <span className="text-xs text-slate-400 font-medium">현재 활동 중</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-50 rounded-full text-slate-400 transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Message List */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 scrollbar-hide"
                        >
                            <div className="text-center">
                                <span className="inline-block px-3 py-1 rounded-full bg-slate-100 text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-8">
                                    Conversation Started
                                </span>
                            </div>

                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex flex-col max-w-[80%] ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                        <div
                                            className={`px-5 py-3 rounded-3xl text-sm font-medium shadow-sm ${msg.sender === 'me'
                                                ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-tr-none'
                                                : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                        <span className="text-[10px] text-slate-400 mt-1.5 font-medium px-1">
                                            {msg.time}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-100">
                            <form
                                onSubmit={handleSend}
                                className="flex items-end gap-3 bg-slate-50 p-2 rounded-[28px] border border-slate-200 focus-within:border-orange-500/50 focus-within:bg-white transition-all group"
                            >
                                <button type="button" className="p-3 text-slate-400 hover:text-orange-500 transition-colors">
                                    <Paperclip size={20} />
                                </button>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="메시지를 입력하세요..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-sm resize-none max-h-32 scrollbar-hide leading-relaxed"
                                    rows={1}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend(e);
                                        }
                                    }}
                                />
                                <div className="flex items-center gap-1 pr-1">
                                    <button type="button" className="p-3 text-slate-400 hover:text-orange-500 transition-colors">
                                        <Smile size={20} />
                                    </button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className={`p-3 rounded-full text-white shadow-lg transition-all ${message.trim() ? 'bg-orange-500 shadow-orange-500/20' : 'bg-slate-300'
                                            }`}
                                        disabled={!message.trim()}
                                    >
                                        <Send size={18} fill="currentColor" />
                                    </motion.button>
                                </div>
                            </form>
                            <p className="text-[10px] text-center text-slate-400 mt-4 font-medium">
                                안전한 동행을 위해 개인정보 공유 시 주의해 주세요.
                            </p>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
