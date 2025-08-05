import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-blue-700 to-green-400 p-4">
      <div className="bg-white/90 rounded-2xl shadow-2xl p-8 max-w-lg w-full flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-blue-900 mb-2 tracking-tight text-center">Acqua Calculator</h1>
        <p className="text-lg text-gray-700 mb-6 text-center">
          Bem-vindo ao <span className="font-bold text-blue-700">Acqua Calculator</span>!<br/>
          Calcule seu <span className="font-semibold text-green-700">Pace</span> e <span className="font-semibold text-green-700">VO₂ Máximo</span> de forma rápida e prática.<br/>
          Ferramenta ideal para atletas, treinadores e entusiastas de esportes de endurance.
        </p>
        <div className="flex flex-col gap-4 w-full">
          <Link href="/pace">
            <button className="w-full py-3 px-6 rounded-xl bg-blue-800 hover:bg-blue-900 text-white font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2">
              <span role="img" aria-label="cronômetro">⏱️</span> Calculadora de Pace
            </button>
          </Link>
          <Link href="/vo2">
            <button className="w-full py-3 px-6 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-lg shadow-md transition-all flex items-center justify-center gap-2">
              <span role="img" aria-label="oxigênio">🏃‍♂️</span> Calculadora de VO₂ Máximo
            </button>
          </Link>
        </div>
        <div className="mt-8 text-xs text-gray-500 text-center">
          <span>Versão 1.0.0 &copy; {new Date().getFullYear()}<br/>Produzido por Vitor Zilz</span>
        </div>
      </div>
    </main>
  );
}
