# Contact Form Setup Guide

Your portfolio now has a **fully functional contact form** instead of just a simulation! Here are the setup options:

## 🎯 Quick Setup (Recommended): Formspree

**Already configured and ready to use!** The form is set to use Formspree with form ID `mgvejqel`.

### What's Formspree?

- Free service for handling form submissions
- No server configuration needed
- Emails sent directly to your inbox
- 50 submissions/month on free plan

### To customize:

1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form
3. Replace `mgvejqel` in `Contact.tsx` with your form ID
4. Verify your email address

## ⚙️ Advanced Setup: Your Own Email Server

If you want to use your own email server instead of Formspree:

### 1. Set up Environment Variables

Create `.env.local` file in your project root:

```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password_here
```

### 2. Gmail Setup (Recommended)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
   - Use this password in `EMAIL_PASS`

### 3. Alternative Email Services

The API route (`/app/api/contact/route.ts`) supports:

- Gmail (configured)
- Outlook/Hotmail
- Yahoo Mail
- Custom SMTP servers

Just update the `service` field in the transporter configuration.

## 🔄 How It Works

1. **Primary**: Form submits to Formspree (instant, reliable)
2. **Fallback**: If Formspree fails, tries your API route
3. **User Experience**: Loading states, success/error messages, form reset

## ✨ Features Included

- ✅ **Real form submission** (no more simulation)
- ✅ **Email validation**
- ✅ **Loading states** with spinner
- ✅ **Success/error messages** with animations
- ✅ **Auto form reset** after successful submission
- ✅ **Fallback system** for reliability
- ✅ **Responsive design** maintained
- ✅ **Accessibility** (proper labels, focus states)

## 🧪 Testing

1. Fill out the form on your portfolio
2. Submit it
3. Check your email (may take 1-2 minutes)
4. Look for emails from Formspree or your configured email

## 📧 Customization

You can customize:

- Email templates in the API route
- Form validation rules
- Success/error messages
- Form styling and animations

The contact form is now production-ready! 🚀
