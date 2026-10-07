# React example

Create `.env` with your public Friendly Captcha v1 site key:

```dotenv
VITE_FC_DEMO_SITE_KEY=YOUR_PUBLIC_SITE_KEY
```

From the repository root, run:

```sh
pnpm --filter react-example dev
```

The site key is safe to expose in browser code. Never put your Friendly
Captcha secret in a frontend environment variable.
