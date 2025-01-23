using Apartmeet.Api.Data;
using Apartmeet.Api.Entities;
using Microsoft.EntityFrameworkCore;

public interface IUserService
{
    Task<List<string>> GetUsersMail();
}

public class UserService(ApartmeetContext context) : IUserService{
    public async Task<List<string>> GetUsersMail(){
        var popis = await context.Users.ToListAsync();
        List<string> emails = new List<string>();

        foreach (var user in popis){
            emails.Add(user.Email);
        }

        return emails; 
    }
}