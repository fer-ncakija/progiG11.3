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
        Password = createUserDto.Password, // Store password directly (not secure in production)
        Email = createUserDto.Email,
        Role = createUserDto.Role
    };

    context.Users.Add(user);
    await context.SaveChangesAsync();

    // Use the constructor to initialize UserDto with required parameters
    var userDto = new UserDto(user.Id, user.Username, user.Email, user.Role);

    return Results.Created($"/users/{user.Id}", userDto);
});

        routes.MapGet("/users", async (ApartmeetContext context) =>
        {
            var users = await context.Users
                .Select(u => new UserDto(u.Id, u.Username, u.Email, u.Role)) // Use constructor here
                .ToListAsync();

            return Results.Ok(users);
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