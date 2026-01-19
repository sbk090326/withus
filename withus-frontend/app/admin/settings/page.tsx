'use client';

import React, { useState } from 'react';
import {
    Settings,
    Save,
    RefreshCw,
    ExternalLink,
    ChevronRight,
    ShieldCheck,
    Lock,
    Database,
    CheckCircle2
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';

const SettingSection = ({ title, description, children }: any) => (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-80 p-10 bg-slate-50 border-r border-slate-100">
            <h3 className="text-xl font-black text-slate-900 tracking-tight mb-2">{title}</h3>
            <p className="text-sm font-bold text-slate-400 leading-relaxed">{description}</p>
        </div>
        <div className="flex-1 p-10 space-y-8">
            {children}
        </div>
    </div>
);

const SettingItem = ({ label, description, control }: any) => (
    <div className="flex items-center justify-between gap-8">
        <div className="space-y-1">
            <p className="text-sm font-black text-slate-900">{label}</p>
            <p className="text-xs font-bold text-slate-400">{description}</p>
        </div>
        <div>
            {control}
        </div>
    </div>
);

const Toggle = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
        onClick={onChange}
        className={`w-12 h-7 rounded-full relative p-1 cursor-pointer transition-all ${enabled ? 'bg-slate-900' : 'bg-slate-100'
            }`}
    >
        <div
            className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform ${enabled ? 'translate-x-5' : 'translate-x-0'
                }`}
        />
    </button>
);

export default function PlatformSettingsPage() {
    const [siteName, setSiteName] = useState('WithUs');
    const [contactEmail, setContactEmail] = useState('support@withus.com');
    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [verificationRequired, setVerificationRequired] = useState(true);
    const [welcomeEmail, setWelcomeEmail] = useState(true);
    const [pushNotifications, setPushNotifications] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const handleSave = () => {
        setIsSaving(true);

        // Simulate API call
        setTimeout(() => {
            alert('설정이 성공적으로 저장되었습니다!');
            setIsSaving(false);
        }, 1500);
    };

    const clearCache = () => {
        if (confirm('정적 페이지 캐시를 초기화하시겠습니까?')) {
            alert('캐시가 성공적으로 초기화되었습니다!');
        }
    };

    const deleteUnusedImages = () => {
        if (confirm('미사용 이미지를 일괄 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.')) {
            alert('미사용 이미지 245개가 삭제되었습니다.');
        }
    };

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={Settings}
                    category="System Control"
                    title="플랫폼 설정"
                    action={
                        <button
                            onClick={handleSave}
                            disabled={isSaving}
                            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-slate-900 text-white font-black text-sm shadow-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSaving ? (
                                <>
                                    <RefreshCw size={18} className="animate-spin" />
                                    저장 중...
                                </>
                            ) : (
                                <>
                                    <Save size={18} />
                                    설정 저장하기
                                </>
                            )}
                        </button>
                    }
                />

                <div className="space-y-10">
                    {/* General Settings */}
                    <SettingSection
                        title="기본 설정"
                        description="사이트의 기본적인 노출 정보와 운영 상태를 관리합니다."
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Site Name</label>
                                <input
                                    type="text"
                                    value={siteName}
                                    onChange={(e) => setSiteName(e.target.value)}
                                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Email</label>
                                <input
                                    type="email"
                                    value={contactEmail}
                                    onChange={(e) => setContactEmail(e.target.value)}
                                    className="w-full px-5 py-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                                />
                            </div>
                        </div>
                        <SettingItem
                            label="점검 모드 (Maintenance)"
                            description="활성화 시 유저는 사이트에 접속할 수 없으며 공지 페이지가 노출됩니다."
                            control={<Toggle enabled={maintenanceMode} onChange={() => setMaintenanceMode(!maintenanceMode)} />}
                        />
                        {maintenanceMode && (
                            <div className="p-4 rounded-2xl bg-red-50 border border-red-100">
                                <p className="text-xs font-bold text-red-600 flex items-center gap-2">
                                    <ShieldCheck size={14} />
                                    ⚠️ 점검 모드가 활성화되어 있습니다. 일반 사용자는 사이트에 접속할 수 없습니다.
                                </p>
                            </div>
                        )}
                    </SettingSection>

                    {/* Policy & Security */}
                    <SettingSection
                        title="정책 및 보안"
                        description="이용 약관, 개인정보 처리방침의 버전과 본인 인증 규칙을 설정합니다."
                    >
                        <SettingItem
                            label="본인 인증 필수화"
                            description="동행 모집 게시글 작성 시 본인 인증된 유저만 허용합니다."
                            control={<Toggle enabled={verificationRequired} onChange={() => setVerificationRequired(!verificationRequired)} />}
                        />
                        <div className="h-px bg-slate-50" />
                        <div className="space-y-4">
                            <p className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                                <ShieldCheck size={14} className="text-orange-500" />
                                현재 적용 중인 정책
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <button className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all group">
                                    <span className="text-sm font-bold text-slate-600">이용약관 (v2.4.1)</span>
                                    <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-900" />
                                </button>
                                <button className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:border-slate-300 transition-all group">
                                    <span className="text-sm font-bold text-slate-600">개인정보 처리방침 (v1.8.0)</span>
                                    <ExternalLink size={14} className="text-slate-400 group-hover:text-slate-900" />
                                </button>
                            </div>
                        </div>
                    </SettingSection>

                    {/* Notification Settings */}
                    <SettingSection
                        title="알림 및 자동화"
                        description="PUSH 알림, 이메일 마케팅, 카카오톡 알림톡 발송 규칙을 정의합니다."
                    >
                        <div className="space-y-6">
                            <SettingItem
                                label="신규 가입 환영 메일 발송"
                                description="가입 즉시 서비스 안내 및 쿠폰 정보가 담긴 이메일을 발송합니다."
                                control={<Toggle enabled={welcomeEmail} onChange={() => setWelcomeEmail(!welcomeEmail)} />}
                            />
                            <SettingItem
                                label="동행 신청 시 PUSH 알림"
                                description="내가 올린 모집글에 새로운 신청이 올 경우 실시간 알림을 보냅니다."
                                control={<Toggle enabled={pushNotifications} onChange={() => setPushNotifications(!pushNotifications)} />}
                            />
                        </div>
                        <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100">
                            <div className="flex items-start gap-3">
                                <CheckCircle2 size={16} className="text-blue-500 mt-0.5" />
                                <div>
                                    <p className="text-xs font-black text-blue-900 mb-1">알림 발송 현황</p>
                                    <p className="text-xs font-bold text-blue-600">
                                        오늘 {welcomeEmail ? '24' : '0'}건의 환영 메일, {pushNotifications ? '156' : '0'}건의 PUSH 알림이 발송되었습니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </SettingSection>

                    {/* System Maintenance */}
                    <SettingSection
                        title="데이터 및 캐시"
                        description="서버 리소스를 최적화하고 임시 데이터를 관리합니다."
                    >
                        <div className="flex gap-4">
                            <button
                                onClick={clearCache}
                                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-all"
                            >
                                <RefreshCw size={18} />
                                정적 페이지 캐시 초기화
                            </button>
                            <button
                                onClick={deleteUnusedImages}
                                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-slate-50 border border-slate-100 text-slate-600 font-bold text-sm hover:bg-red-50 hover:text-red-500 hover:border-red-100 transition-all"
                            >
                                <Database size={18} />
                                미사용 이미지 일괄 삭제
                            </button>
                        </div>
                        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                            <p className="text-xs font-bold text-slate-500 leading-relaxed">
                                💡 <strong>Tip:</strong> 캐시 초기화는 사이트 성능에 일시적인 영향을 줄 수 있습니다. 트래픽이 적은 시간대에 수행하는 것을 권장합니다.
                            </p>
                        </div>
                    </SettingSection>
                </div>

                <div className="mt-12 p-10 rounded-[2.5rem] bg-indigo-900 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
                    <div className="space-y-2">
                        <h4 className="text-2xl font-black tracking-tight flex items-center gap-3">
                            <Lock size={24} className="text-indigo-400" />
                            Admin Access Control
                        </h4>
                        <p className="text-indigo-300 text-sm font-bold">현재 4명의 운영자가 관리 권한을 가지고 있습니다. 보안을 위해 2단계 인증을 권장합니다.</p>
                    </div>
                    <button className="px-8 py-4 rounded-2xl bg-white text-indigo-900 font-black text-sm flex items-center gap-2 hover:bg-indigo-50 transition-all whitespace-nowrap">
                        운영 권한 설정 변경
                        <ChevronRight size={18} />
                    </button>
                </div>

                {/* Settings Summary */}
                <div className="mt-8 p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-sm">
                    <h3 className="text-lg font-black text-slate-900 mb-6">현재 설정 요약</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                            <span className="text-sm font-bold text-slate-600">사이트 이름</span>
                            <span className="text-sm font-black text-slate-900">{siteName}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                            <span className="text-sm font-bold text-slate-600">연락처 이메일</span>
                            <span className="text-sm font-black text-slate-900">{contactEmail}</span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                            <span className="text-sm font-bold text-slate-600">점검 모드</span>
                            <span className={`text-sm font-black ${maintenanceMode ? 'text-red-600' : 'text-emerald-600'}`}>
                                {maintenanceMode ? 'ON' : 'OFF'}
                            </span>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-xl bg-slate-50">
                            <span className="text-sm font-bold text-slate-600">본인 인증 필수</span>
                            <span className={`text-sm font-black ${verificationRequired ? 'text-emerald-600' : 'text-slate-400'}`}>
                                {verificationRequired ? 'ON' : 'OFF'}
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
