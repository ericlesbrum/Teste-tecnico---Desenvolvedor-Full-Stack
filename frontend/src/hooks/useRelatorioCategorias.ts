import { useEffect, useState } from 'react';
import { obterTotaisPorCategoria } from '../services/relatorioService';
import type { RelatorioCategoriaDto, RelatorioGeralDto } from '../dtos/RelatorioDto';
import { toast } from 'react-toastify';

export function useRelatorioCategorias() {
    const [relatorio, setRelatorio] = useState<RelatorioGeralDto<RelatorioCategoriaDto> | null>(null);
    const [loading, setLoading] = useState(true);

    const carregarRelatorio = async () => {
        try {
            setLoading(true);
            const dados = await obterTotaisPorCategoria();
            setRelatorio(dados);
        } catch (error) {
            toast.error('Erro ao carregar relatório de categorias');
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
