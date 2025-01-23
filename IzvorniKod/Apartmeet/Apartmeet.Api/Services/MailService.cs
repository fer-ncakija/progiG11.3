using Apartmeet.Api.Entities;
using Microsoft.AspNetCore.SignalR;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using System.Text.Json.Serialization;
using System.Text.Json;
using Apartmeet.Api.Data;
using Apartmeet.Api.Dtos;

public interface IMailService
{
    Task SendMailAsync(Meeting meeting);
}
public class MailService(MailClientSettings clientSettings, IAgendaService agendaService, IUserService userService) : IMailService
{
    private SmtpClient MySmtpClient => 
          new SmtpClient(clientSettings.Host)
            {
                Port = clientSettings.Port,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(clientSettings.UserName, clientSettings.Password), //treba ici u secret
                EnableSsl = true
            };
    
    private string BodyBuilder(Meeting meeting){
        return string.Join("\n", new[]
                    {
                        $"Naslov: {meeting.Title}\n",
                        $"Datum i vrijeme: {meeting.ScheduledDate}",
                        $"Mjesto: {meeting.Place}\n",
                        $"Sazetak: {meeting.Summary}\n"
                    });
    } 

    public async Task SendMailAsync(Meeting meeting)
    {
       
        var agendas = await agendaService.GetAgendaPoints(meeting.Id);
        var agendaPointsString = string.Join("\n", agendas.Select(a => $"- {a.Description}"));

        if (meeting.Status == "Objavljen"){
            var mailMessage = new MailMessage
                {
                    From = new MailAddress(clientSettings.Sender),
                    
                    Subject = "ApartMeet: Novi sastanak stanara",
                    Body = $"Novi sastanak stanara planiran je:\n\n" +
                            $"{BodyBuilder(meeting)}" +
                            $"Tocke dnevnog reda: \n {agendaPointsString}",
                    IsBodyHtml = false,
                };
                var usersMail = await userService.GetUsersMail();

                foreach (var mail in usersMail.Where(m=>m != "").ToList()){
                    mailMessage.To.Add(new MailAddress(mail));//clientSettings.Recepient));
                    await MySmtpClient.SendMailAsync(mailMessage);
                }
                
        
        }else if (meeting.Status == "Arhiviran"){
            var mailMessage = new MailMessage
                {
                    From = new MailAddress(clientSettings.Sender),
                    
                    Subject = "ApartMeet: Arhiviran sastanak",
                    Body = $"Informacije zadnje arhiviranog sastanka stanara: \n\n" +
                        $"{BodyBuilder(meeting)}\n" +
                        $"Tocke dnevnog reda: \n {agendaPointsString}",
                    IsBodyHtml = false,
                };
                var usersMail = await userService.GetUsersMail();

                foreach (var mail in usersMail.Where(m=>m != "").ToList()){
                    mailMessage.To.Add(new MailAddress(mail));//clientSettings.Recepient));
                    await MySmtpClient.SendMailAsync(mailMessage);
                }
                
        };
    }
}
            