import { Link } from 'react-router-dom';
import { useDashboard } from '../hooks/useDashboard';

export function DashboardPage() {
    const { relatorioPessoas, relatorioCategorias, loading, formatarMoeda } = useDashboard();

    if (loading) {
        return (
            <div className="container mt-5">
                <div className="text-center">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Carregando...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h1 className="mb-4">Controle de Gastos</h1>

            {/* Resumo Geral */}
            <div className="row g-3 mb-4">
                <div className="col-md-4">
                    <div className="card border-success">
                        <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2 text-muted">Total Receitas</h6>
                            <h3 className="card-title text-success mb-0">
                                {formatarMoeda(relatorioPessoas?.totalReceitas || 0)}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card border-danger">
                        <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2 text-muted">Total Despesas</h6>
                            <h3 className="card-title text-danger mb-0">
                                {formatarMoeda(relatorioPessoas?.totalDespesas || 0)}
                            </h3>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className={`card border-${(relatorioPessoas?.saldo || 0) >= 0 ? 'success' : 'danger'}`}>
                        <div className="card-body text-center">
                            <h6 className="card-subtitle mb-2 text-muted">Saldo Geral</h6>
                            <h3 className={`card-title mb-0 ${(relatorioPessoas?.saldo || 0) >= 0 ? 'text-success' : 'text-danger'}`}>
                                {formatarMoeda(relatorioPessoas?.saldo || 0)}
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Resumo por Pessoa */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Resumo por Pessoa</h5>
                            <Link to="/relatorios/pessoas" className="btn btn-light btn-sm">
                                Ver detalhes
                            </Link>
                        </div>
                        <div className="card-body">
                            {relatorioPessoas && relatorioPessoas.itens.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-sm table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>Pessoa</th>
                                                <th className="text-end">Receitas</th>
                                                <th className="text-end">Despesas</th>
                                                <th className="text-end">Saldo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {relatorioPessoas.itens.slice(0, 5).map((item) => (
                                                <tr key={item.pessoaId}>
                                                    <td>{item.pessoaNome}</td>
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
                                    </table>
                                    {relatorioPessoas.itens.length > 5 && (
                                        <div className="text-center mt-2">
                                            <small className="text-muted">
                                                Mostrando 5 de {relatorioPessoas.itens.length} pessoas
                                            </small>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted mb-0">Nenhum dado disponível</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Resumo por Categoria */}
            <div className="row mb-4">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Resumo por Categoria</h5>
                            <Link to="/relatorios/categorias" className="btn btn-light btn-sm">
                                Ver detalhes
                            </Link>
                        </div>
                        <div className="card-body">
                            {relatorioCategorias && relatorioCategorias.itens.length > 0 ? (
                                <div className="table-responsive">
                                    <table className="table table-sm table-hover mb-0">
                                        <thead>
                                            <tr>
                                                <th>Categoria</th>
                                                <th className="text-end">Receitas</th>
                                                <th className="text-end">Despesas</th>
                                                <th className="text-end">Saldo</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {relatorioCategorias.itens.slice(0, 5).map((item) => (
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
                                    </table>
                                    {relatorioCategorias.itens.length > 5 && (
                                        <div className="text-center mt-2">
                                            <small className="text-muted">
                                                Mostrando 5 de {relatorioCategorias.itens.length} categorias
                                            </small>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <p className="text-muted mb-0">Nenhum dado disponível</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}