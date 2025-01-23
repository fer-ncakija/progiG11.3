namespace Apartmeet.Api.Dtos;

public record UpdateMeetingDto
(
    string naslov,
    string sazetak,
    string stanje,
    DateTime vrijeme,
    string mjesto
);