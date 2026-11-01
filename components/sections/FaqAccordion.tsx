"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqs } from "@/data/services";
import { cn } from "@/lib/cn";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line border-y border-line">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;

        return (
          <div key={faq.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-foreground focus-visible:outline-none md:py-6"
            >
              <span className="flex min-w-0 items-start gap-4 md:gap-5">
                <span className="label-mono shrink-0 pt-1.5 text-faint">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base font-medium tracking-tight text-balance md:text-lg">
                  {faq.question}
                </span>
              </span>
              <span
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center border border-line text-muted transition-transform duration-300",
                  isOpen && "rotate-45 border-foreground text-foreground",
                )}
              >
                <Plus size={14} aria-hidden="true" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="max-w-3xl pb-6 pl-8 text-sm leading-relaxed text-muted md:pl-9 md:text-base">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
