import fondo from "../../assets/vetmongo3.png";
import Navbar from "../Navbar/NavbarSecretaria";

function DashboardSecretaria() {
  return (
    <div
      className="dashboard-container"
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Navbar />
      <div className="content-wrapper"></div>
    </div>
  );
}

export default DashboardSecretaria;
