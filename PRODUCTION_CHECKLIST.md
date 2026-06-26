# Production Deployment Checklist

## Authentication
- [x] JWT tokens securely generated and verified.
- [x] HttpOnly cookies enabled for token storage.
- [x] Secure flags active when in `NODE_ENV=production`.
- [x] SameSite configured.
- [x] Role-based routing enforces `admin` vs `customer` access.

## Modules
- [x] **Products:** CRUD operations bound to MongoDB Atlas. Cloudinary transformations logic at 800x800.
- [x] **Categories:** Associated images uploaded to Cloudinary `ecommerce/categories` with 400x400 crop.
- [x] **Banners:** 1920x700 aspect ratio forced at upload.
- [x] **Cart/Checkout:** Razorpay integration fallback logic handling.
- [x] **Orders & Tracking:** Email notifications tied via Resend.

## Integrations
- [x] **Cloudinary:** Streaming buffers directly to Cloudinary bypassing local `/uploads` directory.
- [x] **Razorpay:** Payment capture endpoint secured.
- [x] **Database:** Mongoose connection caching implemented for Vercel cold-starts.

## Deployment & Security
- [x] **Vercel Setup:** `vercel.json` routing `/api/(.*)` directly to `api/index.ts`.
- [x] **Rate Limiting:** IP-based requests throttled.
- [x] **Sanitization:** `express-mongo-sanitize` defending against NoSQL injection.
- [x] **Monitoring:** Sentry initialized in frontend and backend.
