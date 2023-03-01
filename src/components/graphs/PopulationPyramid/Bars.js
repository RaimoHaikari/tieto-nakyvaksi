export const  Bars = ({data, xLeft, xRight, leftGroup, yScale, schemeSet1}) => 

    data.map((d,i) => {

        return(
            <rect
                key={i}
                x = { d.gender === leftGroup ? xLeft(d.value) : xRight(0) }
                y = { yScale(d.age) }
                width = { d.gender === leftGroup ? xLeft(0) - xLeft(d.value) : xRight(d.value) - xRight(0)}
                height = { yScale.bandwidth() }
                fill = { schemeSet1[d.gender === leftGroup ? 1 : 0] }
            />
        )
    });