$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$frontendDir = Join-Path $projectRoot "FrontEnd\letti_dreads"

if (-not (Test-Path $frontendDir)) {
    throw "Frontend folder not found: $frontendDir"
}

Set-Location $frontendDir

if (-not (Test-Path ".\node_modules\vite\bin\vite.js")) {
    throw "Vite not found. Install dependencies in $frontendDir."
}

# Bypass broken npm.cmd and run local Vite directly.
node .\node_modules\vite\bin\vite.js --host 127.0.0.1
