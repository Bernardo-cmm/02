import { Outlet } from "react-router";
import Header from "../Header/header";
import Footer from "../Footer/footer";

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
