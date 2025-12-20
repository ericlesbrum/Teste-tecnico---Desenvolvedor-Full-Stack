import { Table } from '../components/Table/Table';
import type { Column } from '../components/Table/Table.types';
import type { CategoriaDto } from '../dtos/CategoriaDto';
import { useCategorias } from '../hooks/useCategorias';

export function CategoriasPage() {
    const {
        categorias,
        descricao,
        finalidade,
        loading,
        setDescricao,
        setFinalidade,
        handleSubmit,
        obterTextoFinalidade
    } = useCategorias();

    const columns: Column<CategoriaDto>[] = [
        { key: 'id', title: 'ID' },
        { key: 'descricao', title: 'Descrição' },
        {
            key: 'finalidade',
            title: 'Finalidade',
            render: (value) => {
                const texto = obterTextoFinalidade(value as string | number);
                const badgeClass =
                    texto === 'Despesa' ? 'bg-danger' :
                        texto === 'Receita' ? 'bg-success' : 'bg-info';
                return <span className={`badge ${badgeClass}`}>{texto}</span>;
            }
        },
    ];

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col">
                    <h2 className="mb-0">
                        <i className="bi bi-tags-fill me-2"></i>
                        Gerenciar Categorias
                    </h2>
                    <p className="text-muted">Organize suas transações por categorias personalizadas</p>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-categorias text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-plus-circle me-2"></i>
                                Nova Categoria
                            </h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="descricao" className="form-label fw-semibold">
                                        Descrição
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="descricao"
                                        value={descricao}
                                        onChange={e => setDescricao(e.target.value)}
                                        placeholder="Ex: Alimentação, Salário..."
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="finalidade" className="form-label fw-semibold">
                                        Finalidade
                                    </label>
                                    <select
                                        className="form-select"
                                        id="finalidade"
                                        value={finalidade}
                                        onChange={e => setFinalidade(Number(e.target.value) as 1 | 2 | 3)}
                                    >
                                        <option value={1}>💸 Despesa</option>
                                        <option value={2}>💰 Receita</option>
                                        <option value={3}>🔄 Ambas</option>
                                    </select>
                                    <div className="form-text">
                                        Escolha se a categoria é para despesas, receitas ou ambos
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-custom btn-categoria btn-lg">
                                        <i className="bi bi-check-circle me-2"></i>
                                        Adicionar Categoria
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-categorias">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-list-ul me-2"></i>
                                    Categorias Cadastradas
                                </h5>
                                <span className="badge bg-secondary rounded-pill">
                                    {categorias.length} {categorias.length === 1 ? 'categoria' : 'categorias'}
                                </span>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                </div>
                            ) : categorias.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-inbox display-1 text-muted"></i>
                                    <p className="text-muted mt-3">Nenhuma categoria cadastrada ainda</p>
                                    <p className="text-muted">Comece adicionando sua primeira categoria</p>
                                </div>
                            ) : (
                                <Table columns={columns} data={categorias} pageSize={8} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
