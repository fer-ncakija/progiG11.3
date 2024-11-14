namespace Apartmeet.Api.Dtos;

public record AgendaPointDto
(
    int Id, 
    string Description, 
    bool HasLegalEffect, 
    string? Outcome
);