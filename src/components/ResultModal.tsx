"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ReactNode } from "react";

// Typy props pre komponent:
type ResultModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function ResultModal({ open, onClose, children }: ResultModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="relative bg-white/80 dark:bg-gray-900/90 p-8 rounded-2xl shadow-2xl max-w-md w-full border border-white/40 backdrop-blur-lg"
            initial={{ scale: 0.9, y: 80, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 40, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
             onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}

          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 px-3 py-1 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition font-semibold text-xl"
              aria-label="Zavrieť"
              tabIndex={0}
            >
              ✕
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
