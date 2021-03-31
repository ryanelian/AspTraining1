import React, { useEffect, useState } from "react";
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';
import { UserManagerFactory } from "../../services/UserManagerFactory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

function GetNavigationLinkClassName(active: boolean) {
    if (active) {
        return "nav-link active";
    } else {
        return "nav-link";
    }
}

function GetNavigationLinkAriaCurrent(active: boolean) {
    if (active) {
        return "page";
    } else {
        return undefined;
    }
}

const NavigationLink: React.FunctionComponent<{
    href: string
}> = (props) => {
    const router = useRouter();
    const active = (router.pathname === props.href);

    return (
        <li className="nav-item">
            <Link href={props.href}>
                <a className={GetNavigationLinkClassName(active)}
                    aria-current={GetNavigationLinkAriaCurrent(active)}>
                    {props.children}
                </a>
            </Link>
        </li>
    );
};

const LoginDropdown: React.FunctionComponent<{}> = () => {

    const [ready, setReady] = useState(false);
    const [fullName, setFullName] = useState('');

    const getUserData = async () => {
        const userManager = UserManagerFactory();
        const user = await userManager.getUser();
        setFullName(user?.profile?.name ?? '');
        setReady(true);
    };

    // PKCE = Proof of Key Exchange
    const tryLoginUsingAccelistSSO = async () => {
        const userManager = UserManagerFactory();
        await userManager.signinRedirect();
        // http://localhost:3000/account/login-callback
        // ?state=0068fd1f7b2f4b4ab39f1869d592401b
        // &session_state=ec622012-98a6-4734-b934-9e0d11bfaa54
        // &code=cdbb95e1-deb0-4af6-a4ad-df47b91ade5b.ec622012-98a6-4734-b934-9e0d11bfaa54.31a5e097-9062-4528-9212-966d216ac635
    }

    useEffect(() => {
        getUserData();
    }, []);

    if (!ready) {
        return <div></div>
    }

    if (!fullName) {
        return (
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <a href="#" className="btn btn-primary btn-sm" onClick={tryLoginUsingAccelistSSO}>
                        <FontAwesomeIcon className="me-2" icon={faSignInAlt}></FontAwesomeIcon>
                        Sign in
                    </a>
                </li>
            </ul>
        );
    }

    return (
        <ul className="navbar-nav ms-auto">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Welcome, {fullName}
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                        <a href="/account/logout" className="dropdown-item">
                            <FontAwesomeIcon className="me-2" icon={faSignOutAlt}></FontAwesomeIcon>
                            Sign out
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    );
};

const NavigationBar: React.FunctionComponent<{}> = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand">Next.js</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <NavigationLink href="/">Home</NavigationLink>
                        <NavigationLink href="/todo">Todo</NavigationLink>
                        <NavigationLink href="/customer">Customer</NavigationLink>
                    </ul>
                    <LoginDropdown></LoginDropdown>
                </div>
            </div>
        </nav>
    );
};

export class Layout extends React.Component<{
    title: string;
}> {
    render() {
        return (
            <div>
                <Head>
                    <meta charSet="utf-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <title>{this.props.title} - Belajar React</title>
                </Head>
                <header>
                    <NavigationBar></NavigationBar>
                </header>
                <main className="mb-5 mt-4 container">
                    {this.props.children}
                </main>
                <footer>
                    <script src="/bootstrap.bundle.min.js"></script>
                </footer>
            </div>
        );
    }
}
