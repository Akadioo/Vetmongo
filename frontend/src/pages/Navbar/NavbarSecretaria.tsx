import { useNavigate } from "react-router-dom";
import { useUser, type UserType } from "../../context/UserContext";
import "./NavbarSecretaria.css";

function Navbar() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setUser({} as UserType);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">VETMONGO</h1>
      <h2 className="navbar-title">Bienvenida, {user ? String(user) : ""}</h2>
      <div className="navbar-buttons">
        <button>📅 Agendar Hora</button>
        <button>📖 Ver Agenda</button>
        <button>🕒 Horarios Veterinarios</button>
        <button>🐾 Pacientes</button>
        <button>🧪 Exámenes</button>
        <button onClick={handleLogout}>🔒 Cerrar sesión</button>
      </div>
    </nav>
  );
}

export default Navbar;
