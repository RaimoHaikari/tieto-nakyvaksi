import HorizontalBarchart from "../graphs/HorizontalBarchart";

import { useEffect, useState } from "react";

import { useWindowSize } from '../../hooks/useWindowSize';
import { useData } from "../../hooks/useData";
import { RIKOKSET_PAIJAT_HAMEESSA_2021 } from "../../queries";

import { rikoksetPaijatHameessa } from "../../utils/extractStatObject"

import { groupSort } from "d3";

const jsonUrl = 'https://pxdata.stat.fi:443/PxWeb/api/v1/fi/StatFin/rpk/statfin_rpk_pxt_13ex.px';


const VaakaPylvaskuvio = () => {
  
  const { width } = useWindowSize();

  /*
   * Aineiston haku tilastokeskuksen palvelimelta
   */
  const { 
      pxData,
      fetchError,
      loading
  } = useData(jsonUrl, RIKOKSET_PAIJAT_HAMEESSA_2021);
  
  /* Lopullinen graafin tulostamiseen käytettävä data */
  const [ data, setData ] = useState(null);

  useEffect(() => {

    if(pxData === null) return;

    let val = rikoksetPaijatHameessa(pxData);

    //console.log(pxData)
    setData(val)

  }, [ pxData ])

  const displayBarChart = () => {
    return(
      <div>
        <h3>Tietoon tulleet rikokset Päijät-Hämeessä 2021</h3>
        <HorizontalBarchart 
          data = { data }
          x = { d => d.rikoksia }
          y = { d => d.kunta }
          yDomain = {groupSort(data, ([d]) => -d.rikoksia, d => d.kunta)}
          xFormat = "4d"
          color = "steelblue"
          marginLeft = { 80 }
          width = { width }
        />
        <p>{`Lähde: ${pxData.source}`}</p>
      </div>
    )
  }


  return (
      <div>
      { loading && <p>Loading data...</p> }
      { !loading &&  fetchError && <p style={{ color: "red" }}>{ fetchError }</p>}
      { 
        (!loading && !fetchError && data !== null )
        ? displayBarChart()
        : null
      }
      </div>
  );

};

export default VaakaPylvaskuvio;

