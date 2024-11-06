namespace Apartmeet.Api.Dtos;

    public record CreateAgendaPointDto(
        string Description, 
        bool HasLegalEffect
    );