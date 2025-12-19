export interface CategoriaDto {
    id: number;
    descricao: string;
    finalidade: 'Despesa' | 'Receita' | 'Ambas';
}

export interface CategoriaCriarDto {
    descricao: string;
    finalidade: 1 | 2 | 3;
}