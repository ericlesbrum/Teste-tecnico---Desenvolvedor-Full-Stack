using ControleGastos.Domain.Entities;

namespace ControleGastos.Infrastructure.Repositories.Interfaces;

public interface ICategoriaRepository
{
    Task<Categoria> CriarAsync(Categoria categoria);
    Task<List<Categoria>> ListarAsync();
    Task<Categoria?> ObterPorIdAsync(int id);
}
