# Tia — Website & Back Office

**Tia Web** is the public website and the staff back office of [Tia](https://www.tia-meet.com), the dating app for Madagascar and the Indian Ocean. It serves the landing page, the legal pages and the deep-link files used by the mobile app, and gives the team a back office to run members, moderation, pricing, ads, newsletters and push campaigns.

> [!NOTE]
> See [CLAUDE.md](CLAUDE.md) for project conventions, clean code rules, environments and known issues. The mobile app lives in [Apli-Org/tia](https://github.com/Apli-Org/tia).

## Quick Start

```bash
pnpm install
touch .env.local                        # Fill in the Supabase and Resend keys
pnpm dev                                # http://localhost:3000
```

> [!IMPORTANT]
> Local development runs against the **preprod** Supabase project. The back office at `/login` needs an active account in `admin_users` on that project.

## Tech Stack

| Layer           | Technology                                          |
| --------------- | --------------------------------------------------- |
| Framework       | Next.js 16 (App Router, Server Actions), React 19   |
| Language        | TypeScript (strict)                                 |
| Styling         | Tailwind CSS 4, shadcn/ui, lucide-react             |
| Forms           | react-hook-form, zod                                |
| Data display    | TanStack Table, Recharts                            |
| Rich text       | Tiptap                                              |
| Backend         | Supabase (Postgres, Auth, Storage), shared with app |
| Email           | Resend, React Email                                 |
| Hosting         | Vercel                                              |
| Package manager | pnpm                                                |

## Project Structure

```
actions/          Server actions (admin/ for the back office)
app/
  (landing)/      Landing page and newsletter signup
  (backoffice)/   Staff login and authenticated back office
  api/            Route handlers
  payment/        Vanilla Pay return page
  terms/ …        Legal pages
components/       UI primitives, landing sections, back office shell
emails/           React Email templates
hooks/            Client hooks
lib/              Supabase clients, auth helpers, types, utilities
public/           Images, .well-known files, app-ads.txt
docs/             Original specification and notes
```

## Environment Variables

In `.env.local`:

```env
# Supabase (preprod for local development)
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# Newsletter emails
RESEND_API_KEY=""
RESEND_FROM_EMAIL="Tia <newsletter@send.tia-meet.com>"
```

> [!WARNING]
> `SUPABASE_SERVICE_ROLE_KEY` bypasses Row-Level Security. It is read by server code only: never prefix it with `NEXT_PUBLIC_` and never commit an env file.

Production values are set in the Vercel project settings and point at the prod Supabase project.

## Common Scripts

```bash
pnpm dev          # Dev server
pnpm build        # Production build
pnpm start        # Serve the production build
pnpm typecheck    # TypeScript check
pnpm lint         # ESLint
```

## Landing Page

The landing page (`/`) is built from sections in `components/landing/`: header, hero, features, how it works, testimonials, newsletter, CTA, FAQ and footer. Each section reads its published content from the `landing_sections` table and falls back on its built-in defaults, so the team edits the copy, images and store links from the back office without a deploy.

## Public Pages

| Route                   | Purpose                                                    |
| ----------------------- | ---------------------------------------------------------- |
| `/terms`                | Terms of use (CGU)                                         |
| `/privacy`              | Privacy policy                                             |
| `/child-safety`         | Child safety standards required by the stores              |
| `/community-guidelines` | Community guidelines                                       |
| `/dating-safety`        | Dating safety charter                                      |
| `/account-deletion`     | How to delete an account                                   |
| `/payment/redirect`     | Vanilla Pay return page, reopens the app                   |
| `/.well-known/*`        | iOS universal links and Android App Links                  |
| `/app-ads.txt`          | AdMob authorized sellers                                   |

Legal pages accept `?embed=true` to hide the site header when the app shows them in a web view.

> [!CAUTION]
> The app and the store listings link to these URLs. Never rename them, and never change the `/payment/redirect` query contract without shipping a new app binary.

## Back Office

Staff sign in at `/login` with Supabase Auth. Each staff member has a role, and each role grants a set of actions that decide which sections they can open.

| Section          | What it does                                                       |
| ---------------- | ------------------------------------------------------------------ |
| Dashboard        | KPIs, growth, revenue and recent activity                          |
| Users            | Search, inspect, ban or delete members, export to CSV              |
| Activity         | Feed of sign-ups, subscriptions, purchases and reports             |
| Moderation       | Reports, photos, messages, identity verifications, passed profiles |
| Pricing          | Subscription and consumable prices, history, payment test mode     |
| Promo codes      | Create codes and follow their usage                                |
| Advertisements   | In-app image and video ads with impressions and clicks             |
| Newsletter       | Subscribers, rich text editor, batch sending, CSV export           |
| Notifications    | Targeted push campaigns in French and English                      |
| Landing          | Section editors with preview, publishing and version history       |
| Staff            | Staff accounts, roles and permissions                              |
| Support          | Ticket inbox with assignment, status and replies                   |
| Settings         | Admin activity log                                                 |

## Database

The Supabase schema is shared with the mobile app and **managed from the mobile repo** (`supabase/migrations/` in Apli-Org/tia). Migrations are applied by hand, preprod first, then prod. This repo does not hold active migrations; `supabase/migrations/` here is legacy SQL kept for reference.

> [!CAUTION]
> Never apply a migration to production before it has been validated on preprod.

## Deployment

Vercel builds and deploys `main` to production at **www.tia-meet.com**. The repository is hosted on GitLab (`gitlab.com/apli1/tia-web`); changes land on `main` through merge requests.

## Coding Conventions

- **Language:** TypeScript (strict mode); code in English, UI copy in French
- **Comments:** None by default; a single English JSDoc only on hard-to-follow functions
- **Server actions:** Every back office action checks the signed-in admin and its permission
- **Supabase:** Service-role client in server code only, after the admin check
- **Styling:** shadcn/ui primitives and theme tokens; no hardcoded colors
- **Commits:** Conventional Commits in English (`feat(scope):`, `fix(scope):`, `chore(scope):`)

## Troubleshooting

| Issue                                     | Fix                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| Redirected to `/login?error=unauthorized` | The account is missing or inactive in `admin_users` on that project     |
| `Missing Supabase admin credentials`      | Set `SUPABASE_SERVICE_ROLE_KEY` in `.env.local`                         |
| Storage images do not render locally      | `next.config.ts` only allows the prod Supabase host in `remotePatterns` |
| Universal link does not open the app      | Check `/.well-known/apple-app-site-association` is served as JSON       |
| `pnpm lint` crashes                       | Known ESLint config issue, see [CLAUDE.md](CLAUDE.md)                   |

## Environments

| Name    | Supabase ref           | Runs on                     |
| ------- | ---------------------- | --------------------------- |
| Preprod | `tdopvdavvxvojkelfuyf` | Local dev (`.env.local`)    |
| Prod    | `ibxifmqovisdyrzpemyv` | Vercel, `www.tia-meet.com`  |

## License

Private project of APLI SARLU. No open-source license is granted.
