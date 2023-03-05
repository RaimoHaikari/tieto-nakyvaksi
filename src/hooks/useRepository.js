import { useEffect, useState } from "react";

const useRepository = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {

        setLoading(true);

        const response = await fetch(url);
        const json = await response.json();

        setLoading(false);
        setData(json);

    }

    useEffect(() => {
        fetchData();
    }, [])

    return {data, loading};
}

export default useRepository;