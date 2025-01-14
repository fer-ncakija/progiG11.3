namespace Apartmeet.Api.Dtos;

public record AgendaPointDto
(
    int Id, 
    string naziv, 
    bool pravniUcinak, 
    string? zakljucak
);