using ControleGastos.Application.DTOs;
using ControleGastos.Application.Services.Interfaces;
using ControleGastos.Domain.Enums;
using ControleGastos.Infrastructure.Repositories.Interfaces;

namespace ControleGastos.Application.Services
{
    public class RelatorioService : IRelatorioService
    {
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ICategoriaRepository _categoriaRepository;

        public RelatorioService(IPessoaRepository pessoaRepository, ICategoriaRepository categoriaRepository)
        {
            _pessoaRepository = pessoaRepository;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<RelatorioGeralDto<RelatorioPessoaDto>> TotaisPorPessoaAsync()
        {
            var pessoas = await _pessoaRepository.ListarAsync();

            var lista = pessoas.Select(p =>
            {
                var totalReceitas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacaoEnum.Receita)
                    .Sum(t => t.Valor);

                var totalDespesas = p.Transacoes
                    .Where(t => t.Tipo == TipoTransacaoEnum.Despesa)
                    .Sum(t => t.Valor);

                return new RelatorioPessoaDto
                {
                    PessoaId = p.Id,
                    PessoaNome = p.Nome,
                    TotalReceitas = totalReceitas,
                    TotalDespesas = totalDespesas,
                    Saldo = totalReceitas - totalDespesas
                };
            }).ToList();

            return new RelatorioGeralDto<RelatorioPessoaDto>
            {
                Itens = lista,
                TotalReceitas = lista.Sum(x => x.TotalReceitas),
                TotalDespesas = lista.Sum(x => x.TotalDespesas),
                Saldo = lista.Sum(x => x.Saldo)
            };
        }

        public async Task<RelatorioGeralDto<RelatorioCategoriaDto>> TotaisPorCategoriaAsync()
        {
            var categorias = await _categoriaRepository.ListarAsync();

            var lista = categorias.Select(c =>
            {
                var totalReceitas = c.Transacoes
                    .Where(t => t.Tipo == TipoTransacaoEnum.Receita)
                    .Sum(t => t.Valor);

                var totalDespesas = c.Transacoes
                    .Where(t => t.Tipo == TipoTransacaoEnum.Despesa)
                    .Sum(t => t.Valor);

                return new RelatorioCategoriaDto
                {
                    CategoriaId = c.Id,
                    CategoriaDescricao = c.Descricao,
                    TotalReceitas = totalReceitas,
                    TotalDespesas = totalDespesas,
                    Saldo = totalReceitas - totalDespesas
                };
            }).ToList();

            return new RelatorioGeralDto<RelatorioCategoriaDto>
            {
                Itens = lista,
                TotalReceitas = lista.Sum(x => x.TotalReceitas),
                TotalDespesas = lista.Sum(x => x.TotalDespesas),
                Saldo = lista.Sum(x => x.Saldo)
            };
        }
    }
}
