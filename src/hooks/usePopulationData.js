import {useState, useEffect} from 'react';
import { csv } from 'd3';

/* 
 * Homman nimi on: Named export!
 */ 
export const useData = (csvUrl) => {

    const [data, setData] = useState(null);

    useEffect(() => {

        /*
         * age,sex,value
         * <5,M,10175713
         */
        const row = d => {

            d.value = parseInt(d['value']);
            d.gender = d.sex;

            return d;
        }

        csv(csvUrl, row).then(data => {
            setData(data);
        });

    }, []); 

    return {
        data
    };

};