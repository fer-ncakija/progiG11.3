namespace Apartmeet.Api.Entities;

public class User
{
    public int Id { get; set; }
    public required string Username { get; set; }
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required string Role { get; set; }

    public ICollection<UserMeeting> UserMeetings { get; set; } = new List<UserMeeting>();
}