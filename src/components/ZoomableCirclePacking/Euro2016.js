import ZoomableCirclePacking from '../graphs/ZoomableCirclePacking';

import { useData} from '../../hooks/useObservableData';
import { useWindowSize } from '../../hooks/useWindowSize';
import { stratify as d3Stratify } from "d3";

const csvUrl = 'https://raw.githubusercontent.com/RaimoHaikari/tahtisadetta/main/Misc/hierarchical.csv';

const dataset = [
    {child: "a", parent: ""},
    {child: "b", parent: "a"},
    {child: "c", parent: "a"},
    {child: "d", parent: "a"},
    {child: "e", parent: "b"},
    {child: "f", parent: "c"},
    {child: "g", parent: "c"},
    {child: "h", parent: "d"},
    {child: "i", parent: "h"}
  ];

const Euro2016 = () => {

    const { data } = useData(csvUrl);
    const { width } = useWindowSize();
    
    if(data === null ) return <p>Ladataan...</p>

    const y = () => {


        const stratify = d3Stratify()
            .id(d => d.child)
            .parentId(d => d.parent)

        const root = stratify(dataset)

        //console.log(".......  malli  .......");
        //console.log(root)
        //console.log("-----------------------")
        
    }

    const x = () => {


        const dataForStratify = [{name: "root", parent: null, value: null }];

        const continents = {};
        const lands = {};
        const series = {};

        data.forEach( d => {

            let manner = d['Manner'];
            let maa = d['Maa'];
            let sarja = d['Sarja'];

            let serieId = `${maa}-${sarja}`;

            if(manner in continents === false){
                continents[manner] = true
                dataForStratify.push({name: manner, parent: "root", value: null})
            }

            if(maa in lands === false){
                lands[maa] = true
                dataForStratify.push({name: maa, parent: manner , value: null})
            }

            if(serieId in series === false)
                series[serieId] = {name: sarja, parent: maa , value: 1}
            else {
                series[serieId].value = series[serieId].value + 1
            }

        })

        /*
         *
         */
        Object.values(series).forEach( serie  => {
            dataForStratify.push(serie)
        })

        /*
         * const dataForStratify = [{name: "root", parent: null, value: null }];
         */
        
        /*
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
        */

        return dataForStratify
    }


    const _x = () => {

        console.log(data)

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

    x()


    return (
        <div>
            <ZoomableCirclePacking 
                data = { x() }
                id = { d => d.name }
                parentId = { d => d.parent }
                _value = { d => d.value }
                width = { width * 0.9 }
                height = { width * 0.9 }
            />
        </div>
    );
};

/*
            <ZoomableCirclePacking 
                data = { x() }
                id = { d => d.name }
                parentId = { d => d.parent }
                _value = { d => d.value }
                width = { width * 0.9 }
                height = { width * 0.9 }
            />
*/

export default Euro2016;
