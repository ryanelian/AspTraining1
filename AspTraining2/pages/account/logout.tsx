import React, { useEffect } from "react";
import { UserManagerFactory } from "../../services/UserManagerFactory";
import { Layout } from "../shared/Layout";

const Logout: React.FunctionComponent = () => {
    const handleLogout = async () => {
        const userManager = UserManagerFactory();

        const user = await userManager.getUser();
        if (user) {
            await userManager.signoutRedirect();
        }
    }

    useEffect(() => {
        handleLogout();
    }, []);

    return (
        <div>
            Logging out...
        </div>
    );
}

export default function LogoutPage() {
    return (
        <Layout title="Logout">
            <Logout></Logout>
        </Layout>
    );
}