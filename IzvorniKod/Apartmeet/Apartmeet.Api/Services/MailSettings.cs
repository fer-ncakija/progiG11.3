public class MailClientSettings
{
    public required string Sender { get; set; }
    public required string Host { get; set; }
    public required int Port { get; set; }
    public required string UserName { get; set; }
    public required string Password { get; set; }
    public required string Recepient { get; set; } //TODO: REMOVE, make it dynamic

}