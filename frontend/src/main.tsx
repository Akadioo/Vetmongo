import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/UserContext.tsx";
import { UIProvider } from "./context/UiContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <UIProvider>
          <App />
        </UIProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
