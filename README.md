# Zivora — Luxury Pakistani Fashion eCommerce

A full-stack premium fashion eCommerce platform inspired by high-end Pakistani brands like Maria B, Elan, and Sana Safinaz.

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + Tailwind CSS v4 + Framer Motion
- **Backend**: Next.js API Routes
- **Database**: MongoDB (Mongoose)
- **Auth**: NextAuth v4 (Google OAuth — admin only)
- **Storage**: Cloudinary (product images)
- **Email**: Nodemailer (order notifications)
- **State**: Zustand (cart persistence)

## Project Structure

```
├── app/
│   ├── page.tsx              # Homepage
│   ├── shop/page.tsx         # Product listing with filters
│   ├── product/[id]/page.tsx # Product detail
│   ├── cart/page.tsx         # Shopping cart
│   ├── checkout/page.tsx     # Checkout form
│   ├── order-success/        # Order confirmation
│   ├── about/page.tsx        # Brand story
│   ├── contact/page.tsx      # Contact form
│   ├── admin/                # Protected admin panel
│   │   ├── page.tsx          # Dashboard
│   │   ├── products/         # Product management
│   │   └── orders/           # Order management
│   └── api/                  # API routes
├── components/               # Reusable UI components
├── lib/                      # MongoDB, Cloudinary, Mailer, Auth
├── models/                   # Mongoose schemas
└── store/                    # Zustand cart store
```

## Setup

### 1. Clone & Install

```bash
git clone <repo>
yarn install
```

### 2. Environment Variables

Copy `.env.local` and fill in your values:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/zivora
NEXTAUTH_SECRET=your-secret
NEXTAUTH_URL=http://localhost:3000

GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

ADMIN_EMAIL=your-admin@gmail.com

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### 3. Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add `http://localhost:3000/api/auth/callback/google` as authorized redirect URI
4. Set `ADMIN_EMAIL` to the Gmail you want to use for admin access

### 4. Run Locally

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

Admin panel: [http://localhost:3000/admin](http://localhost:3000/admin)

### 5. Hero Video (Optional)

Place a `hero-video.mp4` in the `/public` folder for the homepage hero background video. Without it, a fallback image is shown.

## Deployment

### Vercel (Frontend + API)

```bash
vercel deploy
```

Add all environment variables in Vercel dashboard. Update `NEXTAUTH_URL` to your production URL.

### MongoDB Atlas

Use a free M0 cluster at [mongodb.com/atlas](https://mongodb.com/atlas). Whitelist `0.0.0.0/0` for Vercel's dynamic IPs.

## Admin Panel

- Visit `/admin/login`
- Sign in with the Gmail set as `ADMIN_EMAIL`
- Manage products (add/edit/delete with Cloudinary image upload)
- View and update order statuses (Pending → Shipped → Delivered)
- Dashboard shows live stats

## Features

- Full-width hero with video background
- Framer Motion page & scroll animations
- Product quick view modal
- Cart with Zustand persistence
- Cash on Delivery checkout
- Email notification on new orders
- Responsive (mobile + desktop)
- SEO metadata
- Image optimization via Next.js + Cloudinary
