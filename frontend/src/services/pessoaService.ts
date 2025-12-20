import type { PessoaDto } from '../dtos/PessoaDto';
import * as api from './apiService';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/pessoas';

export async function listarPessoas(): Promise<PessoaDto[]> {
    return api.get<PessoaDto[]>(API_URL);
}

export async function criarPessoa(pessoa: Omit<PessoaDto, 'id'>): Promise<void> {
    return api.post(API_URL, pessoa);
}

export async function deletarPessoa(id: number): Promise<void> {
    return api.del(`${API_URL}/${id}`);
}
