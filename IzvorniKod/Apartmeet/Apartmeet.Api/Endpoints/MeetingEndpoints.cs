using Microsoft.EntityFrameworkCore;
using Apartmeet.Api.Dtos;
using Apartmeet.Api.Entities;
using Apartmeet.Api.Data;

namespace Apartmeet.Api.Endpoints;

public static class MeetingEndpoints
{
    public static void MapMeetingEndpoints(this IEndpointRouteBuilder routes)    
    {
        routes.MapPost("/meetings", async (CreateMeetingDto createMeetingDto, ApartmeetContext context, HttpContext httpContext, IMailService mailService) =>
        {
            
            var meeting = new Meeting
            {
                Title = createMeetingDto.naslov,
                Status = "Planiran",
                Summary = createMeetingDto.sazetak,
                ScheduledDate = createMeetingDto.vrijeme,
                Place = createMeetingDto.mjesto
            };

            context.Meetings.Add(meeting);
            await context.SaveChangesAsync();


            return Results.Created($"/meetings/{meeting.Id}", meeting);
        });

        routes.MapPost("/meetings/{meetingId}/users/{username}", async (int meetingId, string username, ApartmeetContext context) =>
        {
            // Ako meeting ne postoji
            var meeting = await context.Meetings.FindAsync(meetingId);
            if (meeting == null)
            {
                return Results.NotFound($"Meeting with ID {meetingId} not found.");
            }

            // Ako user ne postoji
            var user = await context.Users.SingleOrDefaultAsync(u => u.Username == username);
            if (user == null)
            {
                return Results.NotFound($"User with username {username} not found.");
            }

            // Ako je user vec u tom meetingu
            var existingUserMeeting = await context.UserMeetings
                .FirstOrDefaultAsync(um => um.UserId == user.Id && um.MeetingId == meetingId);

            if (existingUserMeeting != null)
            {
                return Results.BadRequest("User is already part of this meeting.");
            }

            // Dodavanje usera u meeting
            var userMeeting = new UserMeeting
            {
                UserId = user.Id,
                MeetingId = meetingId,
                User = user,
                Meeting = meeting
            };

            context.UserMeetings.Add(userMeeting);
            await context.SaveChangesAsync();

            return Results.Ok($"User {user.Id} added to meeting {meetingId}.");
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
                        ap.Id, ap.Description, ap.HasLegalEffect, ap.Outcome
                    )).ToList(),
                    m.UserMeetings.Select(um => new UserDto(
                        um.User.Id, um.User.Username, um.User.Email, um.User.Role
                    )).ToList()
                ))
                .ToListAsync();

            return Results.Ok(meetings);
        });
        
        routes.MapGet("/meetings/{meetingId}", async (int meetingId, ApartmeetContext context) =>
        {
            var meeting = await context.Meetings
                .Where(m => m.Id == meetingId)
                .Select(m => new MeetingDto(
                    m.Id,
                    m.Title,
                    m.Summary,
                    m.Status,
                    m.ScheduledDate,
                    m.Place,
                    m.AgendaPoints.Select(ap => new AgendaPointDto(
                        ap.Id,
                        ap.Description,
                        ap.HasLegalEffect,
                        ap.Outcome
                    )).ToList(),
                    m.UserMeetings.Select(um => new UserDto(
                        um.User.Id,
                        um.User.Username,
                        um.User.Email,
                        um.User.Role
                    )).ToList()
                ))
                .FirstOrDefaultAsync();

            if (meeting == null)
            {
                return Results.NotFound();
            }

            return Results.Ok(meeting);
        });

        routes.MapPut("/meetings/{id}", async (int id, UpdateMeetingDto updateMeetingDto, ApartmeetContext context, IMailService mailService) =>
        {
            var meeting = await context.Meetings.FindAsync(id);
            if (meeting == null) return Results.NotFound();
            

            meeting.Status = updateMeetingDto.stanje;
            await context.SaveChangesAsync();

            await mailService.SendMailAsync(meeting);
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
        
        routes.MapDelete("/meetings/{meetingId}/users/{userId}", async (int meetingId, int userId, ApartmeetContext context) =>
        {
            // Ako meeting postoji
            var meeting = await context.Meetings.FindAsync(meetingId);
            if (meeting == null)
            {
                return Results.NotFound($"Meeting with ID {meetingId} not found.");
            }

            // Ako user postoji
            var user = await context.Users.FindAsync(userId);
            if (user == null)
            {
                return Results.NotFound($"User with ID {userId} not found.");
            }

            // Ako je user dio meetinga
            var userMeeting = await context.UserMeetings
                .FirstOrDefaultAsync(um => um.UserId == userId && um.MeetingId == meetingId);

            if (userMeeting == null)
            {
                return Results.BadRequest("User is not part of this meeting.");
            }

            // Uklanjanje usera s meetinga
            context.UserMeetings.Remove(userMeeting);
            await context.SaveChangesAsync();

            return Results.Ok($"User {userId} removed from meeting {meetingId}.");
        });
    }
}