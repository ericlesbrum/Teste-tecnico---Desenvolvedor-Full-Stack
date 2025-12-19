import { useState, type ReactNode } from 'react';

// Interface que garante que cada item tenha 'id'
export interface HasId {
    id: number;
}

export interface Column<T extends HasId> {
    key: keyof T;
    title: string;
    render?: (value: T[keyof T], row: T) => ReactNode;
}

interface TableProps<T extends HasId> {
    columns: Column<T>[];
    data: T[];
    pageSize?: number;
}

export function Table<T extends HasId>({ columns, data, pageSize = 10 }: TableProps<T>) {
    const [page, setPage] = useState(0);
    const totalPages = Math.ceil(data.length / pageSize);

    const pageData = data.slice(page * pageSize, (page + 1) * pageSize);

    const handlePrev = () => setPage(p => Math.max(p - 1, 0));
    const handleNext = () => setPage(p => Math.min(p + 1, totalPages - 1));

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {columns.map((col, colIndex) => (
                            <th key={`header-${String(col.key)}-${colIndex}`}>{col.title}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pageData.map((row) => (
                        <tr key={`row-${row.id}`}>
                            {columns.map((col, colIndex) => (
                                <td key={`cell-${row.id}-${String(col.key)}-${colIndex}`}>
                                    {col.render ? col.render(row[col.key], row) : (row[col.key] as ReactNode)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalPages > 1 && (
                <div>
                    <button onClick={handlePrev} disabled={page === 0}>Prev</button>
                    <span>{page + 1} / {totalPages}</span>
                    <button onClick={handleNext} disabled={page === totalPages - 1}>Next</button>
                </div>
            )}
        </div>
    );
}
