export const BottomAxis = ({axisTickFormat , innerHeight, marginTop, scale, width }) => {

    const lineStyle = {
        strokeWidth: "1",
        stroke: "#c0c0BB"
    }


    const val = scale
        .ticks(width / 150, "s")
        .filter(tickValue => tickValue !== 0)
        .map(tickValue => {

            return (
                <g
                    key={tickValue}
                    transform={`translate(${scale(tickValue)},0)`}
                    className="pyramid-xAxis-tick"
                >
                    <line
                        x1={ 0 }
                        y1={ marginTop }
                        x2={ 0 }
                        y2={ (marginTop + innerHeight) }
                        style = { lineStyle }
                        strokeDasharray = "10,10"
                    />
                    <text
                        dy=".71em"
                        y={innerHeight + marginTop}
                        style={{ textAnchor: "middle" }}
                    >{axisTickFormat(tickValue)}</text>
                </g>
            )
        });

    return val;
}

/*
scale
    .ticks(width / 100, "s")
    .filter(tickValue => tickValue !== 0)
    .map(tickValue => {

        return (
            <g
                key={tickValue}
                transform={`translate(${scale(tickValue)},0)`}
                className="pyramid-xAxis-tick"
            >
                <line
                    x1={0}
                    y1={innerHeight}
                    x2={0}
                    y2={innerHeight + (marginTop / 2)}
                />
                <text
                    dy=".71em"
                    y={innerHeight + marginTop}
                    style={{ textAnchor: "middle" }}
                >{axisTickFormat(tickValue)}</text>
            </g>
        )
    });

*/