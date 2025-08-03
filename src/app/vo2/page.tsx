"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function VO2Page() {
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    const distanceNum = parseFloat(distance.replace(",", "."));
    if (isNaN(distanceNum) || distanceNum <= 0) {
      setError("Por favor, insira uma distância válida em metros.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/vo2cooper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ distanceMeters: distanceNum }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao calcular VO₂ Máximo.");
      } else {
        setResult(data.vo2);
      }
    } catch (e) {
      setError("Erro de conexão com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-green-400 p-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2 tracking-tight text-center">Calculadora de VO₂ Máximo (Cooper)</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <label className="flex flex-col text-left">
            Distância total (em metros):
            <input
              type="number"
              min="0"
              step="any"
              value={distance}
              onChange={e => setDistance(e.target.value)}
              className="mt-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: 2400"
              required
            />
          </label>
          <button type="submit" className="w-full py-3 px-6 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-lg shadow-md transition-all mt-2" disabled={loading}>
            {loading ? "Calculando..." : "Calcular VO₂ Máximo"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
        {result && (
          <div className="mt-6 text-xl font-bold text-blue-900">
            Seu VO₂ Máximo: <span className="text-2xl">{result}</span>
          </div>
        )}
        <Link href="/" className="mt-8 text-blue-700 hover:underline">← Voltar para a página inicial</Link>
      </div>
    </main>
  );
} 
