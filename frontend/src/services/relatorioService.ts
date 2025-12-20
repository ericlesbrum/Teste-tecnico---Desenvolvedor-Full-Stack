import type { RelatorioPessoaDto, RelatorioCategoriaDto, RelatorioGeralDto } from '../dtos/RelatorioDto';
import * as api from './apiService';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/relatorios';

export async function obterTotaisPorPessoa(): Promise<RelatorioGeralDto<RelatorioPessoaDto>> {
    return api.get<RelatorioGeralDto<RelatorioPessoaDto>>(`${API_URL}/pessoas`);
}

export async function obterTotaisPorCategoria(): Promise<RelatorioGeralDto<RelatorioCategoriaDto>> {
    return api.get<RelatorioGeralDto<RelatorioCategoriaDto>>(`${API_URL}/categorias`);
}
