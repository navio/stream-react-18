import React from "react";
import { Suspense, lazy } from "react";
import { useData } from "./ContextFaker";

export default (props) => {
  return (
    <div>
      <h1>Hello: {props.name}</h1>
      <Suspense fallback={'loading'}>
        <Container />
      </Suspense>
    </div>
  );
};


export const Container = () => {
    const data = useData();
    return (<>{data}</>)

}
