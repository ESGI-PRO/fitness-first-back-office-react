import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Users } from "./pages/users";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="users/*" element={<Users />} />
    </Routes>
  </BrowserRouter>
);

export default App;