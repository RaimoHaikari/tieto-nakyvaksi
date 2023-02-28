import {
    InternSet,
    map,
    max,
    range,
    scaleBand,
    scaleLinear
} from "d3";


/**
 * Lähtäkohtana käytetty Mike Bostockin opasta: Bar Chart, Horizontal
 * https://observablehq.com/@d3/horizontal-bar-chart
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
 * @param width - the outer width of the chart, in pixels
 * @param height - the outer height of the chart, in pixels
 * @param yPadding - amount of y-range to reserve to separate bars
 * @param yDomain - an array of (ordinal) y-values
 * @param yRange - [top, bottom]
 * @param xType - type of x-scale
 * @param xDomain - [xmin, xmax]
 * @param xRange - [left, right]
 * @param color - bar fill color
 * @param titleColor -  title fill color when atop bar
 * @param titleAltColor - title fill color when atop background
 *
 */
const HorizontalBarchart = ({  
    data,
    x = d => d,
    y = (d, i) => i,
    title,
    marginTop = 30,
    marginRight = 20,
    marginBottom = 10,
    marginLeft = 30,
    width = 640,
    height,
    yPadding = 0.1,
    yDomain,
    yRange, 
    xType = scaleLinear,
    xDomain,
    xRange = [marginLeft, width - marginRight], 
    xFormat,
    xLabel,
    color = "currentColor", 
    titleColor = "white",
    titleAltColor = "currentColor", 
}) => {

    const svgStyle = {
        maxWidth: "100%",
        height: "auto",
        height: "intrinsic"
    }
    
    // Compute values.
    const X = map(data, x);
    const Y = map(data, y);

    // Compute default domains, and unique the y-domain.
    if (xDomain === undefined) xDomain = [0, max(X)];
    if (yDomain === undefined) yDomain = Y;
    yDomain = new InternSet(yDomain);

    // Omit any data not present in the y-domain
    const I = range(X.length).filter(i => yDomain.has(Y[i]));

    // Compute the default height
    if (height === undefined) height = Math.ceil((yDomain.size + yPadding) * 25) + marginTop + marginBottom;
    if (yRange === undefined) yRange = [marginTop, height - marginBottom];
    
    // Construct scales
    const xScale = xType(xDomain, xRange);
    const yScale = scaleBand(yDomain, yRange).padding(yPadding);

    // Compute titles.
    const formatValue = xScale.tickFormat(100, xFormat);

    if (title === undefined) {
        title = i => `${formatValue(X[i])}`;

    } else {
        const O = map(data, d => d);
        const T = title;
        title = i => T(O[i], i, data);
    }


    return (
        <svg height = { height } width = { width } viewBox={`0 0 ${width} ${height}`} style={ svgStyle }>

            <g 
                transform = {`translate(0,${marginTop})`} 
                fill="none" 
                fontSize="10"
                fontFamily="sans-serif" 
                textAnchor="middle"
            >
                {
                    xScale.ticks(width/80, xFormat).map((tickValue,i) => {

                        return(
                            <g 
                                key = { `bc-xAxis-tick-${i}` }
                                transform = { `translate(${xScale(tickValue)},0)` }
                                className = "tick"
                                opacity = { 1 }
                            >
                                <line
                                    stroke = "currentColor"
                                    y2={-6}
                                />
                                <line
                                    stroke = "currentColor"
                                    y2 = { height }
                                    strokeOpacity = { 0.1 }
                                />
                                <text
                                    fill = "currentColor"
                                    y = { -9 }
                                    dy = "0em"
                                >
                                {formatValue(tickValue)}
                                </text>
                            </g>
                        )
                    })
                }
                {
                    xLabel && <text x= { width - marginRight } y="-22" fill="currentColor" textAnchor="end">{xLabel}</text>
                }
                
            </g>
            <g fill = { color }>
            {
                I.map((d,i) => {
                    return(
                        <rect
                            key={`bc-rect-${i}`}
                            x = { xScale(0) }
                            y = { yScale(Y[d]) }
                            width = { xScale(X[d]) - xScale(0) }
                            height = { yScale.bandwidth() }
                        />
                    )
                })
            }
            </g>
            <g
                fontFamily = "sans-serif"
                fontSize= { 10 }
            >
            {
                I.map((d,i) => {

                    const shortBar = xScale(X[d]) - xScale(0) < 20

                    return(
                        <text
                            key = {`bc-rect-${i}`}
                            x = { xScale(X[d]) }
                            y = { yScale(Y[d]) + yScale.bandwidth() / 2 }
                            dy = { `0.35em` }
                            dx = { shortBar ? 4 : -4 }
                            fill = { shortBar ? titleAltColor : titleColor }
                            textAnchor = { shortBar ? "start" : "end"}
                        >
                        {title(d)}
                        </text>
                    )
                })
            }
            </g>
            <g 
                transform={`translate(${marginLeft},0)`} 
                fill="none" 
                fontSize="10" 
                fontFamily="sans-serif" 
                textAnchor="end"
            >
                <path class="domain" stroke="currentColor" d={`M0,30V${height}`}></path>
                {
                    yScale.domain().map((tickValue ,i) => {

                        return(
                            <g
                                key = { `bc-yAxis-tick-${i}` }
                                className = "tick" 
                                opacity = "1" 
                                transform = { `translate(0, ${ yScale.bandwidth() / 2 + yScale(tickValue)})` }
                            >
                                <line stroke="currentColor" x2="-6"></line>
                                <text fill="currentColor" x="-9" dy="0.32em">{tickValue}</text>
                            </g>
                        )

                    })
                }                                       
            </g>
        </svg>
    );
};

/*
<g transform="translate(30,0)" fill="none" font-size="10" font-family="sans-serif" text-anchor="end">
*/

export default HorizontalBarchart;