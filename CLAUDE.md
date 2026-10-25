# Tia Web — CLAUDE.md

## Project overview

**Tia Web** is the website and back office of **Tia**, the dating app built for Madagascar and the Indian Ocean. It is a Next.js 16 application (App Router, React 19, Server Actions) that shares its Supabase project with the mobile app ([Apli-Org/tia](https://github.com/Apli-Org/tia), usually checked out next to this repo as `../tia`). The entity is **APLI SARLU** (Madagascar). Production domain: **www.tia-meet.com**.

The repo serves three surfaces:

| Surface      | Routes                                                                                                         | Audience                     |
| ------------ | -------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| Landing page | `/`, `/inscription-newsletter`                                                                                 | Visitors                     |
| Public pages | `/terms`, `/privacy`, `/child-safety`, `/community-guidelines`, `/dating-safety`, `/account-deletion`, `/payment/redirect`, `/.well-known/*`, `/app-ads.txt` | Visitors, stores, the app    |
| Back office  | `/login`, `/dashboard`, `/users`, `/moderation`, `/pricing`, `/promo-codes`, `/advertisements`, `/newsletter`, `/notifications`, `/landing`, `/staff`, `/support`, `/settings`, `/activity` | Tia staff                    |

### Tech stack

| Layer           | Technology                                                           |
| --------------- | -------------------------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Server Actions), React 19, TypeScript strict |
| Styling         | Tailwind CSS 4, shadcn/ui (new-york, Radix), lucide-react            |
| Motion          | framer-motion, CSS keyframes in `app/globals.css`                    |
| Forms           | react-hook-form, zod 4                                               |
| Data display    | TanStack Table, Recharts                                             |
| Rich text       | Tiptap                                                               |
| Backend         | Supabase (Postgres, Auth, Storage), shared with the mobile app       |
| Email           | Resend + React Email (`emails/`)                                     |
| Hosting         | Vercel                                                               |
| Package manager | pnpm                                                                 |

### Repository layout

```
actions/
  admin/            Back office server actions, one file per domain (<domain>.action.ts)
  *.action.ts       Public server actions (newsletter signup, published landing content)
app/
  (landing)/        Landing page and newsletter signup page
  (backoffice)/
    login/          Staff sign-in
    (app)/          Authenticated back office, one folder per section
  api/              Route handlers (newsletter batch sender)
  payment/redirect/ Return page after a Vanilla Pay payment
  <legal pages>/    terms, privacy, child-safety, community-guidelines, dating-safety, account-deletion
components/
  ui/               shadcn/ui primitives
  backoffice/       Back office shell (sidebar, login form, navigation progress)
  landing/          Landing sections
  newsletter/       Newsletter editor and preview
emails/             React Email templates
hooks/              Client hooks
lib/
  supabase/         Browser, server and admin (service role) clients, session proxy
  auth/             Staff role helpers
  database.types.ts Generated Supabase types
  types/            Shared domain types
public/.well-known/ apple-app-site-association, assetlinks.json
middleware.ts       Refreshes the Supabase session and guards back office routes
docs/               Original specification and implementation notes (French, historical)
```

## Environments

|                      | Preprod                     | Prod                          |
| -------------------- | --------------------------- | ----------------------------- |
| Supabase project ref | `tdopvdavvxvojkelfuyf`      | `ibxifmqovisdyrzpemyv`        |
| Where                | Local dev (`.env.local`)    | Vercel production (`main`)    |
| URL                  | `http://localhost:3000`     | `https://www.tia-meet.com`    |

- **Hosting** — Vercel builds `main` from GitHub ([Apli-Org/tia-web](https://github.com/Apli-Org/tia-web)). The repo is public because Vercel Hobby cannot deploy a private repo owned by a GitHub organization.
- **Public repo** — everything committed is world-readable, history included. Never commit secrets, env files, real member data, or ids and emails of real accounts; use placeholders in docs and fixtures.
- **Local data** — `.env.local` points at preprod. Never point a local back office at prod, and never copy `.env.local` to Vercel.
- **Supabase MCP** — `.mcp.json` targets the **prod** project. Use it for reads; never write to prod through it without asking the user first.

### Database

The schema is **owned by the mobile repo**. Migrations live in `tia/supabase/migrations/`, are applied by hand on preprod first, then prod, and are recorded in `supabase_migrations.schema_migrations` in the same transaction.

- Never add a migration to this repo. `supabase/migrations/` only holds legacy SQL kept for reference.
- When a back office feature needs a table, a column or an RPC, write the migration in the mobile repo and say so in the commit body (see the push campaigns commit for an example).
- After a schema change, regenerate the types: `supabase gen types typescript --project-id tdopvdavvxvojkelfuyf > lib/database.types.ts`.
- Never run destructive SQL on prod without confirming with the user.

## Clean code rules

### General

- **No inline comments.** Default to zero comments in new code. If a function is genuinely hard to follow, add a single English JSDoc above it — never annotate lines inside the body. Do not strip existing comments from code you are not otherwise changing.
- **English code, French copy.** Identifiers, comments, commit messages and docs are in English. User-facing copy (landing, back office, legal pages, emails) is in French; push notifications carry both French and English.
- **Brand.** Write "Tia", never "TIA". "T.IA" is the AI coach in the app.
- **Scope.** Do not add features, refactor or introduce abstractions beyond what the task requires.
- **Boundaries.** Validate input at system boundaries (server actions, route handlers, forms) and nowhere else. Do not add error handling for scenarios that cannot happen.

### Functions and naming

- One function, one job. Split a function as soon as it validates, fetches and formats at the same time, or grows past ~50 lines.
- Prefer early returns to nested `if`/`else`.
- Functions are verbs (`getUsers`, `banUser`, `sendPushCampaign`), values are nouns, booleans read as questions (`isEmbed`, `hasPermission`, `canSend`).
- No magic values: name them (`const MAX_TITLE_LENGTH = 100`) at the top of the module, or in `lib/constants.ts` when several modules share them.
- Pure helpers go in `lib/`; side effects (database, email, storage) stay in actions and route handlers.
- Reuse before writing: `cn` (`lib/utils.ts`), `formatPrice` (`lib/pricing-utils.ts`), the staff helpers in `lib/staff-utils.ts` and `lib/auth/roles.ts`.
- Extract shared code on the third repetition, not the first.

### TypeScript

- Strict mode is on. No `any`, no `as` casts to silence an error, no `!` non-null assertions outside environment variables read by the Supabase clients.
- Derive row types from the generated schema (`Tables<'admin_users'>`, `TablesUpdate<'users'>`) instead of retyping columns.
- Prefer string literal unions (`'info' | 'promo'`) to enums.
- Exported server actions declare their return type.
- Path alias `@/` maps to the repo root.

### Dead code

- No commented-out code, no unused exports, no leftover `console.log`. Delete instead of commenting out; the history keeps it.
- Remove debug code in the same change that added it — never ship a "debug:" commit followed by a "remove debug" commit.

### Formatting

- There is no Prettier config. Match the file you are editing (quotes, semicolons, import order) and do not reformat lines you did not change.
- Components and files: one component per file, kebab-case file names (`push-composer.tsx`) exporting a PascalCase component (`PushComposer`).
- Keep files under ~400 lines. Split a large page into colocated pieces (`*-table.tsx`, `*-filters.tsx`, `*-modal.tsx`, `_components/`).

## Next.js and data access

### Server actions

- Server actions live in `actions/`, start with `'use server'` and are named `<domain>.action.ts`. A `'use server'` file may only export async functions (and types): constants and sync helpers shared with the client go in a sibling file such as `moderation-types.ts`.
- **Every back office action authorizes itself** from the session, through `lib/auth/admin-guard.ts`. Server Actions are public POST endpoints: anyone can call them with any arguments.
  - Reads start with `await requireAdminAction('view_pricing', 'manage_pricing')`, which throws unless the signed-in admin holds one of the actions.
  - Mutations start with `const admin = await getAuthorizedAdmin('manage_pricing')` and `if (!admin) return { success: false, error: PERMISSION_DENIED }`.
  - Never take an admin id, role or permission as a parameter: use `admin.id` from the guard for `admin_id`, `created_by` and `changed_by`.
- Permission codes live in `admin_actions` (`view_*` to read, `manage_*` to change, plus `send_push`, `send_newsletter`, `reset_passwords` …) and are granted to roles through `admin_role_actions`.
- Return a discriminated result the UI can switch on: `{ success: true; data: T } | { success: false; error: string }`. The `error` is a short French message for the UI; log the technical error on the server.
- Record every back office mutation in `admin_activity_logs`.
- Call `revalidatePath` for the pages a mutation affects.

### Supabase clients

| Client                     | Use it in                                       | RLS        |
| -------------------------- | ----------------------------------------------- | ---------- |
| `lib/supabase/server.ts`   | Server Components, server actions (user session) | Applied   |
| `lib/supabase/admin.ts`    | Server code, **after** the admin check           | Bypassed  |
| `lib/supabase/client.ts`   | Client components (Storage uploads)              | Applied   |

- Never import `lib/supabase/admin.ts` from a client component, and never expose `SUPABASE_SERVICE_ROLE_KEY` through a `NEXT_PUBLIC_` variable.
- Upload files straight from the browser to Supabase Storage and pass only the public URL to the server: large bodies through Server Actions fail on Vercel.

### Pages and components

- Server Components by default. Add `'use client'` only where state, effects or event handlers are needed, and push it down to the smallest component.
- Back office pages resolve the admin with `getCurrentAdmin()`, check access with `checkAdminAction()` from `lib/auth/admin-guard.ts` and `redirect()` when it is missing. The `(app)` layout and the middleware are not enough on their own.
- Keep filters, search and pagination in the URL (`searchParams`) so pages stay shareable and refreshable.
- Every section with slow data gets a `loading.tsx` skeleton.

## UI / Design

- Build with the shadcn/ui primitives in `components/ui/` (add new ones with `pnpm dlx shadcn@latest add <name>`); do not fork them for one screen.
- Colors come from the theme tokens in `app/globals.css` (`primary`, `muted`, `destructive` …). Never hardcode hex values in components.
- Tailwind 4 syntax: `bg-linear-to-r`, not `bg-gradient-to-r`.
- No emojis in new UI.
- Landing sections read their published content from `landing_sections` and fall back on the `defaultContent` declared in the component. A new field means updating `lib/types/landing.types.ts`, the section editor in `app/(backoffice)/(app)/landing/_components/` and the default content together.
- Legal pages must keep working with `?embed=true` (no header, no back link): the app opens them in a web view. Wrap `useSearchParams` in `Suspense`.

## Contracts with the mobile app (do not break)

- `/payment/redirect` is the Vanilla Pay return URL. It reads `success` and `panier` and opens `tiaapp://payment-callback`. Changing the path or the query means shipping a new app binary.
- `public/.well-known/apple-app-site-association` (iOS app `BK3ZRL5966.com.apli.tiaapp`) and `public/.well-known/assetlinks.json` (Android `com.rdh36.tiaapp`) must stay reachable without auth and served as JSON.
- `public/app-ads.txt` authorizes the Tia AdMob publisher account.
- Legal URLs are linked from the app and the store listings: never rename them.

## Git / commits

- Follow **Conventional Commits**: `type(scope): subject`, in English, imperative mood, lowercase, no trailing period, ideally under 72 characters.
- Types: `feat`, `fix`, `refactor`, `perf`, `docs`, `chore`, `test`, `ci`. Scopes follow the domains: `landing`, `legal`, `payment`, `deep-links`, `auth`, `dashboard`, `users`, `moderation`, `pricing`, `promo-codes`, `ads`, `newsletter`, `notifications`, `staff`, `roles`, `support`, `activity`, `build`, `deps`, `claude`, `readme`.
- The subject says what changes for the user; the body says why and what else changed, in prose or `-` bullets wrapped at 72 characters.
- One logical change per commit. No `wip`, `debug` or "fix build" chains: squash them before merging.
- Do **not** append a `Co-Authored-By: Claude …` trailer. Commit messages end at the body.
- Never amend or force-push published commits. Create a new commit to fix a mistake.
- Work on `feat/<topic>` or `fix/<topic>` branches and merge into `main` through GitHub pull requests, rebased first so the history stays linear.

## Known issues (raise with the user before touching)

1. **Middleware route list** — `lib/supabase/proxy.ts` only guards `/dashboard`, `/users`, `/moderation`, `/subscriptions`, `/analytics`, `/support` and `/settings`; the other back office sections rely on their page checks and on the action guards.
2. **ESLint** — `pnpm lint` crashes while loading `eslint-config-next` 16 through `FlatCompat` ("Converting circular structure to JSON"). `pnpm typecheck` is the working check until the config moves to the native flat presets.
3. **Stale database types** — `lib/database.types.ts` predates most back office tables (no `push_campaigns`, for instance), so many actions type their rows by hand. Regenerate it before relying on it.
4. **Newsletter without Resend** — `actions/admin/newsletter.action.ts` builds the Resend client when the module loads, so `/newsletter` crashes when `RESEND_API_KEY` is missing, as it is in a fresh `.env.local`.
5. **Images on preprod** — `next.config.ts` only allows the prod Supabase host for `next/image`, so preprod storage images do not render through it locally.

## Running the project

```bash
pnpm install
pnpm dev              # http://localhost:3000
pnpm build            # production build
pnpm start            # serve the production build
pnpm typecheck        # tsc --noEmit
pnpm lint             # eslint (see Known issues)
```
