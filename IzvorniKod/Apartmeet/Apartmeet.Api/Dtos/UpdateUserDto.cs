namespace Apartmeet.Api.Dtos;

public record UpdateUserDto
(
    string CurrentPassword,
    string NewPassword
);