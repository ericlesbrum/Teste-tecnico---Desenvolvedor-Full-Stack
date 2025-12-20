export interface DashboardTableItem {
    id: number | string;
    nome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface DashboardTableProps {
    title: string;
    linkTo: string;
    items: DashboardTableItem[];
    rowLimit?: number;
    headerClass?: string;
}