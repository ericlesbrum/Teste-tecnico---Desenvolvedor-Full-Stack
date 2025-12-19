using ControleGastos.Application.DTOs;
using ControleGastos.Application.Services.Interfaces;
using ControleGastos.Domain.Entities;
using ControleGastos.Infrastructure.Repositories.Interfaces;

namespace ControleGastos.Application.Services;

public class PessoaService : IPessoaService
{
    private readonly IPessoaRepository _repository;

    public PessoaService(IPessoaRepository repository)
    {
        _repository = repository;
    }

    public async Task<PessoaDto> CriarAsync(PessoaDto pessoaDto)
    {
        var pessoa = new Pessoa
        {
            Nome = pessoaDto.Nome,
            Idade = pessoaDto.Idade
        };

        var result = await _repository.CriarAsync(pessoa);

        return new PessoaDto
        {
            Id = result.Id,
            Nome = result.Nome,
            Idade = result.Idade
        };
    }

    public async Task<List<PessoaDto>> ListarAsync()
    {
        var pessoas = await _repository.ListarAsync();
        return pessoas.Select(p => new PessoaDto
        {
            Id = p.Id,
            Nome = p.Nome,
            Idade = p.Idade
        }).ToList();
    }

    public async Task DeletarAsync(int id)
    {
        var pessoa = await _repository.ObterPorIdAsync(id);
        if (pessoa != null)
        {
            await _repository.DeletarAsync(pessoa);
        }
    }
}
