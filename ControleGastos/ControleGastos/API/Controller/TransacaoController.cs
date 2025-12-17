using ControleGastos.Application.Services;
using ControleGastos.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controller
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacaoController : ControllerBase
    {
        private readonly TransacaoService _service;

        public TransacaoController(TransacaoService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Criar(Transacao transacao)
            => Ok(await _service.CriarAsync(transacao));

        [HttpGet]
        public async Task<IActionResult> Listar()
            => Ok(await _service.ListarAsync());

    }
}
