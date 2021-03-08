# Advent-of-Code

Year(s): 2020

Using this event as an opportunity to learn new programming languages and to keep up with the ones I already know

## JavaScript

Uses [NodeJS](https://nodejs.org/en/), simple to set up and run

## C# (C Sharp)

Uses the dotnet framework, has a bit of an odd setup as I made this when I was fairly new to the language

### Setup

1. In the wanted parent directory, create a new console app with `dotnet new console`
2. The code within the App.cs file will take two arguments, the `year` and the `day` that we want to run
3. In a sub directory for the current year we have a `days` directory where each day has its own .cs file
4. As we are developing, we treat each day as its own project (The days directory has its own project) by changing the .csproj(**NOT** included in this repo) file's `StartupObject` to the day we are currently on
5. Use `dotnet build -o ./bin` when finishing each day
6. If we want to run a previous day's __build__ we can do so by running `dotnet run {year} {day}` in the previously made parent directory
