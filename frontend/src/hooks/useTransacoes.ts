import { useEffect, useState, type FormEvent } from 'react';
import { listarTransacoes, criarTransacao } from '../services/transacaoService';
import { listarPessoas } from '../services/pessoaService';
import { listarCategorias } from '../services/categoriaService';
import type { TransacaoDto } from '../dtos/TransacaoDto';
import type { PessoaDto } from '../dtos/PessoaDto';
import type { CategoriaDto } from '../dtos/CategoriaDto';
import { useToasty } from './useToasty';

export function useTransacoes() {
    const { success, error, warning } = useToasty();
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
        } catch (err) {
            console.error(err);
            error('Erro ao carregar dados');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!descricao.trim() || !valor || !pessoaId || !categoriaId) {
            warning('Preencha todos os campos');
            return;
        }

        if (Number(valor) <= 0) {
            warning('Valor deve ser maior que zero');
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
            success('Transação registrada com sucesso!');
            setDescricao('');
            setValor('');
            setTipo(1);
            setPessoaId('');
            setCategoriaId('');
            carregar();
        } catch (err: any) {
            console.error(err);
            const mensagem = err.response?.data || 'Erro ao criar transação';
            error(mensagem);
        }
    };

    const formatarMoeda = (valor: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

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
