# Resend Email Collection Setup

This project uses [Resend](https://resend.com) to collect newsletter signups.

## Setup Instructions

1. **Create a Resend account** at [resend.com](https://resend.com)

2. **Get your API Key**
   - Go to [API Keys](https://resend.com/api-keys)
   - Create a new API key
   - Copy the key (it starts with `re_`)

3. **Create an Audience**
   - Go to [Audiences](https://resend.com/audiences)
   - Create a new audience (e.g., "Newsletter Subscribers")
   - Copy the Audience ID

4. **Set Environment Variables**

   Create a `.env` file in the project root:
   
   ```bash
   RESEND_API_KEY=re_your_api_key_here
   RESEND_AUDIENCE_ID=your_audience_id_here
   ```

5. **For Vercel Deployment**
   
   Add the environment variables in your Vercel project settings:
   - Go to your project on Vercel
   - Navigate to Settings → Environment Variables
   - Add `RESEND_API_KEY` and `RESEND_AUDIENCE_ID`
   - Redeploy your project

## Features

- ✅ Honeypot spam prevention
- ✅ Email validation
- ✅ Success/error messages
- ✅ Form disabled after successful signup
- ✅ Automatic audience management via Resend

## Testing Locally

```bash
# Make sure your .env file is set up
npm run dev
```

Visit the homepage and test the email signup form.

## Managing Subscribers

View and manage your subscribers at [Resend Audiences](https://resend.com/audiences).

