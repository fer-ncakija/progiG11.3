namespace Apartmeet.Api.Dtos;

    public record CreateMeetingDto(
        string Title, 
        string Summary, 
        DateTime ScheduledDate, 
        string Place
    );