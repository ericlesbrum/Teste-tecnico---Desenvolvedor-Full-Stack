using ControleGastos.Application.DTOs;
using ControleGastos.Application.Services.Interfaces;
using ControleGastos.Domain.Entities;
using ControleGastos.Domain.Enums;
using ControleGastos.Infrastructure.Repositories.Interfaces;

namespace ControleGastos.Application.Services
{
    public class TransacaoService : ITransacaoService
    {
        private readonly ITransacaoRepository _transacaoRepository;
        private readonly IPessoaRepository _pessoaRepository;
        private readonly ICategoriaRepository _categoriaRepository;

        public TransacaoService(
            ITransacaoRepository transacaoRepository,
            IPessoaRepository pessoaRepository,
            ICategoriaRepository categoriaRepository)
        {
            _transacaoRepository = transacaoRepository;
            _pessoaRepository = pessoaRepository;
            _categoriaRepository = categoriaRepository;
        }

        public async Task<TransacaoDto> CriarAsync(TransacaoDto dto)
        {
            var pessoa = await _pessoaRepository.ObterPorIdAsync(dto.PessoaId)
                ?? throw new Exception("Pessoa não encontrada");

            var categoria = await _categoriaRepository.ObterPorIdAsync(dto.CategoriaId)
                ?? throw new Exception("Categoria não encontrada");

            // Regra: menor de idade só pode registrar despesa
            if (pessoa.Idade < 18 && dto.Tipo == TipoTransacaoEnum.Receita)
                throw new Exception("Menor de idade não pode registrar receita");

            // Regra: categoria deve respeitar finalidade
            if (categoria.Finalidade != FinalidadeCategoriaEnum.Ambas &&
                (int)categoria.Finalidade != (int)dto.Tipo)
                throw new Exception("Categoria incompatível com tipo da transação");

            var transacao = new Transacao
            {
                Descricao = dto.Descricao,
                Valor = dto.Valor,
                Tipo = dto.Tipo,
                PessoaId = dto.PessoaId,
                CategoriaId = dto.CategoriaId
            };

            var result = await _transacaoRepository.CriarAsync(transacao);

            return new TransacaoDto
            {
                Id = result.Id,
                Descricao = result.Descricao,
                Valor = result.Valor,
                Tipo = result.Tipo,
                PessoaId = result.PessoaId,
                PessoaNome = pessoa.Nome,
                CategoriaId = result.CategoriaId,
                CategoriaDescricao = categoria.Descricao
            };
        }

        public async Task<List<TransacaoDto>> ListarAsync()
        {
            var transacoes = await _transacaoRepository.ListarAsync();
            return transacoes.Select(t => new TransacaoDto
            {
                Id = t.Id,
                Descricao = t.Descricao,
                Valor = t.Valor,
                Tipo = t.Tipo,
                PessoaId = t.PessoaId,
                PessoaNome = t.Pessoa.Nome,
                CategoriaId = t.CategoriaId,
                CategoriaDescricao = t.Categoria.Descricao
            }).ToList();
        }
    }
}
