from Letti_dreads_Backend.settings import *  # noqa: F403


TEMPLATES[0]["DIRS"] = [BASE_DIR / "templates", *TEMPLATES[0].get("DIRS", [])]
