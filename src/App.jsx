import { useAuth } from "./hooks/useAuth";
import { s } from "./styles/authStyles";
import Toast from "./components/Toast";
import Logo from "./components/Logo";
import Dashboard from "./components/Dashboard";
import LoginView from "./views/LoginView";
import SignupView from "./views/SignupView";
import ResetView from "./views/ResetView";

export default function App() {
  const {
    user, view, loading, toast, showPw, errors, form,
    updateForm, nav, setShowPw,
    handleLogin, handleSignup, handleGoogle, handleReset, handleSignOut,
  } = useAuth();

  const sharedViewProps = {
    form, errors, loading, showPw,
    onUpdate: updateForm,
    onTogglePw: () => setShowPw((v) => !v),
    onGoogle: handleGoogle,
    onNav: nav,
  };

  return (
    <div style={s.root}>
      {toast && <Toast {...toast} />}

      <div style={s.card}>
        {user ? (
          <Dashboard user={user} onSignOut={handleSignOut} />
        ) : (
          <>
            <Logo />
            {view === "login"  && <LoginView  {...sharedViewProps} onLogin={handleLogin} />}
            {view === "signup" && <SignupView {...sharedViewProps} onSignup={handleSignup} />}
            {view === "reset"  && <ResetView  {...sharedViewProps} onReset={handleReset} />}
          </>
        )}
      </div>
    </div>
  );
}