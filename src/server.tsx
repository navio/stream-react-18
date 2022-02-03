import express from "express";
import App from "./App";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { DataProvider, getData } from "./ContextFaker";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const jsx = ReactDOMServer.renderToString(<App name="alberto" info="SSR" />);
  res.send(jsx);
});

app.get("/stream", async (req, res) => {
  let didError = false;



  const stream = getData();
  const { pipe, abort } = ReactDOMServer.renderToPipeableStream(
    <DataProvider data={stream}>
      <App name="alberto" />
    </DataProvider>,
    {
      onCompleteShell() {
        // if error change code.
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");
        pipe(res);
      },
      onError(x) {
        didError = true;
        console.error(x);
      },
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
