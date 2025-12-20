import { useEffect, useState, type FormEvent } from 'react';
import { listarPessoas, criarPessoa, deletarPessoa } from '../services/pessoaService';
import type { PessoaDto } from '../dtos/PessoaDto';
import { toast } from 'react-toastify';
import { useModal } from './useModal';

export function usePessoas() {
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
        } catch (error) {
            toast.error('Erro ao carregar pessoas');
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
            toast.warning('Preencha todos os campos');
            return;
        }
        if (Number(idade) < 0) {
            toast.warning('Idade não pode ser negativa');
            return;
        }
        try {
            await criarPessoa({ nome: nome.trim(), idade: Number(idade) });
            toast.success('Pessoa cadastrada com sucesso!');
            setNome('');
            setIdade('');
            carregar();
        } catch (error: any) {
            toast.error('Erro ao criar pessoa');
            console.error('Erro ao criar pessoa:', error);
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
            toast.success('Pessoa excluída com sucesso!');
            carregar();
        } catch (error) {
            toast.error('Erro ao excluir pessoa');
            console.error('Erro ao deletar pessoa:', error);
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