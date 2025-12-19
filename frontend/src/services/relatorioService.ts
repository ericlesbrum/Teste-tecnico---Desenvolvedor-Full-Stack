import axios from 'axios';
import type { RelatorioPessoaDto, RelatorioCategoriaDto, RelatorioGeralDto } from '../dtos/RelatorioDto';

const API_URL = 'https://localhost:7133/api/relatorios';

export async function obterTotaisPorPessoa(): Promise<RelatorioGeralDto<RelatorioPessoaDto>> {
    const response = await axios.get<RelatorioGeralDto<RelatorioPessoaDto>>(`${API_URL}/pessoas`);
    return response.data;
}

export async function obterTotaisPorCategoria(): Promise<RelatorioGeralDto<RelatorioCategoriaDto>> {
    const response = await axios.get<RelatorioGeralDto<RelatorioCategoriaDto>>(`${API_URL}/categorias`);
    return response.data;
}