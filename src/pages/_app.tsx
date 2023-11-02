
import { AppProps } from 'next/app';
import Layout from './layout';
import Header from './header';
import './globals.scss';

const App = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <Header />
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
};

export default App;