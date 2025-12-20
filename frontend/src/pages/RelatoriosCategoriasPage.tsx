import { useRelatorioCategorias } from '../hooks/useRelatorioCategorias';

export function RelatoriosCategoriasPage() {
    const { relatorio, loading, carregarRelatorio, formatarMoeda } = useRelatorioCategorias();

    if (loading) {
        return (
            <div className="container mt-4">
                <div className="text-center py-5">
                    <div className="spinner-border text-success" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                    <p className="text-muted mt-3">Carregando relatório...</p>
                </div>
            </div>
        );
    }

    if (!relatorio) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger">Erro ao carregar dados</div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col">
                    <h2 className="mb-0">
                        <i className="bi bi-pie-chart-fill me-2"></i>
                        Relatório por Categoria
                    </h2>
                    <p className="text-muted">Análise detalhada de receitas, despesas e saldo por categoria</p>
                </div>
                <div className="col-auto">
                    <button className="btn btn-success" onClick={carregarRelatorio}>
                        <i className="bi bi-arrow-clockwise me-2"></i>
                        Atualizar
                    </button>
                </div>
            </div>

            {/* Cards de Resumo */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card border-success shadow-sm">
                        <div className="card-body text-center">
                            <i className="bi bi-arrow-up-circle-fill text-success display-4"></i>
                            <h6 className="text-muted mt-3 mb-2">Total de Receitas</h6>
                            <h3 className="text-success mb-0">{formatarMoeda(relatorio.totalReceitas)}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-danger shadow-sm">
                        <div className="card-body text-center">
                            <i className="bi bi-arrow-down-circle-fill text-danger display-4"></i>
                            <h6 className="text-muted mt-3 mb-2">Total de Despesas</h6>
                            <h3 className="text-danger mb-0">{formatarMoeda(relatorio.totalDespesas)}</h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card border-${relatorio.saldo >= 0 ? 'success' : 'danger'} shadow-sm`}>
                        <div className="card-body text-center">
                            <i className={`bi bi-wallet2 ${relatorio.saldo >= 0 ? 'text-success' : 'text-danger'} display-4`}></i>
                            <h6 className="text-muted mt-3 mb-2">Saldo Total</h6>
                            <h3 className={`mb-0 ${relatorio.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                                {formatarMoeda(relatorio.saldo)}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Tabela de Detalhes */}
            <div className="card shadow-sm">
                <div className="card-header bg-categorias">
                    <h5 className="mb-0">
                        <i className="bi bi-tags-fill me-2"></i>
                        Detalhamento por Categoria
                    </h5>
                </div>
                <div className="card-body p-0">
                    {relatorio.itens.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="bi bi-inbox display-1 text-muted"></i>
                            <p className="text-muted mt-3">Nenhum dado disponível</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="table table-hover mb-0">
                                <thead className="table-dark">
                                    <tr>
                                        <th className="py-3">Categoria</th>
                                        <th className="text-end py-3">Receitas</th>
                                        <th className="text-end py-3">Despesas</th>
                                        <th className="text-end py-3">Saldo</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {relatorio.itens.map((item) => (
                                        <tr key={item.categoriaId}>
                                            <td className="py-3">
                                                <i className="bi bi-tag-fill me-2"></i>
                                                <strong>{item.categoriaDescricao}</strong>
                                            </td>
                                            <td className="text-end py-3">
                                                <span className="text-success fw-semibold">
                                                    {formatarMoeda(item.totalReceitas)}
                                                </span>
                                            </td>
                                            <td className="text-end py-3">
                                                <span className="text-danger fw-semibold">
                                                    {formatarMoeda(item.totalDespesas)}
                                                </span>
                                            </td>
                                            <td className="text-end py-3">
                                                <span className={`badge ${item.saldo >= 0 ? 'bg-success' : 'bg-danger'} fs-6`}>
                                                    {formatarMoeda(item.saldo)}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="table-light">
                                    <tr className="fw-bold">
                                        <td className="py-3">
                                            <i className="bi bi-calculator me-2"></i>
                                            TOTAL GERAL
                                        </td>
                                        <td className="text-end py-3 text-success">
                                            {formatarMoeda(relatorio.totalReceitas)}
                                        </td>
                                        <td className="text-end py-3 text-danger">
                                            {formatarMoeda(relatorio.totalDespesas)}
                                        </td>
                                        <td className="text-end py-3">
                                            <span className={`badge ${relatorio.saldo >= 0 ? 'bg-success' : 'bg-danger'} fs-6`}>
                                                {formatarMoeda(relatorio.saldo)}
                                            </span>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}