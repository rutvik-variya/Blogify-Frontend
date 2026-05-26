import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
const MainLayout = () => {
    return (
        <div>
            {/* header */}
            <Navbar />
            <main className="min-h-screen pt-20">
                <Outlet />
            </main>

            {/* footer */}
        </div>
    );
};

export default MainLayout;