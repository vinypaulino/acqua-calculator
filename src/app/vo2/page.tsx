"use client";
import React, { useState } from "react";
import Link from "next/link";

export default function VO2Page() {
  const [distance, setDistance] = useState("");
  const [time, setTime] = useState("");
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setLoading(true);
    const distanceNum = parseFloat(distance.replace(",", "."));
    const timeNum = parseFloat(time.replace(",", "."));
    if (isNaN(distanceNum) || distanceNum <= 0 || isNaN(timeNum) || timeNum <= 0) {
      setError("Por favor, insira valores válidos para distância e tempo.");
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/vo2cooper", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ distanceMeters: distanceNum, timeMinutes: timeNum }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Erro ao calcular VO₂ Máximo.");
      } else {
        setResult(data.vo2);
      }
    } catch (e) {
      setError("Erro de conexão com o servidor." + e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-green-400 p-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2 tracking-tight text-center">Calculadora de VO₂ Máximo (Jack Daniels)</h1>
        <p className="text-gray-700 text-center mb-4">
          Informe a distância percorrida (em metros) e o tempo gasto (em minutos) durante uma corrida recente.<br/>
          <span className="font-semibold">Método:</span> <span className="font-mono">Fórmulas de Jack Daniels</span><br/>
          O resultado será exibido em mililitros por quilo por minuto (ml/kg/min).
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
          <div className="flex flex-col text-left">
            <label htmlFor="distancia" className="font-semibold mb-1 text-gray-800">Distância total (em metros):</label>
            <input
              id="distancia"
              type="number"
              min="0"
              step="any"
              value={distance}
              onChange={e => setDistance(e.target.value)}
              className="mt-1 p-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Ex: 2400"
              required
            />
            <span className="text-xs text-gray-600 mt-1">Preencha com a distância total percorrida, em metros. Exemplo: 2400</span>
          </div>
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
              placeholder="Ex: 12"
              required
            />
            <span className="text-xs text-gray-600 mt-1">Preencha com o tempo total gasto na corrida, em minutos. Exemplo: 12</span>
          </div>
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
