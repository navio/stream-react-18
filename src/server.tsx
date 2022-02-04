import express from "express";
import App from "./App";
import ReactDOMServer from "react-dom/server";
import React from "react";
import { DataProvider, getData } from "./ContextFaker";

const app = express();
const port = 3000;

app.use(express.static("dist"));

app.get("/", (req, res) => {
  const stream = getData();
  const jsx = ReactDOMServer.renderToString(
    <DataProvider data={stream}>
      <App name="alberto" info="SSR" />
    </DataProvider>
  );
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>CSR</title>
  </head>
  <body>
    <div id="root">${jsx}</div>
    </body>
  </html>`);
});

app.get("/hydrate", (req, res) => {
  const stream = getData();
  const jsx = ReactDOMServer.renderToString(
    <DataProvider data={stream}>
      <App name="alberto" info="SSR" />
    </DataProvider>
  );
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>CSR</title>
  </head>
  <body>
    <div id="root">${jsx}</div>
    </body>
  <script src="/index.js"></script>
  </html>`);
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

app.get("/csr", async (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head>
    <title>CSR</title>
  </head>
  <body>
    <div id="root"></div>
    </body>
  <script src="/index.js"></script>
  </html>`);
});

app.listen(port, () => {
  console.log(`Listening on port ${port} ☄️ ☄️ ☄️ ☄️`);
});
