using ControleGastos.Application.DTOs;

namespace ControleGastos.Application.Services.Interfaces;

public interface IPessoaService
{
    Task<PessoaDto> CriarAsync(PessoaDto pessoaDto);
    Task<List<PessoaDto>> ListarAsync();
    Task DeletarAsync(int id);
}
