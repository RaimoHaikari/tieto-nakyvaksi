export const YAxis = ( {y, width}) =>  

    y.domain().map((tickValue,i) => {

    return(
        <g
            key={tickValue}
            transform={`translate(${(width / 2)}, ${y.bandwidth() / 2 + y(tickValue)})`}
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