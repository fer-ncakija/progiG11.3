using System;
using Apartmeet.Api.Entities;
using Microsoft.EntityFrameworkCore;
namespace Apartmeet.Api.Data;

public class ApartmeetContext(DbContextOptions<ApartmeetContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Meeting> Meetings => Set<Meeting>();
    public DbSet<AgendaPoint> AgendaPoints => Set<AgendaPoint>();
    public DbSet<UserMeeting> UserMeetings { get; set; }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UserMeeting>()
            .HasKey(um => new { um.UserId, um.MeetingId });  // Composite key
    }

}
