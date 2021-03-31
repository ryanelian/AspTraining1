import React, { useEffect } from "react";
import { Layout } from "../shared/Layout";
import { UserManagerFactory } from "../../services/UserManagerFactory";

const LoginCallback: React.FunctionComponent<{}> = () => {
    const handleLogin = async () => {
        const userManager = UserManagerFactory();

        let success = false;

        try {
            const user = await userManager.signinSilentCallback(location.href);
            // const user = await userManager.getUser();
            // console.log(user);
            success = true;
        }
        catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        handleLogin();
    }, []);

    return (
        <div>
            Logging in...
        </div>
    );
}

export default function LoginCallbackPage() {
    return (
        <Layout title="Login">
            <LoginCallback></LoginCallback>
        </Layout>
    );
}
