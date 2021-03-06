import React from "react";
import { Suspense, lazy } from "react";
import { useData } from "./ContextFaker";

export default (props) => {
  return (
    <body>
      <h1>Hello: {props.name}</h1>
      <Suspense fallback={'loading'}>
        <Container />
      </Suspense>
    </body>
  );
};


export const Container = () => {
    const data = useData();
    return (<>{data}</>)

}
