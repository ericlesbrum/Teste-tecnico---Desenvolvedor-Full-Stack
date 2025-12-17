using ControleGastos.Application.Services;
using ControleGastos.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace ControleGastos.API.Controller
{
    [ApiController]
    [Route("api/categorias")]
    public class CategoriaController : ControllerBase
    {
        private readonly CategoriaService _service;

        public CategoriaController(CategoriaService service)
        {
            _service = service;
        }

        [HttpPost]
        public async Task<IActionResult> Criar(Categoria categoria)
            => Ok(await _service.CriarAsync(categoria));

        [HttpGet]
        public async Task<IActionResult> Listar()
            => Ok(await _service.ListarAsync());

    }
}
