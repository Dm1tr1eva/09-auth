# NoteHub

Note-taking application with authentication built on Next.js.

## Tech Stack

- **Framework:** Next.js 16 (Turbopack)
- **Language:** TypeScript
- **State Management:** Zustand
- **API Client:** Axios
- **Server State:** TanStack Query
- **Auth:** Cookie-based (BFF proxy pattern)

## Project Structure

```
app/
├── (auth routes)/        # Public routes (sign-in, sign-up)
├── (private routes)/     # Protected routes (profile, notes)
│   ├── notes/
│   └── profile/
├── @modal/               # Parallel route for note modal preview
├── api/                  # BFF API routes (proxy to external API)
│   ├── auth/             # login, register, logout, session
│   ├── notes/
│   └── users/
components/               # Reusable UI components
lib/
├── api/                  # Axios instances & API functions
│   ├── api.ts            # Axios instance with credentials
│   ├── clientApi.ts      # Client-side API functions
│   └── serverApi.ts      # Server-side API functions (with cookie forwarding)
├── store/                # Zustand stores
│   ├── authStore.ts      # Auth state (user, isAuthenticated)
│   └── noteStore.ts      # Note draft state
proxy.ts                  # Route protection middleware
types/                    # TypeScript type definitions
```

## Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL for the app (used by BFF axios instance) |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## API

The app uses a BFF (Backend For Frontend) pattern. Client requests go to Next.js API routes (`/api/*`), which proxy requests to `https://notehub-api.goit.study` with authentication cookies.

### Auth Endpoints

- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Log in
- `POST /api/auth/logout` — Log out
- `GET /api/auth/session` — Check session validity

### User Endpoints

- `GET /api/users/me` — Get current user profile
- `PATCH /api/users/me` — Update profile (username)

### Notes Endpoints

- `GET /api/notes` — List notes (pagination, search, tag filter)
- `GET /api/notes/:id` — Get note by ID
- `POST /api/notes` — Create a note
- `DELETE /api/notes/:id` — Delete a note
