namespace Apartmeet.Api.Dtos;

public record UpdateUserDto(
    string Username,
    string Email,
    string Role
);
