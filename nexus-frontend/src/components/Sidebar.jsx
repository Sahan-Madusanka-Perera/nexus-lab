import { NavLink } from "react-router-dom";

function Item({ to, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-lg text-sm transition ${
          isActive ? "bg-teal-800 text-white" : "text-teal-50 hover:bg-teal-800/60"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Sidebar() {
  return (
    <aside className="w-72 bg-gradient-to-b from-teal-950 to-teal-900 text-white min-h-screen p-4">
      <div className="flex items-center gap-3 px-2 py-2">
        <div className="w-10 h-10 rounded-xl bg-teal-700 flex items-center justify-center font-bold">
          NC
        </div>
        <div>
          <div className="font-semibold leading-tight">NexusCare</div>
          <div className="text-xs text-teal-100/80">Lab Portal</div>
        </div>
      </div>

      <div className="mt-6 space-y-6">
        <div>
          <div className="px-2 text-xs uppercase tracking-wider text-teal-100/70 mb-2">
            Overview
          </div>
          <Item to="/" label="Dashboard" />
        </div>

        <div>
          <div className="px-2 text-xs uppercase tracking-wider text-teal-100/70 mb-2">
            Lab Operations
          </div>
          <Item to="/operations/recommended" label="Recommended Tests" />
          <Item to="/operations/requests" label="Test Requests" />
          <Item to="/operations/upload" label="Upload Reports" />
          <Item to="/operations/reports" label="Reports History" />
          <Item to="/operations/patient-history" label="Patient Lab History" />
        </div>

        <div>
          <div className="px-2 text-xs uppercase tracking-wider text-teal-100/70 mb-2">
            Lab Management
          </div>
          <Item to="/management/tests" label="Offered Tests" />
          <div className="mt-2 px-2 text-xs uppercase tracking-wider text-teal-100/70">
            Lab Settings
          </div>
          <div className="mt-2 space-y-1">
            <Item to="/settings/availability" label="Availability" />
            <Item to="/settings/performance" label="Performance Stats" />
          </div>
        </div>

        <div>
          <div className="px-2 text-xs uppercase tracking-wider text-teal-100/70 mb-2">
            Account
          </div>
          <Item to="/account/profile" label="My Profile" />
        </div>
      </div>

      <div className="mt-10 px-2 text-xs text-teal-100/60">
        © {new Date().getFullYear()} NexusCare
      </div>
    </aside>
  );
}