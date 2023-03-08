export const  Circles = ({clickHandler, data, transform, radius, svgColor}) => 

    data.map((d,i) => {

        return(
            <circle 
                key={`pckd-circle-${d.data.name}`}
                fill={ d.children ? svgColor(d.depth) : "white" }
                stroke = "red"
                pointerEvents = {d => !d.children ? "none" : null}
                transform={ transform(d) }
                r = { radius(d) }
                onClick = {(event) => clickHandler(event, d)}
            />
        )
    });
