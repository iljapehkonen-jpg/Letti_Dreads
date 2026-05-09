from importlib.util import module_from_spec, spec_from_file_location
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
SETTINGS_PATH = BASE_DIR / "Letti_dreads_Backend" / "settings.py"

spec = spec_from_file_location("embedded_letti_settings", SETTINGS_PATH)
module = module_from_spec(spec)
assert spec.loader is not None
spec.loader.exec_module(module)

for key in dir(module):
    if key.isupper():
        globals()[key] = getattr(module, key)

TEMPLATES[0]["DIRS"] = [BASE_DIR / "templates", *TEMPLATES[0].get("DIRS", [])]
