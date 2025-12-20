import type { CategoriaCriarDto, CategoriaDto } from '../dtos/CategoriaDto';
import * as api from './apiService';

const API_URL = import.meta.env.VITE_API_BASE_URL + '/categorias';

export async function listarCategorias(): Promise<CategoriaDto[]> {
    return api.get<CategoriaDto[]>(API_URL);
}

export async function criarCategoria(categoria: CategoriaCriarDto): Promise<void> {
    return api.post(API_URL, categoria);
}
