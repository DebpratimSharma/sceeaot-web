"use client";

import { createContext, ReactNode, useContext } from "react";

interface LoadingContextType {
  shouldShowLoading: boolean;
  isInitialized: boolean;
  markAsLoaded: () => void;
  resetLoading: () => void;
}

const LoadingContext = createContext<LoadingContextType>({
  shouldShowLoading: false,
  isInitialized: true,
  markAsLoaded: () => {},
  resetLoading: () => {},
});

export const useLoadingContext = () => useContext(LoadingContext);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  return (
    <LoadingContext.Provider
      value={{
        shouldShowLoading: false,
        isInitialized: true,
        markAsLoaded: () => {},
        resetLoading: () => {},
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingProvider;
