using System.Data.SqlClient;
using ClaimTheSquareWithBackend;
using Dapper;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();
app.UseHttpsRedirection();

const string connStr = @"Data Source=(localdb)\local;Initial Catalog=ClaimTheSquare;Integrated Security=True";   //Her velger jeg hvilken database jeg skal bruke.
//var textObjects = new List<TextObject>();

app.MapGet("/textobjects", async() =>
{
    var conn = new SqlConnection(connStr);
    const string sql = "SELECT [Index], Text, ForeColor, BackColor FROM TextObject";   // Her velger jeg hvilket "table" jeg vil hente data fra.
    var textObject = await conn.QueryAsync<TextObject>(sql);
    return textObject;
});

app.MapPost("/textobjects", async (TextObject textObject) =>
{
    using (var conn = new SqlConnection(connStr))
    {
        const string sql = "INSERT INTO TextObject ([Index], Text, ForeColor, BackColor) VALUES (@Index, @Text, @ForeColor, @BackColor)";//Her velger jeg hvilket data table jeg vil legge til data i.
        await conn.ExecuteAsync(sql, new { textObject.Index, textObject.Text, textObject.ForeColor, textObject.BackColor });
    }

    return textObject;
});

app.UseStaticFiles();
app.Run();

