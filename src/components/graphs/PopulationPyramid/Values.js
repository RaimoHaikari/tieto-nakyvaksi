export const  Values = ({data, labelLengthLimit, xLeft, xRight, y}) => 

    data.map((d,i) => {

        const barWidth = d.gender === "M" ? xLeft(0) - xLeft(d.value) : xRight(d.value) - xRight(0);

        const xVal = d.gender === "M" 
            ? barWidth >= labelLengthLimit
                ? xLeft(d.value) + 4 
                : xLeft(d.value) - 4
            : barWidth >= labelLengthLimit
                ? xRight(d.value) - 4
                : xRight(d.value) + 4

        const txtAnchor = d.gender === "M" 
            ? barWidth >= labelLengthLimit
                ? "start"
                : "end"
            : barWidth >= labelLengthLimit
                ? "end"
                : "start"

        const fillColor = barWidth >= labelLengthLimit
            ? "white"
            : "black"

        return(
            <text
                key = {`pp-values-${i}`}
                textAnchor = { txtAnchor }
                x = { xVal }
                y = { y(d.age) + y.bandwidth() / 2 }
                dy = "0.35em"
                fill= { fillColor }
            >
            {d.value.toLocaleString()}
            </text>
        )
    });

/*
 width = { d.gender === "M" ? xLeft(0) - xLeft(d.value) : xRight(d.value) - xRight(0)}
*/