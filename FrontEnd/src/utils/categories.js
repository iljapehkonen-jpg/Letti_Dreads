export const slugifyCategory = (value = "") =>
  value
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const CATEGORY_ALIASES = {
  instock: ["instock", "in-stock", "instant", "gotovye-sety", "valmiit-setit"],
  dreads: ["dreads", "dreadlocks", "rastat", "rasta"],
  "smooth-dreads": ["smooth-dreads", "smooth-dreadlocks", "gladkie-dredy"],
  "textured-dreads": [
    "textured-dreads",
    "textured-dreadlocks",
    "teksturirovannye-dredy",
  ],
  curls: ["curls", "kiharat", "kudri"],
  braids: ["braids", "letit", "kosy", "braids-hair"],
  "hair-on-braid": [
    "hair-on-braid",
    "hair-on-braids",
    "volosy-na-kose",
    "hiukset-letilla",
  ],
  "curls-on-mini-dread": [
    "curls-on-mini-dread",
    "curls-on-small-dread",
    "kudri-na-malenkoy-drede",
    "kudri-na-dredine",
    "kiharat-pienella-rastalla",
  ],
  other: ["other", "drugoe", "muu"],
  canikalons: ["canikalons", "kanekalonit", "kanekalony"],
};

export const normalizeCategorySlug = (value = "") => {
  const slug = slugifyCategory(value);

  for (const [target, aliases] of Object.entries(CATEGORY_ALIASES)) {
    if (aliases.includes(slug)) {
      return target;
    }
  }

  return slug;
};

export const getCategoryTranslationKey = (slug = "") => {
  const normalized = normalizeCategorySlug(slug);

  if (
    [
      "instock",
      "dreads",
      "smooth-dreads",
      "textured-dreads",
      "curls",
      "braids",
      "hair-on-braid",
      "curls-on-mini-dread",
      "other",
      "canikalons",
    ].includes(normalized)
  ) {
    return `shop.categories.${normalized}`;
  }

  return null;
};
