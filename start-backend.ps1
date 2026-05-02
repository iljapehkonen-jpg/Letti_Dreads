$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$backendDir = Join-Path $projectRoot "Backend\Letti_dreads_Backend"
$venvCandidates = @(
    (Join-Path $backendDir ".venv\Scripts\python.exe"),
    (Join-Path $projectRoot "Backend\MyEnv\Scripts\python.exe")
)

if (-not (Test-Path $backendDir)) {
    throw "Backend folder not found: $backendDir"
}

$python = $venvCandidates | Where-Object { Test-Path $_ } | Select-Object -First 1

if (-not $python) {
    throw "Python virtual environment not found. Expected .venv or MyEnv."
}

Set-Location $backendDir
& $python manage.py runserver
