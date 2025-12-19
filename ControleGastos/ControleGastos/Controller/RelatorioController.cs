using ControleGastos.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers
{
    [ApiController]
    [Route("api/relatorios")]
    public class RelatorioController : ControllerBase
    {
        private readonly IRelatorioService _service;

        public RelatorioController(IRelatorioService service)
        {
            _service = service;
        }

        [HttpGet("pessoas")]
        public async Task<IActionResult> TotaisPorPessoa()
        {
            var resultado = await _service.TotaisPorPessoaAsync();
            return Ok(resultado);
        }

        [HttpGet("categorias")]
        public async Task<IActionResult> TotaisPorCategoria()
        {
            var resultado = await _service.TotaisPorCategoriaAsync();
            return Ok(resultado);
        }
    }
}
