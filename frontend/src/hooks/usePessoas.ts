import { useState, useEffect, type FormEvent } from 'react';
import { listarPessoas, criarPessoa, deletarPessoa } from '../services/pessoaService';
import type { PessoaDto } from '../dtos/PessoaDto';
import { useToasty } from './useToasty';
import { useModal } from './useModal';

export function usePessoas() {
    const { success, error, warning } = useToasty();
    const [pessoas, setPessoas] = useState<PessoaDto[]>([]);
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [loading, setLoading] = useState(false);
    const confirmModal = useModal();

    const carregar = async () => {
        try {
            setLoading(true);
            const data = await listarPessoas();
            setPessoas(data);
        } catch {
            error('Erro ao carregar pessoas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!nome.trim() || !idade) {
            warning('Preencha todos os campos');
            return;
        }
        if (Number(idade) < 0) {
            warning('Idade não pode ser negativa');
            return;
        }

        try {
            await criarPessoa({ nome: nome.trim(), idade: Number(idade) });
            success('Pessoa cadastrada com sucesso!');
            setNome('');
            setIdade('');
            carregar();
        } catch (err) {
            console.error(err);
            error('Erro ao criar pessoa');
        }
    };

    const handleDelete = async (id: number, nome: string) => {
        const confirmed = await confirmModal.showConfirm({
            title: 'Confirmar Exclusão',
            message: `Deseja realmente excluir ${nome}?`,
            confirmText: 'Excluir',
            cancelText: 'Cancelar',
            confirmVariant: 'danger'
        });

        if (!confirmed) return;

        try {
            await deletarPessoa(id);
            success('Pessoa excluída com sucesso!');
            carregar();
        } catch {
            error('Erro ao excluir pessoa');
        }
    };

    return {
        pessoas,
        nome,
        idade,
        loading,
        setNome,
        setIdade,
        carregar,
        handleSubmit,
        handleDelete,
        confirmModal
    };
}
