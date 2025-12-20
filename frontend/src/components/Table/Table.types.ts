export interface Column<T> {
    key: keyof T;
    title: string;
    render?: (value: any, row: T) => React.ReactNode;
    sortable?: boolean;
}

export interface TableProps<T> {
    columns: Column<T>[];
    data: T[];
    pageSize?: number;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortState {
    key: string | null;
    direction: SortDirection;
}