using ControleGastos.Domain.Entities;

namespace ControleGastos.Infrastructure.Repositories.Interfaces;

public interface ITransacaoRepository
{
    Task<Transacao> CriarAsync(Transacao transacao);
    Task<List<Transacao>> ListarAsync();
}
