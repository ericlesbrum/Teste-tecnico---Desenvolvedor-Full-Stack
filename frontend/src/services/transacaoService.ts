import type { TransacaoDto, TransacaoCriarDto } from '../dtos/TransacaoDto';
import * as api from './apiService';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/transacoes';

export async function listarTransacoes(): Promise<TransacaoDto[]> {
    return api.get<TransacaoDto[]>(API_URL);
}

export async function criarTransacao(transacao: TransacaoCriarDto): Promise<void> {
    return api.post(API_URL, transacao);
}
