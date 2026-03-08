import React, { useEffect, useState } from "react";
import axios from "../../api/axios";
import "./ModalPrestaciones.css";

interface Cliente {
  clienteId: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
  mascotas: any[];
  cliente: Cliente; 
}

const ModalAgendarPrestacion: React.FC<Props> = ({
  visible,
  onClose,
  mascotas,
  cliente,
}) => {
  const [servicios, setServicios] = useState<any[]>([]);
  const [mascotaId, setMascotaId] = useState("");
  const [seleccionado, setSeleccionado] = useState(false);

  useEffect(() => {
    if (visible) {
      axios
        .get("/servicios")
        .then((res) => {
          if (Array.isArray(res.data)) {
            setServicios(res.data);
          } else {
            console.error("Respuesta inesperada del servidor:", res.data);
            setServicios([]);
          }
        })
        .catch((err) => {
          console.error("Error al cargar servicios:", err);
          setServicios([]);
        });

      setSeleccionado(false);
      setMascotaId("");
    }
  }, [visible]);

  if (!visible) return null;

  const handleSolicitar = async (servicio: any) => {
    if (
      !cliente?.clienteId ||
      !mascotaId ||
      !servicio?.nombre ||
      !servicio?.descripcion
    ) {
      alert("Faltan datos para registrar la prestación.");
      return;
    }

    const payload = {
      clienteId: cliente.clienteId, 
      mascotaId,
      tipo: servicio.nombre,
      descripcion: servicio.descripcion,
    };

    console.log("Enviando prestación:", payload);

    try {
      const token = localStorage.getItem("token");

      await axios.post("/prestaciones", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Prestación solicitada correctamente.");
      onClose();
    } catch (err) {
      console.error("Error al solicitar prestación", err);
      alert("Error al solicitar prestación.");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Agendar Prestación</h2>

        {!seleccionado ? (
          <>
            <p>Selecciona la mascota:</p>
            <ul>
              {mascotas.map((m) => (
                <li key={m.mascotaId}>
                  <button
                    onClick={() => {
                      setMascotaId(m.mascotaId);
                      setSeleccionado(true);
                    }}
                  >
                    {m.nombre} ({m.especie})
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <p>
              <strong>Mascota seleccionada:</strong>{" "}
              {mascotas.find((m) => m.mascotaId === mascotaId)?.nombre}
            </p>
            <table>
              <thead>
                <tr>
                  <th>Servicio</th>
                  <th>Descripción</th>
                  <th>Valor</th>
                  <th>Tiempo</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(servicios) && servicios.length > 0 ? (
                  servicios.map((s, i) => (
                    <tr key={i}>
                      <td>{s.nombre}</td>
                      <td>{s.descripcion}</td>
                      <td>${s.precio_referencial}</td>
                      <td>{s.duracion_aproximada_min}m</td>
                      <td>
                        <button onClick={() => handleSolicitar(s)}>
                          Solicitar
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>No hay servicios disponibles.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </>
        )}

        <button onClick={onClose} className="cerrar-btn">
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalAgendarPrestacion;
