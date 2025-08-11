import { Outlet } from "react-router-dom";
import NavBar from "../../../components/Navbar/NavBar";
import Footer from "../../../components/Footer/Footer";

const Layout = () => {
  return (
     <div className="min-h-screen flex flex-col bg-[#EBECF0]">
        <NavBar />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
        </div>
    );
};

export default Layout;