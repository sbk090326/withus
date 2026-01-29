'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Bell, BellOff, Check, Heart, MessageCircle, UserPlus, Info } from 'lucide-react';

interface NotificationSettingsProps {
    onBack: () => void;
}

export const NotificationSettings = ({ onBack }: NotificationSettingsProps) => {
    const [settings, setSettings] = useState({
        marketing: false,
        companionRequest: true,
        chat: true,
        communityReaction: true,
        tripUpdates: true
    });
    const [isSaving, setIsSaving] = useState(false);

    const toggleSetting = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            setIsSaving(false);
            alert('알림 설정이 저장되었습니다.');
            onBack();
        }, 1000);
    };

    const sections = [
        {
            id: 'companionRequest',
            title: '동행 신청 및 승인',
            desc: '누군가 내 글에 동행을 신청하거나 승인했을 때 알려드려요.',
            icon: <UserPlus size={18} />,
            color: 'orange'
        },
        {
            id: 'chat',
            title: '새 채팅 메시지',
            desc: '새로운 채팅 메시지가 도착하면 푸시 알림을 보냅니다.',
            icon: <MessageCircle size={18} />,
            color: 'teal'
        },
        {
            id: 'communityReaction',
            title: '나의 활동 반응',
            desc: '내 게시글의 댓글, 좋아요 등 커뮤니티 반응을 알려드려요.',
            icon: <Heart size={18} />,
            color: 'pink'
        },
        {
            id: 'tripUpdates',
            title: '여행 일정 업데이트',
            desc: '예정된 여행의 체크리스트나 일정 변경 건을 안내합니다.',
            icon: <Bell size={18} />,
            color: 'blue'
        }
    ];

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-10"
        >
            <div className="flex items-center gap-4">
                <button
                    onClick={onBack}
                    className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-400 hover:text-slate-900 transition-all shadow-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <div className="space-y-1">
                    <h3 className="text-2xl font-black text-slate-900 tracking-tighter">알림 및 푸시 설정</h3>
                    <p className="text-xs text-slate-400 font-bold">중요한 소식을 놓치지 않도록 알림을 관리하세요.</p>
                </div>
            </div>

            <div className="max-w-2xl space-y-8">
                <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
                                <Bell size={24} />
                            </div>
                            <div>
                                <p className="text-base font-black text-slate-900">전체 알림 활성화</p>
                                <p className="text-xs text-slate-400 font-bold">서비스 내 모든 주요 알림을 수신합니다.</p>
                            </div>
                        </div>
                        <button
                            onClick={() => {
                                const allOn = !Object.values(settings).every(v => v);
                                setSettings({
                                    marketing: allOn,
                                    companionRequest: allOn,
                                    chat: allOn,
                                    communityReaction: allOn,
                                    tripUpdates: allOn
                                });
                            }}
                            className={`w-14 h-8 rounded-full transition-all relative ${Object.values(settings).some(v => v) ? 'bg-orange-500' : 'bg-slate-200'
                                }`}
                        >
                            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-all ${Object.values(settings).some(v => v) ? 'left-7' : 'left-1'
                                }`} />
                        </button>
                    </div>

                    <div className="p-8 space-y-6">
                        {sections.map((section) => (
                            <div key={section.id} className="flex items-center justify-between group">
                                <div className="flex items-center gap-4">
                                    <div className={`w-10 h-10 rounded-xl bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-slate-100 transition-colors`}>
                                        {section.icon}
                                    </div>
                                    <div>
                                        <p className="text-sm font-black text-slate-900">{section.title}</p>
                                        <p className="text-[11px] text-slate-400 font-bold leading-relaxed">{section.desc}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => toggleSetting(section.id as keyof typeof settings)}
                                    className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${settings[section.id as keyof typeof settings] ? 'bg-slate-900' : 'bg-slate-100'
                                        }`}
                                >
                                    <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings[section.id as keyof typeof settings] ? 'left-[1.6rem]' : 'left-0.5'
                                        }`} />
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="p-8 bg-slate-50/50 border-t border-slate-50">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-400 flex items-center justify-center">
                                    <Info size={18} />
                                </div>
                                <div>
                                    <p className="text-sm font-black text-slate-900">마케팅 정보 수신</p>
                                    <p className="text-[11px] text-slate-400 font-bold leading-relaxed">이벤트, 쿠폰 등 다양한 여행 혜택 소식을 알려드려요.</p>
                                </div>
                            </div>
                            <button
                                onClick={() => toggleSetting('marketing')}
                                className={`w-12 h-6 rounded-full transition-all relative shrink-0 ${settings.marketing ? 'bg-orange-500' : 'bg-slate-200'
                                    }`}
                            >
                                <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${settings.marketing ? 'left-[1.6rem]' : 'left-0.5'
                                    }`} />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-4">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="px-10 py-5 rounded-2xl bg-slate-900 text-white text-sm font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-xl active:scale-95 flex items-center gap-3 disabled:opacity-50"
                    >
                        {isSaving ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                처리 중...
                            </>
                        ) : (
                            <>
                                <Check size={20} />
                                설정 완료하기
                            </>
                        )}
                    </button>
                </div>
            </div>
        </motion.div>
    );
};
