using Apartmeet.Api.Data;
using Apartmeet.Api.Dtos;
using Apartmeet.Api.Entities;
using Microsoft.EntityFrameworkCore;

public interface IAgendaService
{
    Task<List<AgendaPoint>> GetAgendaPoints(int meetingId);
}

public class AgendaService(ApartmeetContext context) : IAgendaService
{
    public async Task<List<AgendaPoint>> GetAgendaPoints(int meetingId){
        return await context.AgendaPoints
                .Where(ap => ap.MeetingId == meetingId)
                .ToListAsync();
    }
}