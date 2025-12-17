using ControleGastos.Domain.Enums;

namespace ControleGastos.Domain.Entities;

public class Transacao
{
    public int Id { get; set; }
    public string Descricao { get; set; } = string.Empty;
    public decimal Valor { get; set; }
    public TipoTransacaoEnum Tipo { get; set; }

    public int PessoaId { get; set; }
    public Pessoa Pessoa { get; set; } = null!;

    public int CategoriaId { get; set; }
    public Categoria Categoria { get; set; } = null!;

}
