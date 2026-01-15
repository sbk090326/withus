'use client';
import React from 'react';

export const DetailQna = () => {
    return (
        <div className="bg-white rounded-[40px] p-8 md:p-10 border border-slate-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    궁금한 점 물어보기
                    <span className="px-2 py-0.5 rounded-lg bg-slate-100 text-slate-500 text-xs">2</span>
                </h3>
                <p className="text-xs text-slate-400">호스트에게 공개 질문을 남길 수 있습니다.</p>
            </div>

            {/* Question Input */}
            <div className="relative group">
                <textarea
                    placeholder="호스트에게 궁금한 점을 남겨보세요! 개인정보 공유는 지양해 주세요."
                    className="w-full px-6 py-5 rounded-[28px] bg-slate-50 border border-slate-100 focus:bg-white focus:border-orange-500/30 transition-all outline-none font-medium text-slate-800 text-sm resize-none"
                    rows={3}
                />
                <button className="absolute bottom-4 right-4 px-6 py-2.5 rounded-full bg-slate-900 text-white text-xs font-bold hover:bg-orange-500 transition-all shadow-lg active:scale-95">
                    등록하기
                </button>
            </div>

            {/* Questions List */}
            <div className="space-y-6 pt-4">
                {/* Question Item 1 */}
                <div className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shadow-sm">🧔</div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center gap-2">
                                <span className="font-bold text-sm text-slate-900">로키</span>
                                <span className="text-[10px] text-slate-400">1시간 전</span>
                            </div>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                안녕하세요! 저도 사진 찍는 걸 좋아하는데 혹시 필름 카메라도 괜찮을까요? 일정 중에 스냅 찍는 시간이 따로 있을지도 궁금합니다!
                            </p>
                        </div>
                    </div>
                    {/* Host Reply */}
                    <div className="ml-14 bg-slate-50 rounded-2xl p-5 border border-slate-100 relative">
                        <div className="absolute -top-2 left-6 w-4 h-4 bg-slate-50 border-t border-l border-slate-100 rotate-45" />
                        <div className="flex gap-3">
                            <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs shadow-sm border border-orange-100">👩‍🦰</div>
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-[11px] text-orange-600 uppercase tracking-tighter">Host</span>
                                    <span className="text-[10px] text-slate-400">30분 전</span>
                                </div>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    와 필카 유저시군요! 너무 환영입니다. 따로 스냅 시간을 정해둔 건 아니지만, 예쁜 카페나 장소 보이면 여유롭게 사진 찍으면서 다닐 예정이에요! 😊
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Question Item 2 */}
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xl shadow-sm">👧</div>
                    <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-slate-900">미나</span>
                            <span className="text-[10px] text-slate-400">45분 전</span>
                        </div>
                        <p className="text-sm text-slate-600 leading-relaxed">
                            저 비건인데 혹시 식당 정할 때 비건 옵션 있는 곳도 가주실 수 있을까요?
                        </p>
                    </div>
                </div>
            </div>

            <button className="w-full py-4 rounded-2xl border border-slate-100 text-slate-400 text-xs font-bold hover:bg-slate-50 transition-all">
                모든 질문 답변 보기
            </button>
        </div>
    );
};
