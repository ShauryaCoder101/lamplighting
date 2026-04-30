// ─────────────────────────────────────────────
//  TEXT NORMALIZER — anti-bypass for abuse filter
// ─────────────────────────────────────────────

const REPLACEMENTS = {
  "0": "o",
  "1": "i",
  "3": "e",
  "4": "a",
  "5": "s",
  "7": "t",
  "@": "a",
  "$": "s",
};

/**
 * Normalize text to catch leet-speak and symbol bypass attempts.
 * e.g. "f@ck" → "fack", "b1tch" → "bitch"
 */
function normalizeText(text) {
  let result = text.toLowerCase();

  for (const [char, replacement] of Object.entries(REPLACEMENTS)) {
    result = result.split(char).join(replacement);
  }

  // Remove all non-alphanumeric characters
  result = result.replace(/[^a-z0-9]/g, "");

  return result;
}

module.exports = { normalizeText };
