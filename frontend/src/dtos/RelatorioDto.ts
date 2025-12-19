export interface RelatorioPessoaDto {
    pessoaId: number;
    pessoaNome: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioCategoriaDto {
    categoriaId: number;
    categoriaDescricao: string;
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}

export interface RelatorioGeralDto<T> {
    itens: T[];
    totalReceitas: number;
    totalDespesas: number;
    saldo: number;
}