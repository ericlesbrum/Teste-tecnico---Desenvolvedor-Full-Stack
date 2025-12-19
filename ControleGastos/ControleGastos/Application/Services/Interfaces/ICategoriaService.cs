using ControleGastos.Application.DTOs;

namespace ControleGastos.Application.Services.Interfaces;

public interface ICategoriaService
{
    Task<CategoriaDto> CriarAsync(CategoriaDto categoriaDto);
    Task<List<CategoriaDto>> ListarAsync();
}
