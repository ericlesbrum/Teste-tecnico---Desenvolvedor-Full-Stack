import type { TabelaRelatorioProps } from "./TabelaRelatorio.types";


export function TabelaRelatorio({
    itens,
    totalReceitas,
    totalDespesas,
    saldo,
    formatarMoeda,
    labelHeader,
    icon,
    emptyMessage = "Nenhum dado disponível"
}: TabelaRelatorioProps) {
    if (itens.length === 0) {
        return (
            <div className="text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <p className="text-muted mt-3">{emptyMessage}</p>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <table className="table table-hover mb-0">
                <thead className="table-dark">
                    <tr>
                        <th className="py-3">{labelHeader}</th>
                        <th className="text-end py-3">Receitas</th>
                        <th className="text-end py-3">Despesas</th>
                        <th className="text-end py-3">Saldo</th>
                    </tr>
                </thead>
                <tbody>
                    {itens.map((item) => (
                        <tr key={item.id}>
                            <td className="py-3">
                                <i className={`bi ${icon} me-2`}></i>
                                <strong>{item.label}</strong>
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
                            {formatarMoeda(totalReceitas)}
                        </td>
                        <td className="text-end py-3 text-danger">
                            {formatarMoeda(totalDespesas)}
                        </td>
                        <td className="text-end py-3">
                            <span className={`badge ${saldo >= 0 ? 'bg-success' : 'bg-danger'} fs-6`}>
                                {formatarMoeda(saldo)}
                            </span>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
}