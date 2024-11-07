using System;

namespace Apartmeet.Api.Entities;


    public class User
    {
        public int Id { get; set; }
        public required string Username { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public required string Role { get; set; }

        // Navigational properties for relationships
        public ICollection<UserMeeting> UserMeetings { get; set; } = new List<UserMeeting>();
     //   public ICollection<Meeting> ParticipatedMeetings => UserMeetings.Select(um => um.Meeting).ToList(); //mozda maknut
    }