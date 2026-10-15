#!/usr/bin/env node
// Publish a signed Tile firmware release to public/tile/fw/.
//
//   node scripts/tile-release.mjs <path-to-signed-folder>
//
// The folder is the output of tile_sign.py: manifest.json + tile-<version>.bin.
// Validates the pair, copies both into public/tile/fw/, records the release in releases.json
// (newest first) and prints the git commands to publish it. Old .bin files are kept on purpose:
// a Tile may still be part-way through downloading one. No dependencies.

import { createHash } from 'node:crypto'
import { copyFileSync, existsSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { basename, dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const FW_DIR = join(ROOT, 'public', 'tile', 'fw')
const PUBLIC_BASE = 'https://dynamikdesignlab.in/tile/fw/'

const fail = (msg) => {
  console.error(`\n✗ ${msg}\n`)
  process.exit(1)
}

// --- semver (MAJOR.MINOR.PATCH with an optional -prerelease) ---
const SEMVER = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z.-]+))?$/
function compareSemver(a, b) {
  const pa = a.match(SEMVER)
  const pb = b.match(SEMVER)
  for (let i = 1; i <= 3; i++) {
    const d = Number(pa[i]) - Number(pb[i])
    if (d) return Math.sign(d)
  }
  // A release outranks its prereleases (1.6.0 > 1.6.0-beta)
  if (!pa[4] && pb[4]) return 1
  if (pa[4] && !pb[4]) return -1
  if (pa[4] && pb[4]) return pa[4] < pb[4] ? -1 : pa[4] > pb[4] ? 1 : 0
  return 0
}

const readJson = (file, what) => {
  try {
    return JSON.parse(readFileSync(file, 'utf8'))
  } catch (e) {
    fail(`${what} is not valid JSON (${file}): ${e.message}`)
  }
}

// --- inputs ---
const arg = process.argv[2]
if (!arg) fail('Usage: node scripts/tile-release.mjs <path-to-signed-folder>')
const srcDir = resolve(arg)
if (!existsSync(srcDir) || !statSync(srcDir).isDirectory()) fail(`Not a folder: ${srcDir}`)
const srcManifest = join(srcDir, 'manifest.json')
if (!existsSync(srcManifest)) fail(`No manifest.json in ${srcDir}`)
const m = readJson(srcManifest, 'manifest.json')

// --- validate the manifest ---
const FIELDS = { version: 'string', url: 'string', size: 'number', sha256: 'string', sig: 'string', notes: 'string' }
for (const [k, type] of Object.entries(FIELDS)) {
  if (!(k in m)) fail(`manifest.json is missing "${k}"`)
  if (typeof m[k] !== type) fail(`manifest.json "${k}" must be a ${type}`)
}
if (!SEMVER.test(m.version)) fail(`version "${m.version}" is not semver (e.g. 1.6.0)`)
const binName = `tile-${m.version}.bin`
if (!m.url.endsWith(`/${binName}`)) fail(`url must end with /${binName} (got ${m.url})`)
if (!m.url.startsWith(PUBLIC_BASE)) console.warn(`! url does not start with ${PUBLIC_BASE}; Tiles will download from ${m.url}`)
if (!Number.isInteger(m.size) || m.size <= 0) fail(`size must be a positive whole number of bytes`)
if (!/^[0-9a-f]{64}$/.test(m.sha256)) fail(`sha256 must be 64 lowercase hex characters`)
if (!/^[A-Za-z0-9+/]+={0,2}$/.test(m.sig) || m.sig.length % 4 !== 0 || Buffer.from(m.sig, 'base64').length === 0)
  fail(`sig is not valid base64`)

// --- validate the binary against the manifest ---
const srcBin = join(srcDir, binName)
if (!existsSync(srcBin)) fail(`${binName} not found in ${srcDir}`)
const bin = readFileSync(srcBin)
if (bin.length !== m.size) fail(`size mismatch: manifest says ${m.size}, ${binName} is ${bin.length} bytes`)
const sha = createHash('sha256').update(bin).digest('hex')
if (sha !== m.sha256) fail(`sha256 mismatch:\n  manifest ${m.sha256}\n  actual   ${sha}`)

// --- must be newer than what is live ---
const liveManifest = join(FW_DIR, 'manifest.json')
if (existsSync(liveManifest)) {
  const live = readJson(liveManifest, 'Current public/tile/fw/manifest.json')
  if (SEMVER.test(String(live.version)) && compareSemver(m.version, live.version) <= 0)
    fail(`version ${m.version} is not higher than the current release ${live.version}`)
}
const destBin = join(FW_DIR, binName)
if (existsSync(destBin)) {
  const existing = createHash('sha256').update(readFileSync(destBin)).digest('hex')
  if (existing !== sha) fail(`${binName} already exists in public/tile/fw/ with different contents; refusing to overwrite`)
}

// --- publish: binary first, then the manifest that points to it ---
copyFileSync(srcBin, destBin)
copyFileSync(srcManifest, liveManifest)

const releasesFile = join(FW_DIR, 'releases.json')
const releases = existsSync(releasesFile) ? readJson(releasesFile, 'releases.json') : []
if (!Array.isArray(releases)) fail('releases.json must be a JSON array')
const date = new Date().toISOString().slice(0, 10)
const next = [{ version: m.version, date, notes: m.notes }, ...releases.filter((r) => r.version !== m.version)]
writeFileSync(releasesFile, JSON.stringify(next, null, 2) + '\n')

console.log(`
✓ Tile firmware ${m.version} is ready to publish
  ${basename(destBin)}   ${m.size} bytes   sha256 ${sha.slice(0, 16)}…
  manifest.json  → version ${m.version}
  releases.json  → ${next.length} release${next.length === 1 ? '' : 's'}, newest first

Publish it:

  git add public/tile/fw/manifest.json public/tile/fw/releases.json public/tile/fw/${binName}
  git commit -m "Tile firmware ${m.version}"
  git push

Once Vercel has deployed, check:
  curl -sI https://dynamikdesignlab.in/tile/fw/manifest.json
  curl -sI https://dynamikdesignlab.in/tile/fw/${binName}
`)
