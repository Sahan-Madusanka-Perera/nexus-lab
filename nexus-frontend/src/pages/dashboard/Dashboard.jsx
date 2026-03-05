import { useEffect, useState } from "react";
import Card from "../../components/Card.jsx";
import Loading from "../../components/Loading.jsx";
import Table from "../../components/Table.jsx";
import Badge from "../../components/Badge.jsx";
import { api } from "../../services/api";
import { useLabGate } from "../../hooks/useLabGate";

export default function Dashboard() {
  const { gate, message } = useLabGate();
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (gate !== "active") return;

    let mounted = true;
    async function load() {
      setBusy(true);
      try {
        const s = await api.get("/api/lab/stats");
        const r = await api.get("/api/lab/requests?status=all");
        if (!mounted) return;
        setStats(s.data);
        setRecent((r.data || []).slice(0, 5));
      } finally {
        if (mounted) setBusy(false);
      }
    }
    load();
    return () => (mounted = false);
  }, [gate]);

  if (gate === "checking") return <Loading label="Checking lab access..." />;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-r from-teal-950 to-teal-800 text-white">
        <div className="text-2xl font-bold">Good day 👋</div>
        <div className="mt-1 text-teal-50/80">
          Manage test requests, reports, availability and performance.
        </div>

        {gate === "pending" && (
          <div className="mt-4 bg-yellow-500/15 border border-yellow-400/30 rounded-xl p-4">
            <div className="font-semibold text-yellow-100">⚠ Access Pending</div>
            <div className="text-sm text-yellow-100/80">
              {message || "Waiting for admin approval."} You can view the dashboard but lab features are locked until approved.
            </div>
          </div>
        )}

        {gate === "error" && (
          <div className="mt-4 bg-red-500/15 border border-red-400/30 rounded-xl p-4">
            <div className="font-semibold text-red-100">Error</div>
            <div className="text-sm text-red-100/80">{message}</div>
          </div>
        )}
      </Card>

      <div className={`grid grid-cols-1 md:grid-cols-4 gap-4 ${gate !== "active" ? "opacity-60" : ""}`}>
        <Card className="p-5">
          <div className="text-sm text-gray-500">Total Requests</div>
          <div className="text-3xl font-bold">{stats?.total ?? "—"}</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-3xl font-bold">{stats?.pending ?? "—"}</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-gray-500">In Progress</div>
          <div className="text-3xl font-bold">{stats?.in_progress ?? "—"}</div>
        </Card>
        <Card className="p-5">
          <div className="text-sm text-gray-500">Completed</div>
          <div className="text-3xl font-bold">{stats?.completed ?? "—"}</div>
        </Card>
      </div>

      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div className="font-semibold text-gray-900">Recent Test Requests</div>
          <div className="text-xs text-gray-500">Latest 5</div>
        </div>

        {busy ? (
          <Loading />
        ) : (
          <Table
            columns={[
              { key: "id", label: "REQ ID" },
              { key: "patient_name", label: "PATIENT" },
              { key: "test_name", label: "TEST" },
              { key: "priority", label: "PRIORITY" },
              { key: "status", label: "STATUS", render: (r) => <Badge text={r.status} /> },
              { key: "created_at", label: "DATE", render: (r) => new Date(r.created_at).toLocaleString() }
            ]}
            rows={recent}
            emptyText={gate === "active" ? "No requests yet" : "Locked until approved"}
          />
        )}
      </Card>
    </div>
  );
}