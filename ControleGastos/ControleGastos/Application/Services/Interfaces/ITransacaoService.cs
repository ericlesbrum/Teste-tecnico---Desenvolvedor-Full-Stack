using ControleGastos.Application.DTOs;

namespace ControleGastos.Application.Services.Interfaces;

public interface ITransacaoService
{
    Task<TransacaoDto> CriarAsync(TransacaoDto transacaoDto);
    Task<List<TransacaoDto>> ListarAsync();
}
