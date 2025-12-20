import { useState, useEffect } from 'react';
import { obterTotaisPorPessoa, obterTotaisPorCategoria } from '../services/relatorioService';
import type { RelatorioGeralDto, RelatorioPessoaDto, RelatorioCategoriaDto } from '../dtos/RelatorioDto';
import { toast } from 'react-toastify';

export function useDashboard() {
    const [relatorioPessoas, setRelatorioPessoas] = useState<RelatorioGeralDto<RelatorioPessoaDto> | null>(null);
    const [relatorioCategorias, setRelatorioCategorias] = useState<RelatorioGeralDto<RelatorioCategoriaDto> | null>(null);
    const [loading, setLoading] = useState(true);

    const carregarDados = async () => {
        try {
            setLoading(true);
            const [pessoas, categorias] = await Promise.all([
                obterTotaisPorPessoa(),
                obterTotaisPorCategoria()
            ]);
            setRelatorioPessoas(pessoas);
            setRelatorioCategorias(categorias);
        } catch (error) {
            toast.error('Erro ao carregar dados do dashboard');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const formatarMoeda = (valor: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    return {
        relatorioPessoas,
        relatorioCategorias,
        loading,
        carregarDados,
        formatarMoeda
    };
}
