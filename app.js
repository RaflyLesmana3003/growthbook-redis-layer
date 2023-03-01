const express = require("express");
const Redis = require("ioredis");
const fetch = require("node-fetch");
var cors = require('cors')


const app = express();
app.use(cors())
const redis = new Redis('redis://redis:6379');

app.get("/api/features/:sdk", async (req, res) => {
  const cacheKey = "cache-key";

  const value = await redis.get(cacheKey);
  
  if (value !== null) {
    res.send(value);
  } else {
    // Retrieve data from Growthbook Proxy API
    fetch("http://growthbook:3100/api/features/"+req.params.sdk)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to retrieve data from Growthbook Proxy API");
        }
        return response.json();
      })
      .then(async (data) => {
        await redis.set(cacheKey, JSON.stringify(data));
        await redis.expire(cacheKey, 60 * 5);

        res.send(data);
      })
      .catch(async (err) => {
        console.error(err);
        res.status(500).send("Error retrieving data from Growthbook Proxy API");
      });
  }
  
});

app.listen(3001, () => {
  console.log("Cache layer listening on port 3001");
});

