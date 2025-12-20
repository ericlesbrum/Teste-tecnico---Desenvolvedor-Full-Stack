import { useEffect, useState, type FormEvent } from 'react';
import { listarTransacoes, criarTransacao } from '../services/transacaoService';
import { listarPessoas } from '../services/pessoaService';
import { listarCategorias } from '../services/categoriaService';
import type { TransacaoDto } from '../dtos/TransacaoDto';
import type { PessoaDto } from '../dtos/PessoaDto';
import type { CategoriaDto } from '../dtos/CategoriaDto';
import { toast } from 'react-toastify';

export function useTransacoes() {
    const [transacoes, setTransacoes] = useState<TransacaoDto[]>([]);
    const [pessoas, setPessoas] = useState<PessoaDto[]>([]);
    const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
    const [loading, setLoading] = useState(false);

    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState<1 | 2>(1); // 1 = Despesa, 2 = Receita
    const [pessoaId, setPessoaId] = useState('');
    const [categoriaId, setCategoriaId] = useState('');

    const carregar = async () => {
        try {
            setLoading(true);
            const [transacoesData, pessoasData, categoriasData] = await Promise.all([
                listarTransacoes(),
                listarPessoas(),
                listarCategorias()
            ]);
            setTransacoes(transacoesData);
            setPessoas(pessoasData);
            setCategorias(categoriasData);
        } catch (error) {
            toast.error('Erro ao carregar dados');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação manual
        if (!descricao.trim() || !valor || !pessoaId || !categoriaId) {
            toast.warning('Preencha todos os campos');
            return;
        }
        if (Number(valor) <= 0) {
            toast.warning('Valor deve ser maior que zero');
            return;
        }

        try {
            await criarTransacao({
                descricao: descricao.trim(),
                valor: Number(valor),
                tipo,
                pessoaId: Number(pessoaId),
                pessoaNome: '',
                categoriaId: Number(categoriaId),
                categoriaDescricao: ''
            });
            toast.success('Transação registrada com sucesso!');
            setDescricao('');
            setValor('');
            setTipo(1);
            setPessoaId('');
            setCategoriaId('');
            carregar();
        } catch (error: any) {
            const mensagem = error.response?.data || 'Erro ao criar transação';
            toast.error(mensagem);
            console.error('Erro ao criar transação:', error);
        }
    };

    const formatarMoeda = (valor: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    return {
        transacoes,
        pessoas,
        categorias,
        loading,
        descricao,
        setDescricao,
        valor,
        setValor,
        tipo,
        setTipo,
        pessoaId,
        setPessoaId,
        categoriaId,
        setCategoriaId,
        carregar,
        handleSubmit,
        formatarMoeda
    };
}
