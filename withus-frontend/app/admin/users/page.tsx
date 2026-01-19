'use client';

import React, { useState } from 'react';
import {
    Users,
    ShieldCheck,
    ShieldAlert,
    Thermometer,
    TrendingUp,
    MoreVertical,
    Edit2,
    Ban,
    Clock,
    MapPin,
    Mail,
    Filter,
    CheckCircle2,
    AlertTriangle,
    XCircle
} from 'lucide-react';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminPageHeader } from '../components/AdminPageHeader';
import { StatCard } from '../components/StatCard';
import { FilterTabs } from '../components/FilterTabs';
import { DataTable } from '../components/DataTable';

const mockUsers = [
    {
        id: 1,
        name: "김민수",
        username: "minsu_travel",
        email: "minsu@example.com",
        mannerTemp: 42.5,
        status: "Verified",
        registeredAt: "2025.10.12",
        trips: 15,
        location: "서울, 대한민국",
        avatar: "👦",
        verificationStatus: "Approved"
    },
    {
        id: 2,
        name: "Sarah Jenkins",
        username: "sarah_in_paris",
        email: "sarah@example.com",
        mannerTemp: 38.2,
        status: "Verified",
        registeredAt: "2025.11.05",
        trips: 8,
        location: "Paris, France",
        avatar: "👩‍🦳",
        verificationStatus: "Approved"
    },
    {
        id: 3,
        name: "이준호",
        username: "junho_it",
        email: "junho@example.com",
        mannerTemp: 36.5,
        status: "Pending",
        registeredAt: "2026.01.10",
        trips: 2,
        location: "Busan, Korea",
        avatar: "🧔",
        verificationStatus: "Pending"
    },
    {
        id: 4,
        name: "박지영",
        username: "jiyoung_world",
        email: "jiyoung@example.com",
        mannerTemp: 36.5,
        status: "Pending",
        registeredAt: "2026.01.15",
        trips: 0,
        location: "Seoul, Korea",
        avatar: "👩",
        verificationStatus: "Pending"
    },
    {
        id: 5,
        name: "최민호",
        username: "minho_choi",
        email: "minho@example.com",
        mannerTemp: 36.5,
        status: "Pending",
        registeredAt: "2026.01.16",
        trips: 0,
        location: "Incheon, Korea",
        avatar: "�",
        verificationStatus: "Pending"
    },
    {
        id: 6,
        name: "홍길동",
        username: "hong_gildong",
        email: "gildong@example.com",
        mannerTemp: 28.4,
        status: "Suspended",
        registeredAt: "2025.08.20",
        trips: 1,
        location: "Unknown",
        avatar: "👤",
        verificationStatus: "Rejected"
    }
];

const getMannerColor = (temp: number) => {
    if (temp >= 40) return { bg: 'bg-red-50', text: 'text-red-600', bar: 'bg-red-500', label: '매우 좋음' };
    if (temp >= 37) return { bg: 'bg-orange-50', text: 'text-orange-600', bar: 'bg-orange-500', label: '좋음' };
    if (temp >= 35) return { bg: 'bg-blue-50', text: 'text-blue-600', bar: 'bg-blue-500', label: '보통' };
    return { bg: 'bg-slate-100', text: 'text-slate-500', bar: 'bg-slate-400', label: '나쁨' };
};

export default function UserManagementPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('전체');
    const [showVerificationModal, setShowVerificationModal] = useState(false);

    const filteredUsers = mockUsers.filter((user) => {
        const matchesTab =
            activeTab === '전체' ||
            (activeTab === '인증됨' && user.status === 'Verified') ||
            (activeTab === '대기중' && user.status === 'Pending') ||
            (activeTab === '정지됨' && user.status === 'Suspended');

        const matchesSearch =
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());

        return matchesTab && matchesSearch;
    });

    const pendingVerifications = mockUsers.filter(u => u.verificationStatus === 'Pending').length;

    return (
        <div className="flex bg-[#FDFBF7] min-h-screen">
            <AdminSidebar />

            <main className="flex-1 p-12 overflow-y-auto">
                <AdminPageHeader
                    icon={Users}
                    category="User Governance"
                    title="유저 및 매너온도 관리"
                    action={
                        <button
                            onClick={() => setShowVerificationModal(true)}
                            className="flex items-center gap-2 px-8 py-3 rounded-2xl bg-orange-500 text-white font-black text-sm shadow-xl shadow-orange-500/20 hover:scale-105 active:scale-95 transition-all relative"
                        >
                            {pendingVerifications > 0 && (
                                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs font-black rounded-full flex items-center justify-center animate-pulse">
                                    {pendingVerifications}
                                </span>
                            )}
                            본인 인증 전체 검토
                        </button>
                    }
                />

                <section className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <StatCard title="Total Members" value="4,520" change="+12%" isPositive={true} icon={Users} color="#3b82f6" />
                    <StatCard title="Verified Users" value="3,892" subtitle="86%" icon={ShieldCheck} color="#10b981" />
                    <StatCard title="Avg Manner Temp" value="37.2°C" change="+0.3°C" isPositive={true} icon={Thermometer} color="#f97316" />
                    <StatCard title="Pending Verification" value={pendingVerifications.toString()} subtitle="Needs Review" icon={Clock} color="#6366f1" />
                </section>

                <FilterTabs
                    tabs={['전체', '인증됨', '대기중', '정지됨']}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    searchPlaceholder="회원 이름, 아이디, 이메일 검색..."
                    searchValue={searchTerm}
                    onSearchChange={setSearchTerm}
                    extraActions={
                        <button className="p-3 rounded-2xl bg-white border border-slate-100 text-slate-500 hover:text-slate-900 transition-all">
                            <Filter size={18} />
                        </button>
                    }
                />

                <DataTable headers={['회원 정보', '매너온도', '인증 상태', '가입일', '동행 횟수', '관리']}>
                    {filteredUsers.map((user) => {
                        const mannerStyle = getMannerColor(user.mannerTemp);
                        return (
                            <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-2xl grayscale group-hover:grayscale-0 transition-all">
                                            {user.avatar}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-1.5">
                                                <p className="font-black text-slate-900">{user.name}</p>
                                                <span className="text-[10px] font-bold text-slate-400">@{user.username}</span>
                                            </div>
                                            <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-400 font-bold">
                                                <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                                                <span className="flex items-center gap-1"><MapPin size={12} /> {user.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <div className="flex flex-col items-center gap-2">
                                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl ${mannerStyle.bg}`}>
                                            <Thermometer size={16} className={mannerStyle.text} />
                                            <span className={`text-lg font-black ${mannerStyle.text}`}>
                                                {user.mannerTemp}°C
                                            </span>
                                        </div>
                                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${mannerStyle.bar} transition-all`}
                                                style={{ width: `${Math.min((user.mannerTemp / 50) * 100, 100)}%` }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">{mannerStyle.label}</span>
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${user.status === 'Verified' ? 'bg-emerald-50 text-emerald-600' :
                                            user.status === 'Pending' ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                        {user.status === 'Verified' ? <ShieldCheck size={12} /> :
                                            user.status === 'Pending' ? <Clock size={12} /> : <Ban size={12} />}
                                        {user.status}
                                    </div>
                                </td>
                                <td className="px-8 py-6 text-sm font-bold text-slate-400">{user.registeredAt}</td>
                                <td className="px-8 py-6 text-center text-sm font-black text-slate-900">{user.trips}회</td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-center gap-2">
                                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all" title="Edit Profile">
                                            <Edit2 size={18} />
                                        </button>
                                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all" title="Suspension">
                                            <Ban size={18} />
                                        </button>
                                        <button className="p-2.5 rounded-xl text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </DataTable>

                {/* Verification Review Modal */}
                {showVerificationModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9999] flex items-center justify-center p-8">
                        <div className="bg-white rounded-[3rem] max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
                            <div className="p-10 border-b border-slate-100">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">본인 인증 검토</h3>
                                        <p className="text-sm font-bold text-slate-400">대기 중인 {pendingVerifications}건의 본인 인증을 검토하세요</p>
                                    </div>
                                    <button
                                        onClick={() => setShowVerificationModal(false)}
                                        className="p-3 rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-900 transition-all"
                                    >
                                        <XCircle size={24} />
                                    </button>
                                </div>
                            </div>

                            <div className="p-10 overflow-y-auto max-h-[60vh] space-y-6">
                                {mockUsers.filter(u => u.verificationStatus === 'Pending').map((user) => (
                                    <div key={user.id} className="p-6 rounded-2xl border-2 border-slate-100 hover:border-orange-200 transition-all bg-white">
                                        <div className="flex items-start justify-between gap-6">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-3xl">
                                                    {user.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h4 className="text-lg font-black text-slate-900">{user.name}</h4>
                                                        <span className="text-xs font-bold text-slate-400">@{user.username}</span>
                                                    </div>
                                                    <div className="flex items-center gap-4 text-xs font-bold text-slate-500">
                                                        <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                                                        <span className="flex items-center gap-1"><MapPin size={12} /> {user.location}</span>
                                                    </div>
                                                    <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-100">
                                                        <p className="text-xs font-bold text-blue-600">📄 신분증 사본 업로드됨 • 가입일: {user.registeredAt}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-black text-sm hover:scale-105 transition-all shadow-lg shadow-emerald-500/20">
                                                    <CheckCircle2 size={18} />
                                                    승인
                                                </button>
                                                <button className="flex items-center gap-2 px-6 py-3 rounded-xl bg-red-500 text-white font-black text-sm hover:scale-105 transition-all shadow-lg shadow-red-500/20">
                                                    <AlertTriangle size={18} />
                                                    거부
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
