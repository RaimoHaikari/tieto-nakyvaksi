export const  Bars = ({data, xLeft, xRight, y, schemeSet1}) => 

    data.map((d,i) => {

        return(
            <rect
                key={i}
                x = { d.gender === "M" ? xLeft(d.value) : xRight(0) }
                y = { y(d.age) }
                width = { d.gender === "M" ? xLeft(0) - xLeft(d.value) : xRight(d.value) - xRight(0)}
                height = { y.bandwidth() }
                fill = { schemeSet1[d.gender === "M" ? 1 : 0] }
            />
        )
    });