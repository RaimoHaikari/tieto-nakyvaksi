
import { useState, useEffect } from 'react';

import {
    drag,
    hierarchy,
    interpolateHcl,
    pack as d3Pack,
    scaleLinear
} from 'd3';

/*
    outline: 1px solid red;
    display: block;
    margin: "0 -14px";

*/
const svgStyle = {
    maxWidth: "100%",
    height: "auto",
    height: "intrinsic",
    display: "block",
    margin: "10px 10px"
}

/**
 * Lähtäkohtana käytetty Mike Bostockin opasta: Zoomable Circle Packing
 * https://observablehq.com/@d3/zoomable-circle-packing
 * 
 * Params
 * @param width - the outer width of the chart, in pixels
 * @param height - the outer height of the chart, in pixels
 */
const ZoomableCirclePacking = ({
    data,
    width = 600,
    height = 600
}) => {


    const [ root, setRoot ] = useState(null);
    const [ focus, setFocus ] = useState(null);   // Par'aikaa
    const [ nameOfActive, setNameOfActive ] = useState(null);

    useEffect(() => {

        if(data){

            const _root = pack(data);

            setFocus([_root.x, _root.y, _root.r * 2]);
            setRoot(_root);
            setNameOfActive( _root.data.name);

            console.log("jihaa")
        }

    }, []);

    /*
    useEffect(() => {
        setFocus(value);
    }, [value])
    */

    const pack = data => d3Pack()
        .size([width, height])
        .padding(3)
        (
            hierarchy(data)
            .sum(d => d.value)
            .sort((a,b) => b.value - a.value)
        )


    return (
        <>
        {
            root 
            ? <svg height = { height } width = { width } viewBox={`0 0 ${width} ${height}`} style={ svgStyle }>
            
              </svg>
            : null
        }
        </>
    );
};

export default ZoomableCirclePacking;