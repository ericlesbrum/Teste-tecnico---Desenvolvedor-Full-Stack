import { useState, useMemo } from 'react';
import type { TableProps, SortState } from './Table.types';

export function Table<T extends { id: number }>({ columns, data, pageSize = 10 }: TableProps<T>) {
    const [page, setPage] = useState(0);
    const [sortState, setSortState] = useState<SortState>({ key: null, direction: null });

    // Função para ordenar os dados
    const sortedData = useMemo(() => {
        if (!sortState.key || !sortState.direction) {
            return data;
        }

        return [...data].sort((a, b) => {
            const aValue = a[sortState.key as keyof T];
            const bValue = b[sortState.key as keyof T];

            // Tratamento para valores null/undefined
            if (aValue == null && bValue == null) return 0;
            if (aValue == null) return 1;
            if (bValue == null) return -1;

            // Comparação de strings
            if (typeof aValue === 'string' && typeof bValue === 'string') {
                const comparison = aValue.localeCompare(bValue, 'pt-BR', { sensitivity: 'base' });
                return sortState.direction === 'asc' ? comparison : -comparison;
            }

            // Comparação de números e datas
            if (aValue < bValue) return sortState.direction === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortState.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [data, sortState]);

    const totalPages = Math.ceil(sortedData.length / pageSize);
    const pageData = sortedData.slice(page * pageSize, (page + 1) * pageSize);

    const handleSort = (key: keyof T, sortable?: boolean) => {
        // Não ordena se sortable for false ou se a coluna tiver render (ações)
        if (sortable === false) return;

        setSortState(prevState => {
            if (prevState.key !== String(key)) {
                return { key: String(key), direction: 'asc' };
            }
            if (prevState.direction === 'asc') {
                return { key: String(key), direction: 'desc' };
            }
            return { key: null, direction: null };
        });
        setPage(0); // Resetar para a primeira página ao ordenar
    };

    const getSortIcon = (key: keyof T) => {
        if (sortState.key !== String(key)) {
            return <i className="bi bi-arrow-down-up ms-2 text-muted opacity-50"></i>;
        }
        if (sortState.direction === 'asc') {
            return <i className="bi bi-arrow-up ms-2"></i>;
        }
        return <i className="bi bi-arrow-down ms-2"></i>;
    };

    const handlePrev = () => setPage(p => Math.max(p - 1, 0));
    const handleNext = () => setPage(p => Math.min(p + 1, totalPages - 1));

    return (
        <div className="table-component">
            <div className="table-responsive">
                <table className="table table-hover table-striped mb-0">
                    <thead className="table-dark">
                        <tr>
                            {columns.map((col, colIndex) => {
                                const isSortable = col.sortable !== false;
                                return (
                                    <th
                                        key={`header-${String(col.key)}-${colIndex}`}
                                        className={`py-3 ${isSortable ? 'cursor-pointer user-select-none' : ''}`}
                                        onClick={() => isSortable && handleSort(col.key, col.sortable)}
                                        style={{ cursor: isSortable ? 'pointer' : 'default' }}
                                    >
                                        <div className="d-flex align-items-center">
                                            {col.title}
                                            {isSortable && getSortIcon(col.key)}
                                        </div>
                                    </th>
                                );
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {pageData.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="text-center py-4 text-muted">
                                    Nenhum registro encontrado
                                </td>
                            </tr>
                        ) : (
                            pageData.map((row) => (
                                <tr key={`row-${row.id}`}>
                                    {columns.map((col, colIndex) => (
                                        <td key={`cell-${row.id}-${String(col.key)}-${colIndex}`} className="py-3">
                                            {col.render ? col.render(row[col.key], row) : (row[col.key] as any)}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            {totalPages > 1 && (
                <div className="table-pagination d-flex justify-content-between align-items-center p-3 border-top bg-light">
                    <div className="text-muted small">
                        Mostrando {page * pageSize + 1} - {Math.min((page + 1) * pageSize, sortedData.length)} de {sortedData.length} registros
                    </div>
                    <div className="btn-group" role="group">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={handlePrev}
                            disabled={page === 0}
                        >
                            <i className="bi bi-chevron-left"></i> Anterior
                        </button>
                        <button className="btn btn-outline-secondary btn-sm" disabled>
                            Página {page + 1} de {totalPages}
                        </button>
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={handleNext}
                            disabled={page === totalPages - 1}
                        >
                            Próxima <i className="bi bi-chevron-right"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}