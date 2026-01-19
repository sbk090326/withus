'use client';

import React from 'react';

interface DataTableProps {
    headers: string[];
    children: React.ReactNode;
    className?: string;
}

export const DataTable = ({ headers, children, className = '' }: DataTableProps) => {
    return (
        <section className={`bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden shadow-sm ${className}`}>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50/50 border-b border-slate-100">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-8 py-5 text-[11px] font-black text-slate-400 uppercase tracking-widest"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {children}
                </tbody>
            </table>
        </section>
    );
};
