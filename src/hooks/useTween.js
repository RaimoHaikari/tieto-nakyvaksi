import { useEffect, useState } from "react";
import { selection, interpolateZoom } from "d3";

const useTween = () => {

    const [value, setValue] = useState(null);

    const doTheTween = (initialValue, finalValue) => {

        const i = interpolateZoom(
            initialValue,
            finalValue
        );

        selection()
            .transition()
            .duration(1000)
            .tween("zoom", function() {

                return (round) => {
                    if(i){
                        setValue(i(round));
                    }
                }

            })
    }
    

    return {value, doTheTween};
}

export default useTween;