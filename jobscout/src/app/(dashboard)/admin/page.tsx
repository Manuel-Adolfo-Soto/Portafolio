"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, BarChart3, Globe, Users, Briefcase, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface StatsData {
  stats: {
    totalJobs: number;
    totalUsers: number;
    totalRecs: number;
    jobsBySource: { source: string; count: number }[];
  };
  recentJobs: any[];
  providers: { name: string; active: boolean }[];
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [data, setData] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    if ((session?.user as any)?.role !== "admin") {
      router.push("/");
      return;
    }
    fetch("/api/admin/stats")
      .then(async (r) => {
        if (!r.ok) throw new Error("Forbidden");
        return r.json();
      })
      .then(setData)
      .catch(() => router.push("/"))
      .finally(() => setLoading(false));
  }, [status, session]);

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <div className="min-h-screen">
      <nav className="glass border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.push("/")} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <BarChart3 className="w-5 h-5 text-violet-400" />
          <span className="font-bold text-white">Admin</span>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : !data || (session?.user as any)?.role !== "admin" ? (
          <p className="text-center text-gray-500">Sin acceso</p>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-emerald-400 mb-1">
                  <Briefcase className="w-4 h-4" />
                  <span className="text-xs text-gray-400">Empleos</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.stats.totalJobs}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                  <Users className="w-4 h-4" />
                  <span className="text-xs text-gray-400">Usuarios</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.stats.totalUsers}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-violet-400 mb-1">
                  <Activity className="w-4 h-4" />
                  <span className="text-xs text-gray-400">Recomendaciones</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.stats.totalRecs}</p>
              </div>
              <div className="glass rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-400 mb-1">
                  <Globe className="w-4 h-4" />
                  <span className="text-xs text-gray-400">Fuentes activas</span>
                </div>
                <p className="text-2xl font-bold text-white">{data.providers.length}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Empleos por fuente</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={data.stats.jobsBySource}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" />
                    <XAxis dataKey="source" stroke="#6b7280" tick={{ fontSize: 12 }} />
                    <YAxis stroke="#6b7280" />
                    <Tooltip
                      contentStyle={{ background: "#111827", border: "1px solid #374151", borderRadius: 8 }}
                      labelStyle={{ color: "#f3f4f6" }}
                    />
                    <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="glass rounded-xl p-5">
                <h3 className="text-sm font-medium text-gray-300 mb-4">Proveedores activos</h3>
                <div className="space-y-2">
                  {data.providers.map((p) => (
                    <div key={p.name} className="flex items-center justify-between py-2 px-3 bg-gray-800/40 rounded-lg">
                      <span className="text-sm text-gray-300 capitalize">{p.name}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${p.active ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                        {p.active ? 'Activo' : 'Inactivo'}
                      </span>
                    </div>
                  ))}
                </div>

                <h3 className="text-sm font-medium text-gray-300 mt-6 mb-3">Últimos empleos</h3>
                <div className="space-y-1">
                  {data.recentJobs.slice(0, 5).map((job) => (
                    <div key={job.id} className="text-xs text-gray-400 truncate py-1">
                      <span className="text-gray-300">{job.title}</span> — {job.company}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
