using System;

namespace Apartmeet.Api.Entities;

    public class Meeting
    {
        public int Id { get; set; }
        public required string Title { get; set; }
        public required string Summary { get; set; }
        public required string Status { get; set; }
        public required DateTime ScheduledDate { get; set; }
        public required string Place { get; set; }

        // Navigational properties
        public ICollection<AgendaPoint> AgendaPoints { get; set; } = new List<AgendaPoint>(); 
        public ICollection<UserMeeting> UserMeetings { get; set; } = new List<UserMeeting>();
    //    public ICollection<User> Participants => UserMeetings.Select(um => um.User).ToList(); //mozda maknut
    }