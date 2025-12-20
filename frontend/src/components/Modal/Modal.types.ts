export interface ModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmVariant?: 'danger' | 'success' | 'primary' | 'warning';
    onConfirm: () => void;
    onCancel: () => void;
}
