import 'dotenv/config';
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("ok");
})

const port = process.env.PORT || 3001;
const base_url = process.env.BASE_URL || "localhost";

app.listen(port, () => console.log(`Listening on http://${base_url}:${port}`));