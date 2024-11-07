using Microsoft.EntityFrameworkCore;
using Apartmeet.Api.Dtos;
using Apartmeet.Api.Entities;
using Apartmeet.Api.Data;

namespace Apartmeet.Api.Endpoints;

public static class AgendaPointEndpoints
{
    public static void MapAgendaPointEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapPost("/meetings/{meetingId}/agendapoints", async (int meetingId, CreateAgendaPointDto createAgendaPointDto, ApartmeetContext context) =>
        {
            var meeting = await context.Meetings.FindAsync(meetingId);
            if (meeting == null) return Results.NotFound();

            var agendaPoint = new AgendaPoint
            {
                MeetingId = meetingId,
                Description = createAgendaPointDto.Description,
                HasLegalEffect = createAgendaPointDto.HasLegalEffect,
                Outcome = null,
                Meeting = meeting 
            };

            context.AgendaPoints.Add(agendaPoint);
            await context.SaveChangesAsync();

            return Results.Created($"/meetings/{meetingId}/agendapoints/{agendaPoint.Id}", agendaPoint);
        });

        routes.MapGet("/meetings/{meetingId}/agendapoints", async (int meetingId, ApartmeetContext context) =>
        {
            var agendaPoints = await context.AgendaPoints
                .Where(ap => ap.MeetingId == meetingId)
                .Select(ap => new AgendaPointDto(
                    ap.Id,
                    ap.Description,
                    ap.HasLegalEffect,
                    ap.Outcome 
                ))
                .ToListAsync();

            return Results.Ok(agendaPoints);
        });
        routes.MapGet("/meetings/{meetingId}/agendapoints/{agendaPointId}", async (int meetingId, int agendaPointId, ApartmeetContext context) =>
        {
            var agendaPoint = await context.AgendaPoints
                .Where(ap => ap.MeetingId == meetingId && ap.Id == agendaPointId)
                .Select(ap => new AgendaPointDto(
                    ap.Id,
                    ap.Description,
                    ap.HasLegalEffect,
                    ap.Outcome
                ))
                .FirstOrDefaultAsync();

            if (agendaPoint == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(agendaPoint);
        });

        routes.MapPut("/meetings/{meetingId}/agendapoints/{id}", async (int meetingId, int id, UpdateAgendaPointDto updateAgendaPointDto, ApartmeetContext context) =>
{
    var agendaPoint = await context.AgendaPoints.FindAsync(id);
    if (agendaPoint == null || agendaPoint.MeetingId != meetingId) return Results.NotFound();

    agendaPoint.Description = updateAgendaPointDto.Description;
    agendaPoint.HasLegalEffect = updateAgendaPointDto.HasLegalEffect;
    agendaPoint.Outcome = updateAgendaPointDto.Outcome;

    await context.SaveChangesAsync();

    return Results.NoContent();
});

        routes.MapDelete("/meetings/{meetingId}/agendapoints/{id}", async (int meetingId, int id, ApartmeetContext context) =>
        {
            var agendaPoint = await context.AgendaPoints.FindAsync(id);
            if (agendaPoint == null || agendaPoint.MeetingId != meetingId) return Results.NotFound();

            context.AgendaPoints.Remove(agendaPoint);
            await context.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}