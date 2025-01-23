using Microsoft.EntityFrameworkCore;
using Apartmeet.Api.Dtos;
using Apartmeet.Api.Entities;
using Apartmeet.Api.Data;
using System.Text.Json;

namespace Apartmeet.Api.Endpoints;

public static class ThreadEndpoints
{
    public static void MapThreadEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapGet("/threads", async (ApartmeetContext context) =>
        {
            var response = await new HttpClient().GetAsync("https://projectbajeet.work.gd/api/main/allThreads");

            var responseContent = await response.Content.ReadAsStringAsync();

            var threadsResponse = JsonSerializer.Deserialize<List<ThreadDto>>(responseContent);

            if(threadsResponse == null)
            {
                return Results.BadRequest();
            }
            
            return Results.Ok(threadsResponse.ConvertAll<CreateAgendaPointDto>(thread => new CreateAgendaPointDto(thread.description, true)));
        });
    }
}
