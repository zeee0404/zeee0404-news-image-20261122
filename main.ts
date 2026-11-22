// A working news-image-20261122 entry (Node 22, standard library only): the image
// is the entry.png beside this file, and the program copies it to /output/entry.png.
// The gate takes a whole PNG or JPEG of at most 1 MiB and 1024 by 1024 pixels,
// and the judge sees exactly the bytes copied.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
// The grader supplies /output, but a local run may point at a fresh folder:
// create the destination directory instead of failing on a missing path.
mkdirSync(outDir, { recursive: true });
// The entry is the image beside this file; the judge sees exactly these bytes.
// It was drawn in code for Sunday 22 November 2026 (see README for the stories).
const source = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');
const expected = readFileSync(source);
// The gate refuses images over 1 MiB: fail loudly here instead of
// shipping an entry the grader would reject.
const MAX_BYTES = 1024 * 1024;
if (expected.length > MAX_BYTES) {
  throw new Error(`entry.png is ${expected.length} bytes, over the 1 MiB gate limit`);
}
// The gate reads the file by its first bytes: refuse a source that is not a PNG.
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!expected.subarray(0, 8).equals(PNG_MAGIC)) {
  throw new Error('entry.png is not a PNG (bad magic bytes)');
}
copyFileSync(source, dest);

// Verify the copy byte-for-byte: the judge must see exactly the entry bytes.
// A truncated or corrupted copy fails loudly (non-zero exit) instead of
// silently reaching the judge. The error reports both byte counts
// (expected vs actually written) so a mismatch is diagnosable at a glance.
const actual = readFileSync(dest);
if (!expected.equals(actual)) {
  throw new Error(
    `entry.png copy mismatch: expected ${expected.length} bytes, wrote ${actual.length} bytes`,
  );
}
console.log(`entry.png written: ${actual.length} bytes (verified byte-for-byte)`);
