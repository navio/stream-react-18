import React from "react";
import ReactDOM from "react-dom"; 
import App from "./App";
import { DataProvider, getData } from "./ContextFaker";

const rootElement = document.getElementById("root");

const root = ReactDOM.createRoot(rootElement);
const stream = getData();

root.render(<DataProvider data={stream}><App name="alberto" /></DataProvider>);