using Microsoft.EntityFrameworkCore;
using Apartmeet.Api.Dtos;
using Apartmeet.Api.Entities;
using Apartmeet.Api.Data;

namespace Apartmeet.Api.Endpoints;

public static class MeetingEndpoints
{
    public static void MapMeetingEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapPost("/meetings", async (CreateMeetingDto createMeetingDto, ApartmeetContext context) =>
        {
            var meeting = new Meeting
            {
                Title = createMeetingDto.Title,
                Status = "Planiran",
                Summary = createMeetingDto.Summary,
                ScheduledDate = createMeetingDto.ScheduledDate,
                Place = createMeetingDto.Place
            };

            context.Meetings.Add(meeting);
            await context.SaveChangesAsync();

            return Results.Created($"/meetings/{meeting.Id}", meeting);
        });

        routes.MapGet("/meetings", async (ApartmeetContext context) =>
        {
            var meetings = await context.Meetings
                .Select(m => new MeetingDto(
                    m.Id,
                    m.Title,
                    m.Summary,
                    m.Status,
                    m.ScheduledDate,
                    m.Place,
                    m.AgendaPoints.Select(ap => new AgendaPointDto(
                        ap.Id, ap.Description, ap.HasLegalEffect, ap.Outcome! //nisam siguran jel tu treba usklicnik
                    )).ToList(), // Initialize AgendaPoints list
                    m.Participants!.Select(p => new UserDto( //usklicnik?
                        p.Id, p.Username, p.Email, p.Role
                    )).ToList() // Initialize Participants list
                ))
                .ToListAsync();

            return Results.Ok(meetings);
        });

        routes.MapPut("/meetings/{id}", async (int id, UpdateMeetingDto updateMeetingDto, ApartmeetContext context) =>
        {
            var meeting = await context.Meetings.FindAsync(id);
            if (meeting == null) return Results.NotFound();

            meeting.Title = updateMeetingDto.Title;
            meeting.Summary = updateMeetingDto.Summary;
            meeting.Status = updateMeetingDto.Status;
            meeting.ScheduledDate = updateMeetingDto.ScheduledDate;
            meeting.Place = updateMeetingDto.Place;

            await context.SaveChangesAsync();

            return Results.NoContent();
        });

        routes.MapDelete("/meetings/{id}", async (int id, ApartmeetContext context) =>
        {
            var meeting = await context.Meetings.FindAsync(id);
            if (meeting == null) return Results.NotFound();

            context.Meetings.Remove(meeting);
            await context.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}