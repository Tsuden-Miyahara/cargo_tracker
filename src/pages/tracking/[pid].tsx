import { GetServerSideProps } from "next";
import { Kuroneko, Sagawa, Nihon, Seino } from '@/myutil';
import Index from './index';
import './tracking.scss';

type Props = {
    kuro: string;
    saga: string;
    niho: string;
    sein: string;
    pid: string | undefined;
};

const Test = (props: Props) => {
    return (
        <>
            <Index current={props.pid} />
            <div className="tracking-wrap grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 p-2">
                <div className="tracking kuroneko mx-3 mb-2">
                    <div className="kuroneko-header">
                        <a className="title" target="_blank" href="https://www.kuronekoyamato.co.jp/">
                            ヤマト運輸
                        </a>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: props.kuro}} className="tracking-invoice-block"></div>
                </div>

                <div className="tracking sagawa mx-3 mb-2">
                    <div className="sagawa-header">
                        <a className="title" target="_blank" href="https://www.sagawa-exp.co.jp/">
                            佐川急便
                        </a>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: props.saga}} className="tracking-invoice-block"></div>
                </div>

                <div className="tracking nihon_yuubin mx-3 mb-2">
                    <div className="nihon_yuubin-header">
                        <a className="title" target="_blank" href="https://www.post.japanpost.jp/index.html">
                            日本郵便
                        </a>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: props.niho}} className="tracking-invoice-block"></div>
                </div>

                <div className="tracking seino mx-3 mb-2">
                    <div className="nihon_yuubin-header">
                        <a className="title" target="_blank" href="https://www.seino.co.jp/seino/">
                            西濃運輸
                        </a>
                    </div>
                    <div dangerouslySetInnerHTML={{__html: props.sein}} className="tracking-invoice-block"></div>
                </div>
            </div>
        </>
    )
    // <div dangerouslySetInnerHTML={{__html: props.saga}} className="tracking-invoice-block"></div>
};

export default Test;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { pid } = context.query;
    const [kuro, saga, niho, sein] = await Promise.all([
        Kuroneko,
        Sagawa,
        Nihon,
        Seino
    ].map(f => f(pid as string)));
    //console.log(src);
    const props: Props = { pid: pid as (string | undefined), kuro, saga, niho, sein };
    return { props };
};