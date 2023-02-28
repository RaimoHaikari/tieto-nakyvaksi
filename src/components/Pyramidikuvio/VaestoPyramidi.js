/*
 * https://observablehq.com/@d3/population-pyramid
 */
import PopulationPyramid from "../graphs/PopulationPyramid";
import { useData } from "../../hooks/usePopulationData";
import { useWindowSize } from "../../hooks/useWindowSize"

const csvUrl = 'https://static.observableusercontent.com/files/99de2474953defdc3c7a46f200c976486fe55ce60de5b88d064c409e88eaccd6a7d73ee599e68f12a619bb662be01a6fff99ae7230d587ad7b90c7e63f2ee730';

const VaestoPyramidi = () => {

    const { data } = useData(csvUrl);
    const { width } = useWindowSize();

    if(data === null ) return <p>Ladataan...</p>

    return (
        <PopulationPyramid 
            data = { data }
            width = { width }
        />
    );
};

export default VaestoPyramidi;