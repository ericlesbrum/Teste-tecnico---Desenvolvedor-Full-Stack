
using ControleGastos.Application.Services;
using ControleGastos.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controller
{
    [ApiController]
    [Route("api/pessoas")]
    public class PessoaController : ControllerBase
    {
        private readonly PessoaService _service;
        public PessoaController(PessoaService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Criar(Pessoa pessoa)
            => Ok(await _service.CriarAsync(pessoa));

        [HttpGet]
        public async Task<IActionResult> Listar()
            => Ok(await _service.ListarAsync());

        [HttpDelete("{id}")]
        public async Task<IActionResult> Deletar(int id)
        {
            await _service.DeletarAsync(id);
            return NoContent();
        }
    }
}
