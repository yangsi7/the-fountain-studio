signInWithOtp() — Passwordless sign-in (Email or Phone)

Description

Initiate a passwordless sign-in for a user by email or phone. The user receives either:
    •    a Magic Link (email only), or
    •    a One-Time Password (OTP) (email or phone).

If the user does not exist, they are created by default. To block auto-signup, set shouldCreateUser: false.

Magic Links and OTPs share the same implementation. The email template determines which is sent:
    •    Include {{ .ConfirmationURL }} → Magic Link.
    •    Include {{ .Token }} → OTP.

Phone sign-ins always send an OTP. Magic Links are not supported for phone.

Requirements
    •    Provide either email or phone.
    •    For WhatsApp OTP, configure a Twilio WhatsApp sender. WhatsApp is not supported by other providers.
    •    PKCE is supported when using email.

Redirect behavior
    •    Magic Link destination is the project SITE_URL by default.
    •    Configure additional redirect URLs and wildcards in project settings.
    •    You can override per-request via options.emailRedirectTo.

⸻

Parameters

credentials (required) — one of

Email

{
  email: string,
  options?: EmailOptions
}

Phone

{
  phone: string,
  options?: PhoneOptions
}

EmailOptions

{
  shouldCreateUser?: boolean,          // default: true
  emailRedirectTo?: string,            // optional override for Magic Link redirect
  data?: Record<string, any>,          // optional user metadata on signup
  captchaToken?: string                // if CAPTCHA is enabled
}

PhoneOptions

{
  shouldCreateUser?: boolean,          // default: true
  channel?: 'sms' | 'whatsapp',        // default: 'sms'
  data?: Record<string, any>,          // optional user metadata on signup
  captchaToken?: string                // if CAPTCHA is enabled
}


⸻

Returns

On request accepted

{
  data: { user: null, session: null },
  error: null
}

On error

{
  data: { user: null, session: null },
  error: AuthError
}

Notes:
    •    Initial signInWithOtp() response never includes a session. Magic Links or OTP verification creates the session later.
    •    Error messages may not distinguish between “account does not exist” and “account restricted to social login”.

⸻

Rate limits and expiry
    •    By default, users can request a Magic Link or OTP once every 60 seconds.
    •    By default, Magic Links and Email OTPs expire after 1 hour.
    •    Email OTP expiry is configurable in Auth > Providers > Email > Email OTP Expiration.
    •    Email OTP expiry cannot exceed 86400 seconds (1 day).

⸻

Examples

Email — Magic Link (implicit flow)

const { data, error } = await supabase.auth.signInWithOtp({
  email: 'valid.email@supabase.io',
  options: {
    shouldCreateUser: false,                  // prevent auto-signup
    emailRedirectTo: 'https://example.com/welcome'
  }
})

Email — Magic Link with PKCE

Edit the Magic Link email template to send a token hash:

<h2>Magic Link</h2>
<p>Follow this link to login:</p>
<p><a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email">Log In</a></p>

At /auth/confirm, exchange the hash for a session:

const { error } = await supabase.auth.verifyOtp({
  token_hash: 'hash',
  type: 'email'
})

Email — OTP (send code)

Configure the email template to include {{ .Token }}:

<h2>One time login code</h2>
<p>Please enter this code: {{ .Token }}</p>

Send the OTP:

const { data, error } = await supabase.auth.signInWithOtp({
  email: 'valid.email@supabase.io',
  options: { shouldCreateUser: false }
})

Verify the OTP and create a session:

const {
  data: { session },
  error
} = await supabase.auth.verifyOtp({
  email: 'email@example.com',
  token: '123456',
  type: 'email'
})

Successful session example:

{
  "access_token": "…",
  "token_type": "bearer",
  "expires_in": 3600,
  "refresh_token": "…",
  "user": { ... }
}

Phone — SMS OTP

const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+15554443333',
  options: { shouldCreateUser: true, channel: 'sms' }
})
// Then prompt for code and verify:
const { data: { session }, error: vErr } = await supabase.auth.verifyOtp({
  phone: '+15554443333',
  token: '123456',
  type: 'sms'
})

Phone — WhatsApp OTP (Twilio only)

const { data, error } = await supabase.auth.signInWithOtp({
  phone: '+15554443333',
  options: { channel: 'whatsapp' }          // Twilio WhatsApp sender required
})
// Verify:
const { data: { session }, error: vErr } = await supabase.auth.verifyOtp({
  phone: '+15554443333',
  token: '123456',
  type: 'whatsapp'
})


⸻

Email template rules
    •    Magic Link: include {{ .ConfirmationURL }}.
    •    Email OTP: include {{ .Token }}.
    •    Magic Links work only with email. Phone uses OTP.
    •    SITE_URL and allowed redirect URLs gate where Magic Links can send users.

⸻

Security notes
    •    Keep OTP expiry short to reduce brute-force risk. Longer validity increases attack surface.
    •    Do not expose whether a user exists. Treat ambiguous errors as a generic failure.
    •    Rate limiting reduces enumeration and spam.

⸻

Errors

Common cases:
    •    AuthError for invalid email or phone format.
    •    Rate limit exceeded.
    •    Provider configuration missing or invalid (e.g., WhatsApp without Twilio sender).
    •    Account restricted to social login.
    •    CAPTCHA required or invalid when enabled.

Error strings are not guaranteed to reveal whether the user exists.

⸻

Reference behavior summary
    •    Email can send Magic Link or OTP based on template variables.
    •    Phone sends OTP only. WhatsApp channel requires Twilio.
    •    PKCE supported for email via token_hash and verifyOtp.
    •    shouldCreateUser: false blocks auto-signup.
    •    Initial call returns { user: null, session: null } with error: null on success.
    •    Default cooldown 60 seconds. Default expiry 1 hour. Email OTP max 86400 seconds.
