"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Heart, ExternalLink } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  modality?: string;
  country?: string;
  source: string;
  url: string;
  score?: number;
  favoritedAt?: string;
}

export default function FavoritesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/favorites")
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
          <Heart className="w-5 h-5 text-red-400" />
          <span className="font-bold text-white">Favoritos</span>
          <span className="text-sm text-gray-500">({jobs.length})</span>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {loading ? (
          <div className="text-center py-20">
            <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-12 h-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No tienes empleos favoritos aún</p>
            <button onClick={() => router.push("/")} className="mt-3 px-4 py-2 text-sm bg-emerald-500/10 text-emerald-400 rounded-lg hover:bg-emerald-500/20 transition-colors">
              Explorar empleos
            </button>
          </div>
        ) : (
          <div className="grid gap-3">
            {jobs.map((job) => (
              <div key={job.id} className="glass rounded-xl p-4 flex items-center justify-between">
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-white truncate">{job.title}</h3>
                  <p className="text-sm text-gray-400">{job.company}</p>
                  <div className="flex gap-2 mt-1.5">
                    {job.modality && <span className="text-xs text-gray-500 capitalize">{job.modality}</span>}
                    {job.country && <span className="text-xs text-gray-500">{job.country}</span>}
                    <span className="text-xs text-gray-500 capitalize">{job.source}</span>
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
