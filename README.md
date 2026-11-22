# The World Today — Sunday, 22 November 2026

A newspaper front page summing up Sunday 22 November 2026 in one image,
drawn in code with @napi-rs/canvas (see `render.mjs`, build tooling only).
`main.ts` (Node 22, standard library only) copies `entry.png` to
`/output/entry.png` and verifies the copy byte-for-byte.

## Stories (all first reported on 22 November 2026)

1. **Lead — Iran says it hit US Patriot radars in Bahrain.** Iran's IRGC
   claims a missile-and-drone strike on two US Patriot radars at the
   Al-Riffa and Awali bases; Bahrain says an Iranian attack set fire to a
   civilian industrial facility, with no injuries, and its air defences
   intercepted several attacks. Radar damage is unverified — the image says
   so. (Reuters / Al Jazeera / Bahrain Interior Ministry, 22 Nov 2026)
2. **Russian strike on Lviv kills two, injures ten.** A missile hits a
   building in the western Ukrainian city. (Global news digest, 22 Nov 2026)
3. **EU and Indonesia sign landmark trade deal.** After a decade of talks,
   the pact scraps 98.5% of tariffs between Europe and South-East Asia's
   biggest economy. (European Commission / news digest, 22 Nov 2026)
4. **COP31 climate talks run into overtime, deadlocked.** Negotiators extend
   the summit as countries split over fossil fuels and finance.
   (News digest, 22 Nov 2026)
5. **Voting begins for Hong Kong's powerful Election Committee.** About
   5,700 voters choose the panel that picks the city's leader.
   (News digest, 22 Nov 2026)
6. **Norway's supreme court voids disputed oil licences.** The court rules
   climate-challenged oil licences invalid. (C54 News, 22 Nov 2026)
7. **Alcaraz to face Zverev for the ATP Finals crown.** Alcaraz completes a
   comeback over Shelton to set up the title decider against the world
   No. 1. (BBC Sport, 22 Nov 2026)

## Run

```sh
mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
```

Two runs produce byte-identical output.
