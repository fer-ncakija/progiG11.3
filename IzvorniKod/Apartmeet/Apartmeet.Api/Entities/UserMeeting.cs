using System;

namespace Apartmeet.Api.Entities;

public class UserMeeting
{
    public int UserId { get; set; }
    public required User User { get; set; }

    public int MeetingId { get; set; }
    public required Meeting Meeting { get; set; }
}