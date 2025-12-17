using ControleGastos.Domain.Enums;
using ControleGastos.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Application.Services;

public class RelatorioService
{
    private readonly AppDbContext _context;

    public RelatorioService(AppDbContext context)
    {
        _context = context;
    }

    public async Task<object> TotaisPorPessoaAsync()
    {
        var pessoas = await _context.Pessoas
            .Include(p => p.Transacoes)
            .ToListAsync();

        var resultado = pessoas.Select(p =>
        {
            var receitas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacaoEnum.Receita)
                .Sum(t => t.Valor);

            var despesas = p.Transacoes
                .Where(t => t.Tipo == TipoTransacaoEnum.Despesa)
                .Sum(t => t.Valor);

            return new
            {
                p.Id,
                p.Nome,
                TotalReceitas = receitas,
                TotalDespesas = despesas,
                Saldo = receitas - despesas
            };
        }).ToList();

        return new
        {
            Pessoas = resultado,
            TotalGeralReceitas = resultado.Sum(x => x.TotalReceitas),
            TotalGeralDespesas = resultado.Sum(x => x.TotalDespesas),
            SaldoGeral = resultado.Sum(x => x.Saldo)
        };
    }
}
