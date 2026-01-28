import { Route, Routes } from "react-router";
import { LayoutWrapper } from "../components/layout/LayoutWrapper";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LayoutWrapper />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
