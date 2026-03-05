import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function onLogin(e) {
    e.preventDefault();
    setErr("");
    setBusy(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav("/");
    } catch (e2) {
      setErr(e2?.message || "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 p-6">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-soft overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="p-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-700 text-white flex items-center justify-center font-bold">
              NC
            </div>
            <div>
              <div className="font-semibold">NexusCare</div>
              <div className="text-xs text-gray-500">Lab Portal</div>
            </div>
          </div>

          <h1 className="mt-8 text-3xl font-bold text-gray-900">Welcome Back, Lab</h1>
          <p className="mt-2 text-gray-500">
            Sign in to manage test requests, upload reports, and view lab activity.
          </p>

          <form onSubmit={onLogin} className="mt-8 space-y-4">
            <div>
              <label className="text-xs font-semibold text-gray-600">EMAIL</label>
              <input
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="lab@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600">PASSWORD</label>
              <input
                type="password"
                className="mt-1 w-full rounded-xl border border-gray-200 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-200"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {err && <div className="text-sm text-red-600">{err}</div>}

            <button
              disabled={busy}
              className="w-full rounded-xl bg-teal-700 text-white py-3 font-semibold hover:bg-teal-800 disabled:opacity-60"
            >
              {busy ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-xs text-gray-500">
              This login uses Firebase Auth. After login, the system registers you as LAB user in backend and waits for admin approval (if not active).
            </div>
          </form>
        </div>

        <div className="bg-gradient-to-br from-teal-950 to-teal-800 text-white p-10 flex flex-col justify-center">
          <div className="text-3xl font-bold leading-tight">Modernize Lab Workflow with NexusCare</div>
          <div className="mt-4 text-teal-50/80">
            Accept / reject requests, upload PDF reports, manage offered tests, availability, and statistics.
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl bg-white/10 border border-white/10 px-3 py-2">Secure Access</div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-3 py-2">Role Based</div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-3 py-2">Lab Integration</div>
            <div className="rounded-xl bg-white/10 border border-white/10 px-3 py-2">Real-time Updates</div>
          </div>
        </div>
      </div>
    </div>
  );
}