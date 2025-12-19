using ControleGastos.Application.DTOs;
using ControleGastos.Application.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controllers
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriaController : ControllerBase
    {
        private readonly ICategoriaService _service;

        public CategoriaController(ICategoriaService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Criar([FromBody] CategoriaDto dto)
        {
            if (string.IsNullOrWhiteSpace(dto.Descricao))
                return BadRequest("Descrição inválida.");

            var categoria = await _service.CriarAsync(dto);
            return CreatedAtAction(nameof(ObterPorId), new { id = categoria.Id }, categoria);
        }

        [HttpGet]
        public async Task<IActionResult> Listar()
        {
            var categorias = await _service.ListarAsync();
            return Ok(categorias);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> ObterPorId(int id)
        {
            var categoria = (await _service.ListarAsync()).FirstOrDefault(c => c.Id == id);
            if (categoria == null) return NotFound();
            return Ok(categoria);
        }
    }
}
