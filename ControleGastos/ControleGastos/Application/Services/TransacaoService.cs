using ControleGastos.Domain.Entities;
using ControleGastos.Domain.Enums;
using ControleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Application.Services;

public class TransacaoService
{
    private readonly AppDbContext _context;

    public TransacaoService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Transacao> CriarAsync(Transacao transacao)
    {
        var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId)
            ?? throw new Exception("Pessoa não encontrada");

        var categoria = await _context.Categorias.FindAsync(transacao.CategoriaId)
            ?? throw new Exception("Categoria não encontrada");

        // Regra: menor de idade só pode ter despesa
        if (pessoa.Idade < 18 && transacao.Tipo == TipoTransacaoEnum.Receita)
            throw new Exception("Menor de idade não pode registrar receita");

        // Regra: categoria deve respeitar finalidade
        if (categoria.Finalidade != FinalidadeCategoriaEnum.Ambas &&
            (int)categoria.Finalidade != (int)transacao.Tipo)
            throw new Exception("Categoria incompatível com tipo da transação");

        _context.Transacoes.Add(transacao);
        await _context.SaveChangesAsync();

        return transacao;
    }

    public async Task<List<Transacao>> ListarAsync()
    {
        return await _context.Transacoes
            .Include(t => t.Pessoa)
            .Include(t => t.Categoria)
            .AsNoTracking()
            .ToListAsync();
    }
}
