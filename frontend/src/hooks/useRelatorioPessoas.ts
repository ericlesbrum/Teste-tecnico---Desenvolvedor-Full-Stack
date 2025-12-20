import { useEffect, useState } from 'react';
import { obterTotaisPorPessoa } from '../services/relatorioService';
import type { RelatorioPessoaDto, RelatorioGeralDto } from '../dtos/RelatorioDto';
import { useToasty } from './useToasty';

export function useRelatorioPessoas() {
    const { error } = useToasty();
    const [relatorio, setRelatorio] = useState<RelatorioGeralDto<RelatorioPessoaDto> | null>(null);
    const [loading, setLoading] = useState(true);

    const carregarRelatorio = async () => {
        try {
            setLoading(true);
            const dados = await obterTotaisPorPessoa();
            setRelatorio(dados);
        } catch (err) {
            console.error(err);
            error('Erro ao carregar relatório de pessoas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarRelatorio();
    }, []);

    const formatarMoeda = (valor: number) =>
        new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);

    return { relatorio, loading, carregarRelatorio, formatarMoeda };
}
