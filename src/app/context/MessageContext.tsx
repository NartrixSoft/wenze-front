// MessageContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageContextProps {
  success: string | null;
  error: string | null;
  setSuccess: (message: string) => void;
  setError: (message: string) => void;
  clearMessages: () => void;
}

const MessageContext = createContext<MessageContextProps | undefined>(undefined);

export const useMessages = (): MessageContextProps => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within a MessageProvider");
  }
  return context;
};

interface MessageProviderProps {
  children: ReactNode;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({ children }) => {
  const [success, setSuccessState] = useState<string | null>(null);
  const [error, setErrorState] = useState<string | null>(null);

  const setSuccess = (message: string) => {
    setSuccessState(message);
    setTimeout(() => setSuccessState(null), 3000);
  };

  const setError = (message: string) => {
    setErrorState(message);
    setTimeout(() => setErrorState(null), 3000);
  };

  const clearMessages = () => {
    setSuccessState(null);
    setErrorState(null);
  };

  return (
    <MessageContext.Provider value={{ success, error, setSuccess, setError, clearMessages }}>
      {children}
      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-green-700 text-white px-6 py-3 rounded shadow-lg z-50"
          >
            {success}
          </motion.div>
        )}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="fixed top-10 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded shadow-lg z-50"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </MessageContext.Provider>
  );
};