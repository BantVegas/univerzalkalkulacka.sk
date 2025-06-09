"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernInput from "./ModernInput";

function vypocitajInvesticiu(vklad: number, rokov: number, urok: number) {
  // Zložené úročenie (ročné)
  return vklad * Math.pow(1 + urok / 100, rokov);
}

export default function InvesticnaKalkulackaCard() {
  const [fields, setFields] = useState({ vklad: "", rokov: "", urok: "" });
  const [vysledok, setVysledok] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const vklad = parseFloat(fields.vklad) || 0;
    const rokov = parseInt(fields.rokov) || 0;
    const urok = parseFloat(fields.urok) || 0;
    const vysl = vypocitajInvesticiu(vklad, rokov, urok);
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
          💸 Investičná kalkulačka
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <ModernInput label="Vstupný vklad (€)" name="vklad" type="number" required value={fields.vklad} onChange={handleChange} />
          <ModernInput label="Počet rokov" name="rokov" type="number" required value={fields.rokov} onChange={handleChange} />
          <ModernInput label="Ročný úrok (%)" name="urok" type="number" required value={fields.urok} onChange={handleChange} />
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
                Výsledok investície:
              </div>
              <div className="mb-4 text-xl font-semibold">
                {parseFloat(fields.vklad).toLocaleString("sk-SK", { maximumFractionDigits: 2 })} € za {fields.rokov} rokov s úrokom {fields.urok}% ročne <br />
                <span className="text-3xl text-indigo-800 dark:text-indigo-200 mt-4 block">
                  {Math.round(vysledok).toLocaleString("sk-SK")} €
                </span>
              </div>
              <div className="text-sm opacity-70">
                Výsledok je orientačný – nezohľadňuje dane, poplatky ani infláciu.
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
