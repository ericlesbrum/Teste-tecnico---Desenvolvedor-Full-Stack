import axios from 'axios';
import type { PessoaDto } from '../dtos/PessoaDto';

const API_URL = 'https://localhost:7133/api/pessoas';

export async function listarPessoas(): Promise<PessoaDto[]> {
    const response = await axios.get<PessoaDto[]>(API_URL);
    return response.data;
}

export async function criarPessoa(pessoa: Omit<PessoaDto, 'id'>): Promise<void> {
    await axios.post(API_URL, pessoa);
}

export async function deletarPessoa(id: number): Promise<void> {
    await axios.delete(`${API_URL}/${id}`);
}
