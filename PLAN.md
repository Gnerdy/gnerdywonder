# Gnerdywonder Software Sales Site — Implementation Plan

## Project Overview
GitHub Pages-style static website for selling Gnerdywonder software with Paystack payment integration (client-side InlineJS only, no backend).

## Target Directory
c:\inetpub\wwwroot\gnerdywonder\

## File Structure
gnerdywonder/
├── PLAN.md
├── index.html
├── buy.html
├── success.html
├── cancel.html
├── css/style.css
├── js/app.js
├── js/buy.js
├── images/logo.png (existing)
└── downloads/.gitkeep (place GnerdyWonderSetup.exe here)

## Pricing (GHS)
| Plan | Price | Devices | Updates | Support |
|------|-------|---------|---------|---------|
| Basic | 1,000.00 GHS | 1 device | 1 year | Standard |
| Advanced | 1,500.00 GHS | 3 devices | 1 year | Priority |
| Perpetual | 2,500.00 GHS | 5 devices | Lifetime | Lifetime |

## Paystack (Test Mode)
- Public Key: pk_test_9bea51e2bf65da4ca28f1128cb485f7f554c150b
- Secret Key: sk_test_540b43c45974188bd3996bfe1f1cb363ab11fab3 (not used client-side)
- Currency: GHS

## Payment Methods
Card (Visa, Mastercard, Verve), Bank Transfer, Mobile Money (MTN, Vodafone, AirtelTigo Ghana), USSD, QR

## Post-Payment Flow
Buy Now → buy.html?plan=x → Paystack popup → success.html?reference=XXX&plan=x → direct download of GnerdyWonderSetup.exe

## Support Email
support@gnerdyresearchconsortium.com

## Software File
GnerdyWonderSetup.exe (place in downloads/ folder)

## Notes
- Test keys active — no real money charged.
- Client-side only — download link is publicly accessible.
- To go live: replace test key with live key in buy.js; upgrade Paystack account to live mode.