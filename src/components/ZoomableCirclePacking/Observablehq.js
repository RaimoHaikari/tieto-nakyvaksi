import ZoomableCirclePacking from '../graphs/ZoomableCirclePacking';

import useRepository from '../../hooks/useRepository';
import { useWindowSize } from '../../hooks/useWindowSize';

const csvUrl = "https://static.observableusercontent.com/files/e65374209781891f37dea1e7a6e1c5e020a3009b8aedf113b4c80942018887a1176ad4945cf14444603ff91d3da371b3b0d72419fa8d2ee0f6e815732475d5de"



const Observablehq = () => {

    const { loading, data } = useRepository(csvUrl);
    const { width } = useWindowSize();

    return (
        <>
        {
            data 
            ? <ZoomableCirclePacking 
                data = { data }
                width = { width * 0.75}
                height = { width * 0.75 }
              />
            : loading
                ? <p>Ladataan</p>
                : null
        }
        </>
    );

};

export default Observablehq;