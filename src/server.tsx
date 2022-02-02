import express from 'express';
import App from './App';
import ReactDOMServer from "react-dom/server";
import ReactDOM from "react-dom";
import React from "react";

const app = express()
const port = 3000

const jsx = ReactDOMServer.renderToString(<App name="jaime" />);

app.get('/', (req, res) => {
  console.log(jsx);
  res.send(jsx)
})

app.get('/render', (req, res) => {
  const hydrated =ReactDOMServer.renderToString(jsx)
  res.send(hydrated)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})