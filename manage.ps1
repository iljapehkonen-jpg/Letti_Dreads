$ErrorActionPreference = "Stop"

$ProjectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$ComposeFile = Join-Path $ProjectDir "docker-compose.yml"

function Test-CommandExists {
    param([string]$CommandName)

    return $null -ne (Get-Command $CommandName -ErrorAction SilentlyContinue)
}

function Invoke-Compose {
    param(
        [Parameter(ValueFromRemainingArguments = $true)]
        [string[]]$Args
    )

    & docker compose -f $ComposeFile @Args
}

function Show-StartupInfo {
    Write-Host ""
    Write-Host "Project is starting in Docker background mode."
    Write-Host "Frontend: http://127.0.0.1"
    Write-Host "If it does not open, run:"
    Write-Host "  .\manage.ps1 ps"
    Write-Host "  .\manage.ps1 logs"
}

function Show-Help {
    Write-Host "Usage: .\manage.ps1 <command>"
    Write-Host ""
    Write-Host "Commands:"
    Write-Host "  up         Build and start containers in background"
    Write-Host "  down       Stop and remove containers"
    Write-Host "  restart    Restart the whole project"
    Write-Host "  rebuild    Rebuild containers and restart in background"
    Write-Host "  build      Rebuild containers"
    Write-Host "  logs       Show logs for all services"
    Write-Host "  ps         Show running containers"
    Write-Host "  clean      Stop project and remove volumes"
    Write-Host "  shell-be   Open shell in backend container"
    Write-Host "  shell-fe   Open shell in frontend/nginx container"
    Write-Host "  migrate    Run Django migrations inside backend container"
    Write-Host ""
    Write-Host "Examples:"
    Write-Host "  .\manage.ps1 up"
    Write-Host "  .\manage.ps1 down"
    Write-Host "  .\manage.ps1 logs"
}

if (-not (Test-CommandExists "docker")) {
    throw "Docker is not installed or not available in PATH."
}

try {
    & docker compose version | Out-Null
} catch {
    throw "Docker Compose v2 is not available."
}

$Command = if ($args.Count -gt 0) { $args[0] } else { "help" }

switch ($Command) {
    "up" {
        Invoke-Compose up --build -d
        Show-StartupInfo
    }
    "down" {
        Invoke-Compose down
    }
    "restart" {
        Invoke-Compose down
        Invoke-Compose up --build -d
        Show-StartupInfo
    }
    "rebuild" {
        Invoke-Compose down
        Invoke-Compose build --no-cache
        Invoke-Compose up -d
        Show-StartupInfo
    }
    "build" {
        Invoke-Compose build
    }
    "logs" {
        Invoke-Compose logs -f
    }
    "ps" {
        Invoke-Compose ps
    }
    "clean" {
        Invoke-Compose down -v
    }
    "shell-be" {
        Invoke-Compose exec backend sh
    }
    "shell-fe" {
        Invoke-Compose exec frontend sh
    }
    "migrate" {
        Invoke-Compose exec backend python manage.py migrate
    }
    "help" {
        Show-Help
    }
    "-h" {
        Show-Help
    }
    "--help" {
        Show-Help
    }
    default {
        Write-Host "Unknown command: $Command"
        Write-Host ""
        Show-Help
        exit 1
    }
}
