import axios from 'axios';
import type { CategoriaCriarDto, CategoriaDto } from '../dtos/CategoriaDto';

const API_URL = 'https://localhost:7133/api/categorias';

export async function listarCategorias(): Promise<CategoriaDto[]> {
    const response = await axios.get<CategoriaDto[]>(API_URL);
    return response.data;
}

export async function criarCategoria(categoria: CategoriaCriarDto): Promise<void> {
    await axios.post(API_URL, {
        descricao: categoria.descricao,
        finalidade: categoria.finalidade
    });
}
