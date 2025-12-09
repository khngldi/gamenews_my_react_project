import { Route, Routes } from "react-router-dom";
import { routes } from "../utils/routes.jsx";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { LOGIN_PAGE_ROUTE, REGISTER_PAGE_ROUTE } from "../utils/consts.jsx";

function AppRoute() {
    return (
        <Routes>
            {routes.map((route, index) => {
                const Component = route.element;
                return <Route key={index} path={route.path} element={<Component />} />;
            })}

            <Route path={LOGIN_PAGE_ROUTE} element={<LoginPage />} />
            <Route path={REGISTER_PAGE_ROUTE} element={<RegisterPage />} />
        </Routes>
    );
}

export default AppRoute;
