import ZoomableCirclePacking from '../graphs/ZoomableCirclePacking';

import { useData} from '../../hooks/useObservableData';
import { useWindowSize } from '../../hooks/useWindowSize';
import { stratify as d3Stratify } from "d3";

const csvUrl = 'https://raw.githubusercontent.com/RaimoHaikari/tahtisadetta/main/Misc/hierarchical.csv';


const Euro2016 = () => {

    const { data } = useData(csvUrl);
    const { width } = useWindowSize();
    
    if(data === null ) return <p>Ladataan...</p>


    const x = () => {

        const dataForStratify = [{name: "root", parent: null, value: null }];

        const continents = {};

        data.forEach( d => {

            let manner = d['Manner'];
            let maa = d['Maa']

            if(manner in continents === false){

                let maat = {};
                maat[maa] = 1

                continents[manner] = {name: manner, maat: maat}
            } else {

                let continent = continents[manner];
                let maat = continent['maat'];

                if(maa in maat === false)
                    maat[maa] = 1;
                else 
                    maat[maa] = maat[maa] + 1

            }

                
        })

        /*
         * const dataForStratify = [{name: "root", parent: null, value: null }];
         */
        
        Object.values(continents).forEach(c => {

            const parent = "root";
            const name = c.name;
            const value = Object.keys(c.maat).length;


            dataForStratify.push({
                name: name, 
                parent: parent, 
                value: value
            })

        })

        return dataForStratify
    }

    /*

    let childColumn = data.columns[0];
    let parentColumn = data.columns[1];


    const stratify = d3Stratify()
        .id(d => d[childColumn])
        .parentId(d => d[parentColumn])
        
    
    const root = stratify(data);

    console.log(root)
    */

    return (
        <div>
            <ZoomableCirclePacking 
                data = { x }
                id = { d => d.name }
                parentId = { d => d.parent }
                width = { width * 0.9 }
                height = { width * 0.9 }
            />
        </div>
    );
};

export default Euro2016;
