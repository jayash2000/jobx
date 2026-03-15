# Job Board

A modern job board application built with Nuxt, featuring a robust backend and an elegant UI.

## Tech Stack

This project is built using the following technologies:

- **Framework**: [Nuxt 3](https://nuxt.com)
- **UI & Styling**: [Nuxt UI](https://ui.nuxt.com), [Tailwind CSS](https://tailwindcss.com)
- **Database & ORM**: PostgreSQL, [Drizzle ORM](https://orm.drizzle.team)
- **State Management**: [Pinia](https://pinia.vuejs.org)
- **Validation**: [Zod](https://zod.dev), VeeValidate
- **Authentication**: Argon2 for password hashing, session management
- **Email**: Nodemailer
- **Other utilities**: Rate limiting, Vue Final Modal, UUID, ESLint

## Setup

Make sure to install the dependencies:

```bash
pnpm install
```

## Database Setup

_Add your database setup steps here (e.g., environment variables, Drizzle migrations, etc.)_

## Development Server

Start the development server on `http://localhost:3000`:

```bash
pnpm dev
```

## Production

Build the application for production:

```bash
pnpm build
```

Locally preview the production build:

```bash
pnpm preview
```

## Linting & Type Checking

Run ESLint to check for code styles:

```bash
pnpm lint
```

Run TypeScript type checking:

```bash
pnpm typecheck
```

## Folder Structure

```
└── 📁job-board
    └── 📁app
        └── 📁assets
            └── 📁css
                ├── main.css
            └── 📁icons
        └── 📁components
            └── 📁auth
                └── 📁form
                    ├── Group.vue
                    ├── Layout.vue
            ├── AppLogo.vue
            ├── TemplateMenu.vue
        └── 📁composables
            ├── useAuth.ts
            ├── useResetForm.ts
        └── 📁layouts
            ├── auth.vue
            ├── default.vue
            ├── misc.vue
        └── 📁middleware
            ├── auth.global.ts
        └── 📁pages
            └── 📁auth
                └── 📁[token]
                    ├── reset-password.vue
                    ├── verification.vue
                ├── forgot-password.vue
                ├── login.vue
                ├── register.vue
            ├── index.vue
        └── 📁stores
            ├── auth.ts
        └── 📁types
            ├── auth.type.ts
        └── 📁utils
            ├── auth-ui.ts
        ├── app.config.ts
        ├── app.vue
    └── 📁public
        ├── favico.svg
        ├── logo.svg
    └── 📁server
        └── 📁api
            └── 📁auth
                ├── forgot-password.post.ts
                ├── login.post.ts
                ├── logout.delete.ts
                ├── me.get.ts
                ├── register.post.ts
                ├── reset-password.post.ts
                ├── verify.get.ts
        └── 📁db
            └── 📁schema
                ├── auth.schema.ts
                ├── companies.schema.ts
                ├── jobs.schema.ts
                ├── user.schema.ts
            ├── index.ts
        └── 📁middleware
            ├── auth.ts
            ├── logger.ts
        └── 📁types
            ├── mail.types.ts
        └── 📁utils
            ├── auth.ts
            ├── email.ts
            ├── hash.ts
            ├── token.ts
    └── 📁shared
        └── 📁schemas
            ├── auth.ts
    ├── .editorconfig
    ├── .env.example
    ├── .gitignore
    ├── drizzle.config.ts
    ├── eslint.config.mjs
    ├── LICENSE
    ├── nuxt.config.ts
    ├── package.json
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ├── README.md
    ├── renovate.json
    └── tsconfig.json
```
