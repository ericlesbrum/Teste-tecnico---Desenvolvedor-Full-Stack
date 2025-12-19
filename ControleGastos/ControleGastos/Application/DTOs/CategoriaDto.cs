using ControleGastos.Domain.Enums;

namespace ControleGastos.Application.DTOs;

public class CategoriaDto
{
    public int Id { get; set; }
    public string? Descricao { get; set; }
    public FinalidadeCategoriaEnum Finalidade { get; set; }
}
