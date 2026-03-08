import React, { useEffect, useState } from "react";
import PetInfoSection from "../Petcomponents/PetInfoSection";
import Navbar from "../Navbar/NavbarCliente";
import "./DashboardCliente.css";
import { useUser } from "../../context/UserContext";
import { useUI } from "../../context/UiContext";
import axios from "../../api/axios";
import ModalAgendarPrestacion from "../../components/Prestaciones/ModalAgendarPrestacion";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

type Mascota = {
  mascotaId?: string;
  _id?: string;
  nombre: string;
  especie: string;
  raza: string;
  fecha_nacimiento: string;
  sexo: string;
  peso: number;
};

const DashboardCliente: React.FC = () => {
  const { user, setUser } = useUser();
  const { mostrarFormulario, setMostrarFormulario } = useUI();
  const [abrirPrestaciones, setAbrirPrestaciones] = useState(false);

  const [nuevaMascota, setNuevaMascota] = useState<Mascota>({
    nombre: "",
    especie: "",
    raza: "",
    fecha_nacimiento: "",
    sexo: "",
    peso: 0,
  });

  const [editandoMascotaId, setEditandoMascotaId] = useState<string | null>(
    null
  );
  const [mascotaEditada, setMascotaEditada] = useState<Mascota>({
    nombre: "",
    especie: "",
    raza: "",
    fecha_nacimiento: "",
    sexo: "",
    peso: 0,
  });

  const fetchPerfilYPrestaciones = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axios.get(`${API_URL}/clientes/perfil`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { _id, nombre, correo, mascotas, clienteId, prestaciones } =
        res.data;
      setUser({ _id, nombre, correo, mascotas, clienteId, prestaciones });
    } catch (err) {
      console.error("Error al obtener datos del cliente:", err);
    }
  };

  useEffect(() => {
    fetchPerfilYPrestaciones();
  }, []);

  const handleAgregarMascota = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token || !user) return;

    if (user.mascotas?.length >= 6) {
      alert("No puedes agregar más de 6 mascotas.");
      return;
    }

    const nueva = { ...nuevaMascota };

    try {
      await axios.post(`${API_URL}/clientes/mascotas`, nueva, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      await fetchPerfilYPrestaciones();

      setNuevaMascota({
        nombre: "",
        especie: "",
        raza: "",
        fecha_nacimiento: "",
        sexo: "",
        peso: 0,
      });
      setMostrarFormulario(false);
    } catch (err) {
      console.error("Error al agregar mascota:", err);
      alert("Error al agregar mascota");
    }
  };

  const cancelarPrestacion = async (prestacionId: string) => {
    const confirmar = confirm("¿Seguro que quieres cancelar esta prestación?");
    if (!confirmar) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.put(
        `${API_URL}/prestaciones/${prestacionId}/cancelar`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await fetchPerfilYPrestaciones();
    } catch (err: any) {
      console.error("Error al cancelar prestación", err);

      if (err.response?.status === 400 || err.response?.status === 404) {
        alert(
          err.response.data?.message || "No se puede cancelar la prestación."
        );
      } else {
        alert("Error inesperado al cancelar la prestación.");
      }
    }
  };

  return (
    <div className="dashboard-cliente">
      <Navbar setAbrirPrestaciones={setAbrirPrestaciones} />
      <main className="dashboard-content">
        {user?.mascotas?.map((mascota, index) => (
          <div key={index}>
            <PetInfoSection
              petName={mascota.nombre}
              petImage="/assets/pet.jpg"
              petInfo={[
                `Nombre: ${mascota.nombre}`,
                `Especie: ${mascota.especie}`,
                `Raza: ${mascota.raza}`,
                `Fecha de nacimiento: ${mascota.fecha_nacimiento}`,
                `Sexo: ${mascota.sexo}`,
                `Peso: ${mascota.peso} kg`,
              ]}
            />

            <button
              onClick={() => {
                setEditandoMascotaId(mascota.mascotaId || mascota._id || "");
                setMascotaEditada(mascota);
              }}
            >
              ✏️ Editar
            </button>
            <button
              onClick={async () => {
                const confirmacion = confirm(
                  "¿Estás seguro de eliminar esta mascota?"
                );
                if (!confirmacion) return;

                const token = localStorage.getItem("token");
                if (!token) return;

                try {
                  await axios.delete(
                    `${API_URL}/clientes/mascotas/${mascota.mascotaId}`,
                    {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    }
                  );

                  await fetchPerfilYPrestaciones();
                } catch (err) {
                  console.error("Error al eliminar mascota", err);
                  alert("Error al eliminar mascota");
                }
              }}
            >
              🗑 Eliminar
            </button>

            {editandoMascotaId === mascota.mascotaId && (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const token = localStorage.getItem("token");
                  if (!token) return;

                  try {
                    await axios.put(
                      `${API_URL}/clientes/mascotas/${mascotaEditada.mascotaId}`,
                      mascotaEditada,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      }
                    );
                    setEditandoMascotaId(null);
                    await fetchPerfilYPrestaciones();
                  } catch (err) {
                    console.error("Error al editar mascota", err);
                    alert("Error al editar mascota");
                  }
                }}
                className="formulario-mascota"
              >
                <input
                  type="text"
                  placeholder="Nombre"
                  value={mascotaEditada.nombre}
                  onChange={(e) =>
                    setMascotaEditada({
                      ...mascotaEditada,
                      nombre: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Especie"
                  value={mascotaEditada.especie}
                  onChange={(e) =>
                    setMascotaEditada({
                      ...mascotaEditada,
                      especie: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Raza"
                  value={mascotaEditada.raza}
                  onChange={(e) =>
                    setMascotaEditada({
                      ...mascotaEditada,
                      raza: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="date"
                  value={mascotaEditada.fecha_nacimiento}
                  onChange={(e) =>
                    setMascotaEditada({
                      ...mascotaEditada,
                      fecha_nacimiento: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Sexo"
                  value={mascotaEditada.sexo}
                  onChange={(e) =>
                    setMascotaEditada({
                      ...mascotaEditada,
                      sexo: e.target.value,
                    })
                  }
                  required
                />
                <input
                  type="number"
                  placeholder="Peso (kg)"
                  value={mascotaEditada.peso}
                  onChange={(e) =>
                    setMascotaEditada({
                      ...mascotaEditada,
                      peso: Number(e.target.value),
                    })
                  }
                  required
                />
                <button type="submit"> Guardar cambios</button>
                <button
                  type="button"
                  onClick={() => setEditandoMascotaId(null)}
                >
                  Cancelar
                </button>
              </form>
            )}

            <div className="prestaciones">
              <h4>Prestaciones registradas:</h4>
              {user?.prestaciones
                ?.filter(
                  (p) =>
                    String(p.mascotaId) === String(mascota._id) ||
                    String(p.mascotaId) === String(mascota.mascotaId)
                )
                .map((p) => (
                  <div key={p._id} style={{ marginBottom: "10px" }}>
                    <strong>{p.tipo}</strong>: {p.descripcion} <br />
                    Estado: <em>{p.estado}</em>
                    {p.estado === "pendiente" && (
                      <button
                        style={{ marginLeft: "10px" }}
                        onClick={() => cancelarPrestacion(p.prestacionId)}
                      >
                         Cancelar
                      </button>
                    )}
                  </div>
                ))}
              {user?.prestaciones?.filter(
                (p) =>
                  String(p.mascotaId) === String(mascota._id) ||
                  String(p.mascotaId) === String(mascota.mascotaId)
              ).length === 0 && <p>No hay prestaciones registradas aún.</p>}
            </div>
          </div>
        ))}

        {abrirPrestaciones && user && (
          <ModalAgendarPrestacion
            visible={abrirPrestaciones}
            onClose={() => {
              setAbrirPrestaciones(false);
              fetchPerfilYPrestaciones();
            }}
            cliente={user}
            mascotas={user.mascotas}
          />
        )}

        {mostrarFormulario && (
          <form onSubmit={handleAgregarMascota} className="formulario-mascota">
            <h3>Agregar nueva mascota</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevaMascota.nombre}
              onChange={(e) =>
                setNuevaMascota({ ...nuevaMascota, nombre: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Especie"
              value={nuevaMascota.especie}
              onChange={(e) =>
                setNuevaMascota({ ...nuevaMascota, especie: e.target.value })
              }
              required
            />
            <input
              type="text"
              placeholder="Raza"
              value={nuevaMascota.raza}
              onChange={(e) =>
                setNuevaMascota({ ...nuevaMascota, raza: e.target.value })
              }
              required
            />
            <input
              type="date"
              value={nuevaMascota.fecha_nacimiento}
              onChange={(e) =>
                setNuevaMascota({
                  ...nuevaMascota,
                  fecha_nacimiento: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              placeholder="Sexo"
              value={nuevaMascota.sexo}
              onChange={(e) =>
                setNuevaMascota({ ...nuevaMascota, sexo: e.target.value })
              }
              required
            />
            <input
              type="number"
              placeholder="Peso (kg)"
              value={nuevaMascota.peso}
              onChange={(e) =>
                setNuevaMascota({
                  ...nuevaMascota,
                  peso: Number(e.target.value),
                })
              }
              required
            />
            <button type="submit">Guardar</button>
            <button type="button" onClick={() => setMostrarFormulario(false)}>
              Cancelar
            </button>
          </form>
        )}
      </main>
    </div>
  );
};

export default DashboardCliente;
