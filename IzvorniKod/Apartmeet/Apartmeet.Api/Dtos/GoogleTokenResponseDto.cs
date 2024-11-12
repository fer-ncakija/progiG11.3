namespace Apartmeet.Api.Dtos;

public record GoogleTokenResponseDto
(
    string access_token,
    int expires_in,
    string scope,
    string token_type
);