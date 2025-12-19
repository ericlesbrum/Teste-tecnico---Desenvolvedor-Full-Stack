import { useEffect, useState } from 'react';
import { obterTotaisPorCategoria } from '../services/relatorioService';
import type { RelatorioCategoriaDto, RelatorioGeralDto } from '../dtos/RelatorioDto';
import { toast } from 'react-toastify';

export function RelatoriosCategoriasPage() {
    const [relatorio, setRelatorio] = useState<RelatorioGeralDto<RelatorioCategoriaDto> | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        carregarRelatorio();
    }, []);

    async function carregarRelatorio() {
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
    }

    function formatarMoeda(valor: number): string {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor);
    }

    if (loading) {
        return <div className="container mt-4">Carregando relatório...</div>;
    }

    if (!relatorio) {
        return <div className="container mt-4">Erro ao carregar dados</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Relatório de Totais por Categoria</h2>

            <div className="table-responsive">
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Categoria</th>
                            <th className="text-end">Total Receitas</th>
                            <th className="text-end">Total Despesas</th>
                            <th className="text-end">Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {relatorio.itens.map((item) => (
                            <tr key={item.categoriaId}>
                                <td>{item.categoriaDescricao}</td>
                                <td className="text-end text-success">
                                    {formatarMoeda(item.totalReceitas)}
                                </td>
                                <td className="text-end text-danger">
                                    {formatarMoeda(item.totalDespesas)}
                                </td>
                                <td className={`text-end fw-bold ${item.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                                    {formatarMoeda(item.saldo)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot className="table-secondary">
                        <tr className="fw-bold">
                            <td>TOTAL GERAL</td>
                            <td className="text-end text-success">
                                {formatarMoeda(relatorio.totalReceitas)}
                            </td>
                            <td className="text-end text-danger">
                                {formatarMoeda(relatorio.totalDespesas)}
                            </td>
                            <td className={`text-end ${relatorio.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                                {formatarMoeda(relatorio.saldo)}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <div className="mt-4">
                <button className="btn btn-secondary" onClick={carregarRelatorio}>
                    Atualizar Relatório
                </button>
            </div>
        </div>
    );
}