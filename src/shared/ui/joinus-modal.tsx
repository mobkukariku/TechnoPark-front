"use client";

import React from "react";
import { Button } from "./button";

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
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={onClose} // allow closing by clicking the backdrop
    >
      {/* Stop click propagation so clicking the white box doesn't close it */}
      <div
        className="relative mx-4 max-w-sm w-full rounded-[10px] bg-white p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-center text-xl font-bold mb-6">Кто вы?</h2>

        <div className="flex space-x-4 justify-center">
          <button
            className="flex-1 rounded-[7px] bg-[#2D7DFF] font-bold text-white py-2 hover:bg-[#2D7DFF]/90 transition-colors"
            onClick={onCandidateClick}
          >
            Кандидат
          </button>

          <button
            className="flex-1 rounded-[7px] bg-white border border-gray-300 text-black py-2 hover:bg-gray-50 transition-colors"
            onClick={onPartnerClick}
          >
            Партнер
          </button>
        </div>

        {/* Optional close button in top-right corner */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
