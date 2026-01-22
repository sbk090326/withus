'use client';

import React from 'react';
import { Instagram, Twitter, Facebook } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
    const pathname = usePathname();
    const isAdmin = pathname?.startsWith('/admin');

    if (isAdmin) return null;
    const footerLinks = {
        company: [
            { name: 'About Us', href: '/about' },
            { name: 'Careers', href: '#' },
            { name: 'Blog', href: '#' },
        ],
        support: [
            { name: 'Help Center', href: '/contact' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Privacy Policy', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: Instagram, href: '#', label: 'Instagram' },
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Facebook, href: '#', label: 'Facebook' },
    ];

    return (
        <footer className="bg-[#FDFCFB] text-slate-900 pt-20 pb-12 relative overflow-hidden border-t border-slate-200">
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-30">
                <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-[1400px] mx-auto px-4 md:px-8 relative z-10">
                {/* Links Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8 text-center md:text-left">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <Link href="/">
                            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent cursor-pointer">
                                WITHUS
                            </h2>
                        </Link>
                        <p className="text-slate-600 text-sm">
                            Connect with verified travel companions worldwide.
                        </p>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h3 className="font-bold text-sm mb-3 text-slate-900">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 hover:text-orange-500 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div>
                        <h3 className="font-bold text-sm mb-3 text-slate-900">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-slate-600 hover:text-orange-500 transition-colors text-sm"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h3 className="font-bold text-sm mb-3 text-slate-900">Follow Us</h3>
                        <div className="flex gap-3 justify-center md:justify-start">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    aria-label={social.label}
                                    className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center hover:bg-gradient-to-br hover:from-orange-500 hover:to-pink-500 hover:border-transparent transition-all group"
                                >
                                    <social.icon size={16} className="text-slate-600 group-hover:text-white transition-colors" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-slate-200 pt-6 text-center">
                    <p className="text-slate-500 text-sm">
                        © 2026 WithUs. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
