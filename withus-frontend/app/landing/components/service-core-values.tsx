'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { BadgeCheck, Heart, MessageCircle } from 'lucide-react';
import {
    Section,
    Container,
    SectionTitle,
    Card,
    colors,
    animations
} from '../../components/ui';

const services = [
    {
        icon: BadgeCheck,
        title: '100% ID-verified community',
        description:
            'Travel with confidence knowing every member has completed our thorough identity verification process. Your safety is our top priority.',
        link: 'Learn More',
    },
    {
        icon: Heart,
        title: 'MBTI & travel style analysis',
        description:
            'Our smart matching algorithm analyzes your personality type and travel preferences to find companions who truly complement your journey.',
        link: 'Learn More',
    },
    {
        icon: MessageCircle,
        title: 'Real-time communication',
        description:
            'Connect and bond through our vibrant community and chat features before your trip. Build friendships that start online and flourish on the road.',
        link: 'Learn More',
    },
];

export function ServiceCoreValues() {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    return (
        <Section variant="cream" className="relative overflow-hidden">
            {/* Subtle diagonal pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{
                    backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 35px,
            rgba(26, 60, 90, 0.05) 35px,
            rgba(26, 60, 90, 0.05) 70px
          )`,
                }}
            />

            <Container className="relative z-10" ref={ref}>
                <SectionTitle>
                    Why choose Withus for your travel companion?
                </SectionTitle>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <Card
                                key={index}
                                variant="white"
                                initial={{ opacity: 0, y: 40 }}
                                animate={isInView ? { opacity: 1, y: 0 } : {}}
                                transition={{
                                    duration: animations.duration.normal,
                                    delay: index * 0.2,
                                    ease: animations.easing.smooth,
                                }}
                                className="group cursor-pointer"
                            >
                                {/* Icon with animation */}
                                <motion.div
                                    className="mb-6"
                                    initial={{ scale: 1, rotate: 0 }}
                                    animate={
                                        isInView
                                            ? {
                                                scale: [1, 1.1, 1],
                                                rotate: index === 0 ? [0, 360] : 0,
                                            }
                                            : {}
                                    }
                                    transition={{
                                        duration: index === 0 ? 1 : 0.6,
                                        delay: index * 0.2 + 0.3,
                                        ease: animations.easing.smooth,
                                    }}
                                >
                                    <Icon size={48} style={{ color: colors.primary.navy }} strokeWidth={1.5} />
                                </motion.div>

                                {/* Title */}
                                <h3
                                    className="mb-4"
                                    style={{
                                        fontSize: '28px',
                                        color: colors.primary.navy,
                                    }}
                                >
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p
                                    className="mb-6"
                                    style={{
                                        fontSize: '16px',
                                        color: colors.primary.navy,
                                        lineHeight: '1.7',
                                        opacity: 0.8,
                                    }}
                                >
                                    {service.description}
                                </p>

                                {/* CTA Link */}
                                <a
                                    href="#guide"
                                    className="inline-block relative group/link"
                                    style={{ color: colors.primary.tan }}
                                >
                                    {service.link}
                                    <motion.span
                                        className="absolute bottom-0 left-0 w-full h-[2px]"
                                        style={{ backgroundColor: colors.primary.tan }}
                                        initial={{ scaleX: 0 }}
                                        whileHover={{ scaleX: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                </a>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
}
