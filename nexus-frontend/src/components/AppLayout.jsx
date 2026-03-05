import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Topbar */}
        <Topbar />

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>
    </div>
  );
}