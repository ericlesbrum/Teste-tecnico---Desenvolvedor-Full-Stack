import { useEffect, useState, type FormEvent } from 'react';
import { Table, type Column } from '../components/Table';
import { criarPessoa, deletarPessoa, listarPessoas } from '../services/pessoaService';
import type { PessoaDto } from '../dtos/PessoaDto';
import { Form } from '../components/Form';

export function PessoasPage() {
    const [pessoas, setPessoas] = useState<PessoaDto[]>([]);
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState(0);

    const carregar = async () => setPessoas(await listarPessoas());

    useEffect(() => { carregar(); }, []);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await criarPessoa({ nome, idade });
        setNome(''); setIdade(0);
        carregar();
    };

    const handleDelete = async (id: number) => { await deletarPessoa(id); carregar(); };

    const columns: Column<PessoaDto>[] = [
        { key: 'id', title: 'ID' },
        { key: 'nome', title: 'Nome' },
        { key: 'idade', title: 'Idade' },
        { key: 'id', title: 'Ações', render: (_, row) => <button onClick={() => handleDelete(row.id)}>Deletar</button> }
    ];

    return (
        <div>
            <h2>Pessoas</h2>
            <Form onSubmit={handleSubmit}>
                <input placeholder="Nome" value={nome} onChange={e => setNome(e.target.value)} />
                <input type="number" placeholder="Idade" value={idade} onChange={e => setIdade(Number(e.target.value))} />
                <button type="submit">Adicionar</button>
            </Form>
            <Table columns={columns} data={pessoas} pageSize={5} />
        </div>
    );
}
