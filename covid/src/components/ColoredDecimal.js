import React from "react";

const greenStyle = {
    color: 'green'
}

function ColoredDecimal({data}) {
    return (
        data < 1 ? (<h4 style={greenStyle}>{data}</h4>) : (<h4>{data}</h4>)
    );
}

export default ColoredDecimal;