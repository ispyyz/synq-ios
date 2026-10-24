# SYNQ for iPhone

The iPhone app for SYNQ (synqsoul.com). It is a Capacitor shell that opens synqsoul.com and adds:

- push notifications (new lead / task assigned, quotation approved by the client, invoice overdue)
- the iOS share sheet for quotation and invoice PDFs
- an offline screen
- login only: sign-up and plan changes are done on the website (App Store rules)

Bundle ID: `com.synqsoul.app`

## How builds work

There is no Mac. GitHub Actions builds on a macOS runner (`.github/workflows/ios.yml`):

- every push to `main`: compile check for the simulator (no Apple account needed)
- **Actions → iOS → Run workflow**: archives, signs and uploads a build to App Store Connect (TestFlight)

Repository secrets needed for the upload:

| Secret | Where it comes from |
|---|---|
| `APPLE_TEAM_ID` | developer.apple.com → Membership details → Team ID |
| `ASC_KEY_ID` | App Store Connect → Users and Access → Integrations → App Store Connect API → key (Admin access) |
| `ASC_ISSUER_ID` | same page, "Issuer ID" |
| `ASC_KEY_P8` | the contents of the downloaded `AuthKey_XXXX.p8` file |

## Server side (push)

The server sends pushes with an APNs **Auth Key** (developer.apple.com → Certificates, IDs & Profiles → Keys → new key with "Apple Push Notifications service"). Put the `.p8` file outside `public_html` and add to `synq-config.php`:

```php
'apns' => ['team' => 'TEAMID', 'key_id' => 'KEYID', 'key_file' => '/home/<user>/domains/synqsoul.com/AuthKey_KEYID.p8', 'bundle' => 'com.synqsoul.app'],
```

Until that is filled in, devices still register but nothing is sent.

## Change the icon or splash

Edit `assets/icon.svg` / `assets/splash.svg`, run `node assets/render.js`, then copy `assets/splash.png` over the three files in `ios/App/App/Assets.xcassets/Splash.imageset/`.
