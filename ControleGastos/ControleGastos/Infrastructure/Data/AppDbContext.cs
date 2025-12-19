using ControleGastos.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ControleGastos.Infrastructure.Data;

public class AppDbContext : DbContext
{
    public DbSet<Pessoa> Pessoas { get; set; } = null!;
    public DbSet<Categoria> Categorias { get; set; } = null!;
    public DbSet<Transacao> Transacoes { get; set; } = null!;

    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Pessoa>().HasKey(p => p.Id);
        modelBuilder.Entity<Categoria>().HasKey(c => c.Id);
        modelBuilder.Entity<Transacao>().HasKey(t => t.Id);
    }
}
