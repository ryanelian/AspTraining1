import { Layout } from "./shared/layout";

function Index(){
    return (
        <div>Hello World!</div>
    );
}

export default function IndexPage() {
    return <Layout title="Home">
        <Index></Index>
    </Layout>
}
