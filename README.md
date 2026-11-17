# Jigme Bhutan Tourism

A responsive Next.js tourism website for exploring Bhutan and sending private tour inquiries. Package prices and online payments are intentionally absent.

## Run locally

1. Install Node.js 20.9 or newer and PostgreSQL 14 or newer.
2. Copy `.env.example` to `.env` and set `DATABASE_URL`, a random `AUTH_SECRET` (32+ characters), the agency WhatsApp number (digits with country code, no `+`), the agency email, and the deployed site URL.
3. Install packages: `npm install`.
4. Generate the Prisma client and create the database tables: `npx prisma generate` and `npx prisma db push`.
5. Add the starter destinations and journeys: `npm run db:seed`.
6. Start the site with `npm run dev` and open `http://localhost:3000`.

Starter destination and tour records are in `prisma/seed.ts`. If the database is unavailable, public pages use the fallback examples in `lib/content.ts`. Replace the illustrative remote photography with licensed Jigme Bhutan Tourism images before launch.

## Inquiry and account setupnpm run dev

Travel inquiries are validated on the server and saved in PostgreSQL. Each saved inquiry receives a unique `JBT-YYYY-XXXXXX` reference. Visitors can create email/password accounts; passwords are hashed and sessions use HTTP-only, same-site cookies. Signed-in users see inquiries submitted while signed in. The trip planner currently saves in the visitor's browser, rather than syncing across devices.

To grant the first administrator, register that person at `/register`, then run this statement against the configured database:

```sql
UPDATE "User" SET "role" = 'ADMIN' WHERE "email" = 'admin@example.com';
```

Administrators sign in at `/login` and visit `/admin` to manage published destinations and tour packages, review travel inquiries and contact messages, change booking status, and save internal notes. Public destination and tour listings read published content from PostgreSQL. Admin routes check the signed session role. Configure a shared rate limiter and email-based password reset before exposing account creation publicly; password reset is not implemented in this initial build.

The app uses Next.js 16 and Prisma ORM 7. Prisma 7 connects through the PostgreSQL driver adapter, with its CLI connection configured in `prisma7.config.ts`.

## Before launch

- Replace the default contact values with the agency’s verified WhatsApp number and email.
- Set `AUTH_SECRET` and `DATABASE_URL` in the deployment environment; never commit `.env`.
- Replace illustrative images with approved agency photography and confirm image usage rights.
- Review travel information and update it against current official Bhutan guidance.
- Run the database migrations in the target environment and use HTTPS in production.
- The initial gallery, reviews, and travel information are illustrative/static; their in-app admin editors are not included in this initial build.
