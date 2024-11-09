namespace Apartmeet.Api.Dtos;

public record class UserLoginDto
(
    int Id,
    string Username,
    string Password,
    string Role
);
