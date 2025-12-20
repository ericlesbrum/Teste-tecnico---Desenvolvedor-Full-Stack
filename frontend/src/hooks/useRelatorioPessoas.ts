import { useEffect, useState } from 'react';
import { obterTotaisPorPessoa } from '../services/relatorioService';
import type { RelatorioPessoaDto, RelatorioGeralDto } from '../dtos/RelatorioDto';
import { toast } from 'react-toastify';

export function useRelatorioPessoas() {
    const [relatorio, setRelatorio] = useState<RelatorioGeralDto<RelatorioPessoaDto> | null>(null);
    const [loading, setLoading] = useState(true);

    const carregarRelatorio = async () => {
        try {
            setLoading(true);
            const dados = await obterTotaisPorPessoa();
            setRelatorio(dados);
        } catch (error) {
            toast.error('Erro ao carregar relatório de pessoas');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregarRelatorio();
    }, []);

    const formatarMoeda = (valor: number): string => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    };

    return {
        relatorio,
        loading,
        carregarRelatorio,
        formatarMoeda
    };
}
