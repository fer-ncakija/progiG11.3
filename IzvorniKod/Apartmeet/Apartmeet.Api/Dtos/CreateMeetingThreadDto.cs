namespace Apartmeet.Api.Dtos;

public record CreateMeetingThreadDto
(
    string MeetingTitle,
    DateTime ScheduledDate,
    string MeetingSummary,
    string ThreadTitle,
    string ThreadDescription
);