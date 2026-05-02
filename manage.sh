#!/usr/bin/env bash

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
COMPOSE_FILE="$PROJECT_DIR/docker-compose.yml"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is not installed or not available in PATH."
  exit 1
fi

if ! docker compose version >/dev/null 2>&1; then
  echo "Docker Compose is not available. Install Docker Compose v2."
  exit 1
fi

run_compose() {
  docker compose -f "$COMPOSE_FILE" "$@"
}

show_help() {
  cat <<'EOF'
Usage: ./manage.sh <command>

Commands:
  up         Build and start containers in foreground
  down       Stop and remove containers
  restart    Restart the whole project
  build      Rebuild containers
  logs       Show logs for all services
  ps         Show running containers
  clean      Stop project and remove volumes
  shell-be   Open shell in backend container
  shell-fe   Open shell in frontend/nginx container
  migrate    Run Django migrations inside backend container

Examples:
  ./manage.sh up
  ./manage.sh down
  ./manage.sh logs
EOF
}

case "${1:-help}" in
  up)
    run_compose up --build
    ;;
  down)
    run_compose down
    ;;
  restart)
    run_compose down
    run_compose up --build
    ;;
  build)
    run_compose build
    ;;
  logs)
    run_compose logs -f
    ;;
  ps)
    run_compose ps
    ;;
  clean)
    run_compose down -v
    ;;
  shell-be)
    run_compose exec backend sh
    ;;
  shell-fe)
    run_compose exec frontend sh
    ;;
  migrate)
    run_compose exec backend python manage.py migrate
    ;;
  help|-h|--help)
    show_help
    ;;
  *)
    echo "Unknown command: $1"
    echo
    show_help
    exit 1
    ;;
esac
