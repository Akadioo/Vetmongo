import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../context/UiContext";
import "./NavbarCliente.css";
import logo from "../../assets/vetmongo3.png";

interface Props {
  setAbrirPrestaciones: (valor: boolean) => void;
}

function Navbar({ setAbrirPrestaciones }: Props) {
  const { user, setUser } = useUser();
  const { setMostrarFormulario } = useUI();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Vetmongo logo" className="navbar-img" />
        <span>VETmongo</span>
      </div>
      <h2 className="navbar-title">Bienvenida, {user?.nombre ?? ""}</h2>
      <div className="navbar-buttons">
        {/* <button>📅 Agendar Hora</button> */}
        {/*<button>📖 Solicitar Examen</button>*/}
        <button onClick={() => setAbrirPrestaciones(true)}>
          🛁 Agendar Prestación
        </button>
        <button onClick={() => setMostrarFormulario(true)}>
          🐕 🐈 Agregar Mascota
        </button>
        <button onClick={handleLogout}>🔒 Cerrar sesión</button>
      </div>
    </nav>
  );
}

export default Navbar;
