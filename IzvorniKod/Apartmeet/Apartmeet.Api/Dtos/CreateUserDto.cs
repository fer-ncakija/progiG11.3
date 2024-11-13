namespace Apartmeet.Api.Dtos;

public record CreateUserDto
(
   string Username,
   string Password, 
   string Email, 
   string Role
);