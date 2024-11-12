namespace Apartmeet.Api.Dtos;

public record GoogleTokenResponseDto
(
    string AccessToken,
    string TokenType,
    string Scope,
    string IdToken,
    string? RefreshToken,
    int ExpiresIn
);