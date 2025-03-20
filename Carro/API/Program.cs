using API.Models;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

List<Carro> lista = [
    new Carro() {Id = 1, Name = "Fusca"}
];

//Exemplo de requisição
app.MapGet("/", () => "Hello World!");

//GET: api/carros
app.MapGet("/api/carros", () => {
    return Results.Ok(lista);
});

app.Run();
