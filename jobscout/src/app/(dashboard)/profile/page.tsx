"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [career, setCareer] = useState("");
  const [yearsExperience, setYearsExperience] = useState(0);
  const [modality, setModality] = useState("remote");
  const [country, setCountry] = useState("Bolivia");
  const [city, setCity] = useState("Sucre");
  const [summary, setSummary] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  useEffect(() => {
    if (status !== "authenticated") return;
    fetch("/api/profile")
      .then((r) => r.json())
      .then((data) => {
        if (data) {
          setTitle(data.title || "");
          setCareer(data.career || "");
          setYearsExperience(data.yearsExperience || 0);
          setModality(data.modality || "remote");
          setCountry(data.country || "Bolivia");
          setCity(data.city || "Sucre");
          setSummary(data.summary || "");
        }
      })
      .catch(() => {});
  }, [status]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, career, yearsExperience, modality, country, city, summary }),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch {
      // Silent
    }
    setSaving(false);
  };

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <div className="min-h-screen">
      <nav className="glass border-b border-gray-800/50 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center gap-3">
          <button onClick={() => router.push("/")} className="text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-white">Mi Perfil Profesional</span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 py-6">
        {saved && (
          <div className="mb-4 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm rounded-lg">
            Perfil guardado correctamente
          </div>
        )}

        <div className="glass rounded-2xl p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Título profesional</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-emerald-500"
                placeholder="Ej: Full Stack Developer"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Carrera</label>
              <input
                type="text"
                value={career}
                onChange={(e) => setCareer(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-emerald-500"
                placeholder="Ej: Ingeniería Informática"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Años de experiencia</label>
              <input
                type="number"
                value={yearsExperience}
                onChange={(e) => setYearsExperience(parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-emerald-500"
                min={0}
                step={0.5}
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Modalidad deseada</label>
              <select
                value={modality}
                onChange={(e) => setModality(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-emerald-500"
              >
                <option value="remote">Remoto</option>
                <option value="hybrid">Híbrido</option>
                <option value="onsite">Presencial</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">País</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Ciudad</label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-1">Resumen profesional</label>
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-800/60 border border-gray-700 rounded-lg text-gray-100 text-sm focus:outline-none focus:border-emerald-500 resize-none"
              rows={4}
              placeholder="Cuéntanos sobre ti, tus habilidades y lo que buscas..."
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-medium rounded-lg hover:from-emerald-400 hover:to-teal-400 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            {saving ? "Guardando..." : "Guardar perfil"}
          </button>
        </div>
      </main>
    </div>
  );
}
