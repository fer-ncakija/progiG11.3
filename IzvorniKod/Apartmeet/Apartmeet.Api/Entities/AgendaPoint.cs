using System;

namespace Apartmeet.Api.Entities;
    public class AgendaPoint
    {
        public int Id { get; set; }
        public required string Description { get; set; }
        public bool HasLegalEffect { get; set; }
        public string? Outcome { get; set; }

        // Foreign Key to Meeting
        public int MeetingId { get; set; }
        public required Meeting Meeting { get; set; }
    }