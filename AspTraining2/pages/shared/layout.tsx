import Head from 'next/head';
import React from 'react';
import { NavBar } from './NavBar';

export const Layout: React.FunctionComponent<{
    title: string | undefined;
}> = props => (
    <div>
        <Head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>{props.title} - MyShop</title>

            <script src="bootstrap.bundle.min.js"></script>
        </Head>
        <header>
            <NavBar></NavBar>
        </header>
        <main className="container pt-4 pb-5">
            {props.children}
        </main>
        <footer>
        </footer>
    </div>
)
