import { toast, type ToastOptions } from 'react-toastify';

export function useToasty() {
    const defaultOptions: ToastOptions = { position: 'top-right', autoClose: 3000 };

    const success = (message: string, options?: ToastOptions) => toast.success(message, { ...defaultOptions, ...options });
    const error = (message: string, options?: ToastOptions) => toast.error(message, { ...defaultOptions, ...options });
    const warning = (message: string, options?: ToastOptions) => toast.warning(message, { ...defaultOptions, ...options });

    return { success, error, warning };
}
