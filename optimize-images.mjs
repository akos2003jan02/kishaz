
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const backup = path.join(
  root,
  `backup-images-${new Date().toISOString().replace(/[:.]/g, "-")}`
);

const images = [
  "public/images/dj.jpeg",
  "public/images/gitaros.jpeg",
  "public/images/rapper.jpeg",
  "src/assets/gallery/BOM_20260918_AKVA-221.jpeg",
  "src/assets/gallery/BOM_20260918_AKVA-228.jpeg",
  "src/assets/gallery/IMG_5964.jpeg",
  "src/assets/gallery/IMG_6072.jpeg",
  "src/assets/gallery/IMG_6122.jpeg",
];

fs.mkdirSync(backup, { recursive: true });
fs.cpSync(path.join(root, "src"), path.join(backup, "src"), {
  recursive: true,
});
fs.cpSync(path.join(root, "public"), path.join(backup, "public"), {
  recursive: true,
});

for (const relative of images) {
  const input = path.join(root, relative);

  if (!fs.existsSync(input)) {
    console.log(`Kihagyva, nem található: ${relative}`);
    continue;
  }

  const output = input.replace(/\.jpeg$/i, ".webp");

  await sharp(input)
    .rotate()
    .webp({ quality: 82, effort: 5 })
    .toFile(output);

  const oldSize = fs.statSync(input).size;
  const newSize = fs.statSync(output).size;

  console.log(
    `${path.basename(input)}: ` +
    `${(oldSize / 1024 / 1024).toFixed(2)} MB -> ` +
    `${(newSize / 1024).toFixed(0)} KB`
  );
}

// A tagfotók hivatkozásainak frissítése.
const appFile = path.join(root, "src/App.tsx");

if (!fs.existsSync(appFile)) {
  throw new Error("Nem található a src/App.tsx fájl.");
}

let app = fs.readFileSync(appFile, "utf8");

for (const name of ["dj", "gitaros", "rapper"]) {
  app = app.replaceAll(`${name}.jpeg`, `${name}.webp`);
}

// A galéria csak a WebP-képeket töltse be,
// így az eredeti JPEG-ek nem jelennek meg duplán.
app = app.replace(
  /import\.meta\.glob\("\.\/assets\/gallery\/\*\.\{jpg,jpeg,png,webp\}"/,
  'import.meta.glob("./assets/gallery/*.webp"'
);

fs.writeFileSync(appFile, app, "utf8");

console.log("\nA WebP-képek elkészültek.");
console.log("Az eredeti képek megmaradtak.");
console.log(`Biztonsági mentés: ${backup}`);
console.log("Következő lépés: npm.cmd run build");
