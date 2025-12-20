import { TabelaRelatorio } from '../components/TabelaRelatorio/TabelaRelatorio';
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
                    <button className="btn bg-categorias" onClick={carregarRelatorio}>
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
                            <TabelaRelatorio
                                itens={relatorio.itens.map(item => ({
                                    id: item.categoriaId,
                                    label: item.categoriaDescricao,
                                    totalReceitas: item.totalReceitas,
                                    totalDespesas: item.totalDespesas,
                                    saldo: item.saldo
                                }))}
                                totalReceitas={relatorio.totalReceitas}
                                totalDespesas={relatorio.totalDespesas}
                                saldo={relatorio.saldo}
                                formatarMoeda={formatarMoeda}
                                labelHeader="Categoria"
                                icon="bi-tag-fill"
                                emptyMessage="Nenhuma categoria com dados disponíveis"
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}