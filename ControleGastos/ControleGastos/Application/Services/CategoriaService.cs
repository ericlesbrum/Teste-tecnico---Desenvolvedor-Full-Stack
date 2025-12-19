using ControleGastos.Application.DTOs;
using ControleGastos.Application.Services.Interfaces;
using ControleGastos.Domain.Entities;
using ControleGastos.Infrastructure.Repositories.Interfaces;

namespace ControleGastos.Application.Services;

public class CategoriaService : ICategoriaService
{
    private readonly ICategoriaRepository _repository;

    public CategoriaService(ICategoriaRepository repository)
    {
        _repository = repository;
    }

    public async Task<CategoriaDto> CriarAsync(CategoriaDto categoriaDto)
    {
        var categoria = new Categoria
        {
            Descricao = categoriaDto.Descricao,
            Finalidade = categoriaDto.Finalidade
        };

        var result = await _repository.CriarAsync(categoria);

        return new CategoriaDto
        {
            Id = result.Id,
            Descricao = result.Descricao,
            Finalidade = result.Finalidade
        };
    }

    public async Task<List<CategoriaDto>> ListarAsync()
    {
        var categorias = await _repository.ListarAsync();
        return categorias.Select(c => new CategoriaDto
        {
            Id = c.Id,
            Descricao = c.Descricao,
            Finalidade = c.Finalidade
        }).ToList();
    }
}
