import { Outlet } from "react-router";
import Navbar from "./Navbar";
export const LayoutWrapper = () => {
  return (
    <>
      {" "}
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
};
