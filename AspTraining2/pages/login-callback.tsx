import React from "react";
import { UserManagerFactory } from "../services/UserManagerFactory";

class LoginCallback extends React.Component {
    async componentDidMount() {
        const manager = UserManagerFactory();
        // console.log(location.href);
        const user = await manager.signinCallback(location.href);
        // console.log(user);
    }

    render() {
        return <div>Logging in...</div>;
    }
}

export default LoginCallback;
