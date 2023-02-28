import {
    format,
    max,
    scaleBand,
    scaleLinear,
    schemeSet1
} from 'd3';

import { Bars } from "./Bars";
import { Values} from "./Values";
import { YAxis  } from './yAxis';
import { BottomAxis } from './BottomAxis';

/**
 * Lähtäkohtana käytetty Mike Bostockin opasta: Population Pyramid
 * https://observablehq.com/@d3/population-pyramid
 * 
 * Params
 * @param data - data to be displayed
 * @param x - given d in data, returns the (quantitative) x-value
 * @param y - given d in data, returns the (ordinal) y-value
 * @param title -  given d in data, returns the title text
 * @param marginTop - the top margin, in pixels
 * @param marginRight - the right margin, in pixels
 * @param marginBottom - the bottom margin, in pixels
 * @param marginLeft - the left margin, in pixels
 * @param labelBandWidth - width of area dedicated to values 
 * @param labelLengthLimit - cut size whether label is placed inside or outside bar
 * @param displayValues - will values be printed or not
 * @param width - the outer width of the chart, in pixels
 * @param height - the outer height of the chart, in pixels
 *
 */
const PopulationPyramid = ({
    data,
    marginTop = 50,
    marginRight = 30,
    marginBottom = 40,
    marginLeft = 30,
    labelBandWidth = 60,
    labelLengthLimit = 90,
    displayValues = false,
    width,
    height = 480
}) => {

    const svgStyle = {
        maxWidth: "100%",
        height: "auto",
        height: "intrinsic"
    }
    
    const vBarLineStyle = {
        stroke: "navy",
        strokeWidth: "2"
    }

    const xLeft = scaleLinear()
        .domain([0, max(data, d => d.value)])
        .rangeRound([(width / 2) - (labelBandWidth / 2), marginLeft]);

    const xRight = scaleLinear()
        .domain(xLeft.domain())
        .rangeRound([(width / 2) + (labelBandWidth / 2), width - marginRight]);

    const y = scaleBand()
        .domain(data.map(d => d.age))
        .rangeRound([height - marginBottom, marginTop])
        .padding(0.1);

    const siFormat = format('.2s');
    const xAxisTickFormat = n => siFormat(n).replace('G','B');

    const innerHeight = height - marginTop - marginBottom;

    return (
        <svg height = { height } width = { width } viewBox={`0 0 ${width} ${height}`} style={ svgStyle }>

            <text
                textAnchor="start"
                fill="black"
                dy="0.35em"
                x={ marginLeft}
                y={ marginTop / 2}
            >
                Male
            </text>

            <text
                textAnchor = "end"
                fill = "black"
                dy = "0.35em"
                x = { width - marginRight }
                y = { marginTop / 2 }
            >
                Female
            </text>

            <g>
                <Bars 
                    data={ data }
                    xRight = { xRight }
                    xLeft = { xLeft }
                    y = { y }
                    schemeSet1 = { schemeSet1 }
                />
            </g>

            <g>
                <line 
                    x1= { (width /2) - (labelBandWidth / 2) } 
                    y1= { marginTop }
                    x2= { (width /2) - (labelBandWidth / 2)} 
                    y2= { height - marginBottom } 
                    style = { vBarLineStyle }
                    
                />
                <line 
                    x1= { (width /2) + (labelBandWidth / 2) } 
                    y1= { marginTop }
                    x2= { (width /2) + (labelBandWidth / 2)} 
                    y2= { height - marginBottom } 
                    style = { vBarLineStyle }
                />
            </g>

            <g display = {displayValues === true ? "inline" : "none"}>
                <Values 
                    data={ data }
                    xRight = { xRight }
                    xLeft = { xLeft }
                    y = { y }
                    labelLengthLimit = {labelLengthLimit}
                />
            </g>

            <g className="pyramid-yAxis">
                <YAxis 
                    y = { y } 
                    width = { width }
                />
            </g>

            <g className="pyramid-xAxis">
                <BottomAxis
                    axisTickFormat = { xAxisTickFormat }
                    innerHeight = { innerHeight }
                    marginTop = { marginTop }
                    scale = { xLeft }
                    width = { width }
                />
                <BottomAxis
                    axisTickFormat = { xAxisTickFormat }
                    innerHeight = { innerHeight }
                    marginTop = { marginTop }
                    scale = { xRight }
                    width = { width }
                />
            </g>

        </svg>
    );
};

export default PopulationPyramid;

/*


*/