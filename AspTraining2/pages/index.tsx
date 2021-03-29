
import React, { useState } from 'react';
import { Layout } from './shared/Layout';

const Index: React.FunctionComponent<{}> = () => {
    // useState mereturn sebuah tuple, dimana isinya getter setter
    const [count, setCount] = useState(0);
    const [text, setText] = useState('');

    return (
        <div>
            <p>
                {text}
            </p>
            <p>
                <input value={text} onChange={e => setText(e.target.value)}></input>
            </p>
            <p>
                <button className="btn btn-primary" onClick={e => setCount(count + 1)}>
                    {count}
                </button>
            </p>
        </div>
    );
}

export default function IndexPage() {
    return (
        <Layout title="Home">
            <Index></Index>
        </Layout>
    );
}
