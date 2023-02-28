export const YAxis = ( {yScale, width}) =>  

    yScale.domain().map((tickValue,i) => {

    return(
        <g
            key={tickValue}
            transform={`translate(${(width / 2)}, ${yScale.bandwidth() / 2 + yScale(tickValue)})`}
            className="pyramid-yAxis-tick"
        >
            <text
                x={-3}
                dy=".32em"
                style={{ textAnchor: "middle" }}
            >{tickValue}</text>
        </g>
    )
});