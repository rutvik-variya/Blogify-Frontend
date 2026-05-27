import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
const MainLayout = () => {
    return (
        <div>
            {/* header */}
            <Navbar />
            <main className="min-h-screen pt-20">
                <Outlet />
            </main>
            {/* footer */}
            <Footer />
        </div>
    );
};

export default MainLayout;