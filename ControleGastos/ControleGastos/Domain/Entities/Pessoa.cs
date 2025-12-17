namespace ControleGastos.Domain.Entities;

public class Pessoa
{
    public int Id { get; set; } // Identificador único
    public string Nome { get; set; } = string.Empty;
    public int Idade { get; set; }

    // Relacionamento
    public ICollection<Transacao> Transacoes { get; set; } = new List<Transacao>();
}
