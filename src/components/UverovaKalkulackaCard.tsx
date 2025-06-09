"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernInput from "./ModernInput";

// Výpočet mesačnej splátky úveru (anuitná splátka)
function vypocitajSplatku(suma: number, urok: number, obdobie: number) {
  const mesUrok = urok / 100 / 12;
  const splatky = obdobie * 12;
  if (mesUrok === 0) return suma / splatky;
  const vysl = (suma * mesUrok) / (1 - Math.pow(1 + mesUrok, -splatky));
  return vysl;
}

export default function UverovaKalkulackaCard() {
  const [fields, setFields] = useState({ suma: "", urok: "", roky: "" });
  const [vysledok, setVysledok] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const suma = parseFloat(fields.suma) || 0;
    const urok = parseFloat(fields.urok) || 0;
    const roky = parseInt(fields.roky) || 0;
    const vysl = vypocitajSplatku(suma, urok, roky);
    setVysledok(vysl);
    setModalOpen(true);
  }

  return (
    <>
      <motion.div
        className="relative max-w-2xl w-full mx-auto p-8 rounded-3xl shadow-2xl mt-8
        border border-white/40
        bg-white/60 dark:bg-gray-900/60
        backdrop-blur-2xl
        ring-2 ring-sky-200/60
        before:absolute before:inset-0 before:rounded-3xl before:z-[-2]
        before:bg-gradient-to-br before:from-sky-300/30 before:to-indigo-200/40
        overflow-hidden"
        initial={{ opacity: 0, y: 80, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7, type: "spring" }}
      >
        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          🏦 Úverová kalkulačka
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <ModernInput label="Výška úveru (€)" name="suma" type="number" required value={fields.suma} onChange={handleChange} />
          <ModernInput label="Ročný úrok (%)" name="urok" type="number" required value={fields.urok} onChange={handleChange} />
          <ModernInput label="Splatnosť (roky)" name="roky" type="number" required value={fields.roky} onChange={handleChange} />
          <button
            type="submit"
            className="mt-8 py-3 px-8 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition"
          >
            Vypočítať
          </button>
        </form>
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {modalOpen && vysledok !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalOpen(false)}
          >
            <motion.div
              className="bg-white dark:bg-gray-900/90 rounded-xl shadow-xl p-8 max-w-md w-full text-gray-800 dark:text-gray-100 relative"
              initial={{ scale: 0.96, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 100 }}
              onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}

            >
              <button
                className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-sky-600 transition"
                onClick={() => setModalOpen(false)}
                aria-label="Zavrieť"
              >✕</button>
              <div className="mb-2 text-2xl font-bold text-sky-700">
                Mesačná splátka úveru:
              </div>
              <div className="mb-4 text-3xl font-semibold text-indigo-800 dark:text-indigo-200">
                {Math.round(vysledok).toLocaleString("sk-SK")} €
              </div>
              <div className="text-sm opacity-70">
                Výsledok je orientačný a nezahŕňa poplatky či poistenie.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
