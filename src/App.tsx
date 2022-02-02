import React from "react"

export default (props) => {
    return (
        <body>
            <h1>Hello: {props.name}</h1>
            <div>{ props.info || 'empty' }</div>
        </body>
    );
};