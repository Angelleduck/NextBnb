# Nextbnb

A simple home-booking app built with Next.js. Browse places, save favorites, list a property, and book a stay.

## Built with

Next.js, React, Prisma, PostgreSQL, Better Auth, Cloudinary, and Resend.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file with your own values:

   ```env
   DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/nextbnb
   BETTER_AUTH_SECRET=your-secret-key
   BETTER_AUTH_URL=http://localhost:3000
   NEXT_PUBLIC_CLOUDINARY_NAME=your-cloud-name
   RESEND_KEY=your-resend-api-key
   RESEND_FROM_EMAIL="Nextbnb <hello@your-verified-domain.com>"
   ```

   The database must be running before you start the app. To upload listing photos, configure an unsigned Cloudinary upload preset named `upload-post-preset`. To send account emails, use a sender verified with Resend; its test sender can only email your Resend account address.

3. Set up the database:

   ```bash
   npx prisma db push
   npx prisma generate
   ```

4. Start the app:

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000).

## Production

```bash
npm run build
npm run start
```
