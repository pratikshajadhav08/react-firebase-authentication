# 🔥 FirebaseAuth

A production-ready React authentication system built with Firebase — featuring email/password sign-in, Google OAuth, password reset, and a post-login dashboard.

---

## Features

- **Email & Password** — sign up, sign in, form validation, error handling
- **Google OAuth** — one-click sign-in via popup
- **Password Reset** — sends a reset link via Firebase
- **Password Strength Meter** — live feedback during sign-up
- **Auth State Persistence** — session survives page refresh via `onAuthStateChanged`
- **Dashboard** — displays UID, provider, email verification status
- **Firestore ready** — `db` exported from config for immediate use

---

## Tech Stack

| Layer | Technology |
|---|---|
| UI | React 18 |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Hosting | Firebase Hosting |
| Bundler | Vite |

---

## Project Structure

```
firebase-auth/
├── FirebaseAuth.jsx              # Root component — thin orchestrator
├── firebase/
│   └── config.js                 # Firebase init, exports auth, db, googleProvider
├── hooks/
│   └── useAuth.js                # All auth logic and state (custom hook)
├── utils/
│   └── helpers.js                # getInitials, pwStrength, validateFields, error map
├── styles/
│   └── authStyles.js             # Shared inline style tokens
├── components/
│   ├── Dashboard.jsx             # Post-login user dashboard
│   ├── Toast.jsx                 # Notification popup
│   ├── StrengthBar.jsx           # Password strength indicator
│   ├── Logo.jsx                  # Brand logo
│   ├── GoogleIcon.jsx            # Google SVG icon
│   └── Divider.jsx               # "or" divider
└── views/
    ├── LoginView.jsx             # Sign-in form (pure UI)
    ├── SignupView.jsx            # Register form (pure UI)
    └── ResetView.jsx             # Password reset form (pure UI)
```

---

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/your-username/firebase-auth.git
cd firebase-auth
npm install
```

### 2. Configure Firebase

Open `firebase/config.js` and replace the config object with your own from  
**Firebase Console → Project Settings → Your apps → SDK setup**:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};
```

### 3. Enable Auth providers

In **Firebase Console → Authentication → Sign-in method**, enable:
- ✅ Email/Password
- ✅ Google

### 4. Run locally

```bash
npm run dev
```

App runs at `http://localhost:5173`

---

## Deployment

### Build

```bash
npm run build
```

### Deploy to Firebase Hosting

```bash
npm install -g firebase-tools   # one-time
firebase login                  # one-time
firebase init hosting           # first deploy only
firebase deploy --only hosting
```

When prompted during `firebase init`:

| Prompt | Answer |
|---|---|
| Which project? | your Firebase project ID |
| Public directory? | `dist` |
| Single-page app? | `Yes` |
| Overwrite index.html? | `No` |

Live at: `https://YOUR_PROJECT_ID.web.app`

For the full deployment guide see [`DEPLOYMENT.md`](./DEPLOYMENT.md).

---

## Using Firestore

`db` is already exported from `firebase/config.js`:

```js
import { db } from "./firebase/config";
import { collection, addDoc } from "firebase/firestore";

await addDoc(collection(db, "users"), {
  uid: user.uid,
  email: user.email,
  createdAt: new Date(),
});
```

---

## Environment Variables (optional)

To avoid committing credentials, move the config to a `.env` file:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_project.appspot.com
VITE_MESSAGING_SENDER_ID=your_sender_id
VITE_APP_ID=your_app_id
```

Then in `firebase/config.js`:

```js
const firebaseConfig = {
  apiKey:            import.meta.env.VITE_API_KEY,
  authDomain:        import.meta.env.VITE_AUTH_DOMAIN,
  projectId:         import.meta.env.VITE_PROJECT_ID,
  storageBucket:     import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId:             import.meta.env.VITE_APP_ID,
};
```

Add `.env` to `.gitignore`:

```bash
echo ".env" >> .gitignore
```

---

## License

MIT