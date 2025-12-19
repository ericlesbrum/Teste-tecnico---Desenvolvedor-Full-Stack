import { useEffect, useState } from 'react';
import { listarPessoas } from '../services/pessoaService';
import { listarCategorias } from '../services/categoriaService';
import { listarTransacoes } from '../services/transacaoService';
import type { PessoaDto } from '../dtos/PessoaDto';
import type { CategoriaDto } from '../dtos/CategoriaDto';
import type { TransacaoDto } from '../dtos/TransacaoDto';

export function DashboardPage() {
    const [pessoas, setPessoas] = useState<PessoaDto[]>([]);
    const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
    const [transacoes, setTransacoes] = useState<TransacaoDto[]>([]);

    const carregar = async () => {
        setPessoas(await listarPessoas());
        setCategorias(await listarCategorias());
        setTransacoes(await listarTransacoes());
    };

    useEffect(() => { carregar(); }, []);

    return (
        <div>
            <h2>Dashboard</h2>
            <p>Total Pessoas: {pessoas.length}</p>
            <p>Total Categorias: {categorias.length}</p>
            <p>Total Transações: {transacoes.length}</p>
        </div>
    );
}
