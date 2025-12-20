import { Link } from 'react-router-dom';
import type { DashboardTableProps } from './DashboardTable.types';



export function DashboardTable({
    title,
    linkTo,
    items,
    rowLimit = 5,
    headerClass = '',
}: DashboardTableProps) {
    return (
        <div className="row mb-4">
            <div className="col-12">
                <div className="card">
                    <div className={`card-header ${headerClass} text-white d-flex justify-content-between align-items-center`}>
                        <h5 className="mb-0">{title}</h5>
                        <Link to={linkTo} className="btn btn-light btn-sm">
                            Ver detalhes
                        </Link>
                    </div>
                    <div className="card-body">
                        {items && items.length > 0 ? (
                            <div className="table-responsive">
                                <table className="table table-sm table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th>{title.includes('Pessoa') ? 'Pessoa' : 'Categoria'}</th>
                                            <th className="text-end">Receitas</th>
                                            <th className="text-end">Despesas</th>
                                            <th className="text-end">Saldo</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.slice(0, rowLimit).map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.nome}</td>
                                                <td className="text-end text-success">{item.totalReceitas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                                <td className="text-end text-danger">{item.totalDespesas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                                <td className={`text-end fw-bold ${item.saldo >= 0 ? 'text-success' : 'text-danger'}`}>
                                                    {item.saldo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {items.length > rowLimit && (
                                    <div className="text-center mt-2">
                                        <small className="text-muted">
                                            Mostrando {rowLimit} de {items.length} {title.includes('Pessoa') ? 'pessoas' : 'categorias'}
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
    );
}
