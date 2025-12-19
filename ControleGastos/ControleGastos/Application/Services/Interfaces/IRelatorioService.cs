using ControleGastos.Application.DTOs;

namespace ControleGastos.Application.Services.Interfaces;

public interface IRelatorioService
{
    Task<RelatorioGeralDto<RelatorioPessoaDto>> TotaisPorPessoaAsync();
    Task<RelatorioGeralDto<RelatorioCategoriaDto>> TotaisPorCategoriaAsync();
}
