const express = require("express");
const request = require("request-promise").defaults({
  headers: {
    Authorization: "apikey 8ea31c48-95c3-4bcf-9db1-d6ada47565f2",
    NordApiVersion: 1
  }
});

const app = express();

app.listen(4000, () => {
  console.log("Server running on port 4000");
});

app.get("/nordstrom", async (req, res, next) => {
  const url =
    "https://query.ecommerce.api.nordstrom.com/api/queryresults/keywordsearch/?top=1&IncludeFacets=false&Keyword=prom%20dresses";
  const json = await request.get(url);
  res.setHeader("Content-Type", "application/json");
  res.send(json);
});
