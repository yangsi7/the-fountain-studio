# Supabase-nextjs


use lib/supabase. utils/supabase also works. pick one and be consistent. official ssr guide shows utils/… while the next.js with-supabase template and supabase ui “blocks” use lib/… plus next_public_supabase_publishable_or_anon_key. both are valid.  ￼

below is a single, complete app router setup using lib/supabase and the newer key name. where relevant, i note getuser vs getclaims trade-offs.

# next.js + supabase (app router) — complete server-side auth + user management

## 0) install
```bash
npm install @supabase/supabase-js @supabase/ssr

1) environment

create .env.local.

next_public_supabase_url=https://your-project.supabase.co
next_public_supabase_publishable_or_anon_key=sb_publishable_xxx   # or legacy anon key

notes: publishable/anon keys are safe client-side if rls is correct. do not expose service_role.  ￼

2) database + storage (run in supabase sql editor)

create table if not exists public.profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  username text unique,
  full_name text,
  avatar_url text,
  website text,
  constraint username_length check (char_length(username) >= 3)
);

alter table public.profiles enable row level security;

create policy "public profiles are viewable by everyone."
  on public.profiles for select using (true);

create policy "users can insert their own profile."
  on public.profiles for insert with check ((select auth.uid()) = id);

create policy "users can update own profile."
  on public.profiles for update using ((select auth.uid()) = id);

create or replace function public.handle_new_user()
returns trigger
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

insert into storage.buckets (id, name)
values ('avatars', 'avatars')
on conflict (id) do nothing;

create policy "avatar images are publicly accessible."
  on storage.objects for select using (bucket_id = 'avatars');

create policy "anyone can upload an avatar."
  on storage.objects for insert with check (bucket_id = 'avatars');

create policy "anyone can update their own avatar."
  on storage.objects for update using ((select auth.uid()) = owner) with check (bucket_id = 'avatars');

source tutorial: supabase user management example.  ￼

3) supabase clients (lib/supabase)

lib/supabase/client.ts

import { createbrowserclient } from '@supabase/ssr'

export function createclient() {
  return createbrowserclient(
    process.env.next_public_supabase_url!,
    process.env.next_public_supabase_publishable_or_anon_key!
  )
}

lib/supabase/server.ts

import { createserverclient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/** create a new server client per request. */
export async function createclient() {
  const cookiestore = await cookies()
  return createserverclient(
    process.env.next_public_supabase_url!,
    process.env.next_public_supabase_publishable_or_anon_key!,
    {
      cookies: {
        getall() {
          return cookiestore.getall()
        },
        setall(cookiestoset) {
          try {
            cookiestoset.foreach(({ name, value, options }) =>
              cookiestore.set(name, value, options)
            )
          } catch {
            // called from a server component; safe to ignore.
          }
        },
      },
    }
  )
}

the lib/… structure and the …publishable_or_anon_key var are used by the official next.js example and supabase ui blocks.  ￼

4) middleware refresh + guard

create both files:

lib/supabase/middleware.ts — pick one of these implementations:

a) strict revalidation (auth server call every request)
use getuser() to revalidate on each request. official ssr guide recommends this when you need authoritative checks. more latency.  ￼

import { createserverclient } from '@supabase/ssr'
import { nextresponse, type nextrequest } from 'next/server'

export async function updatesession(request: nextrequest) {
  let supabaseresponse = nextresponse.next({ request })

  const supabase = createserverclient(
    process.env.next_public_supabase_url!,
    process.env.next_public_supabase_publishable_or_anon_key!,
    {
      cookies: {
        getall: () => request.cookies.getall(),
        setall(cookiestoset) {
          cookiestoset.foreach(({ name, value }) => request.cookies.set(name, value))
          supabaseresponse = nextresponse.next({ request })
          cookiestoset.foreach(({ name, value, options }) =>
            supabaseresponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getuser()

  const unguarded =
    request.nexturl.pathname.startswith('/auth') ||
    request.nexturl.pathname.startswith('/error') ||
    request.nexturl.pathname.startswith('/_next')

  if (!user && !unguarded) {
    const url = request.nexturl.clone()
    url.pathname = '/auth/login'
    return nextresponse.redirect(url)
  }

  return supabaseresponse
}

b) fast path (jwks verification)
use getclaims() to verify jwt locally; it refreshes only if needed. best with jwt signing keys enabled. lower latency. ensure this fits your security posture.  ￼

import { createserverclient } from '@supabase/ssr'
import { nextresponse, type nextrequest } from 'next/server'

export async function updatesession(request: nextrequest) {
  let supabaseresponse = nextresponse.next({ request })

  const supabase = createserverclient(
    process.env.next_public_supabase_url!,
    process.env.next_public_supabase_publishable_or_anon_key!,
    {
      cookies: {
        getall: () => request.cookies.getall(),
        setall(cookiestoset) {
          cookiestoset.foreach(({ name, value }) => request.cookies.set(name, value))
          supabaseresponse = nextresponse.next({ request })
          cookiestoset.foreach(({ name, value, options }) =>
            supabaseresponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // verify jwt via jwks; refresh if needed.
  const { data } = await supabase.auth.getclaims()
  const user = data?.claims // 'sub' is the user id

  const unguarded =
    request.nexturl.pathname.startswith('/auth') ||
    request.nexturl.pathname.startswith('/error') ||
    request.nexturl.pathname.startswith('/_next')

  if (!user && !unguarded) {
    const url = request.nexturl.clone()
    url.pathname = '/auth/login'
    return nextresponse.redirect(url)
  }

  return supabaseresponse
}

middleware.ts

import { type nextrequest } from 'next/server'
import { updatesession } from '@/lib/supabase/middleware'

export async function middleware(request: nextrequest) {
  return await updatesession(request)
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}

official ssr guide explains why the refresh happens in middleware and why getuser() is authoritative.  ￼

5) auth pages and actions

app/auth/login/page.tsx

import { login, signup } from './actions'

export default function loginpage() {
  return (
    <form>
      <label htmlfor="email">email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlfor="password">password:</label>
      <input id="password" name="password" type="password" required />
      <button formaction={login}>log in</button>
      <button formaction={signup}>sign up</button>
    </form>
  )
}

app/auth/login/actions.ts

'use server'

import { revalidatepath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createclient } from '@/lib/supabase/server'

export async function login(formdata: formdata) {
  const supabase = await createclient()
  const data = {
    email: formdata.get('email') as string,
    password: formdata.get('password') as string,
  }
  const { error } = await supabase.auth.signinwithpassword(data)
  if (error) redirect('/error')
  revalidatepath('/', 'layout')
  redirect('/account')
}

export async function signup(formdata: formdata) {
  const supabase = await createclient()
  const data = {
    email: formdata.get('email') as string,
    password: formdata.get('password') as string,
  }
  const { error } = await supabase.auth.signup(data)
  if (error) redirect('/error')
  revalidatepath('/', 'layout')
  redirect('/account')
}

app/error/page.tsx

'use client'
export default function errorpage() {
  return <p>sorry, something went wrong</p>
}

6) email confirm route

update the email template to:

{{ .siteurl }}/auth/confirm?token_hash={{ .tokenhash }}&type=email

then create:

app/auth/confirm/route.ts

import { type emailotptype } from '@supabase/supabase-js'
import { type nextrequest, nextresponse } from 'next/server'
import { createclient } from '@/lib/supabase/server'

export async function get(request: nextrequest) {
  const { searchparams } = new url(request.url)
  const token_hash = searchparams.get('token_hash')
  const type = searchparams.get('type') as emailotptype | null
  const next = searchparams.get('next') ?? '/account'

  const redirectto = request.nexturl.clone()
  redirectto.pathname = next
  redirectto.searchparams.delete('token_hash')
  redirectto.searchparams.delete('type')

  if (token_hash && type) {
    const supabase = await createclient()
    const { error } = await supabase.auth.verifyotp({ type, token_hash })
    if (!error) return nextresponse.redirect(redirectto)
  }

  redirectto.pathname = '/error'
  return nextresponse.redirect(redirectto)
}

guidance from ssr docs.  ￼

7) protected page (server component)

app/private/page.tsx

import { redirect } from 'next/navigation'
import { createclient } from '@/lib/supabase/server'

export default async function privatepage() {
  const supabase = await createclient()
  const { data, error } = await supabase.auth.getuser()
  if (error || !data?.user) redirect('/auth/login')
  return <p>hello {data.user.email}</p>
}

use getuser() server-side to trust identity.  ￼

8) account + profile + avatar

app/account/page.tsx

import accountform from './account-form'
import { createclient } from '@/lib/supabase/server'

export default async function account() {
  const supabase = await createclient()
  const { data: { user } } = await supabase.auth.getuser()
  return <accountform user={user} />
}

app/account/account-form.tsx

'use client'
import { usecallback, useeffect, usestate } from 'react'
import { createclient } from '@/lib/supabase/client'
import { type user } from '@supabase/supabase-js'
import avatar from './avatar'

export default function accountform({ user }: { user: user | null }) {
  const supabase = createclient()
  const [loading, setloading] = usestate(true)
  const [fullname, setfullname] = usestate<string | null>(null)
  const [username, setusername] = usestate<string | null>(null)
  const [website, setwebsite] = usestate<string | null>(null)
  const [avatar_url, setavatarurl] = usestate<string | null>(null)

  const getprofile = usecallback(async () => {
    try {
      setloading(true)
      const { data, error, status } = await supabase
        .from('profiles')
        .select('full_name, username, website, avatar_url')
        .eq('id', user?.id)
        .single()
      if (error && status !== 406) throw error
      if (data) {
        setfullname(data.full_name)
        setusername(data.username)
        setwebsite(data.website)
        setavatarurl(data.avatar_url)
      }
    } catch {
      alert('error loading user data!')
    } finally {
      setloading(false)
    }
  }, [user, supabase])

  useeffect(() => { getprofile() }, [user, getprofile])

  async function updateprofile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null
    fullname: string | null
    website: string | null
    avatar_url: string | null
  }) {
    try {
      setloading(true)
      const { error } = await supabase.from('profiles').upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new date().toisostring(),
      })
      if (error) throw error
      alert('profile updated!')
    } catch {
      alert('error updating the data!')
    } finally {
      setloading(false)
    }
  }

  return (
    <div classname="form-widget">
      <avatar
        uid={user?.id ?? null}
        url={avatar_url}
        size={150}
        onupload={(url) => {
          setavatarurl(url)
          updateprofile({ fullname, username, website, avatar_url: url })
        }}
      />

      <div>
        <label htmlfor="email">email</label>
        <input id="email" type="text" value={user?.email ?? ''} disabled />
      </div>

      <div>
        <label htmlfor="fullname">full name</label>
        <input
          id="fullname"
          type="text"
          value={fullname ?? ''}
          onchange={(e) => setfullname(e.target.value)}
        />
      </div>

      <div>
        <label htmlfor="username">username</label>
        <input
          id="username"
          type="text"
          value={username ?? ''}
          onchange={(e) => setusername(e.target.value)}
        />
      </div>

      <div>
        <label htmlfor="website">website</label>
        <input
          id="website"
          type="url"
          value={website ?? ''}
          onchange={(e) => setwebsite(e.target.value)}
        />
      </div>

      <div>
        <button
          classname="button primary block"
          onclick={() => updateprofile({ fullname, username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'loading ...' : 'update'}
        </button>
      </div>

      <div>
        <form action="/auth/signout" method="post">
          <button classname="button block" type="submit">sign out</button>
        </form>
      </div>
    </div>
  )
}

app/account/avatar.tsx

'use client'
import react, { useeffect, usestate } from 'react'
import { createclient } from '@/lib/supabase/client'
import image from 'next/image'

export default function avatar({
  uid,
  url,
  size,
  onupload,
}: {
  uid: string | null
  url: string | null
  size: number
  onupload: (url: string) => void
}) {
  const supabase = createclient()
  const [avatarurl, setavatarurl] = usestate<string | null>(url)
  const [uploading, setuploading] = usestate(false)

  useeffect(() => {
    async function downloadimage(path: string) {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path)
        if (error) throw error
        const url = url.createobjecturl(data)
        setavatarurl(url)
      } catch (error) {
        console.log('error downloading image: ', error)
      }
    }
    if (url) downloadimage(url)
  }, [url, supabase])

  const uploadavatar: react.changeeventhandler<htmlinputelement> = async (event) => {
    try {
      setuploading(true)
      if (!event.target.files || event.target.files.length === 0) {
        throw new error('you must select an image to upload.')
      }
      const file = event.target.files[0]
      const fileext = file.name.split('.').pop()
      const filepath = `${uid}-${math.random()}.${fileext}`
      const { error: uploaderror } = await supabase.storage.from('avatars').upload(filepath, file)
      if (uploaderror) throw uploaderror
      onupload(filepath)
    } catch {
      alert('error uploading avatar!')
    } finally {
      setuploading(false)
    }
  }

  return (
    <div>
      {avatarurl ? (
        <image width={size} height={size} src={avatarurl} alt="avatar" classname="avatar image"
               style={{ height: size, width: size }} />
      ) : (
        <div classname="avatar no-image" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label classname="button primary block" htmlfor="single">
          {uploading ? 'uploading ...' : 'upload'}
        </label>
        <input
          style={{ visibility: 'hidden', position: 'absolute' }}
          type="file" id="single" accept="image/*"
          onchange={uploadavatar} disabled={uploading}
        />
      </div>
    </div>
  )
}

9) sign out

app/auth/signout/route.ts

import { createclient } from '@/lib/supabase/server'
import { revalidatepath } from 'next/cache'
import { type nextrequest, nextresponse } from 'next/server'

export async function post(req: nextrequest) {
  const supabase = await createclient()
  const { data: { user } } = await supabase.auth.getuser()
  if (user) await supabase.auth.signout()
  revalidatepath('/', 'layout')
  return nextresponse.redirect(new url('/auth/login', req.url), { status: 302 })
}

10) file tree

your-app/
├─ .env.local
├─ middleware.ts
├─ db/
│  └─ schema.sql
├─ lib/
│  └─ supabase/
│     ├─ client.ts
│     ├─ server.ts
│     └─ middleware.ts
└─ app/
   ├─ error/
   │  └─ page.tsx
   ├─ auth/
   │  ├─ login/
   │  │  ├─ actions.ts
   │  │  └─ page.tsx
   │  ├─ confirm/
   │  │  └─ route.ts
   │  └─ signout/
   │     └─ route.ts
   ├─ private/
   │  └─ page.tsx
   └─ account/
      ├─ page.tsx
      ├─ account-form.tsx
      └─ avatar.tsx

prefer lib/supabase for parity with the with-supabase example; if you already used utils/supabase, keep it and change imports accordingly.  ￼

11) run

npm run dev
# open http://localhost:3000/auth/login

12) getuser vs getclaims quick guide
	•	getuser(): round-trip to auth server each request. guarantees revalidation. official ssr guide uses this. use for strict protection.  ￼
	•	getclaims(): verifies jwt locally against your project’s jwks and refreshes only if needed. best with jwt signing keys enabled. lower latency. understand trade-offs.  ￼

13) key naming

new projects may use next_public_supabase_publishable_or_anon_key. legacy examples use next_public_supabase_publishable_key or next_public_supabase_anon_key. use whichever your template expects, but stay consistent. official sources reflect both.  ￼

