using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using Fisher;
using Fisher.AspNetCore;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddValidation();

builder.Services.ConfigureHttpJsonOptions(options =>
{
    options.SerializerOptions.WriteIndented = true;
    options.SerializerOptions.Converters.Add(new JsonStringEnumConverter());
    
});
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddFisher(options =>
{
    options.Connection("Data Source=app.db");
    options.InitialData.Add(new InitialTrails());
}).ApplyAllDatabaseChangesOnStartup().SeedInitialDataOnStartup();
var app = builder.Build();
app.UseCors();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapGet("/trails", (IQuerySession session) => session.Query<Trail>().StreamMany());
app.MapPost("/trails", async (TrailCreate trailCreate, IDocumentSession session) =>  
{
    var trail = new Trail()
    {
        Id = Guid.NewGuid(),
        Name = trailCreate.Name,
        Miles = trailCreate.Miles,
        Difficulty = trailCreate.Difficulty
    };
     session.Store(trail);
    await session.SaveChangesAsync();
    return Results.Created($"/trails/{trail.Id}", trail);
});

app.Run();
public enum DifficultyRatings
{
    Easy,
    Moderate,
    Hard,
    Extreme
}

public class Trail
{
    public Guid Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public decimal Miles { get; set; }
    public string Difficulty { get; set; } = string.Empty;
}

public record TrailCreate
{
    [Required]
    public string Name { get; set; } = string.Empty;
    [Required]
    public decimal Miles { get; set; }
    [Required]
    public string Difficulty { get; set; } = string.Empty;
}

public static class DifficultyLevels
{
    public  const string Easy = "easy";
    public  const string Moderate = "moderate";
    public  const string Hard = "hard";
    public  const string Extreme = "extreme";
}
public class InitialTrails : IInitialData
{
    public async Task Populate(IDocumentStore store, CancellationToken cancellation)
    {
        await using var session = store.LightweightSession();
        session.Store(new Trail()
        {
            Id = Guid.NewGuid(),
            Name = "Pine Ridge Trail",
            Miles = 2.5m,
            Difficulty = DifficultyLevels.Easy
        });
        session.Store(new Trail()
        {
            Id = Guid.NewGuid(),
            Name = "Canyon Loop",
            Miles = 5.0m,
            Difficulty = DifficultyLevels.Moderate  
        });
        session.Store(new Trail()
        {
            Id = Guid.NewGuid(),
            Name = "Summit Ascent",
            Miles = 8.0m,
            Difficulty = DifficultyLevels.Hard
        });
        session.Store(new Trail()
        {
            Id = Guid.NewGuid(),
            Name = "Rocky Ridge",
            Miles = 12.0m,
            Difficulty = DifficultyLevels.Extreme
        });
        session.Store(new Trail()
        {
            Id = Guid.NewGuid(),
            Name = "Forest Loop",
            Miles = 3.5m,
            Difficulty = DifficultyLevels.Moderate
        });
        await session.SaveChangesAsync(token: cancellation);
    }
}