// news-image-20261122 entry (Node 22, standard library only).
//
// The entry is the image file `entry.png` that sits next to this script.
// This program copies it to /output/entry.png and verifies the copy
// byte-for-byte, so the judge sees exactly the rendered bytes.
//
// The gate accepts a whole PNG or JPEG of at most 1 MiB and at most
// 1024 by 1024 pixels; this program fails loudly before it ever ships
// an image that would be rejected on size.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for
// /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

// Destination directory: /output inside the grader, overridable locally.
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
// The grader supplies /output, but a local run may point at a folder that
// does not exist yet — create it instead of failing on a missing path.
mkdirSync(outDir, { recursive: true });

// The entry image lives beside this file; the judge sees exactly these bytes.
// It was drawn in code for Sunday 22 November 2026 — see README.md for the
// seven stories on the front page.
const source = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');
const expected = readFileSync(source);

// The gate refuses images over 1 MiB: fail loudly here instead of shipping
// an entry the grader would reject. The check runs before any copy is made,
// so a too-large source leaves no partial output behind.
const MAX_BYTES = 1024 * 1024;
if (expected.length > MAX_BYTES) {
  throw new Error(`entry.png is ${expected.length} bytes, over the 1 MiB gate limit`);
}

// The gate reads the file by its first bytes: refuse a source that is not
// a PNG, so a corrupted or swapped image cannot slip through. The eight
// magic bytes are the fixed PNG signature defined by the format itself.
const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);
if (!expected.subarray(0, PNG_SIGNATURE.length).equals(PNG_SIGNATURE)) {
  throw new Error('entry.png is not a PNG (bad magic bytes)');
}

copyFileSync(source, dest);

// Verify the copy byte-for-byte: the judge must see exactly the entry bytes.
// A truncated or corrupted copy fails loudly (non-zero exit) instead of
// silently reaching the judge. The error reports both byte counts — expected
// vs actually written — so a mismatch is diagnosable at a glance.
const actual = readFileSync(dest);
if (!expected.equals(actual)) {
  throw new Error(
    `entry.png copy mismatch: expected ${expected.length} bytes, wrote ${actual.length} bytes`,
  );
}

console.log(`entry.png written: ${actual.length} bytes (verified byte-for-byte)`);
