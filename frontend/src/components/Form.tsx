import type { ReactNode, FormEvent } from 'react';

interface FormProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

export function Form({ onSubmit, children }: FormProps) {
    return <form onSubmit={onSubmit}>{children}</form>;
}
