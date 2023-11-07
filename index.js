import express from "express";
import routes from "./src/routes/routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
