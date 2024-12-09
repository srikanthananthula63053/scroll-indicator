import { useEffect } from "react";
import { useState } from "react";


export default function ScrollIndicator({ url }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [erorrMessage, setErrorMessage] = useState('')

    async function fetchData(geturl) {
        try {
            setLoading(true);
            const response = await fetch(geturl);
            const data = await response.json();
            console.log(data);
        } catch (e) {
            console.log(e);
            console.log()


        }

    }

    useEffect(()=>{
        fetchData(url);
    }, [url]);
    return (
        <div>

        </div>
    );
}