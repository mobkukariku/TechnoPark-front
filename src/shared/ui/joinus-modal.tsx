"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

interface JoinUsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCandidateClick?: () => void;
  onPartnerClick?: () => void;
}

export const JoinUsModal: React.FC<JoinUsModalProps> = ({
  isOpen,
  onClose,
  onCandidateClick,
  onPartnerClick,
}) => {
  const t = useTranslations("joinUs");
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {/* Backdrop - separate from content for independent animation */}
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal content with animation */}
          <motion.div
            className="relative mx-4 max-w-sm w-full rounded-[10px] bg-white p-6"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 10, opacity: 0 }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 300,
            }}
          >
            <h2 className="text-center text-xl font-bold mb-6">{t("who")}</h2>

            <div className="flex space-x-4 justify-center">
              <motion.button
                className="flex-1 rounded-[7px] bg-[#2D7DFF] font-bold text-white py-2 hover:bg-[#2D7DFF]/90 transition-colors"
                onClick={onCandidateClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("candidate")}
              </motion.button>

              <motion.button
                className="flex-1 rounded-[7px] bg-white border border-gray-300 text-black py-2 hover:bg-gray-50 transition-colors"
                onClick={onPartnerClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                {t("partner")}
              </motion.button>
            </div>

            {/* Close button with hover animation */}
            <motion.button
              className="absolute top-2 right-2 text-gray-500"
              onClick={onClose}
              aria-label="Close modal"
              whileHover={{ scale: 1.2, color: "#000" }}
              whileTap={{ scale: 0.9 }}
            >
              ✕
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
