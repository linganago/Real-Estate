const fs = require("fs");
const path = require("path");

const ROOT_DIR = "./client";
const S3_BASE_URL = "https://re-s3-project.s3.amazonaws.com/";
const VALID_EXTS = [".js", ".jsx", ".ts", ".tsx", ".html"];

function walk(dir) {
  let results = [];
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (VALID_EXTS.includes(path.extname(file))) {
      results.push(fullPath);
    }
  });
  return results;
}

function replaceWithS3(content) {
  let updated = content;

  // Replace "/image.png" → S3 URL
  updated = updated.replace(
    /src=["']\/([^"']+\.(?:png|jpg|jpeg|svg|webp))["']/g,
    (match, p1) => `src="${S3_BASE_URL}${p1}"`
  );

  return updated;
}

const files = walk(ROOT_DIR);
let changed = [];

files.forEach((file) => {
  const content = fs.readFileSync(file, "utf8");
  const updated = replaceWithS3(content);
  if (updated !== content) {
    fs.copyFileSync(file, file + ".bak"); // Create backup
    fs.writeFileSync(file, updated, "utf8");
    changed.push(path.relative(".", file));
  }
});

if (changed.length === 0) {
  console.log("✅ No image references needed replacement.");
} else {
  console.log("✅ Replaced image URLs in these files:");
  changed.forEach(f => console.log("•", f));
  console.log("\\n🗂️  Backups saved as *.bak for safety.");
}
