// A working gta6-clipper-01 entry (Node 22, standard library only).
// It copies VIDEO.json from the repository root to /output/VIDEO.json,
// where the gate reads it. That is all the program has to do.
//
// The entry is the video itself: the clip was cut in this session from
// Rockstar's official Grand Theft Auto VI Trailer 2 (YouTube,
// https://www.youtube.com/watch?v=VQRLujxTm3c), trimmed to the finale
// action run (138.0s-156.0s), reframed to vertical 9:16 with a
// blur-fill, and given make.fun's pitch as on-screen text at the end.
// The clip was uploaded to YouTube as a public Short with the bounty's
// line and the entrant's play code in its description; VIDEO.json names
// that video, and the house reads its views through the YouTube Data API.
// Nothing this program writes about the video is scored.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? "/bot";
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  const source = join(BOT_DIR, "VIDEO.json");
  const parsed = JSON.parse(readFileSync(source, "utf8")) as { url?: unknown };
  if (typeof parsed.url !== "string" || !parsed.url.startsWith("https://")) {
    throw new Error("VIDEO.json holds no https url");
  }
  copyFileSync(source, join(OUTPUT_DIR, "VIDEO.json"));
} catch (err) {
  console.error(`VIDEO.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
