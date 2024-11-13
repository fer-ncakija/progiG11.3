namespace Apartmeet.Api.Dtos;

public record GoogleTokenResponseDto
(
    string access_token,
    int expires_in,
    string scope,
    string token_type,
    string id_token,
    string? refresh_token
);