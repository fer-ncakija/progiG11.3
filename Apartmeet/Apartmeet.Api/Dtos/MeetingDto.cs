namespace Apartmeet.Api.Dtos;


    public record MeetingDto(
        int Id, 
        string Title, 
        string Summary, 
        string Status, 
        DateTime ScheduledDate, 
        string Place, 
        List<AgendaPointDto> AgendaPoints, 
        List<UserDto> Participants
    );