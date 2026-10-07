/**
 * Tile Founders Batch waitlist — Google Apps Script backend.
 *
 * SETUP
 * 1. Create a Google Sheet (e.g. "Tile Waitlist").
 * 2. In the sheet: Extensions → Apps Script. Replace the default code with this file and save.
 * 3. Project Settings (gear icon) → Script properties → Add property:
 *      WAITLIST_SECRET = <a long random string>
 *    Use the same value for the WAITLIST_SECRET environment variable on Vercel.
 * 4. Select the `setup` function and click Run once. Approve the permissions. This creates
 *    the "Waitlist" tab with its header row.
 * 5. Deploy → New deployment → type "Web app":
 *      Execute as: Me
 *      Who has access: Anyone
 *    Copy the Web app URL (ends in /exec) into the WAITLIST_WEBHOOK_URL environment variable on Vercel.
 * 6. After editing this script later: Deploy → Manage deployments → Edit → Version: New version → Deploy.
 *    The /exec URL stays the same.
 *
 * CONTRACT (used by /api/tile-waitlist)
 *   POST body (JSON): { secret, name, email, whatsapp, city, colour, mode, consent, referrer }
 *     → { ok: true, status: "added" }        new row appended
 *     → { ok: true, status: "duplicate" }    email already on the list, nothing written
 *     → { ok: false, error: "unauthorized" | "invalid" }
 *   GET ?secret=...
 *     → { ok: true, count }                  number of signups (rows below the header)
 *     → { ok: false, error: "unauthorized" }
 */

const SHEET_NAME = 'Waitlist';
const HEADERS = ['Timestamp', 'Name', 'Email', 'WhatsApp', 'City', 'Colour', 'Mode', 'Consent', 'Referrer'];
const EMAIL_COLUMN = 3;

function setup() {
  getSheet_();
}

function getSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

function secretOk_(value) {
  const expected = PropertiesService.getScriptProperties().getProperty('WAITLIST_SECRET');
  return Boolean(expected) && value === expected;
}

// Trims, caps length, and stops values being read as spreadsheet formulas.
function clean_(value) {
  const text = String(value == null ? '' : value).trim().slice(0, 300);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function doPost(e) {
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return json_({ ok: false, error: 'invalid' });
  }
  if (!secretOk_(data.secret)) return json_({ ok: false, error: 'unauthorized' });

  const email = clean_(data.email).toLowerCase();
  if (!email || email.indexOf('@') === -1) return json_({ ok: false, error: 'invalid' });

  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const sheet = getSheet_();
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const existing = sheet
        .getRange(2, EMAIL_COLUMN, lastRow - 1, 1)
        .getValues()
        .map(function (row) { return String(row[0]).trim().toLowerCase(); });
      if (existing.indexOf(email) !== -1) return json_({ ok: true, status: 'duplicate' });
    }
    sheet.appendRow([
      new Date(),
      clean_(data.name),
      email,
      clean_(data.whatsapp),
      clean_(data.city),
      clean_(data.colour),
      clean_(data.mode),
      data.consent === true ? 'yes' : 'no',
      clean_(data.referrer),
    ]);
    return json_({ ok: true, status: 'added' });
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  if (!secretOk_(e.parameter.secret)) return json_({ ok: false, error: 'unauthorized' });
  const sheet = getSheet_();
  return json_({ ok: true, count: Math.max(0, sheet.getLastRow() - 1) });
}
