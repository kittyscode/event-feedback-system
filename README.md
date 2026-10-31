# Event Feedback Management System

A full-stack app for collecting and viewing event feedback. Built with Node.js,
Express, and SQLite (via Node's built-in `node:sqlite` module — no native
compilation or build tools required), with a plain HTML/CSS/JS frontend.

> Requires Node.js 22.5 or later. You'll see a one-line
> `ExperimentalWarning: SQLite is an experimental feature` in the terminal
> when the server starts — that's expected and harmless.

## Project structure
```
event-feedback-system/
├── server.js         # Express app + all API routes
├── db.js             # SQLite connection + table setup
├── db/                # feedback.db lives here (created on first run)
└── public/
    ├── index.html         # Home
    ├── events.html        # Sample events list
    ├── feedback.html       # Feedback submission form
    ├── view-feedback.html  # Displays all submitted feedback
    ├── style.css
    └── script.js
```

## How to run (in IntelliJ)
1. Open this folder as a project in IntelliJ.
2. Open the built-in terminal (`Alt+F12`).
3. Install dependencies:
   ```
   npm install
   ```
4. Start the server:
   ```
   node server.js
   ```
5. Open your browser to **http://localhost:3000**.

The SQLite database file is created automatically at `db/feedback.db` the first
time you run the server — nothing else to install or configure.

## API routes
| Method | Route            | Description                          |
|--------|------------------|---------------------------------------|
| GET    | /api/welcome     | Health check / welcome message        |
| POST   | /api/feedback    | Submit feedback (validates required fields + rating 1–5) |
| GET    | /api/feedback    | Returns all feedback, most recent first |

## Mapping to the internship task levels
- **Level 1 (Frontend Pages):** `index.html`, `events.html`, `feedback.html`, shared nav in all pages
- **Level 2 (Backend Setup):** `server.js` — Express server, `/api/welcome` route, `/api/feedback` POST route
- **Level 3 (Database Basics):** `db.js` — SQLite table, insert + retrieve logic
- **Level 4 (Frontend & Backend Connection):** `script.js` — fetch calls, success messaging, client + server-side validation
- **Level 5 (Final Touch & Review):** `style.css` for consistent styling, `view-feedback.html` for reviewing stored data end to end
