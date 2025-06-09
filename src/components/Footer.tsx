"use client";
import { useState } from "react";

const GDPR_TEXT = (
  <div>
    <h3 className="font-bold text-lg mb-2">Ochrana osobných údajov</h3>
    Tento web nespracováva osobné údaje. Pri využívaní kalkulačiek nezadávate žiadne informácie, ktoré by umožnili vašu identifikáciu.<br />
    <br />
    Prevádzkovateľ: Martin Lukáč, Doležalova 15c, 821 04 Bratislava.<br />
    <b>Kontakt:</b> webappmaster@webappmaster.sk
  </div>
);

const TERMS_TEXT = (
  <div>
    <h3 className="font-bold text-lg mb-2">Podmienky používania</h3>
    Výsledky kalkulácií sú orientačné a nezohľadňujú všetky daňové a odvodové výnimky. Web nenesie zodpovednosť za použitie údajov.<br />
    Používaním tejto stránky súhlasíte s týmito podmienkami.
  </div>
);

const CONTACT_TEXT = (
  <div>
    <h3 className="font-bold text-lg mb-2">Kontakt</h3>
    Martin Lukáč<br />
    Doležalova 15c, 821 04 Bratislava<br />
    tel.: <a href="tel:+421950889523" className="text-sky-600 hover:underline">0950 889 523</a><br />
    e-mail: <a href="mailto:webappmaster@webappmaster.sk" className="text-sky-600 hover:underline">webappmaster@webappmaster.sk</a><br />
    www.webappmaster.sk
  </div>
);

export default function Footer() {
  const [open, setOpen] = useState<null | "gdpr" | "terms" | "contact">(null);

  let content = null;
  if (open === "gdpr") content = GDPR_TEXT;
  if (open === "terms") content = TERMS_TEXT;
  if (open === "contact") content = CONTACT_TEXT;

  return (
    <footer className="w-full px-4 py-6 bg-white/70 dark:bg-gray-900/80 border-t border-gray-200 dark:border-gray-800
                       backdrop-blur-md flex flex-col items-center text-gray-600 dark:text-gray-400 z-20">
      <div className="flex gap-8 justify-center">
        <button onClick={() => setOpen("gdpr")} className="hover:text-sky-600 transition font-medium">Ochrana osobných údajov</button>
        <button onClick={() => setOpen("terms")} className="hover:text-sky-600 transition font-medium">Podmienky používania</button>
        <button onClick={() => setOpen("contact")} className="hover:text-sky-600 transition font-medium">Kontakt</button>
      </div>
      <div className="text-sm text-center mt-2">
        &copy; {new Date().getFullYear()} UniverzálKalkulačka &nbsp;|&nbsp; Created by <a href="https://webappmaster.sk" target="_blank" rel="noopener noreferrer" className="text-sky-600 hover:underline">webappmaster.sk</a>
      </div>

      {/* MODÁLNE okno */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur" onClick={() => setOpen(null)}>
          <div
            className="bg-white dark:bg-gray-900/90 rounded-xl shadow-xl p-6 max-w-md w-full text-gray-800 dark:text-gray-100 relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-sky-600 transition"
              onClick={() => setOpen(null)}
              aria-label="Zavrieť"
            >✕</button>
            {content}
          </div>
        </div>
      )}
    </footer>
  );
}


