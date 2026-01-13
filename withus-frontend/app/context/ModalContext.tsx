'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type ModalType = 'success' | 'error' | 'info';

interface ModalOptions {
    title: string;
    message: string;
    type?: ModalType;
    onClose?: () => void;
    actionLabel?: string;
    onAction?: () => void;
}

interface ModalContextType {
    isOpen: boolean;
    options: ModalOptions | null;
    openModal: (options: ModalOptions) => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [options, setOptions] = useState<ModalOptions | null>(null);

    const openModal = (modalOptions: ModalOptions) => {
        setOptions(modalOptions);
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
        if (options?.onClose) {
            options.onClose();
        }
        // Delay clearing options to allow animation to finish if needed, 
        // but for simplicity we can keep it or clear it after a timeout.
        // We'll keep it for now to avoid content flashing during close animation.
        setTimeout(() => setOptions(null), 300);
    };

    return (
        <ModalContext.Provider value={{ isOpen, options, openModal, closeModal }}>
            {children}
        </ModalContext.Provider>
    );
}

export function useModal() {
    const context = useContext(ModalContext);
    if (context === undefined) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
}
