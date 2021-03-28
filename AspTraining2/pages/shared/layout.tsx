import React from "react";
import Head from 'next/head';
import Link from "next/link";
import { useRouter } from 'next/router';

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
