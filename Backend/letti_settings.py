from pathlib import Path
import sys


BASE_DIR = Path(__file__).resolve().parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from Letti_dreads_Backend.settings import *  # noqa: F403


TEMPLATES[0]["DIRS"] = [BASE_DIR / "templates", *TEMPLATES[0].get("DIRS", [])]
