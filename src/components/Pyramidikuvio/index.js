import PopulationPyramid from '../graphs/PopulationPyramid';

import { useEffect, useState } from 'react';

import { useWindowSize } from '../../hooks/useWindowSize';
import { useData } from '../../hooks/useData';

import { vaestorakenneKunnassa } from "../../utils/extractStatObject";
import { VAESTO_LAHDESSA_2021 } from '../../queries';

/*
 * StatFin / Väestörakenne / 11re -- Väestö iän (1-v.) ja sukupuolen mukaan alueittain, 1972-2021
 */
const jsonUrl = 'https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/vaerak/statfin_vaerak_pxt_11re.px';

const Pyramidikuvio = () => {

    const { width } = useWindowSize();

    /*
     * Aineiston haku tilastokeskuksen palvelimelta
     */
    const { 
        pxData,
        fetchError,
        loading
    } = useData(jsonUrl, VAESTO_LAHDESSA_2021);
    
    /* Lopullinen graafin tulostamiseen käytettävä data */
    const [ data, setData ] = useState(null);

    useEffect(() => {

        if(pxData === null) return;
    
        let val = vaestorakenneKunnassa(pxData);
        console.log(val)
        setData(val);
    
    }, [ pxData ])

    const displayChart = () => {
        return (
            <PopulationPyramid 
                data = { data }
                leftGroup = { data[0].gender }
                width = { width }
            />
        )
    }


    return (
        <div>
            { loading && <p>Loading data...</p> }
            { !loading &&  fetchError && <p style={{ color: "red" }}>{ fetchError }</p>}
            { 
                (!loading && !fetchError && data !== null )
                ? displayChart()
                : null
            }
        </div>
    );
};

export default Pyramidikuvio;