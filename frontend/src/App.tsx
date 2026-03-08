import { Routes, Route } from "react-router-dom";
import DashboardVeterinario from "./pages/Dashboard/DashboardVeterinario";
import DashboardSecretaria from "./pages/Dashboard/DashboardSecretaria";
import DashboardCliente from "./pages/Dashboard/DashboardCliente";
import PrivateRoute from "./components/PrivateRoute";
import Register from "./pages/Register/Register";
import Login from "./pages/Register/Login";

function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Login />} />
      <Route
        path="/cliente"
        element={
          <PrivateRoute requiredRole="cliente">
            <DashboardCliente />
          </PrivateRoute>
        }
      />
      <Route
        path="/secretaria"
        element={
          <PrivateRoute requiredRole="secretaria">
            <DashboardSecretaria />
          </PrivateRoute>
        }
      />
      <Route
        path="/veterinario"
        element={
          <PrivateRoute requiredRole="veterinario">
            <DashboardVeterinario />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
