// import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

export type Props = {
    current: string | undefined
};

const Index = (props: Props) => {
    const router = useRouter();
    const [pid, setPid] = useState<string>(props.current || '');
    const tracking = () => {
        if (!pid) return;
        router.push({
            pathname: `/tracking/${pid}`
        })
    }
    return (
        
        <div className="text-center py-3 text-xl flex align-middle items-center justify-center">
            <form
                className="p-4 bg-white shadow-md rounded"
                onSubmit={e => {
                    e.preventDefault();
                    tracking();
                }}>
                <input 
                    type="text"
                    placeholder="TRACKING NUMBER"
                    className="border border-solid border-gray-400 rounded px-2 py-1 focus:outline-none"
                    value={pid}
                    onChange={(e) => {
                        const { value: v } = e.target;
                        if(v.match(/^[\d\-a-z]*$/i)) setPid(v);
                    }}
                />

                <button 
                    className="px-3 ml-2 text-gray-800 disabled:text-gray-300 transition-colors"
                    type="submit"
                    onSubmit={e => {
                        e.preventDefault();
                    }}
                    disabled={!pid}>
                    SEARCH
                </button>
            </form>
        </div>
    )
    // return <pre>{props.domstring}</pre>
};

export default Index;

/*
export const getServerSideProps: GetServerSideProps = async (context) => {
    const src = await Kuroneko('4921-0394-1523');
    //console.log(src);
    const props: Props = {
        domstring: src
    };
    return { props };
};
*/