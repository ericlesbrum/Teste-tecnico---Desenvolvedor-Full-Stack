import { Table } from '../components/Table/Table';
import type { Column } from '../components/Table/Table.types';
import type { PessoaDto } from '../dtos/PessoaDto';
import { usePessoas } from '../hooks/usePessoas';
import { Modal } from '../components/Modal/Modal';

export function PessoasPage() {
    const { pessoas, nome, idade, loading, setNome, setIdade, handleSubmit, handleDelete, confirmModal } = usePessoas();

    const columns: Column<PessoaDto>[] = [
        { key: 'id', title: 'ID' },
        { key: 'nome', title: 'Nome' },
        {
            key: 'idade',
            title: 'Idade',
            render: (value) => {
                const idade = value as number;
                const isMenor = idade < 18;
                return (
                    <span>
                        {idade} anos
                        {isMenor && <span className="badge bg-warning text-dark ms-2">Menor</span>}
                    </span>
                );
            }
        },
        {
            key: 'id',
            title: 'Ações',
            sortable: false,
            render: (_, row) => (
                <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(row.id, row.nome || '')}
                >
                    <i className="bi bi-trash me-1"></i>
                    Excluir
                </button>
            ),
        },
    ];

    return (
        <div className="container mt-4">
            <div className="row mb-4">
                <div className="col">
                    <h2 className="mb-0">
                        <i className="bi bi-people-fill me-2"></i>
                        Gerenciar Pessoas
                    </h2>
                    <p className="text-muted">Cadastre as pessoas que participam do controle financeiro</p>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-4 mb-4">
                    <div className="card shadow-sm h-100">
                        <div className="card-header bg-pessoas text-white">
                            <h5 className="mb-0">
                                <i className="bi bi-person-plus-fill me-2"></i>
                                Nova Pessoa
                            </h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="nome" className="form-label fw-semibold">
                                        Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nome"
                                        value={nome}
                                        onChange={e => setNome(e.target.value)}
                                        placeholder="Digite o nome"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="idade" className="form-label fw-semibold">
                                        Idade
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="idade"
                                        value={idade}
                                        onChange={e => setIdade(e.target.value)}
                                        placeholder="Digite a idade"
                                        min="0"
                                    />
                                    <div className="form-text">
                                        Menores de 18 anos não podem registrar receitas
                                    </div>
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="btn btn-custom btn-pessoas btn-lg">
                                        <i className="bi bi-check-circle me-2"></i>
                                        Cadastrar Pessoa
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-lg-8">
                    <div className="card shadow-sm">
                        <div className="card-header bg-pessoas">
                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">
                                    <i className="bi bi-list-ul me-2"></i>
                                    Pessoas Cadastradas
                                </h5>
                                <span className="badge bg-secondary rounded-pill">
                                    {pessoas.length} {pessoas.length === 1 ? 'pessoa' : 'pessoas'}
                                </span>
                            </div>
                        </div>
                        <div className="card-body p-0">
                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-success" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </div>
                                </div>
                            ) : pessoas.length === 0 ? (
                                <div className="text-center py-5">
                                    <i className="bi bi-person-x display-1 text-muted"></i>
                                    <p className="text-muted mt-3">Nenhuma pessoa cadastrada ainda</p>
                                    <p className="text-muted">Adicione pessoas para começar o controle financeiro</p>
                                </div>
                            ) : (
                                <Table columns={columns} data={pessoas} pageSize={8} />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={confirmModal.isOpen}
                title={confirmModal.config.title}
                message={confirmModal.config.message}
                confirmText={confirmModal.config.confirmText}
                cancelText={confirmModal.config.cancelText}
                confirmVariant={confirmModal.config.confirmVariant}
                onConfirm={confirmModal.handleConfirm}
                onCancel={confirmModal.handleCancel}
            />
        </div>
    );
}
