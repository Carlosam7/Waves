using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.MapGet("/", (int a, int b) => Results.Json(new { resultado = a + b }));

app.Run("http://0.0.0.0:5000");