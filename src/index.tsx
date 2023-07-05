import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Routes, Route, Navigate } from "react-router";
import { BrowserRouter } from "react-router-dom";
import DashboardPage from "./pages";
import SignInPage from "./pages/authentication/sign-in";
import UserListPage from "./pages/users/list";
import NutritionPage from "./pages/nutritions/nutritions";
import TrainingsPage from "./pages/trainings/trainings";
import IngredientsPage from "./pages/ingredients/ingredients";

import { authService } from "./services"; 

const App = () => {
  const [authenticated, setAuthenticated] = useState(true);

  useEffect(() => {
    authService.getCurentUser()
      .then((response: any) => {
        if (response) {
          setAuthenticated(true);
          console.log('USER IS AUTHENTICATED', authenticated);
        } else {
          setAuthenticated(false);
          console.log('USER IS NOT AUTHENTICATED', authenticated);
        }
      })
      .catch((error) => {
        setAuthenticated(false);
        console.log(error);
      });
  }, []);

  return (
    <StrictMode>
      <Flowbite theme={{ theme }}>
        <BrowserRouter>
          <Routes>
            <Route path="/authentication/sign-in" element={authenticated ? <Navigate to="/" /> : <SignInPage />} />
            <Route path="/" element={authenticated ? <DashboardPage /> : <Navigate to="/authentication/sign-in" />} />
            <Route path="/users/list" element={authenticated ? <UserListPage /> : <Navigate to="/authentication/sign-in" />} />
            <Route path="/nutritions" element={authenticated ? <NutritionPage /> : <Navigate to="/authentication/sign-in" />} />
            <Route path="/trainings" element={authenticated ? <TrainingsPage /> : <Navigate to="/authentication/sign-in" />} />
            <Route path="/ingredients" element={authenticated ? <IngredientsPage /> : <Navigate to="/authentication/sign-in" />} />
          </Routes>
        </BrowserRouter>
      </Flowbite>
    </StrictMode>
  );
};

const container = document.getElementById("root");

if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(<App />);
