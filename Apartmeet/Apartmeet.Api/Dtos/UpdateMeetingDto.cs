namespace Apartmeet.Api.Dtos;

public record UpdateMeetingDto(
    string Title,
    string Summary,
    string Status,
    DateTime ScheduledDate,
    string Place
);