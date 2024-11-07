namespace Apartmeet.Api.Dtos;

public record UpdateAgendaPointDto(
    string Description,
    bool HasLegalEffect,
    string? Outcome
);