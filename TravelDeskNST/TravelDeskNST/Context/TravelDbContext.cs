using Microsoft.EntityFrameworkCore;
using TravelDeskNST.Model;
using TravelDeskNST.Models;

namespace TravelDeskNST.Context
{
    public class TravelDbContext:DbContext
    {
        
        public TravelDbContext(DbContextOptions<TravelDbContext> options): base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<TransportDetails> TransportDetails  { get; set; }
        public DbSet<Request> Requests { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<HotelDetail> HotelDetails { get; set; }
        public DbSet<Document> Documents { get; set; }
        public DbSet<CommonTypeReference> CommonTypeReferences { get; set; }
        public DbSet<Comment> Comments { get; set; }


    }
}
