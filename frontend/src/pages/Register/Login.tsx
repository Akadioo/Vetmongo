import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import logo from "../../assets/vetmongo3.png";
import fondo from "../../assets/fondopatas.png";


function Login() {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email: usuario,
        password: clave,
      });

      const { access_token, rol } = res.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("rol", rol);

      if (rol === "cliente") {
        navigate("/cliente");
      } else if (rol === "secretaria") {
        navigate("/secretaria");
      } else if (rol === "veterinario") {
        navigate("/veterinario");
      } else {
        alert("Rol no reconocido");
      }
    } catch (error) {
      alert("Credenciales inválidas o error en el servidor");
      console.error(error);
    }
  };

  return (
    <div
      className="login-background"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundRepeat: "repeat",
        backgroundSize: "contain",
      }}
    >
      <div className="login-box">
        <img src={logo} alt="VETmongo" className="login-logo" />
        <h2>Inicia sesión</h2>
        <input
          type="text"
          placeholder="Correo electrónico"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
        />
        <button onClick={handleLogin}>Iniciar sesión</button>
        <div className="crear-cuenta">
          <span>¿No tienes cuenta?</span>
          <a href="/register">Crear cuenta</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
