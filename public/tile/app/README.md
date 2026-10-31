# Tile Android app

Signed Android builds live here as `tile-<version>.apk`, served at https://dynamikdesignlab.in/tile/app/tile-<version>.apk.
Never commit signing keys (`*.jks`, `*.keystore`, `*.pem`); they are in .gitignore.

To release a new version:

1. Add `tile-<version>.apk` to this folder (keep the old ones, so old links keep working).
2. Update `version.json`: versionCode, version, sha256 (`sha256sum tile-<version>.apk`), size, date and notes.

`/tile/app/latest` redirects (302) to `tile-<version>.apk` using the version in `version.json` (see `next.config.js`).

The download button and the version, size, date and SHA-256 shown on /tile/start#app are read from `version.json`.
