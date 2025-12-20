import { useState, useEffect, type FormEvent } from 'react';
import { listarCategorias, criarCategoria } from '../services/categoriaService';
import type { CategoriaDto } from '../dtos/CategoriaDto';
import { useToasty } from './useToasty';

export function useCategorias() {
    const { success, error, warning } = useToasty();
    const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<1 | 2 | 3>(1);
    const [loading, setLoading] = useState(false);

    const carregar = async () => {
        try {
            setLoading(true);
            const data = await listarCategorias();
            setCategorias(data);
        } catch {
            error('Erro ao carregar categorias');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        carregar();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!descricao.trim()) {
            warning('Preencha a descrição');
            return;
        }

        try {
            await criarCategoria({ descricao: descricao.trim(), finalidade });
            success('Categoria criada com sucesso!');
            setDescricao('');
            setFinalidade(1);
            carregar();
        } catch (err) {
            console.error(err);
            error('Erro ao criar categoria');
        }
    };

    const obterTextoFinalidade = (finalidade: string | number) => {
        const valor = String(finalidade);
        switch (valor) {
            case 'Despesa':
            case '1': return 'Despesa';
            case 'Receita':
            case '2': return 'Receita';
            case 'Ambas':
            case '3': return 'Ambas';
            default: return valor;
        }
    };

    return {
        categorias,
        descricao,
        finalidade,
        loading,
        setDescricao,
        setFinalidade,
        handleSubmit,
        obterTextoFinalidade,
        carregar
    };
}
