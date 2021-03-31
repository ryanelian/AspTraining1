import React from "react";
import { Layout } from "../shared/Layout";
import { UserManagerFactory } from "../../services/UserManagerFactory";

// halaman ini obsolete karena sudah ada di navbar login buttonnhya! :)

function Login() {
    const tryLoginUsingAccelistSSO = async () => {
        const userManager = UserManagerFactory();
        await userManager.signinRedirect();
        // http://localhost:3000/account/login-callback
        // ?state=0068fd1f7b2f4b4ab39f1869d592401b
        // &session_state=ec622012-98a6-4734-b934-9e0d11bfaa54
        // &code=cdbb95e1-deb0-4af6-a4ad-df47b91ade5b.ec622012-98a6-4734-b934-9e0d11bfaa54.31a5e097-9062-4528-9212-966d216ac635
    }

    return (
        <div>
            <button className="btn btn-primary" onClick={tryLoginUsingAccelistSSO}>
                Login
            </button>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Layout title="Login">
            <Login></Login>
        </Layout>
    );
}
