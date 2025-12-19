import axios from 'axios';
import type { TransacaoDto, TransacaoCriarDto } from '../dtos/TransacaoDto';

const API_URL = 'https://localhost:7133/api/transacoes';

export async function listarTransacoes(): Promise<TransacaoDto[]> {
    const response = await axios.get<TransacaoDto[]>(API_URL);
    return response.data;
}

export async function criarTransacao(transacao: TransacaoCriarDto): Promise<void> {
    await axios.post(API_URL, transacao);
}
