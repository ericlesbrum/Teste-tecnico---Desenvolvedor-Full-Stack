using ControleGastos.Domain.Entities;
using ControleGastos.Infrastructure.Data;
using ControleGastos.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Infrastructure.Repositories;

public class CategoriaRepository : ICategoriaRepository
{
    private readonly AppDbContext _context;

    public CategoriaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<Categoria> CriarAsync(Categoria categoria)
    {
        _context.Categorias.Add(categoria);
        await _context.SaveChangesAsync();
        return categoria;
    }

    public async Task<List<Categoria>> ListarAsync()
    {
        return await _context.Categorias.Include(c => c.Transacoes).ToListAsync();
    }

    public async Task<Categoria?> ObterPorIdAsync(int id)
    {
        return await _context.Categorias.FirstOrDefaultAsync(c => c.Id == id);
    }
}