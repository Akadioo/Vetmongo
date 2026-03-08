export interface CreateUser {
  username: string;
  email: string;
  password: string;
}

export interface CreateCliente {
  nombre: string;
  rut: string;
  telefono?: string;
  direccion?: string;
}

export interface RegisterRequest {
  user: CreateUser;
  cliente: CreateCliente;
}
