export interface TabelaRelatorioItem {
    id: string | number;
    label: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface TabelaRelatorioProps {
    itens: TabelaRelatorioItem[];
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
    formatarMoeda: (valor: number) => string;
    labelHeader: string;
    icon: string;
    emptyMessage?: string;
}