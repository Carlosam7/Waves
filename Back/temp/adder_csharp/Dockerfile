FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app
RUN dotnet new web -n Microservice
WORKDIR /app/Microservice
RUN rm Program.cs
COPY Program.cs .
RUN dotnet restore
RUN dotnet publish -c Release -o /out
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /out .
EXPOSE 5000
ENTRYPOINT ["dotnet","Microservice.dll"]
