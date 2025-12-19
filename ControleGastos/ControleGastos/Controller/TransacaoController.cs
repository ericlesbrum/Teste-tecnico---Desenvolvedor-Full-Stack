using ControleGastos.Application.DTOs;
using ControleGastos.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers
{
    [ApiController]
    [Route("api/transacoes")]
    public class TransacaoController : ControllerBase
    {
        private readonly ITransacaoService _service;

        public TransacaoController(ITransacaoService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] TransacaoDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Descricao) || dto.Valor <= 0)
                return BadRequest("Descrição inválida ou valor deve ser maior que 0.");

            try
            {
                var transacao = await _service.CriarAsync(dto);
                return CreatedAtAction(nameof(ObterPorId), new { id = transacao.Id }, transacao);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var transacoes = await _service.ListarAsync();
            return Ok(transacoes);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var transacao = (await _service.ListarAsync()).FirstOrDefault(t => t.Id == id);
            if (transacao == null) return NotFound();
            return Ok(transacao);
        }
    }
}
