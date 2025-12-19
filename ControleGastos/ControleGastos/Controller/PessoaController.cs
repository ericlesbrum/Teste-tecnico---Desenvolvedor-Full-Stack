using ControleGastos.Application.DTOs;
using ControleGastos.Application.Services;
using ControleGastos.Application.Services.Interfaces;
using ControleGastos.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.Controller;

[ApiController]
[Route("api/pessoas")]
public class PessoaController : ControllerBase
{
    private readonly IPessoaService _service;

    public PessoaController(IPessoaService service)
    {
        _service = service;
    }

    [HttpPost]
    public async Task<IActionResult> Criar([FromBody] PessoaDto dto)
    {
        if (string.IsNullOrWhiteSpace(dto.Nome) || dto.Idade < 0)
            return BadRequest("Nome inválido ou idade negativa.");

        var pessoa = await _service.CriarAsync(dto);
        return CreatedAtAction(nameof(ObterPorId), new { id = pessoa.Id }, pessoa);
    }

    [HttpGet]
    public async Task<IActionResult> Listar()
    {
        var pessoas = await _service.ListarAsync();
        return Ok(pessoas);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> ObterPorId(int id)
    {
        var pessoa = (await _service.ListarAsync()).FirstOrDefault(p => p.Id == id);
        if (pessoa == null) return NotFound();
        return Ok(pessoa);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Deletar(int id)
    {
        await _service.DeletarAsync(id);
        return NoContent();
    }
}