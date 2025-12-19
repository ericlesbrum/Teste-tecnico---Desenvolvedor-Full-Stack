export interface TransacaoDto {
    id: number;
    descricao: string;
    valor: number;
    tipo: 'Despesa' | 'Receita';
    pessoaId: number;
    pessoaNome: string;
    categoriaId: number;
    categoriaDescricao: string;
}

export interface TransacaoCriarDto {
    descricao: string;
    valor: number;
    tipo: 1 | 2; // 1 = Despesa, 2 = Receita
    pessoaId: number;
    pessoaNome: string; // enviado vazio, backend preenche
    categoriaId: number;
    categoriaDescricao: string; // enviado vazio, backend preenche
}