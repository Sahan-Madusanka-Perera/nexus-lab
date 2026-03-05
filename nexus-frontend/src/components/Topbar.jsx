import { useAuth } from "../context/AuthContext.jsx";

export default function Topbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-soft border-b border-gray-100">
      <div className="px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500">NexusCare</div>
          <div className="text-lg font-semibold text-gray-900">Lab Dashboard</div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-medium text-gray-900">{user?.email}</div>
            <div className="text-xs text-gray-500">Lab Staff</div>
          </div>
          <button
            onClick={logout}
            className="px-3 py-2 rounded-lg bg-gray-900 text-white text-sm hover:bg-black"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}