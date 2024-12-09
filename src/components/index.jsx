import { useEffect } from "react";
import { useState } from "react";


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
            

    }

    useEffect(() => {
        window.addEventListener('scroll', handleScrollPercentage)

        return () => {
            window.removeEventListener('scroll', () => { })
        }

    }, []);
    console.log(data, loading);
    return (
        <div>
            <h1>coustom scroll Indicator</h1>
            <div>
                {
                    data && data.length > 0 ? data.map((dataItem) =>
                        <p>{dataItem.title}</p>) : null
                }
            </div>

        </div>
    );
}