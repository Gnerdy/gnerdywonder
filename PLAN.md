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

## Paystack (Live Mode)
- Public Key: <set in environment / Paystack dashboard>
- Secret Key: <set in environment — not used client-side>
- Currency: GHS

## Payment Methods
Card (Visa, Mastercard, Verve), Bank Transfer, Mobile Money (MTN, Vodafone, AirtelTigo Ghana), USSD, QR

## Post-Payment Flow
Buy Now → buy.html?plan=advanced → Paystack popup → success.html?reference=XXX&plan=advanced → direct download of GnerdyWonderSetup.exe

## Available Plan
Only the **Advanced** plan (GH₵ 1,500.00) is available for purchase. Basic and Perpetual plans are greyed out and not clickable.

## Software File
GnerdyWonderSetup.exe (already present in downloads/ folder)

## Support Email
support@gnerdyresearchconsortium.com

## Software File
GnerdyWonderSetup.exe (place in downloads/ folder)

## Notes
- Test keys active — no real money charged.
- Client-side only — download link is publicly accessible.
- To go live: replace test key with live key in buy.js; upgrade Paystack account to live mode.