import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import carRoutes from "./routes/carRoutes.js"

dotenv.config();

const app = express();

app.use(cors());

BigInt.prototype.toJSON = function () {
  return this.toString();
};
app.use(express.json());

// routes

app.use("/cars", carRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});