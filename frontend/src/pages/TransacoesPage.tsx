import { useEffect, useState, type FormEvent } from 'react';
import { Table, type Column } from '../components/Table';
import { Form } from '../components/Form';
import { listarTransacoes, criarTransacao } from '../services/transacaoService';
import { listarPessoas } from '../services/pessoaService';
import { listarCategorias } from '../services/categoriaService';
import type { TransacaoDto, TransacaoCriarDto } from '../dtos/TransacaoDto';
import type { PessoaDto } from '../dtos/PessoaDto';
import type { CategoriaDto } from '../dtos/CategoriaDto';

export function TransacoesPage() {
    const [transacoes, setTransacoes] = useState<TransacaoDto[]>([]);
    const [pessoas, setPessoas] = useState<PessoaDto[]>([]);
    const [categorias, setCategorias] = useState<CategoriaDto[]>([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);
    const [tipo, setTipo] = useState<1 | 2>(1);
    const [pessoaId, setPessoaId] = useState(0);
    const [categoriaId, setCategoriaId] = useState(0);

    const carregar = async () => {
        setTransacoes(await listarTransacoes());
        setPessoas(await listarPessoas());
        setCategorias(await listarCategorias());
    };

    useEffect(() => { carregar(); }, []);

    // Filtra categorias de acordo com o tipo selecionado (1 = Despesa, 2 = Receita)
    const categoriasFiltradas = categorias.filter(c =>
        Number(c.finalidade) === tipo || Number(c.finalidade) === 3
    );

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!descricao.trim() || valor <= 0 || pessoaId === 0 || categoriaId === 0) {
            alert('Preencha todos os campos corretamente.');
            return;
        }

        const payload: TransacaoCriarDto = {
            descricao: descricao.trim(),
            valor,
            tipo,
            pessoaId,
            pessoaNome: '',
            categoriaId,
            categoriaDescricao: ''
        };

        try {
            await criarTransacao(payload);
            setDescricao('');
            setValor(0);
            setTipo(1);
            setPessoaId(0);
            setCategoriaId(0);
            await carregar();
        } catch (error: any) {
            const mensagem = error.response?.data || error.message || 'Erro ao criar transação';
            alert(mensagem);
        }
    };

    const columns: Column<TransacaoDto>[] = [
        { key: 'id', title: 'ID' },
        { key: 'descricao', title: 'Descrição' },
        { key: 'valor', title: 'Valor' },
        { key: 'tipo', title: 'Tipo', render: (value) => value === 1 ? 'Despesa' : 'Receita' },
        { key: 'pessoaNome', title: 'Pessoa' },
        { key: 'categoriaDescricao', title: 'Categoria' },
    ];

    return (
        <div>
            <h2>Transações</h2>
            <Form onSubmit={handleSubmit}>
                <label>
                    Descrição:
                    <input
                        value={descricao}
                        onChange={e => setDescricao(e.target.value)}
                        placeholder="Descrição"
                        required
                    />
                </label>
                <label>
                    Valor:
                    <input
                        type="number"
                        value={valor}
                        onChange={e => setValor(Number(e.target.value))}
                        placeholder="Valor"
                        min={0.01}
                        step={0.01}
                        required
                    />
                </label>
                <label>
                    Tipo:
                    <select
                        value={tipo}
                        onChange={e => setTipo(Number(e.target.value) as 1 | 2)}
                        required
                    >
                        <option value={1}>Despesa</option>
                        <option value={2}>Receita</option>
                    </select>
                </label>
                <label>
                    Pessoa:
                    <select
                        value={pessoaId}
                        onChange={e => setPessoaId(Number(e.target.value))}
                        required
                    >
                        <option value={0} disabled>Selecione Pessoa</option>
                        {pessoas.map(p => <option key={p.id} value={p.id}>{p.nome}</option>)}
                    </select>
                </label>
                <label>
                    Categoria:
                    <select
                        value={categoriaId}
                        onChange={e => setCategoriaId(Number(e.target.value))}
                        required
                    >
                        <option value={0} disabled>Selecione Categoria</option>
                        {categoriasFiltradas.map(c => <option key={c.id} value={c.id}>{c.descricao}</option>)}
                    </select>
                </label>
                <button type="submit">Adicionar</button>
            </Form>

            <Table columns={columns} data={transacoes} pageSize={5} />
        </div>
    );
}
