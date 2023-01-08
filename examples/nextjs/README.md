This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and written in TypeScript.<br/>

## Requirements
To run this example properly, add an .env file to the root of this project containing the following attributes:<br/>
`NEXT_PUBLIC_FC_DEMO_SITE_KEY` Which is your sitekey generated [here](https://friendlycaptcha.com/)<br/>
`FC_DEMO_SECRET_API_KEY` Which is your secret API key to validate a solved puzzle in your backend. This is also generated [here](https://friendlycaptcha.com/).


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/submit-form](http://localhost:3000/api/submit-form). This endpoint can be edited in `pages/api/submit-form.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
