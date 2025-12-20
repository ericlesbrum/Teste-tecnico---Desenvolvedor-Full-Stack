import { useDashboard } from '../hooks/useDashboard';
import { DashboardTable } from '../components/DashboardTable/DashboardTable';

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

    const pessoasItems = relatorioPessoas?.itens.map(item => ({
        id: item.pessoaId,
        nome: item.pessoaNome,
        totalReceitas: item.totalReceitas,
        totalDespesas: item.totalDespesas,
        saldo: item.saldo,
    })) || [];

    const categoriasItems = relatorioCategorias?.itens.map(item => ({
        id: item.categoriaId,
        nome: item.categoriaDescricao,
        totalReceitas: item.totalReceitas,
        totalDespesas: item.totalDespesas,
        saldo: item.saldo,
    })) || [];

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
            <DashboardTable
                title="Resumo por Pessoa"
                linkTo="/relatorios/pessoas"
                headerClass="bg-pessoas"
                items={pessoasItems}
            />

            {/* Resumo por Categoria */}
            <DashboardTable
                title="Resumo por Categoria"
                linkTo="/relatorios/categorias"
                headerClass="bg-categorias"
                items={categoriasItems}
            />
        </div>
    );
}
