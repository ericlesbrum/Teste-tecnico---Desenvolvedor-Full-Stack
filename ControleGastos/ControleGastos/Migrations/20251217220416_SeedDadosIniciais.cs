using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ControleGastos.Migrations
{
    /// <inheritdoc />
    public partial class SeedDadosIniciais : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // =====================================================
            // SEED - PESSOAS
            // =====================================================
            migrationBuilder.InsertData(
                table: "Pessoas",
                columns: new[] { "Id", "Nome", "Idade" },
                values: new object[,]
                {
                    { 1, "João", 35 },
                    { 2, "Maria", 28 },
                    { 3, "Carlos", 42 },
                    { 4, "Ana", 17 },
                    { 5, "Pedro", 15 }
                });

            // =====================================================
            // SEED - CATEGORIAS
            // Finalidade:
            // 1 = Despesa | 2 = Receita | 3 = Ambas
            // =====================================================
            migrationBuilder.InsertData(
                table: "Categorias",
                columns: new[] { "Id", "Descricao", "Finalidade" },
                values: new object[,]
                {
                    { 1, "Alimentação", 1 },
                    { 2, "Transporte", 1 },
                    { 3, "Salário", 2 },
                    { 4, "Investimentos", 2 },
                    { 5, "Outros", 3 }
                });

            // =====================================================
            // SEED - TRANSACOES
            // Tipo:
            // 1 = Despesa | 2 = Receita
            // =====================================================
            migrationBuilder.InsertData(
                table: "Transacoes",
                columns: new[]
                {
                    "Id",
                    "Descricao",
                    "Valor",
                    "Tipo",
                    "PessoaId",
                    "CategoriaId"
                },
                values: new object[,]
                {
                    // Adultos
                    { 1, "Supermercado", 350m, 1, 1, 1 },
                    { 2, "Ônibus", 120m, 1, 2, 2 },
                    { 3, "Salário Mensal", 5000m, 2, 3, 3 },

                    // Menores de idade (apenas DESPESA)
                    { 4, "Lanche Escola", 25m, 1, 4, 5 },
                    { 5, "Material Escolar", 90m, 1, 5, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // =====================================================
            // REMOVE TRANSACOES (FK)
            // =====================================================
            migrationBuilder.DeleteData(
                table: "Transacoes",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4, 5 });

            // =====================================================
            // REMOVE CATEGORIAS
            // =====================================================
            migrationBuilder.DeleteData(
                table: "Categorias",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4, 5 });

            // =====================================================
            // REMOVE PESSOAS
            // =====================================================
            migrationBuilder.DeleteData(
                table: "Pessoas",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4, 5 });
        }
    }
}
