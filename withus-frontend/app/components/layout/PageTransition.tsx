'use client';

import { motion } from 'motion/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const PageTransition = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const [key, setKey] = useState(0);
    useEffect(() => {
        // Force re-render on pathname change
        setKey(prev => prev + 1);
    }, [pathname]);
    return (
        <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1]
            }}
        >
            {children}
        </motion.div>
    );
};