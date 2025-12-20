import { useState } from 'react';

interface ModalConfig {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: 'danger' | 'success' | 'primary' | 'warning';
}

export function useModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [config, setConfig] = useState<ModalConfig>({
        title: '',
        message: '',
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        confirmVariant: 'danger'
    });
    const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

    const showConfirm = (modalConfig: ModalConfig): Promise<boolean> => {
        setConfig({
            confirmText: 'Confirmar',
            cancelText: 'Cancelar',
            confirmVariant: 'danger',
            ...modalConfig
        });
        setIsOpen(true);

        return new Promise<boolean>((resolve) => {
            setResolvePromise(() => resolve);
        });
    };

    const handleConfirm = () => {
        setIsOpen(false);
        if (resolvePromise) {
            resolvePromise(true);
            setResolvePromise(null);
        }
    };

    const handleCancel = () => {
        setIsOpen(false);
        if (resolvePromise) {
            resolvePromise(false);
            setResolvePromise(null);
        }
    };

    return {
        isOpen,
        config,
        showConfirm,
        handleConfirm,
        handleCancel
    };
}