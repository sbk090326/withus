'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Smile, Paperclip, MoreHorizontal, Users } from 'lucide-react';

interface TeamChatDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    tripTitle: string;
}

const MOCK_MESSAGES = [
    { id: 1, text: "안녕하세요! 포르투갈 서핑 정복기 팀 채팅방입니다. 👋", sender: "system", time: "10:00 AM" },
    { id: 2, text: "다들 짐은 잘 싸고 계신가요?", sender: "me", time: "10:02 AM" },
    { id: 3, text: "저는 어제 구명조끼 샀어요! 🏄‍♀️", sender: "other1", senderName: "김지현", time: "10:05 AM", senderImage: "👩‍🦰" },
    { id: 4, text: "오 좋네요! 저는 서핑 슈트 빌릴 생각이에요.", sender: "other2", senderName: "이승우", time: "10:08 AM", senderImage: "👱‍♂️" },
];

export const TeamChatDrawer = ({ isOpen, onClose, tripTitle }: TeamChatDrawerProps) => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState(MOCK_MESSAGES);
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
            id: Date.now(),
            text: message,
            sender: "me",
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage as any]);
        setMessage('');

        // Simulate reply
        setTimeout(() => {
            const reply = {
                id: Date.now() + 1,
                text: "현지 맛집은 제가 좀 알아왔어요!",
                sender: "other1",
                senderName: "김지현",
                senderImage: "👩‍🦰",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, reply as any]);
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
                        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[2000]"
                    />

                    {/* Chat Drawer */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white shadow-2xl z-[2001] flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center text-white border-2 border-white shadow-sm">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <h3 className="font-extrabold text-slate-900 line-clamp-1">{tripTitle}</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2 h-2 rounded-full bg-teal-500" />
                                        <span className="text-xs text-slate-400 font-medium">3명 참여 중</span>
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
                                    Team Chat Created
                                </span>
                            </div>

                            {messages.map((msg) => {
                                if (msg.sender === 'system') {
                                    return (
                                        <div key={msg.id} className="flex justify-center">
                                            <span className="bg-slate-200/50 text-slate-500 text-[11px] px-4 py-1.5 rounded-full font-bold">
                                                {msg.text}
                                            </span>
                                        </div>
                                    );
                                }

                                return (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex gap-3 max-w-[85%] ${msg.sender === 'me' ? 'flex-row-reverse' : 'flex-row'}`}>
                                            {msg.sender !== 'me' && (
                                                <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-xl shrink-0 shadow-sm mt-1">
                                                    {msg.senderImage}
                                                </div>
                                            )}
                                            <div className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}>
                                                {msg.sender !== 'me' && (
                                                    <span className="text-[11px] font-black text-slate-400 mb-1 ml-1">{msg.senderName}</span>
                                                )}
                                                <div
                                                    className={`px-5 py-3 rounded-2xl text-sm font-bold shadow-sm ${msg.sender === 'me'
                                                        ? 'bg-slate-900 text-white rounded-tr-none'
                                                        : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                                                        }`}
                                                >
                                                    {msg.text}
                                                </div>
                                                <span className="text-[9px] text-slate-300 mt-1.5 font-black uppercase tracking-tighter px-1">
                                                    {msg.time}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Input Area */}
                        <div className="p-6 bg-white border-t border-slate-100">
                            <form
                                onSubmit={handleSend}
                                className="flex items-end gap-3 bg-slate-50 p-2 rounded-[24px] border border-slate-200 focus-within:border-slate-900/30 focus-within:bg-white transition-all group"
                            >
                                <button type="button" className="p-3 text-slate-400 hover:text-slate-900 transition-colors">
                                    <Paperclip size={18} />
                                </button>
                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    placeholder="팀원들과 대화해 보세요..."
                                    className="flex-1 bg-transparent border-none focus:ring-0 py-3 text-sm font-bold resize-none max-h-32 scrollbar-hide leading-relaxed"
                                    rows={1}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            handleSend(e);
                                        }
                                    }}
                                />
                                <div className="flex items-center gap-1 pr-1">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className={`p-3 rounded-xl text-white shadow-lg transition-all ${message.trim() ? 'bg-slate-900 shadow-slate-900/20' : 'bg-slate-300'
                                            }`}
                                        disabled={!message.trim()}
                                    >
                                        <Send size={18} fill="currentColor" />
                                    </motion.button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};
