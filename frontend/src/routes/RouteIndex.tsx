
import NotFound from "@/pages/NotFound";
import Register from "@/pages/Register";
import { createBrowserRouter, RouterProvider } from "react-router";
import AuthLayout from "./AuthLayout";
import AuthProvider from "@/hooks/useAuth";
import HomePage from "@/views/HomePage";
import Welcome from "@/pages/Welcome";

function RouteIndex() {
    const routesConfig = createBrowserRouter([

        {
            path: "/", element: <Welcome />, index: true
        },
        {
            path: "/register", element: <Register />
        },
        {
            element: <AuthLayout />,
            children: [
                {

                    path: "/home",
                    element: <HomePage />
                },
                {
                    path: "/*", element: <NotFound />
                }
            ]
        },
        {
            path: "/*", element: <Welcome />
        }
    ]);
    return (
        <AuthProvider>
            <RouterProvider router={routesConfig} />
        </AuthProvider>
    )
}
export default RouteIndex;