# Premium Cinematic Proposal Website with Telegram Notification

A beautiful, cinematic first-time proposal website built with React, Vite, Tailwind CSS, Framer Motion, and a lightweight Node/Express notification server.

---

## Features

- **Cinematic Visuals**: Deep space twinkling starfield background, shooting stars, floating heart particles.
- **Themed Flow**: Custom tailored step-by-step layout built for a first-time proposal.
- **Envelope Reveal**: Smooth envelope opening with wax seal pop animation and romantic letter typewriter effect.
- **Interactive Proposal Button**: The "I Need A Moment" button playfully dodges cursor hovering.
- **Celebration Effects**: Confetti fireworks explode instantly upon choosing "Yes, I Will ❤️".
- **Telegram Notification**: Private instant notify webhook triggered in the background upon acceptance.

---

## Project Structure

```
d:\proposal/
├── src/                # React Frontend code
├── server/             # Express Node.js Backend code
│   ├── index.js        # Server entry point
│   ├── package.json    # Backend dependencies
│   └── .env            # Backend local environment configs
├── .env                # Frontend local environment configs
├── .gitignore          # Git configuration
└── README.md
```

---

## Local Development Setup

### 1. Backend Server Setup
1. Open a new terminal window and navigate to the backend folder:
   ```bash
   cd d:\proposal\server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and fill in your secrets:
   - `TELEGRAM_BOT_TOKEN`: The API token from Telegram's `@BotFather`.
   - `TELEGRAM_CHAT_ID`: Your personal chat ID (retrieve using `@userinfobot` or `@GetChatID_Bot`).
4. Start the server locally:
   ```bash
   npm start
   ```
   *The server runs at http://localhost:5000.*

### 2. Frontend App Setup
1. Open a separate terminal window and navigate to the root directory:
   ```bash
   cd d:\proposal
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the dev server:
   ```bash
   npm run dev
   ```
   *The frontend runs at http://localhost:5173.*

---

## Render Deployment Guide

Follow these steps to deploy both components on [Render](https://render.com) for free:

### 1. Deploy the Backend Web Service
1. Log in to your Render dashboard and click **New > Web Service**.
2. Connect your GitHub repository.
3. Configure the following service settings:
   - **Name**: `proposal-backend`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
4. Add the following **Environment Variables** in Render's configuration tab:
   - `PORT`: `10000` (or leave empty; Render automatically sets this)
   - `TELEGRAM_BOT_TOKEN`: *your bot token*
   - `TELEGRAM_CHAT_ID`: *your chat ID*
   - `FRONTEND_URL`: *the URL where your frontend will be hosted (e.g. `https://your-site.onrender.com`)*
5. Click **Deploy Web Service**. Copy your deployed web service URL once live (e.g., `https://proposal-backend-xxxx.onrender.com`).

### 2. Deploy the Frontend Static Site
1. First, update your local frontend `.env` file or configure it in Render:
   - Set `VITE_API_URL` to your newly deployed backend Web Service URL.
2. In Render, click **New > Static Site**.
3. Connect your GitHub repository.
4. Configure the following settings:
   - **Name**: `proposal-site`
   - **Root Directory**: Leave blank (root of the repo)
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Add the following **Environment Variables** in Render's static site configuration:
   - `VITE_API_URL`: *your deployed backend URL*
6. Click **Deploy Static Site**.

*Note: Render Web Services sleep after 15 minutes of inactivity if on the free tier. The first time the "Yes" button is clicked, the message could take up to 30 seconds to wake up and send. For instant triggers, keep the backend active or ping it on website load.*
