import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

function NavLinkClassName(active: boolean): string {
    var className = 'nav-link';
    if (active) {
        className += ' active';
    }
    return className;
}

function NavLinkAriaCurrent(active: boolean): 'page' | undefined {
    if (active) {
        return 'page';
    } else {
        return undefined;
    }
}

const NavLink: React.FunctionComponent<{
    href: string;
}> = (props) => {
    const router = useRouter();
    const active = (props.href === router.pathname);

    return (
        <li className="nav-item">
            <Link href={props.href}>
                <a className={NavLinkClassName(active)}
                    aria-current={NavLinkAriaCurrent(active)}>
                    {props.children}
                </a>
            </Link>
        </li>
    );
};

export function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link href="/">
                    <a className="navbar-brand">MyShop</a>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/about">About</NavLink>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
