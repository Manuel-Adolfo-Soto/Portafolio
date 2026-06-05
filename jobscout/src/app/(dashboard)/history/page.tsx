"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Clock, ExternalLink, CheckCircle2, XCircle } from "lucide-react";

interface HistoryJob {
  id: string;
  title: string;
  company: string;
  score: number;
  applied: boolean;
  source: string;
  url: string;
  recommendedAt: string;
}

export default function HistoryPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<HistoryJob[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => setJobs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [status]);

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <div className="min-h-screen">
      <nav className="glass border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.push("/")} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <Clock className="w-5 h-5 text-cyan-400" />
          <span className="font-bold text-white">Historial</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Clock className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No hay historial de recomendaciones aún</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {jobs.map((job) => (
              <div key={job.id} className="glass rounded-xl p-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium text-white truncate">{job.title}</h3>
                    {job.applied && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                  </div>
                  <p className="text-sm text-gray-400">{job.company}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs font-medium ${job.score >= 70 ? 'text-emerald-400' : job.score >= 40 ? 'text-amber-400' : 'text-gray-500'}`}>
                      {job.score}% match
                    </span>
                    <span className="text-xs text-gray-500 capitalize">{job.source}</span>
                    <span className="text-xs text-gray-500">
                      {new Date(job.recommendedAt).toLocaleDateString("es-BO")}
                    </span>
                  </div>
                </div>
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-emerald-400 bg-emerald-500/10 rounded-lg hover:bg-emerald-500/20 transition-colors"
                >
                  Ver <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
