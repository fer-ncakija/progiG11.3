using System;
using Apartmeet.Api.Entities;
using Microsoft.EntityFrameworkCore;
namespace Apartmeet.Api.Data;

public class ApartmeetContext(DbContextOptions<ApartmeetContext> options) : DbContext(options)
{
    public DbSet<User> Users => Set<User>();
    public DbSet<Meeting> Meetings => Set<Meeting>();
    public DbSet<AgendaPoint> AgendaPoints => Set<AgendaPoint>();
    public DbSet<UserMeeting> UserMeetings => Set<UserMeeting>();
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<UserMeeting>()
            .HasKey(um => new { um.UserId, um.MeetingId });

        modelBuilder.Entity<UserMeeting>()
            .HasOne(um => um.User)
            .WithMany(u => u.UserMeetings)
            .HasForeignKey(um => um.UserId);
            
        modelBuilder.Entity<UserMeeting>()
            .HasOne(um => um.Meeting)
            .WithMany(u => u.UserMeetings)
            .HasForeignKey(um => um.MeetingId);
    }

}
