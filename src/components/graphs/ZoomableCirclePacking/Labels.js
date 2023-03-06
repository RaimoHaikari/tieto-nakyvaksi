export const  Labels = ({ data, textDisplay, textOpacity, transform }) => 

    data.map((d,i) => {

        const strDisplay = textDisplay(d);
        const strOpacity = textOpacity(d);

        return(
            <text
                key = {`pckd-lbl-${d.data.name}`}
                style={{ fillOpacity: strOpacity, display: strDisplay }}
                transform = { transform(d) }
            >
            { d.data.name }
            </text>
        )
    });