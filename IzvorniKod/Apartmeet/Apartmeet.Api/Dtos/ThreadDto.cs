namespace Apartmeet.Api.Dtos;

public record ThreadDto
(
    int threadID,
    string title,
    string description,
    bool hasVoting,
    DateTime timeCreated,
    List<object> comments,
    List<object> participants,
    List<object> votes
);