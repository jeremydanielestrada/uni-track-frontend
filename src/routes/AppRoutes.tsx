import { Route, Routes } from "react-router";
import { LayoutWrapper } from "../components/layout/LayoutWrapper";

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<LayoutWrapper />} />
    </Routes>
  );
}

export default AppRoutes;
