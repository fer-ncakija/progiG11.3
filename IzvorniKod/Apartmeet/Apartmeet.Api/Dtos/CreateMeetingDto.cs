namespace Apartmeet.Api.Dtos;

public record CreateMeetingDto
(
    string naslov, 
    string sazetak, 
    DateTime vrijeme, 
    string mjesto
);