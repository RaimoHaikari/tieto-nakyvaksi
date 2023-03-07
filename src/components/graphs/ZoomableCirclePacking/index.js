import { Circles } from "./Circles";
import { Labels } from "./Labels";

import { useState, useEffect } from 'react';
import useTween from '../../../hooks/useTween'

import {
    descending, 
    hierarchy,
    interpolateHcl,
    pack as d3Pack,
    scaleLinear,
    stratify
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
 * @param data data is either tabular (array of objects) or hierarchy (nested objects)
 * @param path as an alternative to id and parentId, returns an array identifier, imputing internal nodes
 * @param id if tabular data, given a d in data, returns a unique identifier (string)
 * @param parentId if tabular data, given a node d, returns its parent’s identifier
 * @param children if hierarchical data, given a d in data, returns its children
 * @param value given a node d, returns a quantitative value (for area encoding; null for count)
 * @param sort how to sort nodes prior to layout
 * @param width - the outer width of the chart, in pixels
 * @param height - the outer height of the chart, in pixels
 * @param padding -separation between circles
 */
const ZoomableCirclePacking = ({
    data,
    path,
    children,
    _value,
    sort = (a, b) => descending(a.value, b.value), 
    id = Array.isArray(data) ? d => d.id : null,
    parentId = Array.isArray(data) ? d => d.parentId : null, 
    width = 600,
    height = 600,
    padding = 3
}) => {


    const [ root, setRoot ] = useState(null);
    const [ focus, setFocus ] = useState(null);   // Par'aikaa
    const [ nameOfActive, setNameOfActive ] = useState(null);
    const { value, doTheTween } = useTween();

    useEffect(() => {

        if(data){

            /*
             * If id and parentId options are specified, or the path option, use d3.stratify
             * to convert tabular data to a hierarchy; otherwise we assume that the data is
             * specified as an object {children} with nested objects (a.k.a. the “flare.json”
             * format), and use d3.hierarchy.
             */
            const foo =  path != null 
                ? stratify().path(path)(data)
                : hierarchy(data, children);

            //  Compute the values of internal nodes by aggregating from the leaves.
            _value == null 
                ? foo.count() 
                : foo.sum(d => Math.max(0, _value(d)));

            // Sort the leaves (typically by descending value for a pleasing layout).
            if (sort != null) foo.sort(sort);


            /*
             * Lays out the specified root hierarchy, assigning the following properties on root and its descendants:
             *
             * - node.x - the x-coordinate of the circle’s center
             * - node.y - the y-coordinate of the circle’s center
             * - node.r - the radius of the circle
             */
            //const _root = pack(data);
            const _root = pack(foo);

            setFocus([_root.x, _root.y, _root.r * 2]);
            setRoot(_root);
            setNameOfActive( _root.data.name);

        }

    }, []);

    
    useEffect(() => {

        if(value === null)
            return;

        setFocus(value);
        
    }, [value])
    
    
    const pack = root => d3Pack()
        .size([width, height])
        .padding(padding)(root)


    /*
     * viewBox={`-${width/2} -${height/2} ${width} ${height}`}
     */
    const displayGraph = () => {
        return (
            <svg 
                height = { height } 
                width = { width } 
                viewBox = {`-${width/2} -${height/2} ${width} ${height}`} 
                style= { svgStyle }
                onClick = { (event) => zoom(event) }
            >
                <g>
                    <Circles 
                        clickHandler = { zoom } 
                        data = { root.descendants().slice(1) }
                        transform = { getTransform }
                        radius = { getRadius }
                        svgColor = { svgColor }
                    />
                </g>

                <g>
                    <Labels 
                        data = { root.descendants().slice(1) }
                        textDisplay = { getTextDisplay } 
                        textOpacity = { getTextOpacity }
                        transform = { getTransform }
                    />
                </g>

            </svg>
        )
    }

    const _displayGraph = () => {
        return (
            <svg 
                height = { height } 
                width = { width } 
                viewBox = {`-${width/2} -${height/2} ${width} ${height}`} 
                style= { svgStyle }
                onClick = { (event) => zoom(event) }
            >
                

            </svg>
        )
    }

    const getRadius = (d) => {
        
        const k = width / focus[2];
        return(d.r * k);

    }

    /*
     * Esitetään vain aktiivisen tason lasten nimet.
     * - tämä tehdään ccs -määrityksen avulla
     */
    const getTextDisplay = (d) => {

        const strDisplay = (d.parent && d.parent.data.name === nameOfActive) ? "inline" : "none";
        return strDisplay;

    }

    /*
     * Esitetään vain aktiivisen tason lasten nimet.
     * - tämä tehdään ccs -määrityksen avulla
     */
    const getTextOpacity = (d) => {

        const strOpacity = (d.parent && d.parent.data.name === nameOfActive) ? 1 : 0;
        return strOpacity;

    }

    const getTransform = (d) => {

        const k = width / focus[2];
        return(`translate(${(d.x - focus[0]) * k},${(d.y - focus[1]) * k})`);
    }

    /*
     * Määrittää ympyrän värin sen hierarkisen syvyyden mukaan
     */
    const svgColor = scaleLinear()
        .domain([0,5])
        .range(["hsl(152,80%,80%)", "hsl(228,30%,40%)"])
        .interpolate(interpolateHcl);


    const zoom = (event, d = root) => {

        let targetName = d.data.name;
        let target = [d.x, d.y, d.r * 2];

        if(targetName === nameOfActive){
            target = [root.x, root.y, root.r * 2];
            targetName = root.data.name;
        }
        
        doTheTween([focus[0], focus[1], focus[2]], target);
        event.stopPropagation();
        setNameOfActive(targetName);
        
    }




    return (
        <>
        {
            root 
            ? displayGraph()
            : null
        }
        </>
    );
};

export default ZoomableCirclePacking;