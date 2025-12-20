import { Table } from '../components/Table/Table';
import type { Column } from '../components/Table/Table.types';
import type { TransacaoDto } from '../dtos/TransacaoDto';
import { useTransacoes } from '../hooks/useTransacoes';

export function TransacoesPage() {
    const {
        transacoes,
        pessoas,
        categorias,
        loading,
        descricao,
        setDescricao,
        valor,
        setValor,
        tipo,
        setTipo,
        pessoaId,
        setPessoaId,
        categoriaId,
        setCategoriaId,
        handleSubmit,
        formatarMoeda
    } = useTransacoes();

    const columns: Column<TransacaoDto>[] = [
        { key: 'id', title: 'ID' },
        { key: 'descricao', title: 'Descrição' },
        {
            key: 'valor',
            title: 'Valor',
            render: (value) => formatarMoeda(value as number)
        },
        {
            key: 'tipo',
            title: 'Tipo',
            render: (value) => {
                const texto = value === 'Receita' || value === '2' || value === 2 ? 'Receita' : 'Despesa';
                const badgeClass = texto === 'Receita' ? 'bg-success' : 'bg-danger';
                return <span className={`badge ${badgeClass}`}>{texto}</span>;
            }
        },
        { key: 'pessoaNome', title: 'Pessoa' },
        { key: 'categoriaDescricao', title: 'Categoria' },
    ];

    return (
        <div className="container mt-4">
            {/* Cabeçalho */}
            <div className="row mb-4">
                <div className="col">
                    <h2 className="mb-0">
                        <i className="bi bi-cash-coin me-2"></i>
                        Gerenciar Transações
                    </h2>
                    <p className="text-muted">Registre suas receitas e despesas</p>
                </div>
            </div>

            {/* Formulário de nova transação */}
            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-transacoes text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-plus-circle-fill me-2"></i>
                                Nova Transação
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
                                        placeholder="Ex: Compra no supermercado"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="valor" className="form-label fw-semibold">
                                        Valor (R$)
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="valor"
                                        value={valor}
                                        onChange={e => setValor(e.target.value)}
                                        placeholder="0,00"
                                        step="0.01"
                                        min="0.01"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="tipo" className="form-label fw-semibold">
                                        Tipo
                                    </label>
                                    <select
                                        className="form-select"
                                        id="tipo"
                                        value={tipo}
                                        onChange={e => setTipo(Number(e.target.value) as 1 | 2)}
                                    >
                                        <option value={1}>💸 Despesa</option>
                                        <option value={2}>💰 Receita</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="pessoaId" className="form-label fw-semibold">
                                        Pessoa
                                    </label>
                                    <select
                                        className="form-select"
                                        id="pessoaId"
                                        value={pessoaId}
                                        onChange={e => setPessoaId(e.target.value)}
                                    >
                                        <option value="">Selecione uma pessoa</option>
                                        {pessoas.map(p => (
                                            <option key={p.id} value={p.id}>
                                                {p.nome} ({p.idade} anos)
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="categoriaId" className="form-label fw-semibold">
                                        Categoria
                                    </label>
                                    <select
                                        className="form-select"
                                        id="categoriaId"
                                        value={categoriaId}
                                        onChange={e => setCategoriaId(e.target.value)}
                                    >
                                        <option value="">Selecione uma categoria</option>
                                        {categorias.map(c => (
                                            <option key={c.id} value={c.id}>
                                                {c.descricao}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-custom btn-transacao btn-lg text-white">
                                        <i className="bi bi-check-circle me-2"></i>
                                        Registrar Transação
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Tabela de transações */}
                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-transacoes">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-list-ul me-2"></i>
                                    Transações Registradas
                                </h5>
                                <span className="badge bg-secondary rounded-pill">
                                    {transacoes.length} {transacoes.length === 1 ? 'transação' : 'transações'}
                                </span>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-info" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                </div>
                            ) : transacoes.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-clipboard-x display-1 text-muted"></i>
                                    <p className="text-muted mt-3">Nenhuma transação registrada ainda</p>
                                    <p className="text-muted">Comece registrando sua primeira transação</p>
                                </div>
                            ) : (
                                <Table columns={columns} data={transacoes} pageSize={8} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
