import { useEffect, useState, type FormEvent } from 'react';
import { Table, type Column } from '../components/Table';
import { Form } from '../components/Form';
import { listarCategorias, criarCategoria } from '../services/categoriaService';
import type { CategoriaDto } from '../dtos/CategoriaDto';

export function CategoriasPage() {
    const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
    const [descricao, setDescricao] = useState('');
    const [finalidade, setFinalidade] = useState<1 | 2 | 3>(1); // 1 = Despesa, 2 = Receita, 3 = Ambas

    const carregar = async () => {
        const data = await listarCategorias();
        setCategorias(data);
    };

    useEffect(() => {
        carregar();
    }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!descricao.trim()) return;
        try {
            await criarCategoria({ descricao: descricao.trim(), finalidade });
            setDescricao('');
            setFinalidade(1);
            carregar();
        } catch (error: any) {
            console.error('Erro ao criar categoria:', error);
            alert('Erro ao criar categoria: ' + (error.response?.data?.message || error.message));
        }
    };

    const obterTextoFinalidade = (finalidade: string | number): string => {
        const valor = String(finalidade);
        switch (valor) {
            case 'Despesa':
            case '1':
                return 'Despesa';
            case 'Receita':
            case '2':
                return 'Receita';
            case 'Ambas':
            case '3':
                return 'Ambas';
            default:
                return valor;
        }
    };

    const columns: Column<CategoriaDto>[] = [
        { key: 'id', title: 'ID' },
        { key: 'descricao', title: 'Descrição' },
        {
            key: 'finalidade',
            title: 'Finalidade',
            render: (value) => obterTextoFinalidade(value as string | number)
        },
    ];

    return (
        <div>
            <h2>Categorias</h2>
            <Form onSubmit={handleSubmit}>
                <input
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    placeholder="Descrição"
                    required
                />
                <select
                    value={finalidade}
                    onChange={e => setFinalidade(Number(e.target.value) as 1 | 2 | 3)}
                    required
                >
                    <option value={1}>Despesa</option>
                    <option value={2}>Receita</option>
                    <option value={3}>Ambas</option>
                </select>
                <button type="submit">Adicionar</button>
            </Form>
            <Table columns={columns} data={categorias} pageSize={5} />
        </div>
    );
}