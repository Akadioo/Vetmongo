import { createContext, useContext, useState, type ReactNode } from "react";

interface UIContextType {
  mostrarFormulario: boolean;
  setMostrarFormulario: (value: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  return (
    <UIContext.Provider value={{ mostrarFormulario, setMostrarFormulario }}>
      {children}
    </UIContext.Provider>
  );
};

export const useUI = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error("useUI debe usarse dentro de UIProvider");
  }
  return context;
};
