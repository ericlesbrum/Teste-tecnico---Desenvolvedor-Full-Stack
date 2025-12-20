import { useEffect, useState } from 'react';
import { obterTotaisPorPessoa, obterTotaisPorCategoria } from '../services/relatorioService';
import type { RelatorioGeralDto, RelatorioPessoaDto, RelatorioCategoriaDto } from '../dtos/RelatorioDto';
import { useToasty } from './useToasty';

export function useDashboard() {
    const { error } = useToasty();
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
        } catch (err) {
            console.error(err);
            error('Erro ao carregar dados do dashboard');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);

    const formatarMoeda = (valor: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

    return {
        relatorioPessoas,
        relatorioCategorias,
        loading,
        carregarDados,
        formatarMoeda
    };
}
