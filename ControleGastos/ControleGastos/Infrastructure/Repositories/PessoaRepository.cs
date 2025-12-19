using ControleGastos.Domain.Entities;
using ControleGastos.Infrastructure.Data;
using ControleGastos.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Infrastructure.Repositories;

public class PessoaRepository : IPessoaRepository
{
    private readonly AppDbContext _context;

    public PessoaRepository(AppDbContext context)
    {
        _context = context;
    }
    public async Task<Pessoa> CriarAsync(Pessoa pessoa)
    {
        _context.Pessoas.Add(pessoa);
        await _context.SaveChangesAsync();
        return pessoa;
    }

    public async Task<List<Pessoa>> ListarAsync()
    {
        return await _context.Pessoas.Include(p => p.Transacoes).ToListAsync();
    }

    public async Task<Pessoa?> ObterPorIdAsync(int id)
    {
        return await _context.Pessoas
            .Include(p => p.Transacoes)
            .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task DeletarAsync(Pessoa pessoa)
    {
        _context.Pessoas.Remove(pessoa);
        await _context.SaveChangesAsync();
    }
}
