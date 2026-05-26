import { Outlet } from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            {/* header */}
            <main className="min-h-screen">
                <Outlet />
            </main>

            {/* footer */}
        </div>
    );
};

export default MainLayout;