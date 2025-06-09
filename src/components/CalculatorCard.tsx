"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import ModernInput from "./ModernInput";
import ResultModal from "./ResultModal";
import dynamic from "next/dynamic";
import type { ChangeEvent, FormEvent } from "react";
import type { IconBaseProps } from "react-icons";

// Dynamický wrapper pre ikonu FaCalculator, aby Next.js nemal typové problémy
const CalculatorIcon = dynamic(() =>
  import("react-icons/fa").then((mod) => {
    const Icon = mod.FaCalculator as React.FC<IconBaseProps>;
    return (props: IconBaseProps) => <Icon {...props} />;
  }),
  { ssr: false }
);

export default function CalculatorCard() {
  const [fields, setFields] = useState({
    hrubaMzda: "",
    inyPrijem: "",
    priplier: "",
    ineNe: "",
    pnNahrada: "",
    zrazky: "",
    pocetDeti: "",
    pocetDetiNad15: "",
  });
  const [vysledok, setVysledok] = useState<number | null>(null);
  const [summary, setSummary] = useState<Record<string, number>>({});
  const [modalOpen, setModalOpen] = useState(false);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setFields({ ...fields, [e.target.name]: e.target.value });
  }

  function vypocitajMZDU(f: typeof fields): number {
    const hruba = parseFloat(f.hrubaMzda) || 0;
    const inyPrijem = parseFloat(f.inyPrijem) || 0;
    const priplier = parseFloat(f.priplier) || 0;
    const ineNe = parseFloat(f.ineNe) || 0;
    const pnNahrada = parseFloat(f.pnNahrada) || 0;
    const zrazky = parseFloat(f.zrazky) || 0;
    const detiDo15 = parseInt(f.pocetDeti) || 0;
    const detiNad15 = parseInt(f.pocetDetiNad15) || 0;

    let hrubyZAKLAD = hruba + inyPrijem + priplier + ineNe + pnNahrada - zrazky;
    if (hrubyZAKLAD < 0) hrubyZAKLAD = 0;

    const odvody = hrubyZAKLAD * 0.134;
    const zakladDane = hrubyZAKLAD - odvody;
    const nezdanitelnaCast = 410.73;
    const zakladDanePoNezdanitelnej = Math.max(0, zakladDane - nezdanitelnaCast);
    const dan = zakladDanePoNezdanitelnej * 0.19;
    const danovyBonus = detiDo15 * 140 + detiNad15 * 50;
    const cistaMzda = hrubyZAKLAD - odvody - dan + danovyBonus;

    setSummary({
      hruba,
      odvody,
      dan,
      danovyBonus,
      detiDo15,
      detiNad15,
      zakladDane,
      nezdanitelnaCast,
      inyPrijem,
      priplier,
      ineNe,
      pnNahrada,
      zrazky,
    });

    return cistaMzda;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const res = vypocitajMZDU(fields);
    setVysledok(res);
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
        transition={{ delay: 0.6, duration: 0.9, type: "spring" }}
      >
        <CalculatorIcon className="absolute right-8 bottom-8 text-sky-300/20 text-[170px] z-[-1] pointer-events-none" />

        <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
          <span role="img" aria-label="sparkle">
            ✨
          </span>{" "}
          Výpočet čistej mzdy{" "}
          <span className="text-base font-normal text-gray-500">(2025 - SR)</span>
        </h2>
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <ModernInput
            label="Hrubá mesačná mzda *"
            name="hrubaMzda"
            type="number"
            required
            value={fields.hrubaMzda}
            onChange={handleChange}
          />
          <ModernInput
            label="Iný zdaniteľný peňažný príjem od zamestnávateľa"
            name="inyPrijem"
            type="number"
            value={fields.inyPrijem}
            onChange={handleChange}
          />
          <ModernInput
            label="Príspevok zamestnávateľa na III. pilier"
            name="priplier"
            type="number"
            value={fields.priplier}
            onChange={handleChange}
          />
          <ModernInput
            label="Iný zdaniteľný nepeňažný príjem od zamestnávateľa"
            name="ineNe"
            type="number"
            value={fields.ineNe}
            onChange={handleChange}
          />
          <ModernInput
            label="Náhrada príjmu počas PN (1–10. deň)"
            name="pnNahrada"
            type="number"
            value={fields.pnNahrada}
            onChange={handleChange}
          />
          <ModernInput
            label="Zrážky zo mzdy"
            name="zrazky"
            type="number"
            value={fields.zrazky}
            onChange={handleChange}
          />
          <ModernInput
            label="Počet detí do 15 rokov"
            name="pocetDeti"
            type="number"
            value={fields.pocetDeti}
            onChange={handleChange}
          />
          <ModernInput
            label="Počet detí nad 15 rokov"
            name="pocetDetiNad15"
            type="number"
            value={fields.pocetDetiNad15}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="mt-8 py-3 px-8 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-xl transition"
          >
            Vypočítať
          </button>
        </form>
      </motion.div>
      <ResultModal open={modalOpen} onClose={() => setModalOpen(false)}>
        {vysledok !== null && (
          <div className="text-indigo-900 dark:text-indigo-200 text-base px-2 space-y-2">
            <p>
              <span className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">
                Vaša odhadovaná čistá mzda je{" "}
                <span className="text-indigo-900 dark:text-white">
                  {Math.round(vysledok).toLocaleString("sk-SK", { maximumFractionDigits: 2 })} €
                </span>
                .
              </span>
            </p>
            <p>
              Váš zadaný hrubý príjem: <b>{summary.hruba?.toLocaleString("sk-SK")} €</b>
            </p>
            <p>
              Deti do 15 rokov: <b>{summary.detiDo15}</b> &nbsp;|&nbsp; Deti nad 15 rokov: <b>{summary.detiNad15}</b>
            </p>
            <p>
              <span className="text-indigo-700 font-normal">
                Z tejto sumy sú už odpočítané odvody ({Math.round(summary.odvody)} €) a daň ({Math.round(summary.dan)} €), pripočítaný daňový bonus ({Math.round(summary.danovyBonus)} €).
              </span>
            </p>
            <p>
              Ďakujeme, že ste použili našu kalkulačku.
              <br />
              Výsledok je orientačný a nezohľadňuje všetky možné daňové a odvodové výnimky.
              <br />
              Prajeme vám veľa úspechov vo vašej práci a rodinnom živote! 😊
            </p>
          </div>
        )}
      </ResultModal>
    </>
  );
}





