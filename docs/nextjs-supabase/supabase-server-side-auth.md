# Setting up Server-Side Auth for Next.js | Supabase Docs

---

Next.js comes in two flavors: the [App Router](https://nextjs.org/docs/app) and the [Pages Router](https://nextjs.org/docs/pages). You can set up Server-Side Auth with either strategy. You can even use both in the same application.

### Install Supabase packages

Install the `@supabase/supabase-js` package and the helper `@supabase/ssr` package.

```
1npm install @supabase/supabase-js @supabase/ssr
```

### Set up environment variables

Create a `.env.local` file in your project root directory.

Fill in your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`:

###### Project URL

###### Publishable key

```
12NEXT_PUBLIC_SUPABASE_URL=<your_supabase_project_url>NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=<sb_publishable_... or anon keyY>
```

### Write utility functions to create Supabase clients

To access Supabase from your Next.js app, you need 2 types of Supabase clients:

1.  **Client Component client** - To access Supabase from Client Components, which run in the browser.
2.  **Server Component client** - To access Supabase from Server Components, Server Actions, and Route Handlers, which run only on the server.

Create a `utils/supabase` folder at the root of your project, or inside the `./src` folder if you are using one, with a file for each type of client. Then copy the utility functions for each client type.

```
12345678import { createBrowserClient } from '@supabase/ssr'export function createClient() {  return createBrowserClient(    process.env.NEXT_PUBLIC_SUPABASE_URL!,    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!  )}
```

### Hook up middleware

Create a `middleware.ts` file at the root of your project, or inside the `./src` folder if you are using one.

Since Server Components can't write cookies, you need middleware to refresh expired Auth tokens and store them.

The middleware is responsible for:

1.  Refreshing the Auth token (by calling `supabase.auth.getUser`).
2.  Passing the refreshed Auth token to Server Components, so they don't attempt to refresh the same token themselves. This is accomplished with `request.cookies.set`.
3.  Passing the refreshed Auth token to the browser, so it replaces the old token. This is accomplished with `response.cookies.set`.

Copy the middleware code for your app.

Add a [matcher](https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths) so the middleware doesn't run on routes that don't access Supabase.

```
12345678910111213141516171819import { type NextRequest } from 'next/server'import { updateSession } from '@/utils/supabase/middleware'export async function middleware(request: NextRequest) {  return await updateSession(request)}export const config = {  matcher: [    /*     * Match all request paths except for the ones starting with:     * - _next/static (static files)     * - _next/image (image optimization files)     * - favicon.ico (favicon file)     * Feel free to modify this pattern to include more paths.     */    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',  ],}
```

### Create a login page

Create a login page for your app. Use a Server Action to call the Supabase signup function.

Since Supabase is being called from an Action, use the client defined in `@/utils/supabase/server.ts`.

```
1234567891011121314import { login, signup } from './actions'export default function LoginPage() {  return (    <form>      <label htmlFor="email">Email:</label>      <input id="email" name="email" type="email" required />      <label htmlFor="password">Password:</label>      <input id="password" name="password" type="password" required />      <button formAction={login}>Log in</button>      <button formAction={signup}>Sign up</button>    </form>  )}
```

### Change the Auth confirmation path

If you have email confirmation turned on (the default), a new user will receive an email confirmation after signing up.

Change the email template to support a server-side authentication flow.

Go to the [Auth templates](https://supabase.com/dashboard/project/_/auth/templates) page in your dashboard. In the `Confirm signup` template, change `{{ .ConfirmationURL }}` to `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email`.

### Create a route handler for Auth confirmation

Create a Route Handler for `auth/confirm`. When a user clicks their confirmation email link, exchange their secure code for an Auth token.

Since this is a Router Handler, use the Supabase client from `@/utils/supabase/server.ts`.

```
12345678910111213141516171819202122232425262728import { type EmailOtpType } from '@supabase/supabase-js'import { type NextRequest } from 'next/server'import { createClient } from '@/utils/supabase/server'import { redirect } from 'next/navigation'export async function GET(request: NextRequest) {  const { searchParams } = new URL(request.url)  const token_hash = searchParams.get('token_hash')  const type = searchParams.get('type') as EmailOtpType | null  const next = searchParams.get('next') ?? '/'  if (token_hash && type) {    const supabase = await createClient()    const { error } = await supabase.auth.verifyOtp({      type,      token_hash,    })    if (!error) {      // redirect user to specified redirect URL or root of app      redirect(next)    }  }  // redirect the user to an error page with some instructions  redirect('/error')}
```

### Access user info from Server Component

Server Components can read cookies, so you can get the Auth status and user info.

Since you're calling Supabase from a Server Component, use the client created in `@/utils/supabase/server.ts`.

Create a `private` page that users can only access if they're logged in. The page displays their email.

```
1234567891011121314import { redirect } from 'next/navigation'import { createClient } from '@/utils/supabase/server'export default async function PrivatePage() {  const supabase = await createClient()  const { data, error } = await supabase.auth.getUser()  if (error || !data?.user) {    redirect('/login')  }  return <p>Hello {data.user.email}</p>}
```

You're done! To recap, you've successfully:

-   Called Supabase from a Server Action.
-   Called Supabase from a Server Component.
-   Set up a Supabase client utility to call Supabase from a Client Component. You can use this if you need to call Supabase from a Client Component, for example to set up a realtime subscription.
-   Set up middleware to automatically refresh the Supabase Auth session.

You can now use any Supabase features from your client or server code!