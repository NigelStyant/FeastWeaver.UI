# Setting Up Google OAuth for FeastWeaver.UI

This guide will walk you through the process of setting up Google OAuth for your FeastWeaver application.

## Step 1: Create a Google Cloud Project

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to "APIs & Services" > "OAuth consent screen"
4. Select "External" user type (unless you're using Google Workspace)
5. Fill in the required information (App name, User support email, Developer contact information)
6. Add the scopes: `.../auth/userinfo.email`, `.../auth/userinfo.profile`, and `openid`
7. Add your test users (including your own email)
8. Complete the registration

## Step 2: Create OAuth Credentials

1. In the Google Cloud Console, navigate to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Select "Web application" as the application type
4. Add a name for your OAuth client
5. Add authorized JavaScript origins:
   - For development: `http://localhost:3000`
   - For production: Your production URL
6. Add authorized redirect URIs:
   - For development: `http://localhost:3000/api/auth/callback/google`
   - For production: `https://your-production-domain.com/api/auth/callback/google`
7. Click "Create"

## Step 3: Set Up Environment Variables

Copy the Client ID and Client Secret from the previous step and update your `.env.local` file:

```
GOOGLE_CLIENT_ID="your-client-id"
GOOGLE_CLIENT_SECRET="your-client-secret"
NEXTAUTH_SECRET="your-nextauth-secret" # Generate with: openssl rand -base64 32
NEXTAUTH_URL="http://localhost:3000" # Change to your production URL in production
```

## Step 4: Restart Your Development Server

After setting up the environment variables, restart your Next.js development server:

```bash
npm run dev
```

## Testing Authentication

Visit your application at `http://localhost:3000` and click the "Sign in with Google" button. You should be redirected to Google's authentication page. After signing in, you'll be redirected back to your application and should be able to access the protected dashboard page.

## Production Deployment

When deploying to production:

1. Update the authorized JavaScript origins and redirect URIs in the Google Cloud Console
2. Update the `NEXTAUTH_URL` environment variable to your production URL
3. Ensure your `NEXTAUTH_SECRET` is a secure, random string

## Troubleshooting

- If you encounter "Error 400: redirect_uri_mismatch", ensure your redirect URI in the Google Cloud Console exactly matches the callback URL used by NextAuth.js
- If authentication works but you're not redirected properly, check your `NEXTAUTH_URL` environment variable
- For other issues, check the NextAuth.js documentation and Google OAuth documentation
