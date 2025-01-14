using Apartmeet.Api.Entities;
using Microsoft.AspNetCore.SignalR;
using System.Net.Mail;
using System.Net;
using Microsoft.Extensions.Options;
using Microsoft.VisualBasic;
using System.Text.Json.Serialization;
using System.Text.Json;

public interface IMailService
{
    Task SendMailAsync(Meeting meeting);
}
public class MailService(MailClientSettings clientSettings) : IMailService
{
    private SmtpClient MySmtpClient => 
          new SmtpClient(clientSettings.Host)
            {
                Port = clientSettings.Port,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(clientSettings.UserName, clientSettings.Password), //treba ici u secret
                EnableSsl = true
            };
    public async Task SendMailAsync(Meeting meeting)
    {
        //Console.WriteLine($"{JsonSerializer.Serialize(clientSettings)}");        
        var mailMessage = new MailMessage
            {
                From = new MailAddress(clientSettings.Sender),
                
                Subject = "ApartMeet: Novi sastanak stanara",
                Body = $"Novi sastanak stanara planiran je:\n\n" +
                    $"Title: {meeting.Title}\n" +
                    $"Date: {meeting.ScheduledDate}\n" +
                    $"Place: {meeting.Place}\n\n" +
                    $"Summary: {meeting.Summary}",
                IsBodyHtml = false,
            };
            
            mailMessage.To.Add(new MailAddress(clientSettings.Recepient)); // Add recipient email address
            await MySmtpClient.SendMailAsync(mailMessage);
    }


        
}
            