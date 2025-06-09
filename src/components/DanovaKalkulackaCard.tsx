"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernInput from "./ModernInput";

// Jednoduchý model – základ dane, nezdaniteľná časť, 19% sadzba
function vypocitajDan(prijem: number, vydavky: number, nezdanitelna: number) {
  const zaklad = Math.max(0, prijem - vydavky - nezdanitelna);
  const dan = zaklad * 0.19;
  return dan > 0 ? dan : 0;
}

export default function DanovaKalkulackaCard() {
  const [fields, setFields] = useState({ prijem: "", vydavky: "", nezdanitelna: "410.73" });
  const [vysledok, setVysledok] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const prijem = parseFloat(fields.prijem) || 0;
    const vydavky = parseFloat(fields.vydavky) || 0;
    const nezdanitelna = parseFloat(fields.nezdanitelna) || 0;
    const vysl = vypocitajDan(prijem, vydavky, nezdanitelna);
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
          💰 Daňová kalkulačka
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <ModernInput label="Zdaniteľné príjmy (€)" name="prijem" type="number" required value={fields.prijem} onChange={handleChange} />
          <ModernInput label="Výdavky (€)" name="vydavky" type="number" required value={fields.vydavky} onChange={handleChange} />
          <ModernInput label="Nezdaniteľná časť (€)" name="nezdanitelna" type="number" required value={fields.nezdanitelna} onChange={handleChange} />
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
                Odhadovaná daň:
              </div>
              <div className="mb-4 text-3xl font-semibold text-indigo-800 dark:text-indigo-200">
                {Math.round(vysledok).toLocaleString("sk-SK")} €
              </div>
              <div className="text-sm opacity-70">
                Výsledok je orientačný, nemusí zahŕňať všetky možné úľavy a výnimky.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
