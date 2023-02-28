/* 
 * Kehityksenaikaiseen käyttöön tarkoitettu komponentti.
 *
 * Tulostaa Mike Bostockin oppaassa: Bar Chart, Horizontal esitettävän alkuperäisen graafin.
 * https://observablehq.com/@d3/horizontal-bar-chart
 */
import HorizontalBarchart from "../graphs/HorizontalBarchart";

import { groupSort } from "d3";

import { useWindowSize } from '../../hooks/useWindowSize';
import { useData} from '../../hooks/useObservableData';

const csvUrl = 'https://static.observableusercontent.com/files/09f63bb9ff086fef80717e2ea8c974f918a996d2bfa3d8773d3ae12753942c002d0dfab833d7bee1e0c9cd358cd3578c1cd0f9435595e76901508adc3964bbdc';

const LetterFrequences = () => {

    const { data } = useData(csvUrl);
    const { width } = useWindowSize();

    if(data === null ) return <p>Ladataan...</p>

    return (
        <HorizontalBarchart 
        data = { data }
        x = { d => d.frequency }
        y = { d => d.letter}
        yDomain = {groupSort(data, ([d]) => -d.frequency, d => d.letter)}
        xFormat = "%"
        xLabel = "Frequency →"
        color = "steelblue"
        width = { width }
      />
    );
};

export default LetterFrequences;


/*
      <HorizontalBarchart 
        data = { data }
        x = { d => d.frequency }
        y = { d => d.letter}
        yDomain = {groupSort(data, ([d]) => -d.frequency, d => d.letter)}
        xFormat = "%"
        xLabel = "Frequency →"
        color = "steelblue"
        width = { width }
      />

*/