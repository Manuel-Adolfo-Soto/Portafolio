"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Briefcase, Heart, Clock, BarChart3, User, LogOut, RefreshCw, Sparkles, SlidersHorizontal, Shield } from "lucide-react";
import Link from "next/link";

interface Job {
  id: string;
  title: string;
  company: string;
  location?: string;
  modality?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  country?: string;
  source: string;
  url: string;
  score?: number;
  isFavorite?: boolean;
  applied?: boolean;
  postedAt?: string;
  logoUrl?: string;
}

interface Stats {
  totalJobs: number;
  pendingRecs: number;
  applied: number;
  favoritesCount: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recs, setRecs] = useState<Job[]>([]);
  const [stats, setStats] = useState<Stats>({ totalJobs: 0, pendingRecs: 0, applied: 0, favoritesCount: 0 });
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [tab, setTab] = useState<"recs" | "jobs">("recs");
  const [modalityFilter, setModalityFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    loadData();
  }, [status, modalityFilter, sourceFilter]);

  const loadData = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (modalityFilter !== "all") params.set("modality", modalityFilter);
      if (sourceFilter !== "all") params.set("source", sourceFilter);

      const [recsRes, jobsRes, favRes, appliedRes] = await Promise.all([
        fetch("/api/jobs/recommendations?limit=10").then((r) => r.json()),
        fetch(`/api/jobs?limit=10&${params}`).then((r) => r.json()),
        fetch("/api/favorites").then((r) => r.json()),
        fetch("/api/history").then((r) => r.json()),
      ]);

      const favIds = new Set(favRes.map((j: any) => j.id));
      const appliedIds = new Set(appliedRes.filter((j: any) => j.applied).map((j: any) => j.id));

      const recsList = (recsRes.recommendations || []).map((j: any) => ({
        ...j,
        isFavorite: favIds.has(j.id),
        applied: appliedIds.has(j.id),
      }));

      const jobsList = (jobsRes.jobs || []).map((j: any) => ({
        ...j,
        isFavorite: favIds.has(j.id),
      }));

      setRecs(recsList);
      setJobs(jobsList);
      setStats({
        totalJobs: jobsRes.total || 0,
        pendingRecs: recsList.length,
        applied: appliedIds.size,
        favoritesCount: favIds.size,
      });
    } catch {
      // Silent
    }
    setLoading(false);
  };

  const syncJobs = async () => {
    setSyncing(true);
    try {
      await fetch("/api/providers/sync", { method: "POST" });
      await loadData();
    } catch {
      // Silent
    }
    setSyncing(false);
  };

  const toggleFavorite = async (jobId: string) => {
    await fetch(`/api/jobs/${jobId}/favorite`, { method: "POST" });
    loadData();
  };

  const markApplied = async (jobId: string) => {
    await fetch(`/api/jobs/${jobId}/applied`, { method: "POST" });
    loadData();
  };

  if (status === "loading" || status === "unauthenticated") return null;

  const StatCard = ({ icon: Icon, label, value, color }: any) => (
    <div className="glass rounded-xl p-4 flex items-center gap-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className="text-2xl font-bold text-white">{value}</p>
        <p className="text-xs text-gray-400">{label}</p>
      </div>
    </div>
  );

  const JobCard = ({ job }: { job: Job }) => (
    <div className="glass rounded-xl p-5 hover:border-emerald-500/30 transition-all border border-gray-800">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-white truncate">{job.title}</h3>
          <p className="text-sm text-gray-400">{job.company}</p>
        </div>
        {job.score != null && (
          <div className={`ml-3 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold ${
            job.score >= 70 ? 'bg-emerald-500/20 text-emerald-400' :
            job.score >= 40 ? 'bg-amber-500/20 text-amber-400' :
            'bg-gray-500/20 text-gray-400'
          }`}>
            {job.score}%
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mb-3 text-xs">
        {job.modality && (
          <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">
            {job.modality === "remote" ? "Remoto" : job.modality === "hybrid" ? "Híbrido" : "Presencial"}
          </span>
        )}
        {job.country && (
          <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400">{job.country}</span>
        )}
        <span className="px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 capitalize">{job.source}</span>
      </div>

      <div className="flex items-center gap-2">
        <a
          href={job.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors"
        >
          Ver oferta
        </a>
        <button
          onClick={() => toggleFavorite(job.id)}
          className={`p-1.5 rounded-lg transition-colors ${
            job.isFavorite ? 'text-red-400 bg-red-500/10' : 'text-gray-500 hover:text-gray-300 bg-gray-800/50'
          }`}
        >
          <Heart className={`w-4 h-4 ${job.isFavorite ? 'fill-red-400' : ''}`} />
        </button>
        {!job.applied && (
          <button
            onClick={() => markApplied(job.id)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-emerald-400 bg-gray-800/50 transition-colors"
            title="Marcar como postulado"
          >
            <Briefcase className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
      <nav className="glass border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            <span className="font-bold text-white">JobScout AI</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 hidden sm:block mr-1">
              {session?.user?.name}
            </span>
            <button
              onClick={syncJobs}
              disabled={syncing}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Buscando...' : 'Buscar empleos'}
            </button>
            <Link href="/favorites" className="text-gray-400 hover:text-red-400 transition-colors p-1.5" title="Favoritos">
              <Heart className="w-4.5 h-4.5" />
            </Link>
            <Link href="/history" className="text-gray-400 hover:text-cyan-400 transition-colors p-1.5" title="Historial">
              <Clock className="w-4.5 h-4.5" />
            </Link>
            <Link href="/profile" className="text-gray-400 hover:text-white transition-colors p-1.5" title="Perfil">
              <User className="w-4.5 h-4.5" />
            </Link>
            {(session?.user as any)?.role === "admin" && (
              <Link href="/admin" className="text-gray-400 hover:text-violet-400 transition-colors p-1.5" title="Admin">
                <Shield className="w-4.5 h-4.5" />
              </Link>
            )}
            <button onClick={() => signOut()} className="text-gray-400 hover:text-red-400 transition-colors p-1.5" title="Cerrar sesión">
              <LogOut className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard icon={BarChart3} label="Empleos encontrados" value={stats.totalJobs} color="bg-emerald-500/20 text-emerald-400" />
          <StatCard icon={Sparkles} label="Recomendados" value={stats.pendingRecs} color="bg-cyan-500/20 text-cyan-400" />
          <StatCard icon={Briefcase} label="Postulados" value={stats.applied} color="bg-violet-500/20 text-violet-400" />
          <StatCard icon={Heart} label="Favoritos" value={stats.favoritesCount} color="bg-red-500/20 text-red-400" />
        </div>

        <div className="flex items-center gap-3 mb-4">
          <div className="flex bg-gray-800/50 rounded-lg p-1">
            <button
              onClick={() => setTab("recs")}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                tab === "recs" ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Recomendados
            </button>
            <button
              onClick={() => setTab("jobs")}
              className={`px-4 py-1.5 text-sm rounded-md transition-colors ${
                tab === "jobs" ? 'bg-emerald-500/20 text-emerald-400' : 'text-gray-400 hover:text-white'
              }`}
            >
              Todos los empleos
            </button>
          </div>

          {tab === "jobs" && (
            <div className="flex gap-2 ml-auto">
              <select
                value={modalityFilter}
                onChange={(e) => setModalityFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-gray-800/60 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Todas las modalidades</option>
                <option value="remote">Remoto</option>
                <option value="hybrid">Híbrido</option>
                <option value="onsite">Presencial</option>
              </select>
              <select
                value={sourceFilter}
                onChange={(e) => setSourceFilter(e.target.value)}
                className="px-3 py-1.5 text-xs bg-gray-800/60 border border-gray-700 rounded-lg text-gray-300 focus:outline-none focus:border-emerald-500"
              >
                <option value="all">Todas las fuentes</option>
                <option value="remoteok">RemoteOK</option>
                <option value="wellfound">Wellfound</option>
                <option value="greenhouse">Greenhouse</option>
                <option value="lever">Lever</option>
              </select>
            </div>
          )}
        </div>

        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Cargando recomendaciones...</p>
          </div>
        ) : tab === "recs" ? (
          recs.length > 0 ? (
            <div className="grid gap-3">
              {recs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <Sparkles className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-medium mb-1">Sin recomendaciones aún</p>
              <p className="text-gray-500 text-sm mb-4">Completa tu perfil y sincroniza empleos para obtener recomendaciones</p>
              <div className="flex gap-3 justify-center">
                <a href="/profile" className="px-4 py-2 text-sm bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors">
                  Ir a mi perfil
                </a>
                <button onClick={syncJobs} className="px-4 py-2 text-sm bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors">
                  Sincronizar ahora
                </button>
              </div>
            </div>
          )
        ) : (
          <div className="grid gap-3">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
            {jobs.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500">No hay empleos disponibles. Sincroniza para buscar.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
