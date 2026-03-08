import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export interface Prestacion {
  _id: string;
  prestacionId: string;
  mascotaId: string;
  tipo: string;
  descripcion: string;
  fecha: string;
  estado: string;
}

export interface Mascota {
  mascotaId?: string;
  _id?: string;
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento: string;
  sexo: string;
  peso: number;
}

export interface UserType {
  _id: string;
  nombre: string;
  correo: string;
  mascotas: Mascota[];
  clienteId: string;
  prestaciones: Prestacion[];
}

interface UserContextType {
  user: UserType | null;
  setUser: (user: UserType | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser debe usarse dentro de UserProvider");
  return context;
}
