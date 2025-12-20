import { useEffect, useState } from 'react';
import { obterTotaisPorCategoria } from '../services/relatorioService';
import type { RelatorioCategoriaDto, RelatorioGeralDto } from '../dtos/RelatorioDto';
import { useToasty } from './useToasty';

export function useRelatorioCategorias() {
    const { error } = useToasty();
    const [relatorio, setRelatorio] = useState<RelatorioGeralDto<RelatorioCategoriaDto> | null>(null);
    const [loading, setLoading] = useState(true);

    const carregarRelatorio = async () => {
        try {
            setLoading(true);
            const dados = await obterTotaisPorCategoria();
            setRelatorio(dados);
        } catch (err) {
            console.error(err);
            error('Erro ao carregar relatório de categorias');
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
