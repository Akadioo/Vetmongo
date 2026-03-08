import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
    age: "",
    address: "",
    email: "",
    rut: "",
  });

  const [errores, setErrores] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: "" });
  };

  const validarCampos = () => {
    const nuevosErrores: { [key: string]: string } = {};

    if (!formData.username.trim()) nuevosErrores.username = "Requerido";
    if (!formData.password.trim()) nuevosErrores.password = "Requerido";
    if (!formData.name.trim()) nuevosErrores.name = "Requerido";
    if (
      !formData.age.trim() ||
      isNaN(Number(formData.age)) ||
      Number(formData.age) <= 0
    ) {
      nuevosErrores.age = "Edad inválida";
    }
    if (!formData.address.trim()) nuevosErrores.address = "Requerido";
    if (!formData.email.trim() || !formData.email.includes("@")) {
      nuevosErrores.email = "Correo inválido";
    }
    if (!formData.rut.trim()) nuevosErrores.rut = "Requerido";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleRegister = async () => {
    if (!validarCampos()) return;

    try {
      await axios.post("http://localhost:3000/clientes/register", {
        user: {
          username: formData.username,
          password: formData.password,
          email: formData.email,
        },
        cliente: {
          nombre: formData.name,
          rut: formData.rut,
          edad: Number(formData.age),
          direccion: formData.address,
          telefono: "",
        },
      });

      alert("Cuenta creada correctamente. Puedes iniciar sesión.");
      navigate("/");
    } catch (err: any) {
      console.error("Error al registrar:", err.response?.data || err.message);
      alert(
        "Error al crear la cuenta: " +
          (err.response?.data?.message || "Desconocido")
      );
    }
  };

  return (
    <div className="login-background">
      <div className="login-box">
        <h2>Crear cuenta</h2>

        <input
          type="text"
          name="username"
          placeholder="Usuario"
          onChange={handleChange}
          style={{ borderColor: errores.username ? "red" : undefined }}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          onChange={handleChange}
          style={{ borderColor: errores.password ? "red" : undefined }}
        />
        <input
          type="text"
          name="name"
          placeholder="Nombre completo"
          onChange={handleChange}
          style={{ borderColor: errores.name ? "red" : undefined }}
        />
        <input
          type="text"
          name="age"
          placeholder="Edad"
          onChange={handleChange}
          style={{ borderColor: errores.age ? "red" : undefined }}
        />
        <input
          type="text"
          name="address"
          placeholder="Dirección"
          onChange={handleChange}
          style={{ borderColor: errores.address ? "red" : undefined }}
        />
        <input
          type="email"
          name="email"
          placeholder="Correo"
          onChange={handleChange}
          style={{ borderColor: errores.email ? "red" : undefined }}
        />
        <input
          type="text"
          name="rut"
          placeholder="RUT"
          onChange={handleChange}
          style={{ borderColor: errores.rut ? "red" : undefined }}
        />

        <button onClick={handleRegister}>Registrar</button>
        <div className="crear-cuenta">
          <span>¿Ya tienes cuenta?</span>
          <a href="/" style={{ marginLeft: "5px" }}>
            Inicia sesión
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
