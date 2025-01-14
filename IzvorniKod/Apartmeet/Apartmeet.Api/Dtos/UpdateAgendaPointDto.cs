namespace Apartmeet.Api.Dtos;

public record UpdateAgendaPointDto
(
    string naziv,
    bool pravniUcinak,
    string? zakljucak
);