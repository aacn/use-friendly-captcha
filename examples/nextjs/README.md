# Next.js example

Create `.env.local` with a public site key and private verification secret:

```dotenv
NEXT_PUBLIC_FC_DEMO_SITE_KEY=YOUR_PUBLIC_SITE_KEY
FC_DEMO_SECRET_API_KEY=YOUR_PRIVATE_SECRET
```

From the repository root, run:

```sh
pnpm --filter nextjs-example dev
```

The browser sends the solved puzzle to the App Router endpoint at
`/api/submit-form`. Only that server route reads the private secret.
