# rencarform mobile e2e

WebdriverIO + Appium test bundle extracted from the local OpenClaw workspace.

## Included
- `specs/login.e2e.spec.js`
- `specs/contract-photo-signature.e2e.spec.js`
- `specs/contract-photo-signature.hybrid.e2e.spec.js`
- `specs/sell-car-selection.e2e.spec.js`
- `wdio.conf.js`
- `package.json`

## Requirements
- Appium server running on `127.0.0.1:4723`
- Android emulator/device available as `emulator-5554`
- Installed app: `com.rencarform`
- Chrome 113 compatible chromedriver at `./tools/chromedriver113/chromedriver`

## Install
```bash
npm install
```

## Run
```bash
npm run test:login
npm run test:contract:web
npm run test:contract:hybrid
npm run test:sell:car-selection
```

## Notes
- The hybrid contract spec currently assumes a logged-in state and is intended for iterative stabilization.
- The fixed-start version is being stabilized around `/home` as the start point.
- The sell-car-selection spec was validated manually from `/home`, but its replay currently fails if the app is not already on `/home` when the run starts.
- Do not commit personal workspace files, memory files, logs, or artifacts into this repo.
