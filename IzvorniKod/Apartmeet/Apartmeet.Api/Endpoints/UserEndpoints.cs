using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Apartmeet.Api.Dtos;
using Apartmeet.Api.Entities;
using Apartmeet.Api.Data;

namespace Apartmeet.Api.Endpoints;

public static class UserEndpoints
{
    public static void MapUserEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapPost("/users", async (CreateUserDto createUserDto, ApartmeetContext context) =>
        {
            if (string.IsNullOrWhiteSpace(createUserDto.Username) || string.IsNullOrWhiteSpace(createUserDto.Email))
            {
                return Results.BadRequest("Username and Email are required.");
            }

            var user = new User
            {
                Username = createUserDto.Username,
                Password = createUserDto.Password,
                Email = createUserDto.Email,
                Role = createUserDto.Role
            };

            context.Users.Add(user);
            await context.SaveChangesAsync();


            var userDto = new UserDto(user.Id, user.Username, user.Email, user.Role);

            return Results.Created($"/users/{user.Id}", userDto);
        });

        routes.MapGet("/users", async (ApartmeetContext context) =>
        {
            var users = await context.Users
                .Select(u => new UserDto(u.Id, u.Username, u.Email, u.Role))
                .ToListAsync();

            return Results.Ok(users);
        });
        routes.MapGet("/users/{id}", async (int id, ApartmeetContext context) =>
        {
            var user = await context.Users
                .Where(u => u.Id == id)
                .Select(u => new UserDto(u.Id, u.Username, u.Email, u.Role))
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return Results.NotFound($"User with ID {id} not found.");
            }

            return Results.Ok(user);
        });
        routes.MapGet("/users/{userId}/meetings", async (int userId, ApartmeetContext context) =>
        {
            var meetings = await context.UserMeetings
                .Where(um => um.UserId == userId)
                .Select(um => um.Meeting)
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

        routes.MapPut("/users/{id}", async (int id, UpdateUserDto updateUserDto, ApartmeetContext context) =>
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return Results.NotFound();

            user.Username = updateUserDto.Username;
            user.Email = updateUserDto.Email;
            user.Role = updateUserDto.Role;

            context.Entry(user).State = EntityState.Modified;
            await context.SaveChangesAsync();

            return Results.NoContent();
        });

        routes.MapDelete("/users/{id}", async (int id, ApartmeetContext context) =>
        {
            var user = await context.Users.FindAsync(id);
            if (user == null) return Results.NotFound();

            context.Users.Remove(user);
            await context.SaveChangesAsync();

            return Results.NoContent();
        });
    }
}