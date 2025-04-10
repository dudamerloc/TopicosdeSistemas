using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<AppDataContext>();

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
   // options.EnableAnnotations();
    options.SwaggerDoc("v1", new OpenApiInfo{
        
        Title = "Swagger Documentação Web API Carros",
        Description = "Endpoints para gerenciamento de cadastro de carros. Um exemplo de como fornecer a documentação para APIs.",
        Contact = new OpenApiContact
        {
            Name = "Duda Merlo",
            Email = "duda.merlo05@outlook.com"
        },
        License = new OpenApiLicense{
            Name = "MIT License",
            Url = new Uri("https://opensource.org/licenses/MIT")
        }
    });
});

var app = builder.Build();

app.UseSwagger();
app.UseSwaggerUI();

// Endpoints relacionados ao recurso de Carros
// GET: Lista todos os carros cadastrados
app.MapGet("/api/carros", ([FromServices]AppDataContext ctx) => {

    if(ctx.Carros.Any()){
        return Results.Ok(ctx.Carros.ToList());
    }

    return Results.NotFound();
});

//POST: Cadastrar carro
app.MapPost("/api/carros", ([FromBody] Carro carro, [FromServices] AppDataContext ctx) =>{

    var modelo = ctx.Modelos.Find(carro.Modelo.Id);

    if(modelo == null){
        return Results.BadRequest("Modelo não existe!");
    }

    if(carro.Name == null || carro.Name.Length < 3){
        return Results.BadRequest("Nome do carro deve conter mais de 3char!");
    }

    carro.Modelo = modelo;

    ctx.Carros.Add(carro);   //não tem relação com o model carro
    ctx.SaveChanges();
    return Results.Created("", carro);
    
});

//GET: buscar o carro 
app.MapGet("/api/carros/{id}",([FromRoute] int id, [FromServices] AppDataContext ctx) =>{

    Carro? carro = ctx.Carros.Find(id);

    if(carro != null){
        return Results.Ok(carro);
    }
    return Results.NotFound();

});

//PUT: atualiza os dados do carro pelo ID
app.MapPut("/api/carros/{id}", ([FromRoute] int id, [FromBody] Carro carro, [FromServices] AppDataContext ctx) =>{

    Carro? entidade = ctx.Carros.Find(id);
    entidade.Modelo = ctx.Modelos.Find(carro.Modelo.Id);

      if(entidade.Modelo == null){
        return Results.BadRequest("Modelo não existe!");
    }

    if(carro.Name == null || carro.Name.Length < 3){
        return Results.BadRequest("Nome do carro deve conter mais de 3char!");
    }

    if( entidade != null){
        entidade.Name = carro.Name;
        ctx.Carros.Update(entidade);
        ctx.SaveChanges();
        return Results.Ok(entidade);

    }
    return Results.NotFound();

});

//Delete: remove um carro pelo ID
app.MapDelete("/api/carros/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) =>{

    Carro? carro = ctx.Carros.Find(id);
    if(carro == null){
        return Results.NotFound();
    }

    ctx.Carros.Remove(carro);
    ctx.SaveChanges();
    return Results.NoContent();


});

// GET: lista todos os carros cadastrados
app.MapGet("/api/modelos", ([FromQuery] string? name, [FromServices]AppDataContext ctx) => {
    
    var query = ctx.Modelos.AsQueryable();

    if (!string.IsNullOrWhiteSpace(name)) {
        query = query.Where(m => EF.Functions.Like(m.Name, $"%{name}%"));
    }

    var modelos = query.ToList();
    if(modelos == null || modelos.Count == 0){
        return Results.NotFound();
    }
    return Results.Ok(modelos);
});

//GET: Busca todos os modelos cadastrais
app.MapGet("/api/modelos/{id}", ([FromRoute] int id, [FromServices] AppDataContext ctx) => {
    var modelo = ctx.Modelos.Find(id);

    if(modelo == null){
        return Results.NotFound();
    }
    return Results.Ok(modelo);
});

app.Run();