using Apartmeet.Api.Entities;

public class MockMailService : IMailService
{
    public async Task SendMailAsync(Meeting meeting)
    {
        Console.WriteLine($"Sending {meeting.Title} to User");        
        
    }
}
