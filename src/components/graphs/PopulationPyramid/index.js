import {
    format,
    InternSet,
    map,
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
 * @param xVal - given d in data, returns the (quantitative) x-value
 * @param yVal - given d in data, returns the y-value
 * @param yDomain - an array of y-values
 * @param yRange - [top, bottom]
 * @param yPadding - amount of y-range to reserve to separate bars
 * @param xDomain - [xmin, xmax]
 * @param title -  given d in data, returns the title text
 * @param marginTop - the top margin, in pixels
 * @param marginRight - the right margin, in pixels
 * @param marginBottom - the bottom margin, in pixels
 * @param marginLeft - the left margin, in pixels
 * @param labelBandWidth - width of area dedicated to values 
 * @param titleLeft - title of the left bars
 * @param titleRight - title of the right bars
 * @param labelLengthLimit - cut size whether label is placed inside or outside bar
 * @param displayValues - will values be printed or not
 * @param width - the outer width of the chart, in pixels
 * @param height - the outer height of the chart, in pixels
 *
 */
const PopulationPyramid = ({
    data,
    xVal = d => d.value,
    yVal = d => d.age,
    yDomain,
    yRange,
    yPadding = 0.1,
    xDomain,
    marginTop = 50,
    marginRight = 30,
    marginBottom = 40,
    marginLeft = 30,
    labelBandWidth = 60,
    labelLengthLimit = 90,
    titleLeft = "Male",
    titleRight = "Female",
    displayValues = false,
    width,
    height = 480
}) => {

    const svgStyle = {
        maxWidth: "100%",
        height: "auto",
        height: "intrinsic"
    }

    // Compute values.
    const X = map(data, xVal);
    const Y = map(data, yVal);

    // Compute default domains, and unique the y-domain.
    if (xDomain === undefined) xDomain = [0, max(X)];
    if (yDomain === undefined) yDomain = Y;
    yDomain = new InternSet(yDomain);
    
    const vBarLineStyle = {
        stroke: "navy",
        strokeWidth: "2"
    }

    // Compute y-range
    if (yRange === undefined) yRange = [height - marginBottom, marginTop];

    // Construct scales
    const xLeft = scaleLinear()
        .domain(xDomain)
        .rangeRound([(width / 2) - (labelBandWidth / 2), marginLeft]);

    const xRight = scaleLinear()
        .domain(xLeft.domain())
        .rangeRound([(width / 2) + (labelBandWidth / 2), width - marginRight]);

    const yScale = scaleBand()
        .domain(yDomain)
        .rangeRound(yRange)
        .padding(yPadding);



    const siFormat = format('.2s');
    const xAxisTickFormat = n => siFormat(n).replace('G','B');

    const innerHeight = height - marginTop - marginBottom;



    // foo();

    return (
        <svg height = { height } width = { width } viewBox={`0 0 ${width} ${height}`} style={ svgStyle }>

            <text
                textAnchor="start"
                fill="black"
                dy="0.35em"
                x={ marginLeft}
                y={ marginTop / 2}
            >
                { titleLeft }
            </text>

            <text
                textAnchor = "end"
                fill = "black"
                dy = "0.35em"
                x = { width - marginRight }
                y = { marginTop / 2 }
            >
                { titleRight }
            </text>

            <g>
                <Bars 
                    data={ data }
                    xRight = { xRight }
                    xLeft = { xLeft }
                    yScale = { yScale }
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
                    yScale = { yScale }
                    labelLengthLimit = {labelLengthLimit}
                />
            </g>

            <g className="pyramid-yAxis">
                <YAxis 
                    yScale = { yScale } 
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