using ControleGastos.Domain.Entities;

namespace ControleGastos.Infrastructure.Repositories.Interfaces;

public interface IPessoaRepository
{
    Task<Pessoa> CriarAsync(Pessoa pessoa);
    Task<List<Pessoa>> ListarAsync();
    Task<Pessoa?> ObterPorIdAsync(int id);
    Task DeletarAsync(Pessoa pessoa);
}
