# Wowhabesha (demo)

React + Vite + Tailwind CSS v4. **No backend** – every API call is answered by a mock, so clients can test the whole flow:

Subscribe → choose plan → Telebirr details → upload receipt screenshot → success message ("payment under review").

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in /dist
```

## Folder structure

```
public/images/        <- put thumbnails here, reference as /images/<file>
src/
  config/app.js       <- brand, plans/prices, Telebirr account, Telegram link, USE_MOCK_API
  data/mockData.js    <- demo videos (titles + image paths)
  api/                <- ALL data access lives here (mock now, real later)
    client.js         fetch wrapper (JSON + file upload + auth header)
    mock.js           fake delay / ids
    videos.js  auth.js  payments.js
  context/            <- AuthContext (session + subscription), UIContext (open modal, toast)
  hooks/              <- useAsync, useLockBodyScroll
  components/
    layout/           Header, Footer, TelegramButton
    video/            VideoPlayer, VideoCard, RelatedVideos
    modals/           PricingModal, PaymentModal, LoginModal, ModalRoot
    common/           Modal, Toast, Icons, Logo
  pages/Home.jsx
  utils/              format, clipboard, storage
```

## Change things for the client

| What | Where |
| --- | --- |
| Name, logo text, footer text | `src/config/app.js` → `BRAND` |
| Prices / plans | `src/config/app.js` → `PLANS` |
| Telebirr number and name (currently a sample) | `src/config/app.js` → `PAYMENT` |
| Telegram support link | `src/config/app.js` → `SUPPORT` |
| Blur on/off for thumbnails | `src/config/app.js` → `BLUR_THUMBNAILS` |
| Videos and thumbnails | `src/data/mockData.js` + `public/images/` |

The footer shows a small **Reset demo** link after a test payment so the flow can be repeated.

## Connecting a real backend later

1. Copy `.env.example` to `.env` and set `VITE_API_BASE_URL`.
2. Set `USE_MOCK_API = false` in `src/config/app.js`.
3. Implement these endpoints (shapes are documented above each function in `src/api/`):

| Endpoint | Used by |
| --- | --- |
| `POST /auth/login` `{phone, password}` → `{token, user}` | LoginModal |
| `GET /videos/featured`, `GET /videos/related` | Home |
| `POST /payments/receipts` multipart `planId`, `receipt` → `{id, status:'pending', submittedAt}` | PaymentModal |

Components never call `fetch` directly, so no UI code changes when you switch.
