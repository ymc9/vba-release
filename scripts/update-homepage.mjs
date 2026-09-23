// Rewrite the version, date and download links in docs/index.html from a GitHub release.
// Usage: node scripts/update-homepage.mjs <release.json>   (the workflow passes the event's release object)
import { readFileSync, writeFileSync } from "node:fs";

const [, , releasePath] = process.argv;
const rel = JSON.parse(readFileSync(releasePath, "utf8"));
const version = String(rel.tag_name || "").replace(/^v/, "");
if (!/^\d+\.\d+\.\d+/.test(version)) throw new Error(`unexpected tag: ${rel.tag_name}`);
const date = new Date(rel.published_at || Date.now()).toLocaleDateString("en-US", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: "UTC" });
const asset = (re) => rel.assets.find((a) => re.test(a.name));
const links = {
  "dl-mac-arm": asset(/-arm64\.dmg$/),
  "dl-mac-x64": asset(/-x64\.dmg$/),
  "dl-win": asset(/\.exe$/),
};

const repo = process.env.GITHUB_REPOSITORY || "ymc9/vba-release";
const file = new URL("../docs/index.html", import.meta.url);
let html = readFileSync(file, "utf8");
const before = html;
for (const [id, a] of Object.entries(links)) {
  if (!a) { console.warn(`no asset for ${id} in ${rel.tag_name}`); continue; }
  // The stable form; the payload's browser_download_url points at an "untagged" path for drafts.
  html = html.replace(new RegExp(`(id="${id}" href=")[^"]*(")`), `$1https://github.com/${repo}/releases/download/${rel.tag_name}/${a.name}$2`);
}
html = html.replace(/(<b id="tb-rev">)[^<]*(<\/b>)/, `$1${version}$2`);
html = html.replace(/(<b id="tb-date">)[^<]*(<\/b>)/, `$1${date}$2`);
html = html.replace(/(<b id="dl-version">)[^<]*(<\/b>)/, `$1${version}$2`);
html = html.replace(/(<span id="dl-date">)[^<]*(<\/span>)/, `$1${date}$2`);
writeFileSync(file, html);
console.log(html === before ? "homepage already current" : `homepage updated to ${version} (${date})`);
