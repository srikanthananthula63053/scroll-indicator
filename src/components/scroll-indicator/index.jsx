import { useEffect } from "react";
import { useState } from "react";
import "./scroll.css";


export default function ScrollIndicator({ url }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [erorrMessage, setErrorMessage] = useState('');
    const [scrollPercentage, setScrollPercentage] = useState(0);

    async function fetchData(geturl) {
        try {
            setLoading(true);
            const response = await fetch(geturl);
            const data = await response.json();
            console.log(data);

            if (data && data.products && data.products.length > 0) {
                setData(data.products);
                setLoading(false)
            }
        } catch (e) {
            console.log(e);
            console.log();

        }

    }

    useEffect(() => {
        fetchData(url);
    }, [url]);
    function handleScrollPercentage() {
        console.log(document.body.scrollTop, document.documentElement.scrollTop,
            document.documentElement.scrollHeight, document.documentElement.clientHeight);

        const howMuchSrolled = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;

        setScrollPercentage((howMuchSrolled / height) * 100);

    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrollPercentage)

        return () => {
            window.removeEventListener('scroll', () => { })
        }

    }, []);
    console.log(data, scrollPercentage);
    if (erorrMessage) {
        return <div>Error ! {erorrMessage}</div>
    }
    if (loading) {
        return <div>loading data ! please wait</div>
    }
    return (
        <div>
            <div className="top-container">

            
            <h1>coustom scroll Indicator</h1>
            
            <div className="scroll-progress-tracking-container">
                <div className="current-progress-bar" style={{ width: `${scrollPercentage}%` }}>

                </div>

            </div>
            </div>
            <div>
                {
                    data && data.length > 0 ? data.map((dataItem) =>
                        <p>{dataItem.title}</p>) : null
                }
            </div>

        </div>
    );
}