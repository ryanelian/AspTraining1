import React from 'react';
import { UserManagerFactory } from '../services/UserManagerFactory';

async function authorize() {
    const manager = UserManagerFactory();
    await manager.signinRedirect();
}

class Login extends React.Component {
    async componentDidMount() {
        const manager = UserManagerFactory();
        const user = await manager.getUser();
        console.log(user);
    }

    render() {
        return <button type="button" onClick={authorize}>Login</button>;
    }
}

export default Login;
