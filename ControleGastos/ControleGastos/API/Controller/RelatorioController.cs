using ControleGastos.Application.Services;
using ControleGastos.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controller
{
    [ApiController]
    [Route("api/relatorios")]
    public class RelatorioController : ControllerBase
    {
        private readonly RelatorioService _service;
        public RelatorioController(RelatorioService service)
        {
            _service = service;
        }

        [HttpGet("pessoas")]
        public async Task<IActionResult> TotaisPorPessoa()
        {
            var resultado = await _service.TotaisPorPessoaAsync();
            return Ok(resultado);
        }
    }
}
