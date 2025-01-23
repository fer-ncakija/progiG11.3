namespace Apartmeet.Api.Dtos;

public record MeetingDto
(
    int Id, 
    string naslov, 
    string sazetak, 
    string stanje, 
    DateTime vrijeme, 
    string mjesto, 
    List<AgendaPointDto> tockeDnevnogReda, 
    List<UserDto> sudionici
);