
import React from 'react';
import { Layout } from './shared/Layout';

function Index(){
    return <div>Hello World!</div>
}

export default function IndexPage() {
    return (
        <Layout title="Home">
            <Index></Index>
        </Layout>
    );
}
