"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function PacePage() {
  const [time, setTime] = useState("");
  const [distance, setDistance] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    const timeNum = parseFloat(time.replace(",", "."));
    const distanceNum = parseFloat(distance.replace(",", "."));
    if (isNaN(timeNum) || timeNum <= 0 || isNaN(distanceNum) || distanceNum <= 0) {
      setError("Por favor, insira valores válidos para tempo e distância.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/pace", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ timeMinutes: timeNum, distanceKm: distanceNum }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao calcular pace.");
      } else {
        setResult(data.pace);
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
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2 tracking-tight text-center">Calculadora de Pace</h1>
        <p className="text-gray-700 text-center mb-4">
          Informe o tempo total da atividade (em minutos) e a distância percorrida (em quilômetros).<br/>
          <span className="font-semibold">Fórmula:</span> <span className="font-mono">Pace = Tempo ÷ Distância</span><br/>
          O resultado será exibido em minutos por quilômetro (min/km).
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col text-left">
            <label htmlFor="tempo" className="font-semibold mb-1 text-gray-800">Tempo total (em minutos):</label>
            <input
              id="tempo"
              type="number"
              min="0"
              step="any"
              value={time}
              onChange={e => setTime(e.target.value)}
              className="mt-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Ex: 50"
              required
            />
            <span className="text-xs text-gray-600 mt-1">Preencha com o tempo total gasto na atividade, em minutos. Exemplo: 50</span>
          </div>
          <div className="flex flex-col text-left">
            <label htmlFor="distancia" className="font-semibold mb-1 text-gray-800">Distância total (em quilômetros):</label>
            <input
              id="distancia"
              type="number"
              min="0"
              step="any"
              value={distance}
              onChange={e => setDistance(e.target.value)}
              className="mt-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: 10"
              required
            />
            <span className="text-xs text-gray-600 mt-1">Preencha com a distância total percorrida, em quilômetros. Exemplo: 10</span>
          </div>
          <button type="submit" className="w-full py-3 px-6 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-lg shadow-md transition-all mt-2" disabled={loading}>
            {loading ? "Calculando..." : "Calcular Pace"}
          </button>
        </form>
        {error && <div className="mt-4 text-red-600 font-semibold">{error}</div>}
        {result && (
          <div className="mt-6 text-xl font-bold text-green-700">
            Seu pace: <span className="text-2xl">{result}</span>
          </div>
        )}
        <Link href="/" className="mt-8 text-blue-700 hover:underline">← Voltar para a página inicial</Link>
      </div>
    </main>
  );
} 
