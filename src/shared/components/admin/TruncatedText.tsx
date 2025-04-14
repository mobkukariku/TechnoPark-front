"use client";

import React, { useState } from "react";

interface TruncatedTextProps {
  text: string;
  maxLength?: number;
}

const TruncatedText: React.FC<TruncatedTextProps> = ({
  text,
  maxLength = 50,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!text) return <span>-</span>;

  const shouldTruncate = text.length > maxLength;
  const displayText = shouldTruncate
    ? `${text.substring(0, maxLength)}...`
    : text;

  return (
    <>
      <span
        className={
          shouldTruncate ? "cursor-pointer text-blue-500 hover:underline" : ""
        }
        onClick={() => shouldTruncate && setIsModalOpen(true)}
      >
        {displayText}
      </span>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-[8px] p-6 max-w-xl w-full max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Full Text</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow pr-2">
              <p className="whitespace-pre-wrap break-words">{text}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TruncatedText;
